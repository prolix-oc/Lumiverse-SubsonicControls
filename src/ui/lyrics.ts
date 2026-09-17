import type { PlaybackState } from "../types";
import { createLyricAutoScroller } from "./lyric-auto-scroll";
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
  /** Turns the receding-line depth blur and the blur-in animation on or off. */
  setBlurEnabled(enabled: boolean): void;
  clear(): void;
  destroy(): void;
}

interface SyncedLyricLine {
  index: number;
  el: HTMLDivElement;
  textEl: HTMLDivElement;
}

interface LyricsPlayback {
  trackUri: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  updatedAt: number;
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
export function createLyricsUI(): LyricsUI {
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
  const syncedLyricsModel = createSyncedLyricsModel();
  const autoScroll = createLyricAutoScroller(body);
  let playback: LyricsPlayback | null = null;
  let activeLineIndex = -1;
  let blurEnabled = true;
  let tickTimer: ReturnType<typeof setInterval> | undefined;
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
    clearInterval(tickTimer);
    tickTimer = undefined;
  }

  function refreshLineClasses() {
    syncedLines.forEach((line) => {
      const snapshot = syncedLyricsModel.getIndexedLines()[line.index];
      line.el.className = getLineClassName(line.index, activeLineIndex, snapshot?.hasText ?? false, blurEnabled);
    });
  }
  function applyEnterBlur() {
    if (blurEnabled) root.style.removeProperty("--spotify-lyrics-enter-blur");
    else root.style.setProperty("--spotify-lyrics-enter-blur", "0px");
  }
  function updateLineClasses(nextActiveLineIndex: number, forceCenter = false) {
    activeLineIndex = nextActiveLineIndex;
    refreshLineClasses();
    const active = syncedLines.find((line) => line.index === activeLineIndex);
    if (active) autoScroll.center(active.textEl, { force: forceCenter });
  }
  function updateActiveLine(forceCenter = false) {
    if (!syncedLines.length) return;
    const changed = syncedLyricsModel.refreshActiveLineIndex();
    if (changed || forceCenter) updateLineClasses(syncedLyricsModel.getActiveLineIndex(), forceCenter);
  }
  function startTicking() {
    if (!tickTimer && syncedLines.length) tickTimer = setInterval(updateActiveLine, 200);
  }
  function clear() {
    stopTicking(); autoScroll.cancel(); stopLoadingState();
    body.innerHTML = "";
    body.className = "spotify-lyrics-body";
    currentTrackUri = null;
    syncedLines = [];
    syncedLyricsModel.clear();
    playback = null;
    activeLineIndex = -1;
    root.dataset.transport = "false";
  }
  function setLoading(loading: boolean, playbackState?: PlaybackState | null) {
    stopLoadingState();
    if (!loading) return;
    stopTicking(); autoScroll.cancel();
    body.innerHTML = "";
    body.className = "spotify-lyrics-body spotify-lyrics-loading";
    // Keep the same playback epoch as the floating player while the lyric
    // request is in flight. Clearing the complete model here used to make the
    // drawer recreate its clock from an older server position on response.
    currentTrackUri = playbackState?.trackUri ?? currentTrackUri;
    syncedLines = [];
    syncedLyricsModel.setLyrics([]);
    if (playbackState && playbackState.trackUri === currentTrackUri) {
      playback = {
        trackUri: playbackState.trackUri,
        progressMs: playbackState.progressMs,
        durationMs: playbackState.durationMs,
        isPlaying: playbackState.isPlaying,
        updatedAt: Date.now(),
      };
      syncedLyricsModel.setPlayback(playback);
    } else {
      playback = null;
      syncedLyricsModel.setPlayback(null);
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
    syncedLines = snapshot.lines.map((line, renderIndex) => {
      const el = document.createElement("div");
      const textEl = document.createElement("div");
      el.className = getLineClassName(line.index, activeLineIndex, line.hasText, blurEnabled);
      el.classList.add("spotify-lyrics-line-enter");
      el.style.setProperty("--spotify-lyrics-enter-delay", `${Math.min(renderIndex * 28, 280)}ms`);
      textEl.className = "spotify-lyrics-line-text";
      if (!line.hasText) textEl.classList.add("spotify-lyrics-line-symbol");
      if (shouldReserveScaleGutter(line.text)) textEl.classList.add("spotify-lyrics-line-text-long");
      textEl.textContent = getLineDisplayText(line.text);
      el.appendChild(textEl);
      body.appendChild(el);
      return { index: line.index, el, textEl };
    });
    updateActiveLine();
    if (playback?.isPlaying) startTicking();
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
    stopTicking(); autoScroll.cancel(); stopLoadingState();
    currentTrackUri = trackUri;
    body.innerHTML = "";
    syncedLines = [];
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
    if (!state || state.trackUri !== currentTrackUri) {
      playback = null;
      syncedLyricsModel.setPlayback(null);
      stopTicking();
      return;
    }
    playback = { trackUri: state.trackUri, progressMs: state.progressMs, durationMs: state.durationMs, isPlaying: state.isPlaying, updatedAt: Date.now() };
    syncedLyricsModel.setPlayback(playback);
    updateActiveLine();
    if (state.isPlaying) startTicking(); else stopTicking();
    if (transportChanged && syncedLines.length) {
      // The read-only layout has a larger lyric viewport. Re-center after it
      // has been applied so the active-line transition stays at its midpoint.
      requestAnimationFrame(() => updateActiveLine(true));
    }
  }
  return {
    root, update, updatePlayback, setLoading,
    setAutoScrollSuspended(suspended) {
      if (autoScroll.suspend(suspended) && !suspended && syncedLines.length) {
        updateLineClasses(activeLineIndex, true);
      }
    },
    setBlurEnabled(enabled: boolean) {
      if (blurEnabled === enabled) return;
      blurEnabled = enabled;
      applyEnterBlur();
      refreshLineClasses();
    },
    clear,
    destroy() { stopTicking(); autoScroll.destroy(); stopLoadingState(); root.remove(); },
  };
}
