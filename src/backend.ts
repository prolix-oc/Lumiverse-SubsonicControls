declare const spindle: import("lumiverse-spindle-types").SpindleAPI;

import type { AlbumColors, BackendToFrontend, FrontendToBackend, PlaybackState, SubsonicConfig } from "./types";
import * as subsonic from "./subsonic-api";

type StoredConfig = Omit<SubsonicConfig, "password">;
const POLL_PLAYING_MS = 5_000;
const POLL_IDLE_MS = 15_000;
const pollingTimers = new Map<string, ReturnType<typeof setTimeout>>();
const stateByUser = new Map<string, PlaybackState | null>();

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
  return !!config;
}

async function saveConfig(config: SubsonicConfig, userId: string): Promise<void> {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
  subsonic.setConfig(userId, config);
}

function stopPolling(userId: string): void {
  const timer = pollingTimers.get(userId);
  if (timer) clearTimeout(timer);
  pollingTimers.delete(userId);
}

async function pushState(userId: string): Promise<PlaybackState | null> {
  if (!subsonic.isConnected(userId)) {
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const state = await subsonic.getPlaybackState(userId);
  stateByUser.set(userId, state);
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
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, enableJukebox: !!config?.enableJukebox, connected: !!config }, userId);
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
