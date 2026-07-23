export interface ParsedSyncedLyricLine {
  timeMs: number;
  text: string;
}

export interface SyncedLyricsPlayback {
  trackUri: string;
  progressMs: number;
  durationMs: number;
  isPlaying: boolean;
  updatedAt: number;
}

export interface SyncedLyricsSnapshotLine extends ParsedSyncedLyricLine {
  index: number;
  displayText: string;
  hasText: boolean;
}

export interface SyncedLyricsSnapshot {
  activeLineIndex: number;
  lines: SyncedLyricsSnapshotLine[];
}

export const EMPTY_SYNCED_LINE_SYMBOL = "♪";

function parseTimestamp(raw: string): number | null {
  const match = /^(\d+):(\d{2})(?:\.(\d{1,3}))?$/.exec(raw);
  if (!match) return null;

  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const fraction = match[3] ? Number(match[3].padEnd(3, "0")) : 0;
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds) || seconds > 59) return null;

  return minutes * 60_000 + seconds * 1000 + fraction;
}

export function parseSyncedLyrics(value: string | null): ParsedSyncedLyricLine[] {
  if (!value) return [];

  const parsed: ParsedSyncedLyricLine[] = [];
  for (const line of value.split(/\r?\n/)) {
    const timestamps = [...line.matchAll(/\[([^\]]+)\]/g)]
      .map((match) => parseTimestamp(match[1]))
      .filter((timeMs): timeMs is number => timeMs !== null);
    if (timestamps.length === 0) continue;

    const text = line.replace(/(?:\[[^\]]+\])+/g, "").trim();
    for (const timeMs of timestamps) parsed.push({ timeMs, text });
  }

  const grouped: ParsedSyncedLyricLine[] = [];
  for (const line of parsed.sort((a, b) => a.timeMs - b.timeMs)) {
    const previous = grouped[grouped.length - 1];
    if (previous?.timeMs === line.timeMs) {
      previous.text = [previous.text, line.text].filter(Boolean).join("\n");
    } else {
      grouped.push({ ...line });
    }
  }

  return grouped;
}

export function getLineDisplayText(text: string): string {
  return text || EMPTY_SYNCED_LINE_SYMBOL;
}

export function shouldReserveScaleGutter(text: string): boolean {
  return !text.includes("\n") && text.length >= 36;
}

export function createSyncedLyricsModel(maxLines?: number) {
  let lyrics: ParsedSyncedLyricLine[] = [];
  let playback: SyncedLyricsPlayback | null = null;
  let activeLineIndex = -1;

  function getProgressMs(): number {
    if (!playback) return 0;
    if (!playback.isPlaying) return playback.progressMs;
    return Math.min(playback.progressMs + Date.now() - playback.updatedAt, playback.durationMs || Infinity);
  }

  function refreshActiveLineIndex(): boolean {
    if (lyrics.length === 0) {
      const changed = activeLineIndex !== -1;
      activeLineIndex = -1;
      return changed;
    }

    const progressMs = getProgressMs();
    let nextActiveLineIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (lyrics[i].timeMs > progressMs) break;
      nextActiveLineIndex = i;
    }

    const changed = nextActiveLineIndex !== activeLineIndex;
    activeLineIndex = nextActiveLineIndex;
    return changed;
  }

  function getVisibleLines(): SyncedLyricsSnapshotLine[] {
    const indexed = lyrics.map((line, index) => ({
      ...line,
      index,
      displayText: getLineDisplayText(line.text),
      hasText: Boolean(line.text),
    }));

    if (!maxLines || indexed.length <= maxLines) return indexed;
    if (activeLineIndex < 0) return indexed.slice(0, maxLines);

    const start = Math.max(0, Math.min(activeLineIndex - Math.floor(maxLines / 2), indexed.length - maxLines));
    return indexed.slice(start, start + maxLines);
  }

  function getIndexedLines(): SyncedLyricsSnapshotLine[] {
    return lyrics.map((line, index) => ({
      ...line,
      index,
      displayText: getLineDisplayText(line.text),
      hasText: Boolean(line.text),
    }));
  }

  return {
    clear() {
      lyrics = [];
      playback = null;
      activeLineIndex = -1;
    },
    setLyrics(nextLyrics: ParsedSyncedLyricLine[]) {
      lyrics = nextLyrics;
      activeLineIndex = -1;
      refreshActiveLineIndex();
    },
    setPlayback(nextPlayback: SyncedLyricsPlayback | null) {
      playback = nextPlayback;
    },
    refreshActiveLineIndex,
    getActiveLineIndex() {
      return activeLineIndex;
    },
    hasLyrics() {
      return lyrics.length > 0;
    },
    getIndexedLines,
    getSnapshot(): SyncedLyricsSnapshot {
      refreshActiveLineIndex();
      return {
        activeLineIndex,
        lines: getVisibleLines(),
      };
    },
  };
}

