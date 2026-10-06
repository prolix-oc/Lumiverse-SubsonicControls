import { describe, expect, test } from "bun:test";
import { createPlaybackClock } from "../src/ui/playback-clock";
import { createSyncedLyricsModel, parseSyncedLyrics } from "../src/ui/synced-lyrics-model";

describe("synchronized lyric timeline", () => {
  test("finds exact boundaries, explicit gaps, and the final line's remaining duration", () => {
    let now = 0;
    const clock = createPlaybackClock(() => now);
    const model = createSyncedLyricsModel(undefined, clock);
    clock.update({ trackUri: "one", progressMs: 0, durationMs: 5000, isPlaying: true });
    model.setLyrics(parseSyncedLyrics("[00:01]First\n[00:02]\n[00:03]Last"));
    expect(model.getActiveLineIndex()).toBe(-1);
    expect(model.getTimeUntilNextLineMs()).toBe(1000);
    now = 1000;
    expect(model.refreshActiveLineIndex()).toBe(true);
    expect(model.getActiveLine()?.text).toBe("First");
    now = 2000;
    model.refreshActiveLineIndex();
    expect(model.getActiveLine()?.hasText).toBe(false);
    expect(model.getTimeUntilNextLineMs()).toBe(1000);
    now = 3000;
    model.refreshActiveLineIndex();
    expect(model.getActiveLine()?.text).toBe("Last");
    expect(model.getTimeUntilNextLineMs()).toBe(2000);
    now = 6000;
    model.refreshActiveLineIndex();
    expect(model.getTimeUntilNextLineMs()).toBe(0);
  });

  test("two models stay aligned while lyrics loading clears only one presentation", () => {
    let now = 0;
    const clock = createPlaybackClock(() => now);
    const full = createSyncedLyricsModel(undefined, clock);
    const widget = createSyncedLyricsModel(undefined, clock);
    const lyrics = parseSyncedLyrics("[00:00]First\n[00:01]Second\n[00:02]Third");
    const report = { trackUri: "one", progressMs: 0, durationMs: 5000, isPlaying: true };
    full.setPlayback(report);
    full.setLyrics(lyrics);
    widget.setLyrics(lyrics);
    now = 1500;
    full.clear();
    widget.setPlayback(report);
    expect(widget.getSnapshot().activeLineIndex).toBe(1);
    full.setLyrics(lyrics);
    expect(full.getSnapshot().activeLineIndex).toBe(1);
    now = 2010;
    expect(full.getSnapshot().activeLineIndex).toBe(2);
    expect(widget.getSnapshot().activeLineIndex).toBe(2);
  });

  test("groups simultaneous lyrics without creating zero-length transitions", () => {
    const lyrics = parseSyncedLyrics("[00:02]Later\n[00:01]Voice one\n[00:01]Voice two\n[00:01]\n[00:03.250]");
    expect(lyrics).toEqual([
      { timeMs: 1000, text: "Voice one\nVoice two" },
      { timeMs: 2000, text: "Later" },
      { timeMs: 3250, text: "" },
    ]);
    const model = createSyncedLyricsModel();
    model.setPlayback({ trackUri: "one", progressMs: 1000, durationMs: 0, isPlaying: false });
    model.setLyrics(lyrics);
    expect(model.getTimeUntilNextLineMs()).toBe(1000);
    model.setPlayback({ trackUri: "one", progressMs: 4000, durationMs: 0, isPlaying: false }, { seek: true });
    model.refreshActiveLineIndex();
    expect(model.getTimeUntilNextLineMs()).toBe(Infinity);
  });
});
