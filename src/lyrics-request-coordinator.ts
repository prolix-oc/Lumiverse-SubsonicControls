export interface LyricsRequestTrack {
  trackUri: string;
  trackName: string;
  artistName: string;
  albumName: string;
  durationMs: number;
}

/**
 * Keeps lyric lookups out of prompt resolution. It memoizes both successful
 * and unavailable results, and shares an in-flight request between the tab,
 * widget, and macros.
 */
export interface LyricsRequestCoordinator<T> {
  get(track: LyricsRequestTrack): Promise<T | null>;
  prefetch(track: LyricsRequestTrack): Promise<T | null>;
  peek(trackUri: string): T | null | undefined;
  clear(): void;
}

export function createLyricsRequestCoordinator<T>(
  load: (track: LyricsRequestTrack) => Promise<T | null>,
  maxEntries = 24,
): LyricsRequestCoordinator<T> {
  const cache = new Map<string, T | null>();
  const pending = new Map<string, Promise<T | null>>();
  let generation = 0;

  function remember(trackUri: string, data: T | null): void {
    if (cache.has(trackUri)) cache.delete(trackUri);
    cache.set(trackUri, data);
    while (cache.size > maxEntries) {
      const oldestTrackUri = cache.keys().next().value;
      if (!oldestTrackUri) break;
      cache.delete(oldestTrackUri);
    }
  }

  function get(track: LyricsRequestTrack): Promise<T | null> {
    if (cache.has(track.trackUri)) return Promise.resolve(cache.get(track.trackUri) ?? null);
    const existing = pending.get(track.trackUri);
    if (existing) return existing;

    const requestGeneration = generation;
    const request = load(track)
      .then((data) => {
        if (requestGeneration === generation) remember(track.trackUri, data ?? null);
        return data ?? null;
      })
      .catch(() => {
        if (requestGeneration === generation) remember(track.trackUri, null);
        return null;
      })
      .finally(() => {
        if (pending.get(track.trackUri) === request) pending.delete(track.trackUri);
      });
    pending.set(track.trackUri, request);
    return request;
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
    },
  };
}
