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
  const reportedPositionMs = Number(own.positionMs);
  const positionKnown = Number.isFinite(reportedPositionMs) && reportedPositionMs >= 0;
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

// src/backend.ts
var POLL_PLAYING_MS = 1000;
var POLL_IDLE_MS = 1000;
var pollingTimers = new Map;
var pollingUsers = new Set;
var stateByUser = new Map;
var stateObservedAt = new Map;
var jukeboxUnavailableReasons = new Map;
var jukeboxAvailabilityChecked = new Set;
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
  if (config && await verifyConfiguredJukebox(config, userId))
    await saveConfig(config, userId);
  return !!config;
}
async function saveConfig(config, userId) {
  await spindle.userStorage.setJson("config.json", { serverUrl: config.serverUrl, username: config.username, enableJukebox: config.enableJukebox }, { userId });
  await spindle.enclave.put("subsonic_password", config.password, userId);
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
  if (!isConnected(userId)) {
    pushPlaybackMacros(null);
    send({ type: "state", playbackState: null, connected: false }, userId);
    return null;
  }
  const fetchedState = await getPlaybackState(userId);
  const previousState = stateByUser.get(userId);
  const previousObservedAt = stateObservedAt.get(userId) || Date.now();
  const now = Date.now();
  const state = fetchedState && !fetchedState.positionKnown && previousState && previousState.trackUri === fetchedState.trackUri && previousState.isPlaying && fetchedState.isPlaying ? { ...fetchedState, progressMs: Math.min(previousState.progressMs + Math.max(0, now - previousObservedAt), fetchedState.durationMs || Infinity) } : fetchedState;
  stateByUser.set(userId, state);
  stateObservedAt.set(userId, now);
  pushPlaybackMacros(state);
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
  send({ type: "config", serverUrl: config?.serverUrl || "", username: config?.username || "", hasPassword: !!config?.password, enableJukebox: !!config?.enableJukebox, jukeboxUnavailableReason: jukeboxUnavailableReasons.get(userId) || null, connected: !!config }, userId);
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
        startPolling(userId);
        break;
      case "connect": {
        const config = { serverUrl: message.serverUrl, username: message.username, password: message.password, enableJukebox: message.enableJukebox };
        setConfig(userId, config);
        await ping(userId);
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
        setConfig(userId, null);
        stateByUser.delete(userId);
        stateObservedAt.delete(userId);
        jukeboxUnavailableReasons.delete(userId);
        jukeboxAvailabilityChecked.delete(userId);
        pushPlaybackMacros(null);
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
      case "get_chat_songs":
        await sendChatSongs(message.chatId, userId);
        break;
      case "get_lyrics": {
        const state = stateByUser.get(userId) || await getPlaybackState(userId);
        const lyrics = state ? await getLyrics(state.trackUri, userId) : null;
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
var pendingGenerationSongs = new Map;
function buildSongSnapshot(state) {
  if (!state?.trackUri || !state.trackName)
    return null;
  return { trackName: state.trackName, artistName: state.artistName, albumName: state.albumName, albumArtUrl: state.albumArtUrl, trackUri: state.trackUri, isPlaying: state.isPlaying, capturedAt: Date.now() };
}
async function snapshotForUser(userId) {
  const cached = stateByUser.get(userId);
  const state = cached || await getPlaybackState(userId).catch(() => null);
  return buildSongSnapshot(state);
}
function readSongMetadata(message) {
  return { ...message.metadata || message.extra?.spindle_metadata || {} };
}
function readSnapshots(message) {
  const node = readSongMetadata(message)[SONG_META_KEY];
  if (!node?.bySwipe)
    return {};
  return Object.fromEntries(Object.entries(node.bySwipe).filter(([swipeId, snapshot]) => Number.isInteger(Number(swipeId)) && !!snapshot).map(([swipeId, snapshot]) => [Number(swipeId), snapshot]));
}
async function persistSnapshot(chatId, messageId, swipeId, snapshot, userId) {
  const messages = await spindle.chat.getMessages(chatId);
  const message = messages.find((candidate) => candidate.id === messageId);
  if (!message || message.is_user || message.name === "System")
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
    if (!message.id || message.is_user)
      return [];
    const bySwipe = readSnapshots(message);
    return Object.keys(bySwipe).length ? [{ messageId: message.id, activeSwipe: message.swipe_id || 0, bySwipe }] : [];
  });
  send({ type: "chat_songs", chatId, entries }, userId);
}
function onGenerationStarted(payload, userId) {
  const generationId = payload.generationId;
  if (!generationId || !userId)
    return;
  snapshotForUser(userId).then((snapshot) => {
    if (snapshot)
      pendingGenerationSongs.set(generationId, { snapshot, userId });
  });
}
function onGenerationEnded(payload) {
  const event = payload;
  const pending = event.generationId ? pendingGenerationSongs.get(event.generationId) : null;
  if (event.generationId)
    pendingGenerationSongs.delete(event.generationId);
  if (!pending || event.error || !event.chatId || !event.messageId)
    return;
  persistSnapshot(event.chatId, event.messageId, 0, pending.snapshot, pending.userId).catch((error) => spindle.log.warn(`Song snapshot failed: ${error?.message || error}`));
}
var generationUnsubscribers = [];
function setupGenerationCapture() {
  for (const unsubscribe of generationUnsubscribers)
    unsubscribe();
  generationUnsubscribers = [];
  try {
    generationUnsubscribers.push(spindle.on("GENERATION_STARTED", onGenerationStarted));
    generationUnsubscribers.push(spindle.on("GENERATION_ENDED", onGenerationEnded));
  } catch (error) {
    spindle.log.warn(`Song snapshot subscription failed: ${error?.message || error}`);
  }
}
setupGenerationCapture();
spindle.permissions.onChanged(({ permission, granted }) => {
  if (permission === "generation" && granted)
    setupGenerationCapture();
});
async function getMacroPlaybackState() {
  return isConnected() ? getPlaybackState().catch(() => null) : null;
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
    const lyrics = state ? await getLyrics(state.trackUri).catch(() => null) : null;
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
    const lyrics = state ? await getLyrics(state.trackUri).catch(() => null) : null;
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
