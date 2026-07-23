// @bun
// src/subsonic-api.ts
var CLIENT_NAME = "LumiverseSubsonicControls";
var API_VERSION = "1.16.1";
var configs = new Map;
var coverArtUrls = new Map;
var activeUserId = null;
function setConfig(userId, config) {
  const existing = configs.get(userId);
  const changed = !existing || !config || existing.serverUrl !== config.serverUrl || existing.username !== config.username || existing.password !== config.password;
  if (changed) {
    for (const key of coverArtUrls.keys()) {
      if (key.startsWith(`${userId}\x00`))
        coverArtUrls.delete(key);
    }
  }
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
  if (result.status < 200 || result.status >= 300) {
    if (method === "jukeboxControl" && isJukeboxUnavailableStatus(result.status)) {
      throw new Error(`This server does not implement the optional Subsonic Jukebox endpoint (HTTP ${result.status}).`);
    }
    throw new Error(`Subsonic ${method} failed (${result.status})`);
  }
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
function isJukeboxUnavailableStatus(status) {
  return status === 404 || status === 405 || status === 501;
}
function isJukeboxUnavailableError(error) {
  return error instanceof Error && /optional Subsonic Jukebox endpoint/.test(error.message);
}
async function artUrl(coverArt, userId) {
  if (!coverArt)
    return null;
  const resolvedUserId = userId || activeUserId || "";
  const cacheKey = `${resolvedUserId}\x00${coverArt}`;
  const cached = coverArtUrls.get(cacheKey);
  if (cached)
    return cached;
  const config = getConfig(userId);
  const s = salt();
  const params = new URLSearchParams({ u: config.username, t: md5(config.password + s), s, v: API_VERSION, c: CLIENT_NAME, id: coverArt });
  const url = `${restRoot(config.serverUrl)}/getCoverArt.view?${params.toString()}`;
  coverArtUrls.set(cacheKey, url);
  return url;
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
async function mapState(entry, isPlaying, source, positionMs = 0, userId, positionKnown = true) {
  if (!entry?.id)
    return null;
  const track = await mapTrack(entry, userId);
  return { isPlaying, trackName: track.name, artistName: track.artist, albumName: track.album, albumArtUrl: track.albumArtUrl, progressMs: positionMs, durationMs: track.durationMs, trackUri: track.uri, positionKnown, source };
}
async function ping(userId) {
  await request("ping", {}, userId);
}
async function verifyJukebox(userId) {
  await request("jukeboxControl", { action: "get" }, userId);
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
  if (!own)
    return null;
  const rawPositionMs = own.positionMs;
  const hasReportedPosition = typeof rawPositionMs === "number" && Number.isFinite(rawPositionMs) || typeof rawPositionMs === "string" && rawPositionMs.trim() !== "" && Number.isFinite(Number(rawPositionMs));
  const reportedPositionMs = hasReportedPosition ? Number(rawPositionMs) : 0;
  const positionKnown = hasReportedPosition && reportedPositionMs >= 0;
  const isPlaying = typeof own.state === "string" ? own.state.toLowerCase() === "playing" : true;
  return mapState(own, isPlaying, "now_playing", positionKnown ? reportedPositionMs : 0, userId, positionKnown);
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
function toLrcTimestamp(startMs) {
  const totalCentiseconds = Math.max(0, Math.round(startMs / 10));
  const minutes = Math.floor(totalCentiseconds / 6000);
  const seconds = Math.floor(totalCentiseconds % 6000 / 100);
  const centiseconds = totalCentiseconds % 100;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(centiseconds).padStart(2, "0")}`;
}
function parseStructuredLyrics(lines) {
  if (!Array.isArray(lines))
    return null;
  const parsed = lines.map((line) => ({ start: Number(line?.start), value: typeof line?.value === "string" ? line.value.trim() : "" })).filter((line) => Number.isFinite(line.start));
  if (parsed.length === 0)
    return null;
  const plainLyrics = parsed.map((line) => line.value).filter(Boolean).join(`
`).trim() || null;
  const syncedLyrics = parsed.map((line) => `[${toLrcTimestamp(line.start)}]${line.value}`).join(`
`);
  return { plainLyrics, syncedLyrics, instrumental: false };
}
async function getLrclibLyrics(song) {
  const title = typeof song?.title === "string" ? song.title.trim() : "";
  const artist = typeof song?.artist === "string" ? song.artist.trim() : "";
  if (!title || !artist)
    return null;
  const params = new URLSearchParams({ track_name: title, artist_name: artist });
  if (typeof song?.album === "string" && song.album.trim())
    params.set("album_name", song.album.trim());
  const duration = Number(song?.duration);
  if (Number.isFinite(duration) && duration > 0)
    params.set("duration", String(Math.round(duration)));
  try {
    const result = await spindle.cors(`https://lrclib.net/api/get?${params.toString()}`, { method: "GET" });
    if (result.status !== 200)
      return null;
    const data = JSON.parse(result.body);
    const plainLyrics = typeof data.plainLyrics === "string" && data.plainLyrics.trim() ? data.plainLyrics : null;
    const syncedLyrics = typeof data.syncedLyrics === "string" && data.syncedLyrics.trim() ? data.syncedLyrics : null;
    return plainLyrics || syncedLyrics || data.instrumental === true ? { plainLyrics, syncedLyrics, instrumental: data.instrumental === true } : null;
  } catch {
    return null;
  }
}
async function getLyrics(trackId, userId) {
  let song = null;
  let nativePlainLyrics = null;
  try {
    const response = await request("getLyricsBySongId", { id: trackId }, userId);
    const structured = parseStructuredLyrics(response.lyricsList?.structuredLyrics?.[0]?.line);
    if (structured?.syncedLyrics)
      return structured;
    const plain = response.lyricsList?.lyrics?.[0]?.value;
    if (typeof plain === "string" && plain.trim())
      nativePlainLyrics = plain;
  } catch {}
  try {
    song = (await request("getSong", { id: trackId }, userId)).song;
    const response = await request("getLyrics", { artist: song?.artist, title: song?.title }, userId);
    const lyrics = response.lyrics?.value;
    if (!nativePlainLyrics && typeof lyrics === "string" && lyrics.trim())
      nativePlainLyrics = lyrics;
  } catch {}
  const lrclib = song ? await getLrclibLyrics(song) : null;
  if (lrclib?.syncedLyrics)
    return { ...lrclib, plainLyrics: nativePlainLyrics || lrclib.plainLyrics };
  return nativePlainLyrics ? { plainLyrics: nativePlainLyrics, syncedLyrics: null, instrumental: false } : lrclib;
}

// src/feishin-remote.ts
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function text(value, fallback = "") {
  return typeof value === "string" ? value : fallback;
}
function number(value, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function webSocketUrl(value) {
  const url = new URL(value.includes("://") ? value : `http://${value}`);
  if (url.protocol === "http:")
    url.protocol = "ws:";
  else if (url.protocol === "https:")
    url.protocol = "wss:";
  if (url.protocol !== "ws:" && url.protocol !== "wss:")
    throw new Error("Feishin Remote URL must use HTTP, HTTPS, WS, or WSS.");
  return url.toString();
}

class FeishinRemoteClient {
  onState;
  onError;
  socket = null;
  state = null;
  status = "stopped";
  positionSeconds = 0;
  volume = null;
  reconnectTimer = null;
  reconnectAttempt = 0;
  stopped = true;
  lastPublishedAt = 0;
  publishTimer = null;
  config = null;
  constructor(onState, onError) {
    this.onState = onState;
    this.onError = onError;
  }
  connect(url, username, password) {
    const normalizedUrl = webSocketUrl(url);
    if (this.config?.url === normalizedUrl && this.socket?.readyState === WebSocket.OPEN)
      return;
    this.disconnect(false);
    this.stopped = false;
    this.config = { url: normalizedUrl, username, password };
    this.reconnectAttempt = 0;
    this.open();
  }
  disconnect(clear = true) {
    this.stopped = true;
    if (this.reconnectTimer)
      clearTimeout(this.reconnectTimer);
    this.reconnectTimer = null;
    if (this.publishTimer)
      clearTimeout(this.publishTimer);
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
  send(event, data = {}) {
    if (this.socket?.readyState !== WebSocket.OPEN)
      return this.onError("Feishin Remote is not connected.");
    this.socket.send(JSON.stringify({ event, ...data }));
  }
  open() {
    const config = this.config;
    if (!config || this.stopped)
      return;
    try {
      const socket = new WebSocket(config.url);
      this.socket = socket;
      socket.onopen = () => {
        if (socket !== this.socket)
          return;
        this.reconnectAttempt = 0;
        this.onState(this.state, true);
        if (config.username || config.password) {
          socket.send(JSON.stringify({ event: "authenticate", header: `Basic ${btoa(`${config.username}:${config.password}`)}` }));
        }
      };
      socket.onmessage = (event) => this.receive(event.data);
      socket.onerror = () => this.onError("Feishin Remote connection failed.");
      socket.onclose = () => {
        if (socket !== this.socket)
          return;
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
  scheduleReconnect() {
    if (this.stopped || !this.config || this.reconnectTimer)
      return;
    const seconds = [2, 4, 8, 16, 30][Math.min(this.reconnectAttempt++, 4)];
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.open();
    }, seconds * 1000);
  }
  receive(raw) {
    try {
      const message = JSON.parse(typeof raw === "string" ? raw : "");
      const event = text(message.event);
      if (event === "error")
        return this.onError(text(message.data, "Feishin Remote error."));
      const data = asRecord(message.data);
      if (event === "state")
        this.replaceState(data);
      else if (event === "song")
        this.setSong(data);
      else if (event === "playback")
        this.status = text(message.data, this.status);
      else if (event === "position")
        this.positionSeconds = number(message.data, this.positionSeconds);
      else if (event === "volume")
        this.volume = number(message.data, this.volume ?? 0);
      else if (event === "proxy" && this.state && typeof message.data === "string")
        this.state = { ...this.state, albumArtUrl: `data:image/jpeg;base64,${message.data}` };
      if (event === "position")
        this.publishSoon();
      else
        this.publish();
    } catch {
      this.onError("Feishin sent an invalid Remote response.");
    }
  }
  replaceState(data) {
    this.status = text(data.status, "stopped");
    this.positionSeconds = number(data.position);
    this.volume = number(data.volume);
    this.setSong(asRecord(data.song), false);
  }
  setSong(song, publish = true) {
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
      deviceName: "Feishin Desktop",
      volume: this.volume
    } : null;
    if (id)
      this.send("proxy");
    if (publish)
      this.publish();
  }
  publish() {
    if (this.publishTimer)
      clearTimeout(this.publishTimer);
    this.publishTimer = null;
    this.lastPublishedAt = Date.now();
    if (this.state)
      this.state = { ...this.state, isPlaying: this.status.toLowerCase() === "playing", progressMs: Math.max(0, this.positionSeconds * 1000), volume: this.volume };
    this.onState(this.state, this.socket?.readyState === WebSocket.OPEN);
  }
  publishSoon() {
    const delay = Math.max(0, 250 - (Date.now() - this.lastPublishedAt));
    if (delay === 0)
      return this.publish();
    if (!this.publishTimer)
      this.publishTimer = setTimeout(() => this.publish(), delay);
  }
}

// src/lyrics-request-coordinator.ts
function createLyricsRequestCoordinator(load, maxEntries = 24) {
  const cache = new Map;
  const pending = new Map;
  let generation = 0;
  function remember(trackUri, data) {
    if (cache.has(trackUri))
      cache.delete(trackUri);
    cache.set(trackUri, data);
    while (cache.size > maxEntries) {
      const oldestTrackUri = cache.keys().next().value;
      if (!oldestTrackUri)
        break;
      cache.delete(oldestTrackUri);
    }
  }
  function get(track) {
    if (cache.has(track.trackUri))
      return Promise.resolve(cache.get(track.trackUri) ?? null);
    const existing = pending.get(track.trackUri);
    if (existing)
      return existing;
    const requestGeneration = generation;
    const request2 = load(track).then((data) => {
      if (requestGeneration === generation)
        remember(track.trackUri, data ?? null);
      return data ?? null;
    }).catch(() => {
      if (requestGeneration === generation)
        remember(track.trackUri, null);
      return null;
    }).finally(() => {
      if (pending.get(track.trackUri) === request2)
        pending.delete(track.trackUri);
    });
    pending.set(track.trackUri, request2);
    return request2;
  }
  return {
    get,
    prefetch: get,
    peek(trackUri) {
      return cache.has(trackUri) ? cache.get(trackUri) ?? null : undefined;
    },
    clear() {
      generation += 1;
      cache.clear();
      pending.clear();
    }
  };
}

// src/backend.ts
var POLL_PLAYING_MS = 1000;
var POLL_IDLE_MS = 1000;
var DEFAULT_PLAYBACK_POSITION_OFFSET_MS = 1000;
var MIN_PLAYBACK_POSITION_OFFSET_MS = -1e4;
var MAX_PLAYBACK_POSITION_OFFSET_MS = 1e4;
var pollingTimers = new Map;
var pollingUsers = new Set;
var stateByUser = new Map;
var stateObservedAt = new Map;
var stateRequestSequences = new Map;
var lyricsRequestsByUser = new Map;
var jukeboxUnavailableReasons = new Map;
var jukeboxAvailabilityChecked = new Set;
var feishinClients = new Map;
var activeUserId2 = null;
function send(message, userId) {
  spindle.sendToFrontend(message, userId);
}
function stopFeishin(userId) {
  feishinClients.get(userId)?.disconnect();
  feishinClients.delete(userId);
}
function updateFeishinState(userId, state) {
  const previousState = stateByUser.get(userId);
  stateByUser.set(userId, state);
  stateObservedAt.set(userId, Date.now());
  pushPlaybackMacros(state);
  syncLyricsForTrackChange(userId, previousState?.trackUri ?? null, state);
  send({ type: "state", playbackState: state, connected: isConnected(userId) }, userId);
}
function startFeishin(config, userId) {
  stopFeishin(userId);
  if (config.remoteControl !== "feishin" || !config.feishinUrl)
    return;
  const client = new FeishinRemoteClient((state) => updateFeishinState(userId, state), (message) => spindle.log.warn(`Feishin Remote (${userId}): ${message}`));
  feishinClients.set(userId, client);
  try {
    client.connect(config.feishinUrl, config.feishinUsername, config.feishinPassword);
  } catch (error) {
    spindle.log.warn(`Feishin Remote (${userId}) could not start: ${error?.message || error}`);
  }
}
async function loadConfig(userId) {
  const stored = await spindle.userStorage.getJson("config.json", { fallback: { serverUrl: "", username: "", enableJukebox: false, remoteControl: "none", feishinUrl: "", feishinUsername: "", playbackPositionOffsetMs: DEFAULT_PLAYBACK_POSITION_OFFSET_MS }, userId });
  const password = await spindle.enclave.get("subsonic_password", userId);
  const feishinPassword = await spindle.enclave.get("feishin_password", userId);
  if (!stored.serverUrl || !stored.username || !password)
    return null;
  const remoteControl = stored.remoteControl === "feishin" || stored.remoteControl === "jukebox" ? stored.remoteControl : stored.enableJukebox ? "jukebox" : "none";
  return { ...stored, remoteControl, enableJukebox: remoteControl === "jukebox", feishinUrl: stored.feishinUrl || "", feishinUsername: stored.feishinUsername || "", playbackPositionOffsetMs: normalizePlaybackPositionOffset(stored.playbackPositionOffsetMs), password, feishinPassword: feishinPassword || "" };
}
function normalizePlaybackPositionOffset(value) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric))
    return DEFAULT_PLAYBACK_POSITION_OFFSET_MS;
  return Math.max(MIN_PLAYBACK_POSITION_OFFSET_MS, Math.min(MAX_PLAYBACK_POSITION_OFFSET_MS, Math.round(numeric)));
}
async function loadUser(userId) {
  const config = await loadConfig(userId);
  setConfig(userId, config);
  setActiveUser(userId);
  activeUserId2 = userId;
  if (config && await verifyConfiguredJukebox(config, userId))
    await saveConfig(config, userId);
  return !!config;
}
function lyricsRequests(userId) {
  let requests = lyricsRequestsByUser.get(userId);
  if (!requests) {
    requests = createLyricsRequestCoordinator((track) => getLyrics(track.trackUri, userId));
    lyricsRequestsByUser.set(userId, requests);
  }
  return requests;
}
function buildLyricsRequestTrack(state) {
  return {
    trackUri: state.trackUri,
    trackName: state.trackName,
    artistName: state.artistName,
    albumName: state.albumName,
    durationMs: state.durationMs
  };
}
async function getLyricsForState(state, userId) {
  const lyrics = await lyricsRequests(userId).get(buildLyricsRequestTrack(state));
  if (stateByUser.get(userId)?.trackUri === state.trackUri)
    pushLyricsMacros(lyrics);
  return lyrics;
}
function syncLyricsForTrackChange(userId, previousTrackUri, state) {
  const trackUri = state?.trackUri ?? null;
  if (trackUri === previousTrackUri)
    return;
  if (!state || !trackUri) {
    pushLyricsMacros(null);
    return;
  }
  const cached = lyricsRequests(userId).peek(trackUri);
  if (cached !== undefined) {
    pushLyricsMacros(cached);
    return;
  }
  pushLyricsMacros(null);
  getLyricsForState(state, userId);
}
async function saveConfig(config, userId) {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox, remoteControl: config.remoteControl, feishinUrl: config.feishinUrl, feishinUsername: config.feishinUsername, playbackPositionOffsetMs: normalizePlaybackPositionOffset(config.playbackPositionOffsetMs) }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
  await spindle.enclave.put("feishin_password", config.feishinPassword, userId);
  setConfig(userId, config);
}
async function verifyConfiguredJukebox(config, userId) {
  if (!config.enableJukebox) {
    jukeboxUnavailableReasons.delete(userId);
    return false;
  }
  if (jukeboxAvailabilityChecked.has(userId))
    return false;
  try {
    await verifyJukebox(userId);
    jukeboxUnavailableReasons.delete(userId);
    jukeboxAvailabilityChecked.add(userId);
    return false;
  } catch (error) {
    if (!isJukeboxUnavailableError(error))
      throw error;
    config.enableJukebox = false;
    config.remoteControl = "none";
    jukeboxUnavailableReasons.set(userId, error.message);
    jukeboxAvailabilityChecked.add(userId);
    spindle.log.warn(`Jukebox disabled for ${userId}: ${error.message}`);
    return true;
  }
}
function stopPolling(userId) {
  const timer = pollingTimers.get(userId);
  if (timer)
    clearTimeout(timer);
  pollingTimers.delete(userId);
  pollingUsers.delete(userId);
}
async function pushState(userId) {
  const requestSequence = (stateRequestSequences.get(userId) || 0) + 1;
  stateRequestSequences.set(userId, requestSequence);
  const config = await loadConfig(userId);
  if (stateRequestSequences.get(userId) !== requestSequence) {
    return stateByUser.get(userId) || null;
  }
  if (config?.remoteControl === "feishin") {
    const state2 = stateByUser.get(userId) || null;
    pushPlaybackMacros(state2);
    send({ type: "state", playbackState: state2, connected: true }, userId);
    return state2;
  }
  if (!isConnected(userId)) {
    pushPlaybackMacros(null);
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const fetchedState = await getPlaybackState(userId);
  if (stateRequestSequences.get(userId) !== requestSequence) {
    return stateByUser.get(userId) || null;
  }
  const previousState = stateByUser.get(userId);
  const previousObservedAt = stateObservedAt.get(userId) || Date.now();
  const now = Date.now();
  const canonicalState = fetchedState?.positionKnown ? {
    ...fetchedState,
    progressMs: Math.min(Math.max(0, fetchedState.progressMs + normalizePlaybackPositionOffset(config?.playbackPositionOffsetMs)), fetchedState.durationMs || Infinity)
  } : fetchedState;
  const state = canonicalState && !canonicalState.positionKnown && previousState && previousState.trackUri === canonicalState.trackUri && previousState.isPlaying && canonicalState.isPlaying ? { ...canonicalState, progressMs: Math.min(previousState.progressMs + Math.max(0, now - previousObservedAt), canonicalState.durationMs || Infinity) } : canonicalState;
  stateByUser.set(userId, state);
  stateObservedAt.set(userId, now);
  pushPlaybackMacros(state);
  syncLyricsForTrackChange(userId, previousState?.trackUri ?? null, state);
  send({ type: "state", playbackState: state, connected: true }, userId);
  return state;
}
function startPolling(userId) {
  if (pollingUsers.has(userId))
    return;
  pollingUsers.add(userId);
  const poll = async () => {
    try {
      const state = await pushState(userId);
      if (!pollingUsers.has(userId))
        return;
      const delay = state?.isPlaying ? POLL_PLAYING_MS : POLL_IDLE_MS;
      pollingTimers.set(userId, setTimeout(poll, delay));
    } catch (error) {
      spindle.log.warn(`Subsonic polling failed: ${error?.message || error}`);
      if (!pollingUsers.has(userId))
        return;
      pollingTimers.set(userId, setTimeout(poll, POLL_IDLE_MS));
    }
  };
  poll();
}
async function sendConfig(userId) {
  const config = await loadConfig(userId);
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, remoteControl: config?.remoteControl || "none", feishinUrl: config?.feishinUrl || "", feishinUsername: config?.feishinUsername || "", hasFeishinPassword: !!config?.feishinPassword, playbackPositionOffsetMs: config?.playbackPositionOffsetMs ?? DEFAULT_PLAYBACK_POSITION_OFFSET_MS, jukeboxUnavailableReason: jukeboxUnavailableReasons.get(userId) || null, connected: !!config }, userId);
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
        {
          const config = await loadConfig(userId);
          if (config?.remoteControl === "feishin" && !feishinClients.has(userId))
            startFeishin(config, userId);
        }
        if (isConnected(userId)) {
          await pushState(userId);
          if ((await loadConfig(userId))?.remoteControl !== "feishin")
            startPolling(userId);
        }
        break;
      case "get_state":
        await pushState(userId);
        if ((await loadConfig(userId))?.remoteControl !== "feishin")
          startPolling(userId);
        break;
      case "connect": {
        const config = { serverUrl: message.serverUrl, username: message.username, password: message.password, remoteControl: message.remoteControl, enableJukebox: message.remoteControl === "jukebox", feishinUrl: message.feishinUrl, feishinUsername: message.feishinUsername, feishinPassword: message.feishinPassword, playbackPositionOffsetMs: normalizePlaybackPositionOffset(message.playbackPositionOffsetMs) };
        setConfig(userId, config);
        await ping(userId);
        stateByUser.delete(userId);
        stateObservedAt.delete(userId);
        jukeboxAvailabilityChecked.delete(userId);
        if (config.enableJukebox)
          await verifyConfiguredJukebox(config, userId);
        await saveConfig(config, userId);
        startFeishin(config, userId);
        send({ type: "connected" }, userId);
        await sendConfig(userId);
        if (config.remoteControl !== "feishin")
          startPolling(userId);
        break;
      }
      case "set_playback_position_offset": {
        const config = await loadConfig(userId);
        if (!config)
          break;
        config.playbackPositionOffsetMs = normalizePlaybackPositionOffset(message.playbackPositionOffsetMs);
        await saveConfig(config, userId);
        await sendConfig(userId);
        await pushState(userId);
        break;
      }
      case "disconnect":
        stopPolling(userId);
        stopFeishin(userId);
        setConfig(userId, null);
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
        updateFeishinState(userId, message.playbackState);
        break;
      case "play": {
        if ((await loadConfig(userId))?.remoteControl === "feishin")
          feishinClients.get(userId)?.send("play");
        else {
          await play(message.trackUri, userId);
          await pushState(userId);
        }
        break;
      }
      case "pause": {
        if ((await loadConfig(userId))?.remoteControl === "feishin")
          feishinClients.get(userId)?.send("pause");
        else {
          await pause(userId);
          await pushState(userId);
        }
        break;
      }
      case "next": {
        if ((await loadConfig(userId))?.remoteControl === "feishin")
          feishinClients.get(userId)?.send("next");
        else {
          await next(userId);
          await pushState(userId);
        }
        break;
      }
      case "previous": {
        if ((await loadConfig(userId))?.remoteControl === "feishin")
          feishinClients.get(userId)?.send("previous");
        else {
          await previous(userId);
          await pushState(userId);
        }
        break;
      }
      case "queue":
        await addToQueue(message.trackUri, userId);
        break;
      case "search":
        send({ type: "search_results", results: await search(message.query, userId) }, userId);
        break;
      case "get_chat_songs":
        await sendChatSongs(message.chatId, userId);
        break;
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await pushState(userId);
        const lyrics = state ? await getLyricsForState(state, userId) : null;
        send({
          type: "lyrics",
          trackUri: state?.trackUri || "",
          plainLyrics: lyrics?.plainLyrics || null,
          syncedLyrics: lyrics?.syncedLyrics || null,
          instrumental: !!lyrics?.instrumental
        }, userId);
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
var SONG_META_KEY = "subsonic_song";
var PENDING_GENERATION_MAX = 64;
var pendingGenerationSongs = new Map;
function buildSongSnapshot(state, capturedAt = Date.now()) {
  if (!state?.trackUri || !state.trackName)
    return null;
  return { trackName: state.trackName, artistName: state.artistName, albumName: state.albumName, albumArtUrl: state.albumArtUrl, trackUri: state.trackUri, isPlaying: state.isPlaying, capturedAt };
}
async function snapshotForUser(userId, capturedAt) {
  if (stateByUser.has(userId))
    return buildSongSnapshot(stateByUser.get(userId) || null, capturedAt);
  await loadUser(userId).catch(() => false);
  return buildSongSnapshot(await getPlaybackState(userId).catch(() => null), capturedAt);
}
function readSongMetadata(message) {
  const metadata = message.metadata;
  if (metadata && typeof metadata === "object")
    return { ...metadata };
  const spindleMetadata = message.extra?.spindle_metadata;
  return spindleMetadata && typeof spindleMetadata === "object" ? { ...spindleMetadata } : {};
}
function readSnapshots(message) {
  const node = readSongMetadata(message)[SONG_META_KEY];
  if (!node?.bySwipe || typeof node.bySwipe !== "object")
    return {};
  const snapshots = {};
  for (const [swipeId, snapshot] of Object.entries(node.bySwipe)) {
    const index = Number(swipeId);
    if (Number.isInteger(index) && snapshot && typeof snapshot === "object")
      snapshots[index] = snapshot;
  }
  return snapshots;
}
function isAssistantMessage(message) {
  return message.is_user === false && message.name !== "System";
}
async function persistSnapshot(chatId, messageId, swipeId, snapshot, userId) {
  const messages = await spindle.chat.getMessages(chatId);
  const message = messages.find((candidate) => candidate.id === messageId);
  if (!message || !isAssistantMessage(message))
    return;
  const targetSwipeId = message.swipe_id ?? swipeId;
  const metadata = readSongMetadata(message);
  metadata[SONG_META_KEY] = { bySwipe: { ...readSnapshots(message), [targetSwipeId]: snapshot } };
  await spindle.chat.updateMessage(chatId, messageId, { metadata, skipChunkRebuild: true });
  send({ type: "message_song", chatId, messageId, swipeId: targetSwipeId, snapshot }, userId);
}
async function sendChatSongs(chatId, userId) {
  const messages = await spindle.chat.getMessages(chatId);
  const entries = messages.flatMap((message) => {
    if (!message.id || !isAssistantMessage(message))
      return [];
    const bySwipe = readSnapshots(message);
    return Object.keys(bySwipe).length ? [{ messageId: message.id, activeSwipe: message.swipe_id || 0, bySwipe }] : [];
  });
  send({ type: "chat_songs", chatId, entries }, userId);
}
function onGenerationStarted(payload, userId) {
  const generationId = payload?.generationId;
  const resolvedUserId = userId || activeUserId2;
  if (!generationId || !resolvedUserId)
    return;
  if (pendingGenerationSongs.size >= PENDING_GENERATION_MAX) {
    const oldestGenerationId = pendingGenerationSongs.keys().next().value;
    if (oldestGenerationId)
      pendingGenerationSongs.delete(oldestGenerationId);
  }
  pendingGenerationSongs.set(generationId, {
    snapshot: snapshotForUser(resolvedUserId, Date.now()),
    userId: resolvedUserId
  });
}
async function onGenerationEnded(payload) {
  const event = payload;
  const generationId = event?.generationId;
  const pending = generationId ? pendingGenerationSongs.get(generationId) : null;
  if (generationId)
    pendingGenerationSongs.delete(generationId);
  if (!pending || event?.error || !event?.chatId || !event.messageId)
    return;
  const snapshot = await pending.snapshot.catch(() => null);
  if (!snapshot)
    return;
  await persistSnapshot(event.chatId, event.messageId, 0, snapshot, pending.userId);
}
var generationUnsubscribers = [];
function setupGenerationCapture() {
  for (const unsubscribe of generationUnsubscribers)
    unsubscribe();
  generationUnsubscribers = [];
  try {
    generationUnsubscribers.push(spindle.on("GENERATION_STARTED", onGenerationStarted));
    generationUnsubscribers.push(spindle.on("GENERATION_ENDED", (payload) => {
      onGenerationEnded(payload).catch((error) => spindle.log.warn(`Song snapshot failed: ${error?.message || error}`));
    }));
  } catch (error) {
    spindle.log.warn(`Song snapshot subscription failed: ${error?.message || error}`);
  }
}
setupGenerationCapture();
spindle.permissions.onChanged(({ permission, granted }) => {
  if (permission === "generation" && granted)
    setupGenerationCapture();
});
spindle.on("MESSAGE_SWIPED", (payload, userId) => {
  const event = payload;
  const message = event?.message;
  const resolvedUserId = userId || activeUserId2;
  if (event?.action !== "deleted" || !event.chatId || !message?.id || !isAssistantMessage(message) || !Number.isInteger(event.swipeId) || !resolvedUserId)
    return;
  const chatId = event.chatId;
  const swipeId = event.swipeId;
  const messageId = message.id;
  (async () => {
    const metadata = readSongMetadata(message);
    const snapshots = readSnapshots(message);
    if (!Object.keys(snapshots).length)
      return;
    const realigned = {};
    for (const [index, snapshot] of Object.entries(snapshots)) {
      const numericIndex = Number(index);
      if (numericIndex === swipeId)
        continue;
      realigned[numericIndex > swipeId ? numericIndex - 1 : numericIndex] = snapshot;
    }
    metadata[SONG_META_KEY] = { bySwipe: realigned };
    await spindle.chat.updateMessage(chatId, messageId, { metadata, skipChunkRebuild: true });
    await sendChatSongs(chatId, resolvedUserId);
  })().catch((error) => spindle.log.warn(`Song snapshot realignment failed: ${error?.message || error}`));
});
async function getMacroPlaybackState() {
  const userId = activeUserId2;
  return userId ? stateByUser.get(userId) || null : null;
}
spindle.registerMacro({
  name: "subsonic_now_playing",
  category: "extension:subsonic_controls",
  description: "Returns the currently playing Subsonic track",
  returnType: "string",
  handler: async () => {
    const state = await getMacroPlaybackState();
    return state ? `${state.trackName} by ${state.artistName}` : "Nothing playing";
  }
});
spindle.registerMacro({
  name: "subsonic_track_name",
  category: "extension:subsonic_controls",
  description: "Returns the track name of the currently playing Subsonic track",
  returnType: "string",
  handler: async () => (await getMacroPlaybackState())?.trackName || ""
});
spindle.registerMacro({
  name: "subsonic_artists",
  category: "extension:subsonic_controls",
  description: "Returns the artist of the currently playing Subsonic track",
  returnType: "string",
  handler: async () => (await getMacroPlaybackState())?.artistName || ""
});
spindle.registerMacro({
  name: "subsonic_album_name",
  category: "extension:subsonic_controls",
  description: "Returns the album name of the currently playing Subsonic track",
  returnType: "string",
  handler: async () => (await getMacroPlaybackState())?.albumName || ""
});
spindle.registerMacro({
  name: "subsonic_album_art",
  category: "extension:subsonic_controls",
  description: "Returns the URL of the currently playing Subsonic track's album art",
  returnType: "string",
  handler: async () => (await getMacroPlaybackState())?.albumArtUrl || ""
});
spindle.registerMacro({
  name: "subsonic_is_playing",
  category: "extension:subsonic_controls",
  description: "Returns whether Subsonic is currently playing a track",
  returnType: "boolean",
  volatile: true,
  handler: async () => (await getMacroPlaybackState())?.isPlaying ?? false
});
spindle.registerMacro({
  name: "subsonic_lyrics",
  category: "extension:subsonic_controls",
  description: "Returns the lyrics of the currently playing Subsonic track",
  returnType: "string",
  handler: async () => {
    const state = await getMacroPlaybackState();
    const userId = activeUserId2;
    const lyrics = state && userId ? await getLyricsForState(state, userId) : null;
    if (!lyrics)
      return "No lyrics available";
    if (lyrics.instrumental)
      return "[Instrumental]";
    return lyrics.plainLyrics || "No lyrics available";
  }
});
spindle.registerMacro({
  name: "subsonic_has_lyrics",
  category: "extension:subsonic_controls",
  description: "Returns whether the currently playing Subsonic track has lyrics available",
  returnType: "boolean",
  handler: async () => {
    const state = await getMacroPlaybackState();
    const userId = activeUserId2;
    const lyrics = state && userId ? await getLyricsForState(state, userId) : null;
    return !!lyrics && !lyrics.instrumental && !!(lyrics.syncedLyrics || lyrics.plainLyrics);
  }
});
function pushPlaybackMacros(state) {
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
function pushLyricsMacros(lyrics) {
  if (!lyrics || lyrics.instrumental) {
    spindle.updateMacroValue("subsonic_lyrics", lyrics?.instrumental ? "[Instrumental]" : "No lyrics available");
    spindle.updateMacroValue("subsonic_has_lyrics", "false");
    return;
  }
  spindle.updateMacroValue("subsonic_lyrics", lyrics.plainLyrics || "No lyrics available");
  spindle.updateMacroValue("subsonic_has_lyrics", String(!!(lyrics.syncedLyrics || lyrics.plainLyrics)));
}
