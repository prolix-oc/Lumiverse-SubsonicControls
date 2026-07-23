declare const spindle: import("lumiverse-spindle-types").SpindleAPI;

import type { AlbumColors, BackendToFrontend, FrontendToBackend, PlaybackState, SubsonicConfig } from "./types";
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
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await subsonic.getPlaybackState(userId);
        const lyrics = state ? await subsonic.getLyrics(state.trackUri, userId) : null;
        send({ type: "lyrics", trackUri: state?.trackUri || "", plainLyrics: lyrics, syncedLyrics: null, instrumental: false }, userId);
        break;
      }
      case "album_colors": await updateTheme(message.colors, userId); break;
    }
  } catch (error: any) {
    send({ type: "error", message: error?.message || "Subsonic request failed" }, userId);
  }
});

spindle.log.info("Subsonic Controls loaded");

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
    return state ? await subsonic.getLyrics(state.trackUri).catch(() => null) || "No lyrics available" : "No lyrics available";
  }) as any,
});

spindle.registerMacro({
  name: "subsonic_has_lyrics",
  category: "extension:subsonic_controls",
  description: "Returns whether the currently playing Subsonic track has lyrics available",
  returnType: "boolean",
  handler: (async () => {
    const state = await getMacroPlaybackState();
    return !!(state && await subsonic.getLyrics(state.trackUri).catch(() => null));
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
