import type { PlaybackState, DeviceInfo, MiniPlayerStyle } from "../types";
import { createCrossfadeArt, getTrackScopedArtUrl } from "./crossfade-art";
import { parseSyncedLyrics } from "./synced-lyrics-model";
import { bindProgressCommitOnRelease, bindRangeCommitOnRelease } from "./release-commit";

const ICON_PREV = `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
const ICON_PLAY = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const ICON_PAUSE = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const ICON_NEXT = `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
const ICON_VOLUME = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`;
const ICON_EXPAND = `<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`;
const ICON_COLLAPSE = `<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
const ICON_DEVICE = `<svg viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>`;
const EMPTY_SYNCED_LINE_SYMBOL = "♪";
function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export interface MiniPlayerUI {
  root: HTMLElement;
  update(state: PlaybackState | null, connected: boolean): void;
  updateLyrics(trackUri: string | null, plainLyrics: string | null, syncedLyrics: string | null, instrumental: boolean): void;
  setLyricsLoading(loading: boolean): void;
  setLyricsUpdateSuspended(suspended: boolean): void;
  setUiSuspended(suspended: boolean): void;
  setStyle(style: MiniPlayerStyle): void;
  setDevices(devices: DeviceInfo[]): void;
  setVolume(percent: number): void;
  onVolumeChange(handler: (percent: number) => void): void;
  toggle(): void;
  hide(): void;
  isOpen(): boolean;
  reposition(): void;
  destroy(): void;
}

interface Rect { x: number; y: number; w: number; h: number }

const POPUP_W_DEFAULT = 280;
const POPUP_W_MODERN = 336;
const GAP = 8;

function getPopupWidth(style: MiniPlayerStyle): number {
  return style === "modern" ? POPUP_W_MODERN : POPUP_W_DEFAULT;
}

function getCompactPlainLyricLines(lyrics: string | null): string[] {
  if (!lyrics) return [];
  return lyrics
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 5);
}

export function createMiniPlayerUI(
  sendToBackend: (msg: unknown) => void,
  onExpandClick: () => void,
  getWidgetRect: () => Rect
): MiniPlayerUI {
  const root = document.createElement("div");
  root.className = "spotify-mini-player";
  root.dataset.style = "default";
  root.style.setProperty("--spotify-mini-player-width", `${POPUP_W_DEFAULT}px`);

  // ─── Build DOM ─────────────────────────────────────────────────────

  const art = createCrossfadeArt("spotify-mini-art");

  const info = document.createElement("div");
  info.className = "spotify-mini-info";

  const trackName = document.createElement("div");
  trackName.className = "spotify-mini-track";

  const artistName = document.createElement("div");
  artistName.className = "spotify-mini-artist";

  const albumName = document.createElement("div");
  albumName.className = "spotify-mini-album";

  info.appendChild(trackName);
  info.appendChild(artistName);
  info.appendChild(albumName);

  const expandBtn = document.createElement("button");
  expandBtn.className = "spotify-mini-header-btn";
  expandBtn.innerHTML = ICON_EXPAND;
  expandBtn.title = "Open full player";

  const collapseBtn = document.createElement("button");
  collapseBtn.className = "spotify-mini-header-btn";
  collapseBtn.innerHTML = ICON_COLLAPSE;
  collapseBtn.title = "Collapse";

  const headerBtns = document.createElement("div");
  headerBtns.className = "spotify-mini-header-btns";
  headerBtns.appendChild(expandBtn);
  headerBtns.appendChild(collapseBtn);

  const progressRow = document.createElement("div");
  progressRow.className = "spotify-mini-progress-row";

  const progressTime = document.createElement("span");
  progressTime.className = "spotify-mini-time";

  const progressBar = document.createElement("div");
  progressBar.className = "spotify-mini-progress-bar";

  const progressFill = document.createElement("div");
  progressFill.className = "spotify-mini-progress-fill";
  progressBar.appendChild(progressFill);

  const durationTime = document.createElement("span");
  durationTime.className = "spotify-mini-time";

  progressRow.appendChild(progressTime);
  progressRow.appendChild(progressBar);
  progressRow.appendChild(durationTime);

  const controls = document.createElement("div");
  controls.className = "spotify-mini-controls";

  function makeBtn(html: string, cls: string = ""): HTMLButtonElement {
    const b = document.createElement("button");
    b.className = `spotify-mini-btn ${cls}`.trim();
    b.innerHTML = html;
    return b;
  }

  const prevBtn = makeBtn(ICON_PREV);
  const playPauseBtn = makeBtn(ICON_PLAY, "spotify-mini-btn-main");
  const nextBtn = makeBtn(ICON_NEXT);

  controls.appendChild(prevBtn);
  controls.appendChild(playPauseBtn);
  controls.appendChild(nextBtn);

  const volumeRow = document.createElement("div");
  volumeRow.className = "spotify-mini-volume-row";

  const volumeIcon = document.createElement("span");
  volumeIcon.className = "spotify-mini-volume-icon";
  volumeIcon.innerHTML = ICON_VOLUME;

  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.className = "spotify-mini-volume-slider";
  volumeSlider.min = "0";
  volumeSlider.max = "100";
  volumeSlider.value = "50";

  volumeRow.appendChild(volumeIcon);
  volumeRow.appendChild(volumeSlider);

  // ─── Device row ──────────────────────────────────────────────────────

  const deviceRow = document.createElement("div");
  deviceRow.className = "spotify-mini-device-row";

  const deviceIcon = document.createElement("span");
  deviceIcon.className = "spotify-mini-device-icon";
  deviceIcon.innerHTML = ICON_DEVICE;

  const deviceName = document.createElement("span");
  deviceName.className = "spotify-mini-device-name";

  const deviceToggle = document.createElement("button");
  deviceToggle.className = "spotify-mini-device-toggle";
  deviceToggle.textContent = "Switch";

  deviceRow.appendChild(deviceIcon);
  deviceRow.appendChild(deviceName);
  deviceRow.appendChild(deviceToggle);

  const deviceList = document.createElement("div");
  deviceList.className = "spotify-mini-device-list";

  const emptyState = document.createElement("div");
  emptyState.className = "spotify-mini-empty";
  emptyState.textContent = "No active playback";

  const header = document.createElement("div");
  header.className = "spotify-mini-header";
  header.appendChild(art.el);
  header.appendChild(info);
  header.appendChild(headerBtns);

  root.appendChild(header);
  root.appendChild(progressRow);

  const lyricsSection = document.createElement("div");
  lyricsSection.className = "spotify-mini-lyrics-section";

  const lyricsHeader = document.createElement("div");
  lyricsHeader.className = "spotify-mini-lyrics-header";
  lyricsHeader.textContent = "Lyrics";

  const lyricsBody = document.createElement("div");
  lyricsBody.className = "spotify-mini-lyrics-body";

  const lyricsStatus = document.createElement("div");
  lyricsStatus.className = "spotify-mini-lyrics-status";

  const lyricLineEls = Array.from({ length: 5 }, () => {
    const el = document.createElement("div");
    el.className = "spotify-mini-lyric-line";
    lyricsBody.appendChild(el);
    return el;
  });
  lyricsBody.appendChild(lyricsStatus);

  lyricsSection.appendChild(lyricsHeader);
  lyricsSection.appendChild(lyricsBody);

  root.appendChild(lyricsSection);
  root.appendChild(controls);
  root.appendChild(volumeRow);
  root.appendChild(deviceRow);
  root.appendChild(deviceList);
  root.appendChild(emptyState);

  // ─── State & interpolation ─────────────────────────────────────────

  let isPlaying = false;
  let currentDuration = 0;
  let visible = false;
  let cachedPopupH = 0;
  let currentStyle: MiniPlayerStyle = "default";
  let currentState: PlaybackState | null = null;
  let currentConnected = false;

  let lastProgressMs = 0;
  let lastUpdateTime = 0;
  let lastIsPlaying = false;
  let animFrameId: number | null = null;
  let lyricsTrackUri: string | null = null;
  let syncedLyrics: Array<{ timeMs: number; text: string }> = [];
  let plainLyricLines: string[] = [];
  let lyricsInstrumental = false;
  let lyricsLoading = false;
  let activeLyricLineIndex = -1;
  let lyricsUpdateSuspended = false;
  let pendingLyricsRefresh = false;
  let uiSuspended = false;
  let pendingPlaybackRefresh: { state: PlaybackState | null; connected: boolean } | null = null;
  let pendingDevices: DeviceInfo[] | null = null;
  let pendingVolume: number | null = null;
  let isProgressScrubbing = false;
  let isVolumeInteracting = false;

  function setLyricsStatus(message: string, loading = false) {
    lyricsStatus.className = loading
      ? "spotify-mini-lyrics-status spotify-mini-lyrics-status-loading"
      : "spotify-mini-lyrics-status";
    lyricsStatus.textContent = message;
    lyricsStatus.style.display = "";
    for (const el of lyricLineEls) {
      el.style.display = "none";
      el.textContent = "";
      el.className = "spotify-mini-lyric-line";
    }
  }

  function showLyricRows() {
    lyricsStatus.style.display = "none";
    for (const el of lyricLineEls) {
      el.style.display = "";
    }
  }

  function flushPendingLyricsRefresh() {
    if (!pendingLyricsRefresh || lyricsUpdateSuspended) return;
    pendingLyricsRefresh = false;
    updateActiveLyricLine(true);
  }

  function flushPendingUiRefresh() {
    if (uiSuspended) return;

    const nextPlaybackRefresh = pendingPlaybackRefresh;
    const nextDevices = pendingDevices;
    const nextVolume = pendingVolume;

    pendingPlaybackRefresh = null;
    pendingDevices = null;
    pendingVolume = null;

    if (nextPlaybackRefresh) {
      update(nextPlaybackRefresh.state, nextPlaybackRefresh.connected);
    }
    if (nextDevices) {
      setDevices(nextDevices);
    }
    if (nextVolume !== null) {
      setVolume(nextVolume);
    }
    flushPendingLyricsRefresh();
  }

  function getInterpolatedProgressMs(): number {
    if (!lastIsPlaying) return lastProgressMs;
    return Math.min(lastProgressMs + Math.max(0, Date.now() - lastUpdateTime), currentDuration || Infinity);
  }

  function getLyricWindow() {
    const windowSize = 5;
    if (syncedLyrics.length === 0) return [] as Array<{ text: string; index: number }>;

    const lines: Array<{ text: string; index: number }> = [];

    if (activeLyricLineIndex < 0) {
      for (let index = 0; index < Math.min(windowSize, syncedLyrics.length); index++) {
        const line = syncedLyrics[index];
        lines.push({ text: line.text || EMPTY_SYNCED_LINE_SYMBOL, index });
      }
    } else {
      const start = Math.max(0, Math.min(activeLyricLineIndex - 2, syncedLyrics.length - windowSize));
      for (let offset = 0; offset < windowSize && start + offset < syncedLyrics.length; offset++) {
        const index = start + offset;
        const line = syncedLyrics[index];
        lines.push({ text: line.text || EMPTY_SYNCED_LINE_SYMBOL, index });
      }
    }

    while (lines.length < windowSize) {
      lines.push({ text: " ", index: -1 - lines.length });
    }

    return lines;
  }

  function renderLyricsWindow() {
    if (lyricsLoading) {
      setLyricsStatus("Loading lyrics...", true);
      return;
    }

    if (lyricsInstrumental) {
      setLyricsStatus("♪ Instrumental");
      return;
    }

    if (syncedLyrics.length > 0) {
      showLyricRows();
      const lines = getLyricWindow();
      lyricLineEls.forEach((el, idx) => {
        const line = lines[idx] ?? { text: " ", index: -1 - idx };
        const distance = activeLyricLineIndex < 0 ? line.index : Math.abs(line.index - activeLyricLineIndex);
        el.className = "spotify-mini-lyric-line";
        if (line.index === activeLyricLineIndex) el.classList.add("spotify-mini-lyric-line-active");
        else if (distance === 1) el.classList.add("spotify-mini-lyric-line-near");
        else if (distance === 2) el.classList.add("spotify-mini-lyric-line-mid");
        else el.classList.add("spotify-mini-lyric-line-far");
        el.textContent = line.text;
      });
      return;
    }

    if (plainLyricLines.length > 0) {
      showLyricRows();
      lyricLineEls.forEach((el, idx) => {
        el.className = "spotify-mini-lyric-line spotify-mini-lyric-line-plain";
        el.textContent = plainLyricLines[idx] ?? " ";
      });
      return;
    }

    setLyricsStatus("No lyrics available");
  }

  function updateActiveLyricLine(force = false) {
    if (lyricsUpdateSuspended) {
      pendingLyricsRefresh = true;
      return;
    }

    if (currentStyle !== "modern" || syncedLyrics.length === 0 || !currentState || currentState.trackUri !== lyricsTrackUri) {
      if (force && currentStyle === "modern") renderLyricsWindow();
      return;
    }

    const progressMs = getInterpolatedProgressMs();
    let nextActiveLineIndex = -1;
    for (let i = 0; i < syncedLyrics.length; i++) {
      if (syncedLyrics[i].timeMs > progressMs) break;
      nextActiveLineIndex = i;
    }

    if (force || nextActiveLineIndex !== activeLyricLineIndex) {
      activeLyricLineIndex = nextActiveLineIndex;
      renderLyricsWindow();
    }
  }

  function refreshLyrics(reposition = false) {
    const shouldShowLyrics = currentStyle === "modern" && currentConnected && Boolean(currentState);
    lyricsSection.style.display = shouldShowLyrics ? "" : "none";
    if (!shouldShowLyrics) return;
    if (lyricsUpdateSuspended) {
      pendingLyricsRefresh = true;
      return;
    }
    updateActiveLyricLine(true);
    if (reposition && visible) applyPosition();
  }

  function tickProgress() {
    if (uiSuspended || !visible || !lastIsPlaying || !currentDuration) {
      animFrameId = null;
      return;
    }
    if (isProgressScrubbing) {
      animFrameId = requestAnimationFrame(tickProgress);
      return;
    }
    const elapsed = Date.now() - lastUpdateTime;
    const interpolated = Math.min(lastProgressMs + elapsed, currentDuration);
    const pct = (interpolated / currentDuration) * 100;
    progressFill.style.width = `${pct}%`;
    progressTime.textContent = formatTime(interpolated);
    updateActiveLyricLine();
    animFrameId = requestAnimationFrame(tickProgress);
  }

  function startTicking() {
    if (animFrameId !== null) return;
    animFrameId = requestAnimationFrame(tickProgress);
  }

  function stopTicking() {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }

  // ─── Event handlers ────────────────────────────────────────────────

  // Base Subsonic now-playing data is read-only. Jukebox and Feishin are the
  // two remote sources that can relay transport commands from the mini player.
  function supportsMiniPlayerTransport(): boolean {
    return currentState?.source === "feishin" || currentState?.source === "jukebox";
  }

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport()) return;
    sendToBackend({ type: "previous" });
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport()) return;
    sendToBackend({ type: "next" });
  });
  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport()) return;
    sendToBackend({ type: isPlaying ? "pause" : "play" });
  });
  expandBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hide();
    onExpandClick();
  });
  collapseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hide();
  });

  const cleanupProgressCommit = bindProgressCommitOnRelease(progressBar, {
    getMaxValue: () => currentDuration,
    onInteractChange(active) {
      isProgressScrubbing = active;
    },
    onPreview(positionMs) {
      const pct = currentDuration > 0 ? (positionMs / currentDuration) * 100 : 0;
      progressFill.style.width = `${pct}%`;
      progressTime.textContent = formatTime(positionMs);
    },
    onCommit(positionMs) {
      if (currentState) {
        currentState = { ...currentState, progressMs: positionMs };
      }
      lastProgressMs = positionMs;
      lastUpdateTime = Date.now();
      updateActiveLyricLine(true);
      sendToBackend({ type: "seek", positionMs });
      if (visible && lastIsPlaying) startTicking();
    },
  });

  const volumeChangeHandlers = new Set<(percent: number) => void>();
  const cleanupVolumeCommit = bindRangeCommitOnRelease(volumeSlider, {
    onInteractChange(active) {
      isVolumeInteracting = active;
    },
    onPreview(percent) {
      for (const handler of volumeChangeHandlers) handler(percent);
    },
    onCommit(percent) {
      sendToBackend({ type: "set_volume", percent });
    },
  });

  let deviceListOpen = false;
  let currentDeviceId: string | null = null;

  deviceToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (deviceListOpen) {
      deviceList.style.display = "none";
      deviceListOpen = false;
    } else {
      sendToBackend({ type: "get_devices" });
      deviceList.innerHTML = '<div class="spotify-mini-device-loading">Loading devices…</div>';
      deviceList.style.display = "flex";
      deviceListOpen = true;
    }
  });

  root.addEventListener("pointerdown", (e) => e.stopPropagation());

  function onDocClick(e: MouseEvent) {
    if (!root.contains(e.target as Node)) {
      hide();
    }
  }

  // ─── Positioning ───────────────────────────────────────────────────

  /**
   * Position the popup adjacent to the widget and set transform-origin
   * so the scale animation radiates from the widget's center.
   */
  function applyPosition() {
    const { x: ax, y: ay, w: aw, h: ah } = getWidgetRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Center popup horizontally on the widget, clamp to viewport
    const popupW = getPopupWidth(currentStyle);
    let left = ax + aw / 2 - popupW / 2;
    left = Math.max(GAP, Math.min(left, vw - popupW - GAP));

    // Measure actual height by briefly making content visible
    root.style.left = `${left}px`;
    root.style.top = "0px";
    root.style.visibility = "hidden";
    root.style.transform = "scale(1)";
    root.style.display = "flex";

    const popupH = root.offsetHeight;
    cachedPopupH = popupH;

    root.style.visibility = "";
    root.style.transform = "";
    root.style.display = "";

    // Place above the widget if room, otherwise below
    let top: number;
    let below = false;

    if (ay - popupH - GAP >= GAP) {
      top = ay - popupH - GAP;
    } else {
      top = ay + ah + GAP;
      below = true;
    }
    top = Math.max(GAP, Math.min(top, vh - popupH - GAP));

    root.style.left = `${left}px`;
    root.style.top = `${top}px`;

    // transform-origin: the widget's center, relative to the popup's top-left
    const originX = ax + aw / 2 - left;
    const originY = below ? -GAP : popupH + GAP;
    root.style.transformOrigin = `${originX}px ${originY}px`;
  }

  /**
   * Lightweight reposition using cached height — no DOM measurement flicker.
   * Used to follow the widget during drag.
   */
  function repositionFast() {
    if (!visible || !cachedPopupH) return;

    const { x: ax, y: ay, w: aw, h: ah } = getWidgetRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const popupW = getPopupWidth(currentStyle);
    let left = ax + aw / 2 - popupW / 2;
    left = Math.max(GAP, Math.min(left, vw - popupW - GAP));

    let top: number;
    let below = false;

    if (ay - cachedPopupH - GAP >= GAP) {
      top = ay - cachedPopupH - GAP;
    } else {
      top = ay + ah + GAP;
      below = true;
    }
    top = Math.max(GAP, Math.min(top, vh - cachedPopupH - GAP));

    root.style.left = `${left}px`;
    root.style.top = `${top}px`;

    const originX = ax + aw / 2 - left;
    const originY = below ? -GAP : cachedPopupH + GAP;
    root.style.transformOrigin = `${originX}px ${originY}px`;
  }

  // ─── Show / Hide ───────────────────────────────────────────────────

  function show() {
    if (!document.body.contains(root)) {
      document.body.appendChild(root);
    }

    applyPosition();

    // Ensure we start from scale(0), then animate to scale(1)
    root.classList.remove("open", "closing");
    root.offsetHeight; // reflow
    root.classList.add("open");

    visible = true;
    if (lastIsPlaying) startTicking();
    setTimeout(() => document.addEventListener("click", onDocClick), 0);
  }

  function hide() {
    if (!visible) return;
    visible = false;
    document.removeEventListener("click", onDocClick);
    stopTicking();

    // Re-query widget position so the collapse animates toward current location
    applyPosition();

    root.classList.remove("open");
    root.classList.add("closing");

    const cleanup = () => {
      root.classList.remove("closing");
      root.removeEventListener("transitionend", cleanup);
    };
    root.addEventListener("transitionend", cleanup);
    setTimeout(cleanup, 250);
  }

  function update(state: PlaybackState | null, connected: boolean) {
    currentState = state;
    currentConnected = connected;

    if (uiSuspended) {
      pendingPlaybackRefresh = { state, connected };
      return;
    }

    if (!connected || !state) {
      isProgressScrubbing = false;
      isVolumeInteracting = false;
      art.setUrl(null);
      header.style.display = "none";
      progressRow.style.display = "none";
      lyricsSection.style.display = "none";
      controls.style.display = "none";
      volumeRow.style.display = "none";
      deviceRow.style.display = "none";
      deviceList.style.display = "none";
      deviceListOpen = false;
      emptyState.style.display = "";
      emptyState.textContent = !connected
        ? "Connect to Subsonic in Settings"
        : "No active playback";
      currentDuration = 0;
      progressFill.style.width = "0%";
      progressTime.textContent = formatTime(0);
      durationTime.textContent = formatTime(0);
      stopTicking();
      return;
    }

    header.style.display = "";
    progressRow.style.display = "";
    const canUseTransport = supportsMiniPlayerTransport();
    controls.style.display = canUseTransport ? "flex" : "none";
    controls.hidden = !canUseTransport;
    prevBtn.disabled = !canUseTransport;
    playPauseBtn.disabled = !canUseTransport;
    nextBtn.disabled = !canUseTransport;
    // Neither remote integration offers a mini-player volume endpoint.
    volumeRow.hidden = true;
    volumeRow.style.display = "none";
    emptyState.style.display = "none";

    if (state.deviceName) {
      deviceName.textContent = state.deviceName;
      deviceRow.style.display = "";
      currentDeviceId = state.deviceId ?? null;
    } else {
      deviceRow.style.display = "none";
    }

    trackName.textContent = state.trackName;
    artistName.textContent = state.artistName;
    albumName.textContent = state.albumName;
    currentDuration = state.durationMs;

    art.setUrl(getTrackScopedArtUrl(state.albumArtUrl, state.trackUri));

    isPlaying = state.isPlaying;
    lastIsPlaying = state.isPlaying;
    playPauseBtn.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;

    if (!isProgressScrubbing) {
      lastProgressMs = state.progressMs;
      lastUpdateTime = Date.now();
      const pct = state.durationMs > 0 ? (state.progressMs / state.durationMs) * 100 : 0;
      progressFill.style.width = `${pct}%`;
      progressTime.textContent = formatTime(state.progressMs);
    }
    durationTime.textContent = formatTime(state.durationMs);

    if (state.volume !== null && !isVolumeInteracting) {
      volumeSlider.value = String(state.volume);
    }

    if (visible && isPlaying) {
      startTicking();
    } else {
      stopTicking();
    }

    refreshLyrics();
  }

  function updateLyrics(trackUri: string | null, plainLyrics: string | null, syncedLyricsText: string | null, instrumental: boolean) {
    lyricsTrackUri = trackUri;
    syncedLyrics = parseSyncedLyrics(syncedLyricsText);
    plainLyricLines = getCompactPlainLyricLines(plainLyrics);
    lyricsInstrumental = instrumental;
    lyricsLoading = false;
    activeLyricLineIndex = -1;
    refreshLyrics(true);
  }

  function setLyricsLoading(loading: boolean) {
    lyricsLoading = loading;
    if (loading) {
      lyricsTrackUri = currentState?.trackUri ?? null;
      syncedLyrics = [];
      plainLyricLines = [];
      lyricsInstrumental = false;
      activeLyricLineIndex = -1;
    }
    refreshLyrics(true);
  }

  function setStyle(style: MiniPlayerStyle) {
    currentStyle = style;
    root.dataset.style = style;
    root.style.setProperty("--spotify-mini-player-width", `${getPopupWidth(style)}px`);
    refreshLyrics(true);
    if (visible) applyPosition();
  }

  function setDevices(devices: DeviceInfo[]) {
    if (uiSuspended) {
      pendingDevices = devices;
      return;
    }

    deviceList.innerHTML = "";
    if (devices.length === 0) {
      deviceList.innerHTML = '<div class="spotify-mini-device-loading">No devices found</div>';
      return;
    }
    for (const dev of devices) {
      const item = document.createElement("div");
      item.className = `spotify-mini-device-item${dev.isActive ? " active" : ""}`;
      item.innerHTML = `<span class="spotify-mini-device-item-name">${dev.name}</span><span class="spotify-mini-device-item-type">${dev.type}</span>`;
      if (!dev.isActive) {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          sendToBackend({ type: "transfer_playback", deviceId: dev.id });
          deviceList.style.display = "none";
          deviceListOpen = false;
        });
      }
      deviceList.appendChild(item);
    }
  }

  function setVolume(percent: number) {
    if (uiSuspended) {
      pendingVolume = percent;
      return;
    }
    volumeSlider.value = String(percent);
  }

  return {
    root,
    update,
    updateLyrics,
    setLyricsLoading,
    setLyricsUpdateSuspended(suspended: boolean) {
      lyricsUpdateSuspended = suspended;
      if (!suspended) flushPendingLyricsRefresh();
    },
    setUiSuspended(suspended: boolean) {
      uiSuspended = suspended;
      lyricsUpdateSuspended = suspended;
      if (suspended) {
        stopTicking();
        return;
      }
      flushPendingUiRefresh();
      if (visible && lastIsPlaying) startTicking();
    },
    setStyle,
    setDevices,
    setVolume,
    onVolumeChange(handler: (percent: number) => void) {
      volumeChangeHandlers.add(handler);
    },
    toggle() {
      if (visible) {
        hide();
      } else {
        show();
      }
    },
    hide,
    isOpen: () => visible,
    reposition: repositionFast,
    destroy() {
      hide();
      stopTicking();
      cleanupProgressCommit();
      cleanupVolumeCommit();
      volumeChangeHandlers.clear();
      root.remove();
    },
  };
}
