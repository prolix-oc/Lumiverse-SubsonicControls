import type { PlaybackState } from "../types";
import { createLyricViewport } from "./lyric-viewport";
import { createLyricLineMotion, type LyricMotionLine } from "./lyric-line-motion";
import { createLyricGap, updateLyricGap } from "./lyric-gap";
import { createPlaybackClock, type PlaybackClock } from "./playback-clock";
import {
  createSyncedLyricsModel,
  getLineDisplayText,
  parseSyncedLyrics,
  shouldReserveScaleGutter,
} from "./synced-lyrics-model";

export interface LyricsUI {
  root: HTMLElement;
  update(trackUri: string | null, plainLyrics: string | null, syncedLyrics: string | null, instrumental: boolean): void;
  updatePlayback(state: PlaybackState | null): void;
  setLoading(loading: boolean, playbackState?: PlaybackState | null): void;
  setAutoScrollSuspended(suspended: boolean): void;
  /** Turns the receding-line depth blur on or off. */
  setBlurEnabled(enabled: boolean): void;
  clear(): void;
  destroy(): void;
}

interface SyncedLyricLine extends LyricMotionLine {
  hasText: boolean;
}

const LOADING_STATUS_DELAY_MS = 180;

function getLineClassName(index: number, activeLineIndex: number, hasText: boolean, blurEnabled: boolean): string {
  const classes = ["spotify-lyrics-line"];
  if (!hasText) classes.push("spotify-lyrics-line-blank");
  if (index === activeLineIndex) classes.push("spotify-lyrics-line-active");
  else if (index < activeLineIndex) classes.push("spotify-lyrics-line-past");
  else classes.push("spotify-lyrics-line-future");
  if (activeLineIndex >= 0) {
    const distance = Math.abs(index - activeLineIndex);
    if (distance >= 1) {
      const tier = Math.min(distance, 4);
      classes.push(`spotify-lyrics-line-tier-${tier}`);
      // The active line and its neighbour stay sharp so the eye has a crisp
      // edge to land on; blur only starts two lines out.
      if (blurEnabled && tier >= 2) classes.push(`spotify-lyrics-line-blur-${tier}`);
    }
  }
  return classes.join(" ");
}

/** Shared synchronized lyric rendering and animation behavior from Spotify Controls. */
export function createLyricsUI(playbackClock: PlaybackClock = createPlaybackClock()): LyricsUI {
  const root = document.createElement("div");
  root.className = "spotify-section spotify-lyrics-section";
  root.dataset.transport = "false";
  const title = document.createElement("h3");
  title.className = "spotify-section-title";
  title.textContent = "Lyrics";
  const body = document.createElement("div");
  body.className = "spotify-lyrics-body";
  root.append(title, body);

  let currentTrackUri: string | null = null;
  let syncedLines: SyncedLyricLine[] = [];
  const syncedLyricsModel = createSyncedLyricsModel(undefined, playbackClock);
  const viewport = createLyricViewport(body, () => updateActiveLine(true));
  root.appendChild(viewport.returnButton);
  const autoScroll = viewport.autoScroll;
  const lineMotion = createLyricLineMotion(body);
  let activeLineIndex = -1;
  let presentedClockRevision = playbackClock.getRevision();
  let blurEnabled = true;
  let tickFrame: number | null = null;
  let loadingTimer: ReturnType<typeof setTimeout> | undefined;

  function supportsTransport(state: PlaybackState | null): boolean {
    return state?.source === "feishin" || state?.source === "jukebox";
  }

  function stopLoadingState() {
    clearTimeout(loadingTimer);
    loadingTimer = undefined;
    body.classList.remove("spotify-lyrics-loading");
  }
  function stopTicking() {
    if (tickFrame !== null) cancelAnimationFrame(tickFrame);
    tickFrame = null;
  }

  function refreshLineClasses() {
    syncedLines.forEach((line) => {
      line.el.className = getLineClassName(line.index, activeLineIndex, line.hasText, blurEnabled);
    });
  }
  function updateLineClasses(nextActiveLineIndex: number, forceCenter = false) {
    const previousIndex = activeLineIndex;
    const discontinuity = presentedClockRevision !== playbackClock.getRevision();
    presentedClockRevision = playbackClock.getRevision();
    if (discontinuity) autoScroll.resume();
    activeLineIndex = nextActiveLineIndex;
    const timing = lineMotion.setCadence(syncedLyricsModel.getTimeUntilNextLineMs());
    refreshLineClasses();
    const active = syncedLines[activeLineIndex >= 0 ? activeLineIndex : 0];
    const gliding = active && autoScroll.center(active.anchorEl, { timeConstantMs: timing.scrollTimeConstantMs });
    if (gliding && !discontinuity && !forceCenter && playbackClock.isPlaying() && previousIndex !== activeLineIndex) {
      lineMotion.play(syncedLines, previousIndex, activeLineIndex);
    } else if (discontinuity || forceCenter || previousIndex !== activeLineIndex) {
      lineMotion.cancel();
    }
  }
  function updateActiveLine(forceCenter = false) {
    if (!syncedLines.length) return;
    const changed = syncedLyricsModel.refreshActiveLineIndex();
    if (changed || forceCenter || presentedClockRevision !== playbackClock.getRevision()) updateLineClasses(syncedLyricsModel.getActiveLineIndex(), forceCenter);
    updateLyricGap(body, syncedLyricsModel.getTimeUntilNextLineMs(), syncedLyricsModel.getActiveLine()?.hasText === false);
  }
  function startTicking() {
    if (tickFrame === null && syncedLines.length) tickFrame = requestAnimationFrame(tick);
  }
  function tick() {
    tickFrame = null;
    updateActiveLine();
    if (playbackClock.isPlaying()) startTicking();
  }
  function syncFromClock() {
    const matchesTrack = playbackClock.getTrackUri() === currentTrackUri && currentTrackUri !== null;
    body.dataset.playing = String(matchesTrack && playbackClock.isPlaying());
    if (!matchesTrack) { stopTicking(); lineMotion.cancel(); return; }
    updateActiveLine();
    if (playbackClock.isPlaying()) startTicking(); else stopTicking();
  }
  function clear() {
    stopTicking(); autoScroll.cancel(); lineMotion.cancel(); stopLoadingState();
    viewport.reset();
    updateLyricGap(body, 0, false);
    body.innerHTML = "";
    body.className = "spotify-lyrics-body";
    currentTrackUri = null;
    syncedLines = [];
    syncedLyricsModel.clear();
    activeLineIndex = -1;
    body.dataset.playing = "false";
    root.dataset.transport = "false";
  }
  function setLoading(loading: boolean, playbackState?: PlaybackState | null) {
    stopLoadingState();
    if (!loading) return;
    stopTicking(); autoScroll.cancel(); lineMotion.cancel();
    viewport.reset();
    body.innerHTML = "";
    body.className = "spotify-lyrics-body spotify-lyrics-loading";
    // Keep the same playback epoch as the floating player while the lyric
    // request is in flight. Clearing the complete model here used to make the
    // drawer recreate its clock from an older server position on response.
    currentTrackUri = playbackState?.trackUri ?? currentTrackUri;
    syncedLines = [];
    syncedLyricsModel.setLyrics([]);
    if (playbackState && playbackState.trackUri === currentTrackUri) {
      playbackClock.update(playbackState);
    }
    activeLineIndex = -1;
    loadingTimer = setTimeout(() => {
      if (!body.classList.contains("spotify-lyrics-loading")) return;
      const status = document.createElement("div");
      status.className = "spotify-lyrics-status spotify-lyrics-status-loading";
      status.textContent = "Loading lyrics...";
      body.appendChild(status);
    }, LOADING_STATUS_DELAY_MS);
  }
  function renderSyncedLyrics(value: string) {
    const lines = parseSyncedLyrics(value);
    if (!lines.length) return false;
    stopLoadingState();
    body.className = "spotify-lyrics-body spotify-lyrics-has-content spotify-lyrics-synced";
    syncedLyricsModel.setLyrics(lines);
    const snapshot = syncedLyricsModel.getSnapshot();
    activeLineIndex = snapshot.activeLineIndex;
    presentedClockRevision = playbackClock.getRevision();
    syncedLines = snapshot.lines.map((line, renderIndex) => {
      const anchorEl = document.createElement("div");
      anchorEl.className = "spotify-lyric-line-anchor";
      const el = document.createElement("div");
      const textEl = document.createElement("div");
      el.className = getLineClassName(line.index, activeLineIndex, line.hasText, blurEnabled);
      el.classList.add("spotify-lyrics-line-enter");
      el.style.setProperty("--spotify-lyrics-enter-delay", `${Math.min(renderIndex * 28, 280)}ms`);
      textEl.className = "spotify-lyrics-line-text";
      if (!line.hasText) textEl.classList.add("spotify-lyrics-line-symbol");
      if (shouldReserveScaleGutter(line.text)) textEl.classList.add("spotify-lyrics-line-text-long");
      if (line.hasText) textEl.textContent = getLineDisplayText(line.text);
      else textEl.appendChild(createLyricGap());
      el.appendChild(textEl);
      anchorEl.appendChild(el);
      body.appendChild(anchorEl);
      return { index: line.index, hasText: line.hasText, anchorEl, el };
    });
    viewport.setLines(syncedLines.map((line) => line.anchorEl));
    const active = syncedLines[activeLineIndex >= 0 ? activeLineIndex : 0];
    if (active) autoScroll.center(active.anchorEl);
    syncFromClock();
    return true;
  }
  function renderPlainLyrics(value: string) {
    stopLoadingState();
    body.className = "spotify-lyrics-body spotify-lyrics-has-content";
    const text = document.createElement("div");
    text.className = "spotify-lyrics-text spotify-lyrics-text-enter";
    text.textContent = value;
    body.appendChild(text);
  }
  function update(trackUri: string | null, plainLyrics: string | null, syncedLyrics: string | null, instrumental: boolean) {
    stopTicking(); autoScroll.cancel(); lineMotion.cancel(); stopLoadingState();
    viewport.reset();
    currentTrackUri = trackUri;
    body.innerHTML = "";
    syncedLines = [];
    syncedLyricsModel.clear();
    activeLineIndex = -1;
    if (instrumental) {
      body.className = "spotify-lyrics-body";
      body.textContent = "♪ Instrumental";
    } else if (!renderSyncedLyrics(syncedLyrics || "")) {
      if (plainLyrics) renderPlainLyrics(plainLyrics);
      else {
        body.className = "spotify-lyrics-body";
        body.textContent = "No lyrics available";
      }
    }
  }
  function updatePlayback(state: PlaybackState | null) {
    const nextTransportState = String(supportsTransport(state));
    const transportChanged = root.dataset.transport !== nextTransportState;
    root.dataset.transport = nextTransportState;
    playbackClock.update(state);
    syncFromClock();
    if (transportChanged && syncedLines.length) {
      // The read-only layout has a larger lyric viewport. Re-center after it
      // has been applied so the active-line transition stays at its midpoint.
      requestAnimationFrame(() => updateActiveLine(true));
    }
  }
  const unsubscribeClock = playbackClock.subscribe(syncFromClock);
  return {
    root, update, updatePlayback, setLoading,
    setAutoScrollSuspended(suspended) {
      if (suspended) lineMotion.cancel();
      if (autoScroll.suspend(suspended) && !suspended && syncedLines.length) {
        updateLineClasses(activeLineIndex, true);
      }
    },
    setBlurEnabled(enabled: boolean) {
      if (blurEnabled === enabled) return;
      blurEnabled = enabled;
      refreshLineClasses();
    },
    clear,
    destroy() { unsubscribeClock(); stopTicking(); viewport.destroy(); lineMotion.destroy(); stopLoadingState(); root.remove(); },
  };
}
