declare const spindle: import("lumiverse-spindle-types").SpindleAPI;
declare const Bun: { CryptoHasher: new (algorithm: string) => { update(value: string): void; digest(encoding: "hex"): string } };

import type { PlaybackState, SearchResult, SubsonicConfig } from "./types";

type ApiResponse = { status: number; body: string };
type SubsonicPayload = Record<string, any>;

export interface LyricsData {
  plainLyrics: string | null;
  syncedLyrics: string | null;
  instrumental: boolean;
}

const CLIENT_NAME = "LumiverseSubsonicControls";
const API_VERSION = "1.16.1";
const configs = new Map<string, SubsonicConfig>();
const coverArtUrls = new Map<string, string>();
let activeUserId: string | null = null;

export function setConfig(userId: string, config: SubsonicConfig | null): void {
  const existing = configs.get(userId);
  const changed = !existing || !config
    || existing.serverUrl !== config.serverUrl
    || existing.username !== config.username
    || existing.password !== config.password;
  if (changed) {
    for (const key of coverArtUrls.keys()) {
      if (key.startsWith(`${userId}\u0000`)) coverArtUrls.delete(key);
    }
  }
  if (config) configs.set(userId, config);
  else configs.delete(userId);
}

export function setActiveUser(userId: string): void { activeUserId = userId; }
export function isConnected(userId?: string): boolean { return configs.has(userId || activeUserId || ""); }

function getConfig(userId?: string): SubsonicConfig {
  const config = configs.get(userId || activeUserId || "");
  if (!config) throw new Error("Not connected to a Subsonic server");
  return config;
}

function normalizeBaseUrl(value: string): string {
  const url = new URL(value.trim());
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("Server URL must start with http:// or https://");
  return url.toString().replace(/\/+$/, "");
}

function md5(value: string): string {
  const hasher = new Bun.CryptoHasher("md5");
  hasher.update(value);
  return hasher.digest("hex");
}

function salt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function restRoot(serverUrl: string): string {
  const base = normalizeBaseUrl(serverUrl);
  return /\/rest$/i.test(base) ? base : `${base}/rest`;
}

function responseError(payload: SubsonicPayload): Error | null {
  const response = payload["subsonic-response"];
  if (!response || response.status === "ok") return null;
  const error = response.error || {};
  return new Error(error.message || `Subsonic request failed${error.code ? ` (code ${error.code})` : ""}`);
}

async function request(method: string, values: Record<string, string | number | undefined> = {}, userId?: string): Promise<SubsonicPayload> {
  const config = getConfig(userId);
  const s = salt();
  const params = new URLSearchParams({
    u: config.username,
    t: md5(config.password + s),
    s,
    v: API_VERSION,
    c: CLIENT_NAME,
    f: "json",
  });
  for (const [key, value] of Object.entries(values)) if (value !== undefined) params.set(key, String(value));
  const result = await spindle.cors(`${restRoot(config.serverUrl)}/${method}.view?${params.toString()}`, { method: "GET" }) as ApiResponse;
  if (result.status < 200 || result.status >= 300) {
    if (method === "jukeboxControl" && isJukeboxUnavailableStatus(result.status)) {
      throw new Error(`This server does not implement the optional Subsonic Jukebox endpoint (HTTP ${result.status}).`);
    }
    throw new Error(`Subsonic ${method} failed (${result.status})`);
  }
  let payload: SubsonicPayload;
  try { payload = JSON.parse(result.body); } catch { throw new Error(`Subsonic ${method} returned invalid JSON`); }
  const error = responseError(payload);
  if (error) throw error;
  return payload["subsonic-response"];
}

function isJukeboxUnavailableStatus(status: number): boolean {
  return status === 404 || status === 405 || status === 501;
}

export function isJukeboxUnavailableError(error: unknown): boolean {
  return error instanceof Error && /optional Subsonic Jukebox endpoint/.test(error.message);
}

async function artUrl(coverArt: string | undefined, userId?: string): Promise<string | null> {
  if (!coverArt) return null;
  const resolvedUserId = userId || activeUserId || "";
  const cacheKey = `${resolvedUserId}\u0000${coverArt}`;
  const cached = coverArtUrls.get(cacheKey);
  if (cached) return cached;
  const config = getConfig(userId);
  const s = salt();
  const params = new URLSearchParams({ u: config.username, t: md5(config.password + s), s, v: API_VERSION, c: CLIENT_NAME, id: coverArt });
  const url = `${restRoot(config.serverUrl)}/getCoverArt.view?${params.toString()}`;
  coverArtUrls.set(cacheKey, url);
  return url;
}

function durationMs(entry: any): number { return Math.max(0, Number(entry?.duration || 0) * 1000); }

async function mapTrack(entry: any, userId?: string): Promise<SearchResult> {
  return {
    name: entry?.title || entry?.name || "Unknown track",
    artist: entry?.artist || entry?.artistName || "Unknown artist",
    album: entry?.album || "Unknown album",
    albumArtUrl: await artUrl(entry?.coverArt, userId),
    uri: String(entry?.id || ""),
    durationMs: durationMs(entry),
  };
}

async function mapState(entry: any, isPlaying: boolean, source: PlaybackState["source"], positionMs = 0, userId?: string, positionKnown = true): Promise<PlaybackState | null> {
  if (!entry?.id) return null;
  const track = await mapTrack(entry, userId);
  const playerName = typeof entry.playerName === "string" && entry.playerName.trim() ? entry.playerName.trim() : null;
  const albumArtKey = typeof entry.coverArt === "string" && entry.coverArt
    ? entry.coverArt
    : typeof entry.albumId === "string" && entry.albumId
      ? entry.albumId
      : null;
  return { isPlaying, trackName: track.name, artistName: track.artist, albumName: track.album, albumArtUrl: track.albumArtUrl, albumArtKey, progressMs: positionMs, durationMs: track.durationMs, trackUri: track.uri, positionKnown, source, deviceName: playerName };
}

export async function ping(userId?: string): Promise<void> { await request("ping", {}, userId); }

/** Checks the optional endpoint without changing the server's playback state. */
export async function verifyJukebox(userId?: string): Promise<void> {
  await request("jukeboxControl", { action: "get" }, userId);
}

export async function search(query: string, userId?: string): Promise<SearchResult[]> {
  const response = await request("search3", { query, songCount: 25, albumCount: 0, artistCount: 0 }, userId);
  const songs = response.searchResult3?.song || [];
  return Promise.all(songs.map((song: any) => mapTrack(song, userId)));
}

export async function getPlaybackState(userId?: string): Promise<PlaybackState | null> {
  const config = getConfig(userId);
  if (config.enableJukebox) {
    try {
      const response = await request("jukeboxControl", { action: "get" }, userId);
      const status = response.jukeboxStatus;
      const index = Number(status?.currentIndex);
      const current = status?.playing && Number.isInteger(index) ? status.playlist?.entry?.[index] : null;
      if (current) return mapState(current, true, "jukebox", Math.max(0, Number(status.position || 0) * 1000), userId);
    } catch (error: any) {
      spindle.log.warn(`Jukebox status unavailable: ${error?.message || error}`);
    }
  }
  const response = await request("getNowPlaying", {}, userId);
  const entries = response.nowPlaying?.entry || [];
  const own = entries.find((entry: any) => entry.username === config.username);
  if (!own) return null;
  // OpenSubsonic's playbackReport extension adds positionMs (milliseconds),
  // state, and playbackRate to getNowPlaying entries. Treat only an actually
  // supplied value as canonical: Number(undefined) is 0, which used to turn a
  // missing position into a false zero-second anchor for synchronized lyrics.
  const rawPositionMs = own.positionMs;
  const hasReportedPosition = (typeof rawPositionMs === "number" && Number.isFinite(rawPositionMs))
    || (typeof rawPositionMs === "string" && rawPositionMs.trim() !== "" && Number.isFinite(Number(rawPositionMs)));
  const reportedPositionMs = hasReportedPosition ? Number(rawPositionMs) : 0;
  const positionKnown = hasReportedPosition && reportedPositionMs >= 0;
  const isPlaying = typeof own.state === "string" ? own.state.toLowerCase() === "playing" : true;
  return mapState(own, isPlaying, "now_playing", positionKnown ? reportedPositionMs : 0, userId, positionKnown);
}

async function jukebox(action: string, values: Record<string, string | number | undefined> = {}, userId?: string): Promise<void> {
  if (!getConfig(userId).enableJukebox) throw new Error("Server-side Jukebox is disabled. Enable it in Subsonic Controls settings to use playback controls.");
  await request("jukeboxControl", { action, ...values }, userId);
}

export async function play(trackId: string | undefined, userId?: string): Promise<void> {
  if (!trackId) return jukebox("start", {}, userId);
  await jukebox("clear", {}, userId);
  await jukebox("add", { id: trackId }, userId);
  await jukebox("start", {}, userId);
}
export async function pause(userId?: string): Promise<void> { await jukebox("stop", {}, userId); }
export async function next(userId?: string): Promise<void> { await jukebox("skip", {}, userId); }
export async function previous(userId?: string): Promise<void> { await jukebox("previous", {}, userId); }
export async function addToQueue(trackId: string, userId?: string): Promise<void> { await jukebox("add", { id: trackId }, userId); }

function toLrcTimestamp(startMs: number): string {
  const totalCentiseconds = Math.max(0, Math.round(startMs / 10));
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor((totalCentiseconds % 6000) / 100);
  const centiseconds = totalCentiseconds % 100;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}

function parseStructuredLyrics(lines: unknown): LyricsData | null {
  if (!Array.isArray(lines)) return null;
  const parsed = lines
    .map((line: any) => ({ start: Number(line?.start), value: typeof line?.value === "string" ? line.value.trim() : "" }))
    .filter((line) => Number.isFinite(line.start));
  if (parsed.length === 0) return null;
  const plainLyrics = parsed.map((line) => line.value).filter(Boolean).join("\n").trim() || null;
  const syncedLyrics = parsed.map((line) => `[${toLrcTimestamp(line.start)}]${line.value}`).join("\n");
  return { plainLyrics, syncedLyrics, instrumental: false };
}

async function getLrclibLyrics(song: any): Promise<LyricsData | null> {
  const title = typeof song?.title === "string" ? song.title.trim() : "";
  const artist = typeof song?.artist === "string" ? song.artist.trim() : "";
  if (!title || !artist) return null;
  const params = new URLSearchParams({ track_name: title, artist_name: artist });
  if (typeof song?.album === "string" && song.album.trim()) params.set("album_name", song.album.trim());
  const duration = Number(song?.duration);
  if (Number.isFinite(duration) && duration > 0) params.set("duration", String(Math.round(duration)));
  try {
    const result = await spindle.cors(`https://lrclib.net/api/get?${params.toString()}`, { method: "GET" }) as ApiResponse;
    if (result.status !== 200) return null;
    const data = JSON.parse(result.body) as { plainLyrics?: unknown; syncedLyrics?: unknown; instrumental?: unknown };
    const plainLyrics = typeof data.plainLyrics === "string" && data.plainLyrics.trim() ? data.plainLyrics : null;
    const syncedLyrics = typeof data.syncedLyrics === "string" && data.syncedLyrics.trim() ? data.syncedLyrics : null;
    return plainLyrics || syncedLyrics || data.instrumental === true
      ? { plainLyrics, syncedLyrics, instrumental: data.instrumental === true }
      : null;
  } catch {
    return null;
  }
}

export async function getLyrics(trackId: string, userId?: string): Promise<LyricsData | null> {
  let song: any = null;
  let nativePlainLyrics: string | null = null;
  try {
    const response = await request("getLyricsBySongId", { id: trackId }, userId);
    const structured = parseStructuredLyrics(response.lyricsList?.structuredLyrics?.[0]?.line);
    if (structured?.syncedLyrics) return structured;
    const plain = response.lyricsList?.lyrics?.[0]?.value;
    if (typeof plain === "string" && plain.trim()) nativePlainLyrics = plain;
  } catch {
    // getLyricsBySongId is an OpenSubsonic extension; fall through to the
    // original Subsonic endpoint for older compatible servers.
  }
  try {
    song = (await request("getSong", { id: trackId }, userId)).song;
    const response = await request("getLyrics", { artist: song?.artist, title: song?.title }, userId);
    const lyrics = response.lyrics?.value;
    if (!nativePlainLyrics && typeof lyrics === "string" && lyrics.trim()) nativePlainLyrics = lyrics;
  } catch {
    // A server may support getLyricsBySongId but not the original lookup.
  }
  const lrclib = song ? await getLrclibLyrics(song) : null;
  if (lrclib?.syncedLyrics) return { ...lrclib, plainLyrics: nativePlainLyrics || lrclib.plainLyrics };
  return nativePlainLyrics ? { plainLyrics: nativePlainLyrics, syncedLyrics: null, instrumental: false } : lrclib;
}
