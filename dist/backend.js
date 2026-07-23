// @bun
// src/subsonic-api.ts
var CLIENT_NAME = "LumiverseSubsonicControls";
var API_VERSION = "1.16.1";
var configs = new Map;
var activeUserId = null;
function setConfig(userId, config) {
  if (config)
    configs.set(userId, config);
  else
    configs.delete(userId);
}
function setActiveUser(userId) {
  activeUserId = userId;
}
function isConnected(userId) {
  return configs.has(userId || activeUserId || "");
}
function getConfig(userId) {
  const config = configs.get(userId || activeUserId || "");
  if (!config)
    throw new Error("Not connected to a Subsonic server");
  return config;
}
function normalizeBaseUrl(value) {
  const url = new URL(value.trim());
  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new Error("Server URL must start with http:// or https://");
  return url.toString().replace(/\/+$/, "");
}
function md5(value) {
  const hasher = new Bun.CryptoHasher("md5");
  hasher.update(value);
  return hasher.digest("hex");
}
function salt() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
function restRoot(serverUrl) {
  const base = normalizeBaseUrl(serverUrl);
  return /\/rest$/i.test(base) ? base : `${base}/rest`;
}
function responseError(payload) {
  const response = payload["subsonic-response"];
  if (!response || response.status === "ok")
    return null;
  const error = response.error || {};
  return new Error(error.message || `Subsonic request failed${error.code ? ` (code ${error.code})` : ""}`);
}
async function request(method, values = {}, userId) {
  const config = getConfig(userId);
  const s = salt();
  const params = new URLSearchParams({
    u: config.username,
    t: md5(config.password + s),
    s,
    v: API_VERSION,
    c: CLIENT_NAME,
    f: "json"
  });
  for (const [key, value] of Object.entries(values))
    if (value !== undefined)
      params.set(key, String(value));
  const result = await spindle.cors(`${restRoot(config.serverUrl)}/${method}.view?${params.toString()}`, { method: "GET" });
  if (result.status < 200 || result.status >= 300)
    throw new Error(`Subsonic ${method} failed (${result.status})`);
  let payload;
  try {
    payload = JSON.parse(result.body);
  } catch {
    throw new Error(`Subsonic ${method} returned invalid JSON`);
  }
  const error = responseError(payload);
  if (error)
    throw error;
  return payload["subsonic-response"];
}
async function artUrl(coverArt, userId) {
  if (!coverArt)
    return null;
  const config = getConfig(userId);
  const s = salt();
  const params = new URLSearchParams({ u: config.username, t: md5(config.password + s), s, v: API_VERSION, c: CLIENT_NAME, id: coverArt });
  return `${restRoot(config.serverUrl)}/getCoverArt.view?${params.toString()}`;
}
function durationMs(entry) {
  return Math.max(0, Number(entry?.duration || 0) * 1000);
}
async function mapTrack(entry, userId) {
  return {
    name: entry?.title || entry?.name || "Unknown track",
    artist: entry?.artist || entry?.artistName || "Unknown artist",
    album: entry?.album || "Unknown album",
    albumArtUrl: await artUrl(entry?.coverArt, userId),
    uri: String(entry?.id || ""),
    durationMs: durationMs(entry)
  };
}
async function mapState(entry, isPlaying, source, positionMs = 0, userId) {
  if (!entry?.id)
    return null;
  const track = await mapTrack(entry, userId);
  return { isPlaying, trackName: track.name, artistName: track.artist, albumName: track.album, albumArtUrl: track.albumArtUrl, progressMs: positionMs, durationMs: track.durationMs, trackUri: track.uri, source };
}
async function ping(userId) {
  await request("ping", {}, userId);
}
async function search(query, userId) {
  const response = await request("search3", { query, songCount: 25, albumCount: 0, artistCount: 0 }, userId);
  const songs = response.searchResult3?.song || [];
  return Promise.all(songs.map((song) => mapTrack(song, userId)));
}
async function getPlaybackState(userId) {
  const config = getConfig(userId);
  if (config.enableJukebox) {
    try {
      const response2 = await request("jukeboxControl", { action: "get" }, userId);
      const status = response2.jukeboxStatus;
      const index = Number(status?.currentIndex);
      const current = status?.playing && Number.isInteger(index) ? status.playlist?.entry?.[index] : null;
      if (current)
        return mapState(current, true, "jukebox", Math.max(0, Number(status.position || 0) * 1000), userId);
    } catch (error) {
      spindle.log.warn(`Jukebox status unavailable: ${error?.message || error}`);
    }
  }
  const response = await request("getNowPlaying", {}, userId);
  const entries = response.nowPlaying?.entry || [];
  const own = entries.find((entry) => entry.username === config.username);
  return own ? mapState(own, true, "now_playing", 0, userId) : null;
}
async function jukebox(action, values = {}, userId) {
  if (!getConfig(userId).enableJukebox)
    throw new Error("Server-side Jukebox is disabled. Enable it in Subsonic Controls settings to use playback controls.");
  await request("jukeboxControl", { action, ...values }, userId);
}
async function play(trackId, userId) {
  if (!trackId)
    return jukebox("start", {}, userId);
  await jukebox("clear", {}, userId);
  await jukebox("add", { id: trackId }, userId);
  await jukebox("start", {}, userId);
}
async function pause(userId) {
  await jukebox("stop", {}, userId);
}
async function next(userId) {
  await jukebox("skip", {}, userId);
}
async function previous(userId) {
  await jukebox("previous", {}, userId);
}
async function addToQueue(trackId, userId) {
  await jukebox("add", { id: trackId }, userId);
}
async function getLyrics(trackId, userId) {
  try {
    const response = await request("getLyricsBySongId", { id: trackId }, userId);
    const structured = response.lyricsList?.structuredLyrics?.[0]?.line;
    if (Array.isArray(structured))
      return structured.map((line) => line.value || "").join(`
`).trim() || null;
    const plain = response.lyricsList?.lyrics?.[0]?.value;
    if (typeof plain === "string" && plain.trim())
      return plain;
  } catch {}
  try {
    const song = (await request("getSong", { id: trackId }, userId)).song;
    const response = await request("getLyrics", { artist: song?.artist, title: song?.title }, userId);
    const lyrics = response.lyrics?.value;
    return typeof lyrics === "string" && lyrics.trim() ? lyrics : null;
  } catch {
    return null;
  }
}

// src/backend.ts
var POLL_PLAYING_MS = 5000;
var POLL_IDLE_MS = 15000;
var pollingTimers = new Map;
var stateByUser = new Map;
function send(message, userId) {
  spindle.sendToFrontend(message, userId);
}
async function loadConfig(userId) {
  const stored = await spindle.userStorage.getJson("config.json", { fallback: { serverUrl: "", username: "", enableJukebox: false }, userId });
  const password = await spindle.enclave.get("subsonic_password", userId);
  if (!stored.serverUrl || !stored.username || !password)
    return null;
  return { ...stored, password };
}
async function loadUser(userId) {
  const config = await loadConfig(userId);
  setConfig(userId, config);
  setActiveUser(userId);
  return !!config;
}
async function saveConfig(config, userId) {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
  setConfig(userId, config);
}
function stopPolling(userId) {
  const timer = pollingTimers.get(userId);
  if (timer)
    clearTimeout(timer);
  pollingTimers.delete(userId);
}
async function pushState(userId) {
  if (!isConnected(userId)) {
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const state = await getPlaybackState(userId);
  stateByUser.set(userId, state);
  send({ type: "state", playbackState: state, connected: true }, userId);
  return state;
}
function startPolling(userId) {
  stopPolling(userId);
  const poll = async () => {
    try {
      const state = await pushState(userId);
      const delay = state?.isPlaying ? POLL_PLAYING_MS : POLL_IDLE_MS;
      pollingTimers.set(userId, setTimeout(poll, delay));
    } catch (error) {
      spindle.log.warn(`Subsonic polling failed: ${error?.message || error}`);
      pollingTimers.set(userId, setTimeout(poll, POLL_IDLE_MS));
    }
  };
  poll();
}
async function sendConfig(userId) {
  const config = await loadConfig(userId);
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, enableJukebox: !!config?.enableJukebox, connected: !!config }, userId);
}
async function updateTheme(colors, userId) {
  if (!colors) {
    await spindle.theme.clear(userId).catch(() => {});
    return;
  }
  await spindle.theme.apply({ variables: { "--lumiverse-primary": `hsl(${colors.dominantHsl.h}, ${Math.max(35, colors.dominantHsl.s)}%, ${colors.isLight ? 35 : 55}%)` } }, userId).catch(() => {});
}
spindle.onFrontendMessage(async (raw, userId) => {
  const message = raw;
  try {
    await loadUser(userId);
    switch (message.type) {
      case "get_config":
        await sendConfig(userId);
        break;
      case "get_state":
        await pushState(userId);
        break;
      case "connect": {
        const config = { serverUrl: message.serverUrl, username: message.username, password: message.password, enableJukebox: message.enableJukebox };
        setConfig(userId, config);
        await ping(userId);
        await saveConfig(config, userId);
        send({ type: "connected" }, userId);
        await sendConfig(userId);
        startPolling(userId);
        break;
      }
      case "disconnect":
        stopPolling(userId);
        setConfig(userId, null);
        stateByUser.delete(userId);
        await spindle.userStorage.delete("config.json", userId).catch(() => {});
        await spindle.enclave.delete("subsonic_password", userId);
        await updateTheme(null, userId);
        send({ type: "disconnected" }, userId);
        send({ type: "state", playbackState: null, connected: false }, userId);
        break;
      case "play":
        await play(message.trackUri, userId);
        await pushState(userId);
        break;
      case "pause":
        await pause(userId);
        await pushState(userId);
        break;
      case "next":
        await next(userId);
        await pushState(userId);
        break;
      case "previous":
        await previous(userId);
        await pushState(userId);
        break;
      case "queue":
        await addToQueue(message.trackUri, userId);
        break;
      case "search":
        send({ type: "search_results", results: await search(message.query, userId) }, userId);
        break;
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await getPlaybackState(userId);
        const lyrics = state ? await getLyrics(state.trackUri, userId) : null;
        send({ type: "lyrics", trackUri: state?.trackUri || "", plainLyrics: lyrics, syncedLyrics: null, instrumental: false }, userId);
        break;
      }
      case "album_colors":
        await updateTheme(message.colors, userId);
        break;
    }
  } catch (error) {
    send({ type: "error", message: error?.message || "Subsonic request failed" }, userId);
  }
});
spindle.log.info("Subsonic Controls loaded");
