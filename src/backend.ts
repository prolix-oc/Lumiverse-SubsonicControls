declare const spindle: import("lumiverse-spindle-types").SpindleAPI;

import type { AlbumColors, BackendToFrontend, FrontendToBackend, MessageSongEntry, PlaybackState, SongSnapshot, SubsonicConfig } from "./types";
import * as subsonic from "./subsonic-api";

type StoredConfig = Omit<SubsonicConfig, "password">;
const POLL_PLAYING_MS = 5_000;
const POLL_IDLE_MS = 15_000;
const pollingTimers = new Map<string, ReturnType<typeof setTimeout>>();
const stateByUser = new Map<string, PlaybackState | null>();
const jukeboxUnavailableReasons = new Map<string, string>();
const jukeboxAvailabilityChecked = new Set<string>();

function send(message: BackendToFrontend, userId: string): void { spindle.sendToFrontend(message, userId); }

async function loadConfig(userId: string): Promise<SubsonicConfig | null> {
  const stored = await spindle.userStorage.getJson("config.json", { fallback: { serverUrl: "", username: "", enableJukebox: false }, userId }) as StoredConfig;
  const password = await spindle.enclave.get("subsonic_password", userId);
  if (!stored.serverUrl || !stored.username || !password) return null;
  return { ...stored, password };
}

async function loadUser(userId: string): Promise<boolean> {
  const config = await loadConfig(userId);
  subsonic.setConfig(userId, config);
  subsonic.setActiveUser(userId);
  if (config && await verifyConfiguredJukebox(config, userId)) await saveConfig(config, userId);
  return !!config;
}

async function saveConfig(config: SubsonicConfig, userId: string): Promise<void> {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
  subsonic.setConfig(userId, config);
}

/**
 * Jukebox is optional in the Subsonic protocol. Probe it once per server
 * configuration so an unsupported endpoint never turns into repeated 501s.
 */
async function verifyConfiguredJukebox(config: SubsonicConfig, userId: string): Promise<boolean> {
  if (!config.enableJukebox) {
    jukeboxUnavailableReasons.delete(userId);
    return false;
  }
  if (jukeboxAvailabilityChecked.has(userId)) return false;
  try {
    await subsonic.verifyJukebox(userId);
    jukeboxUnavailableReasons.delete(userId);
    jukeboxAvailabilityChecked.add(userId);
    return false;
  } catch (error: any) {
    if (!subsonic.isJukeboxUnavailableError(error)) throw error;
    config.enableJukebox = false;
    jukeboxUnavailableReasons.set(userId, error.message);
    jukeboxAvailabilityChecked.add(userId);
    spindle.log.warn(`Jukebox disabled for ${userId}: ${error.message}`);
    return true;
  }
}

function stopPolling(userId: string): void {
  const timer = pollingTimers.get(userId);
  if (timer) clearTimeout(timer);
  pollingTimers.delete(userId);
}

async function pushState(userId: string): Promise<PlaybackState | null> {
  if (!subsonic.isConnected(userId)) {
    pushPlaybackMacros(null);
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const state = await subsonic.getPlaybackState(userId);
  stateByUser.set(userId, state);
  pushPlaybackMacros(state);
  send({ type: "state", playbackState: state, connected: true }, userId);
  return state;
}

function startPolling(userId: string): void {
  stopPolling(userId);
  const poll = async () => {
    try {
      const state = await pushState(userId);
      const delay = state?.isPlaying ? POLL_PLAYING_MS : POLL_IDLE_MS;
      pollingTimers.set(userId, setTimeout(poll, delay));
    } catch (error: any) {
      spindle.log.warn(`Subsonic polling failed: ${error?.message || error}`);
      pollingTimers.set(userId, setTimeout(poll, POLL_IDLE_MS));
    }
  };
  void poll();
}

async function sendConfig(userId: string): Promise<void> {
  const config = await loadConfig(userId);
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, enableJukebox: !!config?.enableJukebox, jukeboxUnavailableReason: jukeboxUnavailableReasons.get(userId) || null, connected: !!config }, userId);
}

async function updateTheme(colors: AlbumColors | null, userId: string): Promise<void> {
  if (!colors) {
    await (spindle.theme as typeof spindle.theme & { clear(targetUserId?: string): Promise<void> }).clear(userId).catch(() => {});
    return;
  }
  await spindle.theme.apply({ variables: { "--lumiverse-primary": `hsl(${colors.dominantHsl.h}, ${Math.max(35, colors.dominantHsl.s)}%, ${colors.isLight ? 35 : 55}%)` } }, userId).catch(() => {});
}

spindle.onFrontendMessage(async (raw, userId) => {
  const message = raw as FrontendToBackend;
  try {
    await loadUser(userId);
    switch (message.type) {
      case "get_config": await sendConfig(userId); break;
      case "get_state": await pushState(userId); break;
      case "connect": {
        const config: SubsonicConfig = { serverUrl: message.serverUrl, username: message.username, password: message.password, enableJukebox: message.enableJukebox };
        subsonic.setConfig(userId, config);
        await subsonic.ping(userId);
        jukeboxAvailabilityChecked.delete(userId);
        await verifyConfiguredJukebox(config, userId);
        await saveConfig(config, userId);
        send({ type: "connected" }, userId);
        await sendConfig(userId);
        startPolling(userId);
        break;
      }
      case "disconnect":
        stopPolling(userId);
        subsonic.setConfig(userId, null);
        stateByUser.delete(userId);
        jukeboxUnavailableReasons.delete(userId);
        jukeboxAvailabilityChecked.delete(userId);
        pushPlaybackMacros(null);
        await spindle.userStorage.delete("config.json", userId).catch(() => {});
        await spindle.enclave.delete("subsonic_password", userId);
        await updateTheme(null, userId);
        send({ type: "disconnected" }, userId);
        send({ type: "state", playbackState: null, connected: false }, userId);
        break;
      case "play": await subsonic.play(message.trackUri, userId); await pushState(userId); break;
      case "pause": await subsonic.pause(userId); await pushState(userId); break;
      case "next": await subsonic.next(userId); await pushState(userId); break;
      case "previous": await subsonic.previous(userId); await pushState(userId); break;
      case "queue": await subsonic.addToQueue(message.trackUri, userId); break;
      case "search": send({ type: "search_results", results: await subsonic.search(message.query, userId) }, userId); break;
      case "get_chat_songs": await sendChatSongs(message.chatId, userId); break;
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await subsonic.getPlaybackState(userId);
        const lyrics = state ? await subsonic.getLyrics(state.trackUri, userId) : null;
        send({
          type: "lyrics",
          trackUri: state?.trackUri || "",
          plainLyrics: lyrics?.plainLyrics || null,
          syncedLyrics: lyrics?.syncedLyrics || null,
          instrumental: !!lyrics?.instrumental,
        }, userId);
        break;
      }
      case "album_colors": await updateTheme(message.colors, userId); break;
    }
  } catch (error: any) {
    send({ type: "error", message: error?.message || "Subsonic request failed" }, userId);
  }
});

spindle.log.info("Subsonic Controls loaded");

// ─── Per-swipe song snapshots ────────────────────────────────────────────

const SONG_META_KEY = "subsonic_song";
const pendingGenerationSongs = new Map<string, { snapshot: SongSnapshot; userId: string }>();

type ChatMessage = {
  id?: string;
  is_user?: boolean;
  name?: string;
  swipe_id?: number;
  extra?: { spindle_metadata?: Record<string, unknown> };
  metadata?: Record<string, unknown>;
};

function buildSongSnapshot(state: PlaybackState | null): SongSnapshot | null {
  if (!state?.trackUri || !state.trackName) return null;
  return { trackName: state.trackName, artistName: state.artistName, albumName: state.albumName, albumArtUrl: state.albumArtUrl, trackUri: state.trackUri, isPlaying: state.isPlaying, capturedAt: Date.now() };
}

async function snapshotForUser(userId: string): Promise<SongSnapshot | null> {
  const cached = stateByUser.get(userId);
  const state = cached || await subsonic.getPlaybackState(userId).catch(() => null);
  return buildSongSnapshot(state);
}

function readSongMetadata(message: ChatMessage): Record<string, unknown> {
  return { ...(message.metadata || message.extra?.spindle_metadata || {}) };
}

function readSnapshots(message: ChatMessage): Record<number, SongSnapshot> {
  const node = readSongMetadata(message)[SONG_META_KEY] as { bySwipe?: Record<string, SongSnapshot> } | undefined;
  if (!node?.bySwipe) return {};
  return Object.fromEntries(Object.entries(node.bySwipe).filter(([swipeId, snapshot]) => Number.isInteger(Number(swipeId)) && !!snapshot).map(([swipeId, snapshot]) => [Number(swipeId), snapshot]));
}

async function persistSnapshot(chatId: string, messageId: string, swipeId: number, snapshot: SongSnapshot, userId: string): Promise<void> {
  const messages = await spindle.chat.getMessages(chatId) as unknown as ChatMessage[];
  const message = messages.find((candidate) => candidate.id === messageId);
  if (!message || message.is_user || message.name === "System") return;
  const targetSwipeId = message.swipe_id ?? swipeId;
  const metadata = readSongMetadata(message);
  metadata[SONG_META_KEY] = { bySwipe: { ...readSnapshots(message), [targetSwipeId]: snapshot } };
  await spindle.chat.updateMessage(chatId, messageId, { metadata, skipChunkRebuild: true });
  send({ type: "message_song", chatId, messageId, swipeId: targetSwipeId, snapshot }, userId);
}

async function sendChatSongs(chatId: string, userId: string): Promise<void> {
  const messages = await spindle.chat.getMessages(chatId) as unknown as ChatMessage[];
  const entries: MessageSongEntry[] = messages.flatMap((message) => {
    if (!message.id || message.is_user) return [];
    const bySwipe = readSnapshots(message);
    return Object.keys(bySwipe).length ? [{ messageId: message.id, activeSwipe: message.swipe_id || 0, bySwipe }] : [];
  });
  send({ type: "chat_songs", chatId, entries }, userId);
}

function onGenerationStarted(payload: unknown, userId?: string): void {
  const generationId = (payload as { generationId?: string }).generationId;
  if (!generationId || !userId) return;
  void snapshotForUser(userId).then((snapshot) => { if (snapshot) pendingGenerationSongs.set(generationId, { snapshot, userId }); });
}

function onGenerationEnded(payload: unknown): void {
  const event = payload as { generationId?: string; chatId?: string; messageId?: string; error?: string };
  const pending = event.generationId ? pendingGenerationSongs.get(event.generationId) : null;
  if (event.generationId) pendingGenerationSongs.delete(event.generationId);
  if (!pending || event.error || !event.chatId || !event.messageId) return;
  void persistSnapshot(event.chatId, event.messageId, 0, pending.snapshot, pending.userId).catch((error) => spindle.log.warn(`Song snapshot failed: ${error?.message || error}`));
}

let generationUnsubscribers: Array<() => void> = [];
function setupGenerationCapture(): void {
  for (const unsubscribe of generationUnsubscribers) unsubscribe();
  generationUnsubscribers = [];
  try {
    generationUnsubscribers.push(spindle.on("GENERATION_STARTED", onGenerationStarted));
    generationUnsubscribers.push(spindle.on("GENERATION_ENDED", onGenerationEnded));
  } catch (error: any) {
    spindle.log.warn(`Song snapshot subscription failed: ${error?.message || error}`);
  }
}
setupGenerationCapture();
spindle.permissions.onChanged(({ permission, granted }) => {
  if (permission === "generation" && granted) setupGenerationCapture();
});

// ─── Macros ──────────────────────────────────────────────────────────────

async function getMacroPlaybackState(): Promise<PlaybackState | null> {
  return subsonic.isConnected() ? subsonic.getPlaybackState().catch(() => null) : null;
}

spindle.registerMacro({
  name: "subsonic_now_playing",
  category: "extension:subsonic_controls",
  description: "Returns the currently playing Subsonic track",
  returnType: "string",
  handler: (async () => {
    const state = await getMacroPlaybackState();
    return state ? `${state.trackName} by ${state.artistName}` : "Nothing playing";
  }) as any,
});

spindle.registerMacro({
  name: "subsonic_track_name",
  category: "extension:subsonic_controls",
  description: "Returns the track name of the currently playing Subsonic track",
  returnType: "string",
  handler: (async () => (await getMacroPlaybackState())?.trackName || "") as any,
});

spindle.registerMacro({
  name: "subsonic_artists",
  category: "extension:subsonic_controls",
  description: "Returns the artist of the currently playing Subsonic track",
  returnType: "string",
  handler: (async () => (await getMacroPlaybackState())?.artistName || "") as any,
});

spindle.registerMacro({
  name: "subsonic_album_name",
  category: "extension:subsonic_controls",
  description: "Returns the album name of the currently playing Subsonic track",
  returnType: "string",
  handler: (async () => (await getMacroPlaybackState())?.albumName || "") as any,
});

spindle.registerMacro({
  name: "subsonic_album_art",
  category: "extension:subsonic_controls",
  description: "Returns the URL of the currently playing Subsonic track's album art",
  returnType: "string",
  handler: (async () => (await getMacroPlaybackState())?.albumArtUrl || "") as any,
});

spindle.registerMacro({
  name: "subsonic_is_playing",
  category: "extension:subsonic_controls",
  description: "Returns whether Subsonic is currently playing a track",
  returnType: "boolean",
  volatile: true,
  handler: (async () => (await getMacroPlaybackState())?.isPlaying ?? false) as any,
});

spindle.registerMacro({
  name: "subsonic_lyrics",
  category: "extension:subsonic_controls",
  description: "Returns the lyrics of the currently playing Subsonic track",
  returnType: "string",
  handler: (async () => {
    const state = await getMacroPlaybackState();
    const lyrics = state ? await subsonic.getLyrics(state.trackUri).catch(() => null) : null;
    if (!lyrics) return "No lyrics available";
    if (lyrics.instrumental) return "[Instrumental]";
    return lyrics.plainLyrics || "No lyrics available";
  }) as any,
});

spindle.registerMacro({
  name: "subsonic_has_lyrics",
  category: "extension:subsonic_controls",
  description: "Returns whether the currently playing Subsonic track has lyrics available",
  returnType: "boolean",
  handler: (async () => {
    const state = await getMacroPlaybackState();
    const lyrics = state ? await subsonic.getLyrics(state.trackUri).catch(() => null) : null;
    return !!lyrics && !lyrics.instrumental && !!(lyrics.syncedLyrics || lyrics.plainLyrics);
  }) as any,
});

function pushPlaybackMacros(state: PlaybackState | null): void {
  if (!state) {
    spindle.updateMacroValue("subsonic_now_playing", "Nothing playing");
    spindle.updateMacroValue("subsonic_track_name", "");
    spindle.updateMacroValue("subsonic_artists", "");
    spindle.updateMacroValue("subsonic_album_name", "");
    spindle.updateMacroValue("subsonic_album_art", "");
    spindle.updateMacroValue("subsonic_is_playing", "false");
    return;
  }
  spindle.updateMacroValue("subsonic_now_playing", `${state.trackName} by ${state.artistName}`);
  spindle.updateMacroValue("subsonic_track_name", state.trackName);
  spindle.updateMacroValue("subsonic_artists", state.artistName);
  spindle.updateMacroValue("subsonic_album_name", state.albumName);
  spindle.updateMacroValue("subsonic_album_art", state.albumArtUrl || "");
  spindle.updateMacroValue("subsonic_is_playing", String(state.isPlaying));
}
