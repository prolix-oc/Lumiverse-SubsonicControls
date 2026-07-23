import type { PlaybackState } from "./types";

type FeishinMessage = { event?: unknown; data?: unknown };

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}
function text(value: unknown, fallback = ""): string { return typeof value === "string" ? value : fallback; }
function number(value: unknown, fallback = 0): number { return typeof value === "number" && Number.isFinite(value) ? value : fallback; }
function webSocketUrl(value: string): string {
  const url = new URL(value.includes("://") ? value : `http://${value}`);
  if (url.protocol === "http:") url.protocol = "ws:";
  else if (url.protocol === "https:") url.protocol = "wss:";
  if (url.protocol !== "ws:" && url.protocol !== "wss:") throw new Error("Feishin Remote URL must use HTTP, HTTPS, WS, or WSS.");
  return url.toString();
}

/** Browser-side client for Feishin's desktop Remote WebSocket API. */
export class FeishinRemoteClient {
  private socket: WebSocket | null = null;
  private state: PlaybackState | null = null;
  private status = "stopped";
  private positionSeconds = 0;
  private volume: number | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempt = 0;
  private stopped = true;
  private lastPublishedAt = 0;
  private publishTimer: ReturnType<typeof setTimeout> | null = null;
  private config: { url: string; username: string; password: string } | null = null;

  constructor(private readonly onState: (state: PlaybackState | null, connected: boolean) => void, private readonly onError: (message: string) => void) {}

  connect(url: string, username: string, password: string): void {
    const normalizedUrl = webSocketUrl(url);
    if (this.config?.url === normalizedUrl && this.socket?.readyState === WebSocket.OPEN) return;
    this.disconnect(false);
    this.stopped = false;
    this.config = { url: normalizedUrl, username, password };
    this.reconnectAttempt = 0;
    this.open();
  }

  disconnect(clear = true): void {
    this.stopped = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    if (this.publishTimer) clearTimeout(this.publishTimer);
    this.publishTimer = null;
    const socket = this.socket;
    this.socket = null;
    socket?.close(1000, "Disconnected by user");
    if (clear) {
      this.config = null;
      this.state = null;
      this.onState(null, false);
    }
  }

  send(event: string, data: Record<string, unknown> = {}): void {
    if (this.socket?.readyState !== WebSocket.OPEN) return this.onError("Feishin Remote is not connected.");
    this.socket.send(JSON.stringify({ event, ...data }));
  }

  private open(): void {
    const config = this.config;
    if (!config || this.stopped) return;
    try {
      const socket = new WebSocket(config.url);
      this.socket = socket;
      socket.onopen = () => {
        if (socket !== this.socket) return;
        this.reconnectAttempt = 0;
        this.onState(this.state, true);
        if (config.username || config.password) {
          socket.send(JSON.stringify({ event: "authenticate", header: `Basic ${btoa(`${config.username}:${config.password}`)}` }));
        }
      };
      socket.onmessage = (event) => this.receive(event.data);
      socket.onerror = () => this.onError("Feishin Remote connection failed.");
      socket.onclose = () => {
        if (socket !== this.socket) return;
        this.socket = null;
        this.state = null;
        this.onState(null, false);
        this.scheduleReconnect();
      };
    } catch (error) {
      this.onError(error instanceof Error ? error.message : "Could not connect to Feishin Remote.");
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(): void {
    if (this.stopped || !this.config || this.reconnectTimer) return;
    const seconds = [2, 4, 8, 16, 30][Math.min(this.reconnectAttempt++, 4)];
    this.reconnectTimer = setTimeout(() => { this.reconnectTimer = null; this.open(); }, seconds * 1000);
  }

  private receive(raw: unknown): void {
    try {
      const message = JSON.parse(typeof raw === "string" ? raw : "") as FeishinMessage;
      const event = text(message.event);
      if (event === "error") return this.onError(text(message.data, "Feishin Remote error."));
      const data = asRecord(message.data);
      if (event === "state") this.replaceState(data);
      else if (event === "song") this.setSong(data);
      else if (event === "playback") this.status = text(message.data, this.status);
      else if (event === "position") this.positionSeconds = number(message.data, this.positionSeconds);
      else if (event === "volume") this.volume = number(message.data, this.volume ?? 0);
      else if (event === "proxy" && this.state && typeof message.data === "string") this.state = { ...this.state, albumArtUrl: `data:image/jpeg;base64,${message.data}` };
      if (event === "position") this.publishSoon();
      else this.publish();
    } catch { this.onError("Feishin sent an invalid Remote response."); }
  }

  private replaceState(data: Record<string, unknown>): void {
    this.status = text(data.status, "stopped");
    this.positionSeconds = number(data.position);
    this.volume = number(data.volume);
    this.setSong(asRecord(data.song), false);
  }

  private setSong(song: Record<string, unknown>, publish = true): void {
    const id = text(song.id);
    this.state = id ? {
      trackUri: id,
      trackName: text(song.name, "Unknown track"),
      artistName: text(song.artistName, "Unknown artist"),
      albumName: text(song.album, "Unknown album"),
      albumArtUrl: null,
      durationMs: Math.max(0, number(song.duration)),
      progressMs: Math.max(0, this.positionSeconds * 1000),
      positionKnown: true,
      isPlaying: this.status.toLowerCase() === "playing",
      source: "feishin",
      albumArtKey: `${text(song.artistName)}\u0000${text(song.album)}\u0000${text(song.coverArt) || id}`,
      deviceName: "Feishin Desktop",
      volume: this.volume,
    } : null;
    if (id) this.send("proxy");
    if (publish) this.publish();
  }

  private publish(): void {
    if (this.publishTimer) clearTimeout(this.publishTimer);
    this.publishTimer = null;
    this.lastPublishedAt = Date.now();
    if (this.state) this.state = { ...this.state, isPlaying: this.status.toLowerCase() === "playing", progressMs: Math.max(0, this.positionSeconds * 1000), volume: this.volume };
    this.onState(this.state, this.socket?.readyState === WebSocket.OPEN);
  }

  private publishSoon(): void {
    const delay = Math.max(0, 250 - (Date.now() - this.lastPublishedAt));
    if (delay === 0) return this.publish();
    if (!this.publishTimer) this.publishTimer = setTimeout(() => this.publish(), delay);
  }
}
