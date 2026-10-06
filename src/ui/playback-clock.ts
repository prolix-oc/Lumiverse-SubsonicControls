export interface PlaybackClockState {
  trackUri: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
}

export type PlaybackClock = ReturnType<typeof createPlaybackClock>;

const CORRECTION_TIME_MS = 1800;
const DISCONTINUITY_MS = 1000;

/** One monotonic timeline for progress, lyric focus, and gap animations. */
export function createPlaybackClock(now: () => number = () => performance.now()) {
  let report: PlaybackClockState | null = null;
  let anchorMs = 0;
  let anchorAt = 0;
  let correctionMs = 0;
  let revision = 0;
  const listeners = new Set<() => void>();

  function getProgressMs() {
    if (!report) return 0;
    const elapsed = report.isPlaying ? Math.max(0, now() - anchorAt) : 0;
    const progress = anchorMs + elapsed + correctionMs * (1 - Math.exp(-elapsed / CORRECTION_TIME_MS));
    return Math.min(Math.max(0, progress), report.durationMs || Infinity);
  }

  return {
    update(next: PlaybackClockState | null, options?: { seek?: boolean }) {
      // The drawer and widget receive the same immutable snapshot. Reusing it
      // for a layout or lyric update must not restart the timeline.
      if (next === report && !options?.seek) return;
      const progress = getProgressMs();
      const incoming = Math.min(Math.max(0, next?.progressMs || 0), next?.durationMs || Infinity);
      const error = incoming - progress;
      correctionMs = 0;
      if (!report || !next || next.trackUri !== report.trackUri || options?.seek || Math.abs(error) > DISCONTINUITY_MS) {
        anchorMs = incoming;
        revision++;
      } else if (!report.isPlaying && !next.isPlaying) {
        // An unchanged paused report can be older than the position at which
        // the local clock froze. A changed paused position is a seek.
        anchorMs = next.progressMs === report.progressMs ? progress : incoming;
        if (anchorMs !== progress) revision++;
      } else {
        anchorMs = progress;
        if (next.isPlaying) correctionMs = error;
      }
      report = next;
      anchorAt = now();
      listeners.forEach((listener) => listener());
    },
    getProgressMs,
    getTrackUri: () => report?.trackUri ?? null,
    getDurationMs: () => report?.durationMs ?? 0,
    isPlaying: () => report?.isPlaying ?? false,
    getRevision: () => revision,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
  };
}
