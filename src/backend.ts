declare const spindle: import("lumiverse-spindle-types").SpindleAPI;

import type { AlbumColors, AlbumPalette, BackendToFrontend, FrontendToBackend, MessageSongEntry, PlaybackState, SongSnapshot, SubsonicConfig } from "./types";
import * as subsonic from "./subsonic-api";
import { FeishinRemoteClient } from "./feishin-remote";
import {
  createLyricsRequestCoordinator,
  type LyricsRequestCoordinator,
  type LyricsRequestTrack,
} from "./lyrics-request-coordinator";

type StoredConfig = Omit<SubsonicConfig, "password" | "feishinPassword">;
const POLL_PLAYING_MS = 1_000;
const POLL_IDLE_MS = 1_000;
const DEFAULT_PLAYBACK_POSITION_OFFSET_MS = 1_000;
const MIN_PLAYBACK_POSITION_OFFSET_MS = -10_000;
const MAX_PLAYBACK_POSITION_OFFSET_MS = 10_000;
const ALBUM_PALETTE_CACHE_STORAGE_KEY = "album-palette-cache.json";
const ALBUM_PALETTE_CACHE_LIMIT = 48;
const pollingTimers = new Map<string, ReturnType<typeof setTimeout>>();
const pollingUsers = new Set<string>();
const stateByUser = new Map<string, PlaybackState | null>();
const stateObservedAt = new Map<string, number>();
// More than one caller can ask for state at once (the poller, initial UI
// hydration, and an explicit refresh). An older request must never overwrite
// the canonical position from a newer response after a track transition.
const stateRequestSequences = new Map<string, number>();
const lyricsRequestsByUser = new Map<string, LyricsRequestCoordinator<subsonic.LyricsData>>();
const jukeboxUnavailableReasons = new Map<string, string>();
const jukeboxAvailabilityChecked = new Set<string>();
const feishinClients = new Map<string, FeishinRemoteClient>();
const albumPaletteCaches = new Map<string, { serverUrl: string; entries: Record<string, AlbumColors> }>();
const activeAlbumPaletteKeys = new Map<string, string>();
let activeUserId: string | null = null;

function send(message: BackendToFrontend, userId: string): void { spindle.sendToFrontend(message, userId); }

function stopFeishin(userId: string): void {
  feishinClients.get(userId)?.disconnect();
  feishinClients.delete(userId);
}

async function updateFeishinState(userId: string, state: PlaybackState | null): Promise<void> {
  const previousState = stateByUser.get(userId);
  stateByUser.set(userId, state);
  stateObservedAt.set(userId, Date.now());
  pushPlaybackMacros(state);
  syncLyricsForTrackChange(userId, previousState?.trackUri ?? null, state);
  const config = await loadConfig(userId);
  const albumPalette = config ? await restoreAlbumPalette(state, config, userId) : null;
  send({ type: "state", playbackState: state, connected: subsonic.isConnected(userId), albumPalette }, userId);
}

function startFeishin(config: SubsonicConfig, userId: string): void {
  stopFeishin(userId);
  if (config.remoteControl !== "feishin" || !config.feishinUrl) return;
  const client = new FeishinRemoteClient(
    (state) => { void updateFeishinState(userId, state); },
    (message) => spindle.log.warn(`Feishin Remote (${userId}): ${message}`),
  );
  feishinClients.set(userId, client);
  try {
    client.connect(config.feishinUrl, config.feishinUsername, config.feishinPassword);
  } catch (error: any) {
    spindle.log.warn(`Feishin Remote (${userId}) could not start: ${error?.message || error}`);
  }
}

async function loadConfig(userId: string): Promise<SubsonicConfig | null> {
  const stored = await spindle.userStorage.getJson("config.json", { fallback: { serverUrl: "", username: "", enableJukebox: false, remoteControl: "none", feishinUrl: "", feishinUsername: "", playbackPositionOffsetMs: DEFAULT_PLAYBACK_POSITION_OFFSET_MS }, userId }) as StoredConfig;
  const password = await spindle.enclave.get("subsonic_password", userId);
  const feishinPassword = await spindle.enclave.get("feishin_password", userId);
  if (!stored.serverUrl || !stored.username || !password) return null;
  const remoteControl = stored.remoteControl === "feishin" || stored.remoteControl === "jukebox" ? stored.remoteControl : stored.enableJukebox ? "jukebox" : "none";
  return { ...stored, remoteControl, enableJukebox: remoteControl === "jukebox", feishinUrl: stored.feishinUrl || "", feishinUsername: stored.feishinUsername || "", playbackPositionOffsetMs: normalizePlaybackPositionOffset(stored.playbackPositionOffsetMs), password, feishinPassword: feishinPassword || "" };
}

function normalizePlaybackPositionOffset(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return DEFAULT_PLAYBACK_POSITION_OFFSET_MS;
  return Math.max(MIN_PLAYBACK_POSITION_OFFSET_MS, Math.min(MAX_PLAYBACK_POSITION_OFFSET_MS, Math.round(numeric)));
}

function isAlbumColors(value: unknown): value is AlbumColors {
  if (!value || typeof value !== "object") return false;
  const colors = value as AlbumColors;
  return [
    colors.dominant?.r, colors.dominant?.g, colors.dominant?.b,
    colors.dominantHsl?.h, colors.dominantHsl?.s, colors.dominantHsl?.l,
  ].every((component) => typeof component === "number" && Number.isFinite(component))
    && typeof colors.isLight === "boolean";
}

async function getAlbumPaletteCache(config: SubsonicConfig, userId: string): Promise<{ serverUrl: string; entries: Record<string, AlbumColors> }> {
  const cached = albumPaletteCaches.get(userId);
  if (cached?.serverUrl === config.serverUrl) return cached;

  const stored = await spindle.userStorage.getJson(ALBUM_PALETTE_CACHE_STORAGE_KEY, {
    fallback: { serverUrl: "", entries: {} },
    userId,
  }) as { serverUrl?: unknown; entries?: unknown };
  const entries: Record<string, AlbumColors> = {};
  if (stored.serverUrl === config.serverUrl && stored.entries && typeof stored.entries === "object") {
    for (const [artworkKey, colors] of Object.entries(stored.entries)) {
      if (isAlbumColors(colors)) entries[artworkKey] = colors;
    }
  }
  const next = { serverUrl: config.serverUrl, entries };
  albumPaletteCaches.set(userId, next);
  return next;
}

function paletteKey(config: SubsonicConfig, artworkKey: string): string {
  return `${config.serverUrl}\u0000${artworkKey}`;
}

async function saveAlbumPalette(config: SubsonicConfig, artworkKey: string, colors: AlbumColors, userId: string): Promise<void> {
  const cache = await getAlbumPaletteCache(config, userId);
  // Reinsert existing entries to keep recently used palettes while bounding
  // disk use for long-lived music libraries.
  delete cache.entries[artworkKey];
  cache.entries[artworkKey] = colors;
  while (Object.keys(cache.entries).length > ALBUM_PALETTE_CACHE_LIMIT) {
    const oldestKey = Object.keys(cache.entries)[0];
    delete cache.entries[oldestKey];
  }
  await spindle.userStorage.setJson(ALBUM_PALETTE_CACHE_STORAGE_KEY, cache, { userId });
}

async function restoreAlbumPalette(state: PlaybackState | null, config: SubsonicConfig, userId: string): Promise<AlbumPalette | null> {
  const artworkKey = state?.albumArtKey;
  if (!artworkKey) return null;
  const colors = (await getAlbumPaletteCache(config, userId)).entries[artworkKey];
  if (!colors) return null;

  const key = paletteKey(config, artworkKey);
  if (activeAlbumPaletteKeys.get(userId) !== key) {
    try {
      await spindle.theme.applyPalette({ accent: colors.dominantHsl }, userId);
      activeAlbumPaletteKeys.set(userId, key);
    } catch (error: any) {
      spindle.log.warn(`Album theme restore: ${error?.message || error}`);
    }
  }
  return { artworkKey, colors };
}

async function loadUser(userId: string): Promise<boolean> {
  const config = await loadConfig(userId);
  subsonic.setConfig(userId, config);
  subsonic.setActiveUser(userId);
  activeUserId = userId;
  if (config && await verifyConfiguredJukebox(config, userId)) await saveConfig(config, userId);
  return !!config;
}

function lyricsRequests(userId: string): LyricsRequestCoordinator<subsonic.LyricsData> {
  let requests = lyricsRequestsByUser.get(userId);
  if (!requests) {
    requests = createLyricsRequestCoordinator((track) => subsonic.getLyrics(track.trackUri, userId));
    lyricsRequestsByUser.set(userId, requests);
  }
  return requests;
}

function buildLyricsRequestTrack(state: PlaybackState): LyricsRequestTrack {
  return {
    trackUri: state.trackUri,
    trackName: state.trackName,
    artistName: state.artistName,
    albumName: state.albumName,
    durationMs: state.durationMs,
  };
}

async function getLyricsForState(state: PlaybackState, userId: string): Promise<subsonic.LyricsData | null> {
  const lyrics = await lyricsRequests(userId).get(buildLyricsRequestTrack(state));
  if (stateByUser.get(userId)?.trackUri === state.trackUri) pushLyricsMacros(lyrics);
  return lyrics;
}

function syncLyricsForTrackChange(userId: string, previousTrackUri: string | null, state: PlaybackState | null): void {
  const trackUri = state?.trackUri ?? null;
  if (trackUri === previousTrackUri) return;
  if (!state || !trackUri) {
    pushLyricsMacros(null);
    return;
  }

  const cached = lyricsRequests(userId).peek(trackUri);
  if (cached !== undefined) {
    pushLyricsMacros(cached);
    return;
  }
  // The macro cache is immediately correct for the new track, while the
  // lyric document is fetched once in the background for all consumers.
  pushLyricsMacros(null);
  void getLyricsForState(state, userId);
}

async function saveConfig(config: SubsonicConfig, userId: string): Promise<void> {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox, remoteControl: config.remoteControl, feishinUrl: config.feishinUrl, feishinUsername: config.feishinUsername, playbackPositionOffsetMs: normalizePlaybackPositionOffset(config.playbackPositionOffsetMs) }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
  await spindle.enclave.put("feishin_password", config.feishinPassword, userId);
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
    config.remoteControl = "none";
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
  pollingUsers.delete(userId);
}

async function pushState(userId: string): Promise<PlaybackState | null> {
  const requestSequence = (stateRequestSequences.get(userId) || 0) + 1;
  stateRequestSequences.set(userId, requestSequence);
  const config = await loadConfig(userId);
  if (stateRequestSequences.get(userId) !== requestSequence) {
    return stateByUser.get(userId) || null;
  }
  if (!config) {
    pushPlaybackMacros(null);
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  if (config?.remoteControl === "feishin") {
    const state = stateByUser.get(userId) || null;
    pushPlaybackMacros(state);
    const albumPalette = await restoreAlbumPalette(state, config, userId);
    send({ type: "state", playbackState: state, connected: true, albumPalette }, userId);
    return state;
  }
  if (!subsonic.isConnected(userId)) {
    pushPlaybackMacros(null);
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const fetchedState = await subsonic.getPlaybackState(userId);
  if (stateRequestSequences.get(userId) !== requestSequence) {
    // A later request is already authoritative. Returning the cached state
    // also keeps callers from rendering an out-of-order track transition.
    return stateByUser.get(userId) || null;
  }
  const previousState = stateByUser.get(userId);
  const previousObservedAt = stateObservedAt.get(userId) || Date.now();
  const now = Date.now();
  const canonicalState = fetchedState?.positionKnown
    ? {
      ...fetchedState,
      progressMs: Math.min(
        Math.max(0, fetchedState.progressMs + normalizePlaybackPositionOffset(config?.playbackPositionOffsetMs)),
        fetchedState.durationMs || Infinity,
      ),
    }
    : fetchedState;
  // A server-reported position is canonical, especially on a track change.
  // Only classic entries with no position at all use the local monotonic
  // clock, and never across track URIs.
  const state = canonicalState && !canonicalState.positionKnown && previousState
    && previousState.trackUri === canonicalState.trackUri && previousState.isPlaying && canonicalState.isPlaying
    ? { ...canonicalState, progressMs: Math.min(previousState.progressMs + Math.max(0, now - previousObservedAt), canonicalState.durationMs || Infinity) }
    : canonicalState;
  stateByUser.set(userId, state);
  stateObservedAt.set(userId, now);
  pushPlaybackMacros(state);
  syncLyricsForTrackChange(userId, previousState?.trackUri ?? null, state);
  const albumPalette = await restoreAlbumPalette(state, config, userId);
  send({ type: "state", playbackState: state, connected: true, albumPalette }, userId);
  return state;
}

function startPolling(userId: string): void {
  // A saved connection is restored by get_state rather than the Connect
  // action. Keep exactly one loop per user so restored sessions continue to
  // receive track changes instead of showing only their initial snapshot.
  if (pollingUsers.has(userId)) return;
  pollingUsers.add(userId);
  const poll = async () => {
    try {
      const state = await pushState(userId);
      if (!pollingUsers.has(userId)) return;
      const delay = state?.isPlaying ? POLL_PLAYING_MS : POLL_IDLE_MS;
      pollingTimers.set(userId, setTimeout(poll, delay));
    } catch (error: any) {
      spindle.log.warn(`Subsonic polling failed: ${error?.message || error}`);
      if (!pollingUsers.has(userId)) return;
      pollingTimers.set(userId, setTimeout(poll, POLL_IDLE_MS));
    }
  };
  void poll();
}

async function sendConfig(userId: string): Promise<void> {
  const config = await loadConfig(userId);
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, remoteControl: config?.remoteControl || "none", feishinUrl: config?.feishinUrl || "", feishinUsername: config?.feishinUsername || "", hasFeishinPassword: !!config?.feishinPassword, playbackPositionOffsetMs: config?.playbackPositionOffsetMs ?? DEFAULT_PLAYBACK_POSITION_OFFSET_MS, jukeboxUnavailableReason: jukeboxUnavailableReasons.get(userId) || null, connected: !!config }, userId);
}

async function updateTheme(colors: AlbumColors | null, userId: string, artworkKey?: string | null): Promise<void> {
  try {
    if (!colors) {
      await spindle.theme.clear(userId);
      activeAlbumPaletteKeys.delete(userId);
      return;
    }

    const config = await loadConfig(userId);
    const currentArtworkKey = stateByUser.get(userId)?.albumArtKey;
    // A slow image extraction can finish after playback moves on. Do not let
    // that stale palette replace the active track's palette.
    if (artworkKey && currentArtworkKey && artworkKey !== currentArtworkKey) return;

    if (config && artworkKey) {
      await saveAlbumPalette(config, artworkKey, colors, userId);
      const key = paletteKey(config, artworkKey);
      if (activeAlbumPaletteKeys.get(userId) === key) return;
      await spindle.theme.applyPalette({ accent: colors.dominantHsl }, userId);
      activeAlbumPaletteKeys.set(userId, key);
      return;
    }

    // Register the album-derived accent as a host-managed palette rather
    // than a raw CSS override. This lets Lumiverse expose it in the Theme
    // panel and derive mode-aware colors while retaining user preferences.
    await spindle.theme.applyPalette({ accent: colors.dominantHsl }, userId);
  } catch (error: any) {
    spindle.log.warn(`Album theme: ${error?.message || error}`);
  }
}

spindle.onFrontendMessage(async (raw, userId) => {
  const message = raw as FrontendToBackend;
  try {
    await loadUser(userId);
    switch (message.type) {
      case "get_config":
        await sendConfig(userId);
        {
          const config = await loadConfig(userId);
          if (config?.remoteControl === "feishin" && !feishinClients.has(userId)) startFeishin(config, userId);
        }
        // The macro host can resolve templates before the drawer has issued
        // its follow-up get_state request. Prime the push cache as soon as a
        // persisted connection is loaded so track-detail macros are never
        // left blank during that window.
        if (subsonic.isConnected(userId)) {
          await pushState(userId);
          if ((await loadConfig(userId))?.remoteControl !== "feishin") startPolling(userId);
        }
        break;
      case "get_state":
        await pushState(userId);
        if ((await loadConfig(userId))?.remoteControl !== "feishin") startPolling(userId);
        break;
      case "connect": {
        const config: SubsonicConfig = { serverUrl: message.serverUrl, username: message.username, password: message.password, remoteControl: message.remoteControl, enableJukebox: message.remoteControl === "jukebox", feishinUrl: message.feishinUrl, feishinUsername: message.feishinUsername, feishinPassword: message.feishinPassword, playbackPositionOffsetMs: normalizePlaybackPositionOffset(message.playbackPositionOffsetMs) };
        subsonic.setConfig(userId, config);
        await subsonic.ping(userId);
        stateByUser.delete(userId);
        stateObservedAt.delete(userId);
        jukeboxAvailabilityChecked.delete(userId);
        if (config.enableJukebox) await verifyConfiguredJukebox(config, userId);
        await saveConfig(config, userId);
        startFeishin(config, userId);
        send({ type: "connected" }, userId);
        await sendConfig(userId);
        if (config.remoteControl !== "feishin") startPolling(userId);
        break;
      }
      case "set_playback_position_offset": {
        const config = await loadConfig(userId);
        if (!config) break;
        config.playbackPositionOffsetMs = normalizePlaybackPositionOffset(message.playbackPositionOffsetMs);
        await saveConfig(config, userId);
        await sendConfig(userId);
        await pushState(userId);
        break;
      }
      case "disconnect":
        stopPolling(userId);
        stopFeishin(userId);
        subsonic.setConfig(userId, null);
        stateByUser.delete(userId);
        stateObservedAt.delete(userId);
        lyricsRequestsByUser.get(userId)?.clear();
        lyricsRequestsByUser.delete(userId);
        jukeboxUnavailableReasons.delete(userId);
        jukeboxAvailabilityChecked.delete(userId);
        pushPlaybackMacros(null);
        await spindle.userStorage.delete("config.json", userId).catch(() => {});
        await spindle.enclave.delete("subsonic_password", userId);
        await spindle.enclave.delete("feishin_password", userId);
        await updateTheme(null, userId);
        send({ type: "disconnected" }, userId);
        send({ type: "state", playbackState: null, connected: false }, userId);
        break;
      case "feishin_state":
        // Kept for compatibility with frontends built before the Remote client
        // moved to the backend, where encrypted credentials are available.
        await updateFeishinState(userId, message.playbackState);
        break;
      case "play": {
        if ((await loadConfig(userId))?.remoteControl === "feishin") feishinClients.get(userId)?.send("play");
        else { await subsonic.play(message.trackUri, userId); await pushState(userId); }
        break;
      }
      case "pause": {
        if ((await loadConfig(userId))?.remoteControl === "feishin") feishinClients.get(userId)?.send("pause");
        else { await subsonic.pause(userId); await pushState(userId); }
        break;
      }
      case "next": {
        if ((await loadConfig(userId))?.remoteControl === "feishin") feishinClients.get(userId)?.send("next");
        else { await subsonic.next(userId); await pushState(userId); }
        break;
      }
      case "previous": {
        if ((await loadConfig(userId))?.remoteControl === "feishin") feishinClients.get(userId)?.send("previous");
        else { await subsonic.previous(userId); await pushState(userId); }
        break;
      }
      case "queue": await subsonic.addToQueue(message.trackUri, userId); break;
      case "search": send({ type: "search_results", results: await subsonic.search(message.query, userId) }, userId); break;
      case "get_chat_songs": await sendChatSongs(message.chatId, userId); break;
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await pushState(userId);
        const lyrics = state ? await getLyricsForState(state, userId) : null;
        send({
          type: "lyrics",
          trackUri: state?.trackUri || "",
          plainLyrics: lyrics?.plainLyrics || null,
          syncedLyrics: lyrics?.syncedLyrics || null,
          instrumental: !!lyrics?.instrumental,
        }, userId);
        break;
      }
      case "album_colors": await updateTheme(message.colors, userId, message.artworkKey); break;
    }
  } catch (error: any) {
    send({ type: "error", message: error?.message || "Subsonic request failed" }, userId);
  }
});

spindle.log.info("Subsonic Controls loaded");

// ─── Per-swipe song snapshots ────────────────────────────────────────────

const SONG_META_KEY = "subsonic_song";
const PENDING_GENERATION_MAX = 64;
const pendingGenerationSongs = new Map<string, {
  snapshot: Promise<SongSnapshot | null>;
  userId: string;
}>();

type ChatMessage = {
  id?: string;
  is_user?: boolean;
  name?: string;
  swipe_id?: number;
  extra?: { spindle_metadata?: Record<string, unknown> };
  metadata?: Record<string, unknown>;
};

function buildSongSnapshot(state: PlaybackState | null, capturedAt = Date.now()): SongSnapshot | null {
  if (!state?.trackUri || !state.trackName) return null;
  return { trackName: state.trackName, artistName: state.artistName, albumName: state.albumName, albumArtUrl: state.albumArtUrl, trackUri: state.trackUri, isPlaying: state.isPlaying, capturedAt };
}

async function snapshotForUser(userId: string, capturedAt: number): Promise<SongSnapshot | null> {
  // The polling/Feishin cache is both the fastest and the most accurate view
  // of the instant generation began. Only fall back to the server when this
  // extension has not observed a state for the user yet.
  if (stateByUser.has(userId)) return buildSongSnapshot(stateByUser.get(userId) || null, capturedAt);
  await loadUser(userId).catch(() => false);
  return buildSongSnapshot(await subsonic.getPlaybackState(userId).catch(() => null), capturedAt);
}

function readSongMetadata(message: ChatMessage): Record<string, unknown> {
  const metadata = message.metadata;
  if (metadata && typeof metadata === "object") return { ...metadata };
  const spindleMetadata = message.extra?.spindle_metadata;
  return spindleMetadata && typeof spindleMetadata === "object" ? { ...spindleMetadata } : {};
}

function readSnapshots(message: ChatMessage): Record<number, SongSnapshot> {
  const node = readSongMetadata(message)[SONG_META_KEY] as { bySwipe?: Record<string, SongSnapshot> } | undefined;
  if (!node?.bySwipe || typeof node.bySwipe !== "object") return {};
  const snapshots: Record<number, SongSnapshot> = {};
  for (const [swipeId, snapshot] of Object.entries(node.bySwipe)) {
    const index = Number(swipeId);
    if (Number.isInteger(index) && snapshot && typeof snapshot === "object") snapshots[index] = snapshot;
  }
  return snapshots;
}

function isAssistantMessage(message: ChatMessage): boolean {
  return message.is_user === false && message.name !== "System";
}

async function persistSnapshot(chatId: string, messageId: string, swipeId: number, snapshot: SongSnapshot, userId: string): Promise<void> {
  const messages = await spindle.chat.getMessages(chatId) as unknown as ChatMessage[];
  const message = messages.find((candidate) => candidate.id === messageId);
  if (!message || !isAssistantMessage(message)) return;
  const targetSwipeId = message.swipe_id ?? swipeId;
  const metadata = readSongMetadata(message);
  metadata[SONG_META_KEY] = { bySwipe: { ...readSnapshots(message), [targetSwipeId]: snapshot } };
  await spindle.chat.updateMessage(chatId, messageId, { metadata, skipChunkRebuild: true });
  send({ type: "message_song", chatId, messageId, swipeId: targetSwipeId, snapshot }, userId);
}

async function sendChatSongs(chatId: string, userId: string): Promise<void> {
  const messages = await spindle.chat.getMessages(chatId) as unknown as ChatMessage[];
  const entries: MessageSongEntry[] = messages.flatMap((message) => {
    if (!message.id || !isAssistantMessage(message)) return [];
    const bySwipe = readSnapshots(message);
    return Object.keys(bySwipe).length ? [{ messageId: message.id, activeSwipe: message.swipe_id || 0, bySwipe }] : [];
  });
  send({ type: "chat_songs", chatId, entries }, userId);
}

function onGenerationStarted(payload: unknown, userId?: string): void {
  const generationId = (payload as { generationId?: string } | undefined)?.generationId;
  const resolvedUserId = userId || activeUserId;
  if (!generationId || !resolvedUserId) return;

  // Store the promise immediately. The previous port inserted an entry only
  // after its async fallback lookup completed, so a quick reply could end
  // before there was anything to persist.
  if (pendingGenerationSongs.size >= PENDING_GENERATION_MAX) {
    const oldestGenerationId = pendingGenerationSongs.keys().next().value;
    if (oldestGenerationId) pendingGenerationSongs.delete(oldestGenerationId);
  }
  pendingGenerationSongs.set(generationId, {
    snapshot: snapshotForUser(resolvedUserId, Date.now()),
    userId: resolvedUserId,
  });
}

async function onGenerationEnded(payload: unknown): Promise<void> {
  const event = payload as { generationId?: string; chatId?: string; messageId?: string; error?: string } | undefined;
  const generationId = event?.generationId;
  const pending = generationId ? pendingGenerationSongs.get(generationId) : null;
  if (generationId) pendingGenerationSongs.delete(generationId);
  if (!pending || event?.error || !event?.chatId || !event.messageId) return;

  const snapshot = await pending.snapshot.catch(() => null);
  if (!snapshot) return;
  await persistSnapshot(event.chatId, event.messageId, 0, snapshot, pending.userId);
}

let generationUnsubscribers: Array<() => void> = [];
function setupGenerationCapture(): void {
  for (const unsubscribe of generationUnsubscribers) unsubscribe();
  generationUnsubscribers = [];
  try {
    generationUnsubscribers.push(spindle.on("GENERATION_STARTED", onGenerationStarted));
    generationUnsubscribers.push(spindle.on("GENERATION_ENDED", (payload) => {
      void onGenerationEnded(payload).catch((error) => spindle.log.warn(`Song snapshot failed: ${error?.message || error}`));
    }));
  } catch (error: any) {
    spindle.log.warn(`Song snapshot subscription failed: ${error?.message || error}`);
  }
}
setupGenerationCapture();
spindle.permissions.onChanged(({ permission, granted }) => {
  if (permission === "generation" && granted) setupGenerationCapture();
});

// Swipes are indexed. When a swipe is deleted, reindex the persisted snapshots
// so the badge continues to describe the version the user is looking at.
spindle.on("MESSAGE_SWIPED", (payload, userId) => {
  const event = payload as {
    action?: string;
    chatId?: string;
    message?: ChatMessage;
    swipeId?: number;
  } | undefined;
  const message = event?.message;
  const resolvedUserId = userId || activeUserId;
  if (event?.action !== "deleted" || !event.chatId || !message?.id || !isAssistantMessage(message)
    || !Number.isInteger(event.swipeId) || !resolvedUserId) return;
  const chatId = event.chatId;
  const swipeId = event.swipeId as number;
  const messageId = message.id;

  void (async () => {
    const metadata = readSongMetadata(message);
    const snapshots = readSnapshots(message);
    if (!Object.keys(snapshots).length) return;
    const realigned: Record<number, SongSnapshot> = {};
    for (const [index, snapshot] of Object.entries(snapshots)) {
      const numericIndex = Number(index);
      if (numericIndex === swipeId) continue;
      realigned[numericIndex > swipeId ? numericIndex - 1 : numericIndex] = snapshot;
    }
    metadata[SONG_META_KEY] = { bySwipe: realigned };
    await spindle.chat.updateMessage(chatId, messageId, { metadata, skipChunkRebuild: true });
    await sendChatSongs(chatId, resolvedUserId);
  })().catch((error) => spindle.log.warn(`Song snapshot realignment failed: ${error?.message || error}`));
});

// ─── Macros ──────────────────────────────────────────────────────────────

async function getMacroPlaybackState(): Promise<PlaybackState | null> {
  // Prompt assembly must never wait for an HTTP request. `pushState` keeps
  // this fresh every second and also refreshes the host's pushed macro cache.
  const userId = activeUserId;
  return userId ? stateByUser.get(userId) || null : null;
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
    const userId = activeUserId;
    const lyrics = state && userId ? await getLyricsForState(state, userId) : null;
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
    const userId = activeUserId;
    const lyrics = state && userId ? await getLyricsForState(state, userId) : null;
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

function pushLyricsMacros(lyrics: subsonic.LyricsData | null): void {
  if (!lyrics || lyrics.instrumental) {
    spindle.updateMacroValue("subsonic_lyrics", lyrics?.instrumental ? "[Instrumental]" : "No lyrics available");
    spindle.updateMacroValue("subsonic_has_lyrics", "false");
    return;
  }
  spindle.updateMacroValue("subsonic_lyrics", lyrics.plainLyrics || "No lyrics available");
  spindle.updateMacroValue("subsonic_has_lyrics", String(!!(lyrics.syncedLyrics || lyrics.plainLyrics)));
}
