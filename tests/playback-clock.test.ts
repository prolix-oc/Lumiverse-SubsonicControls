import { describe, expect, test } from "bun:test";
import { createPlaybackClock, type PlaybackClockState } from "../src/ui/playback-clock";

function fixture() {
  let now = 0;
  const clock = createPlaybackClock(() => now);
  const state: PlaybackClockState = { trackUri: "one", progressMs: 5000, durationMs: 60000, isPlaying: true };
  return { clock, state, advance: (elapsed: number) => { now += elapsed; } };
}

describe("shared playback clock", () => {
  test("eases small report errors without moving backward or changing the playback revision", () => {
    for (const error of [-900, 900]) {
      const { clock, state, advance } = fixture();
      clock.update(state);
      advance(1000);
      const before = clock.getProgressMs();
      const revision = clock.getRevision();
      clock.update({ ...state, progressMs: before + error });
      expect(clock.getProgressMs()).toBe(before);
      expect(clock.getRevision()).toBe(revision);
      let previous = before;
      for (let frame = 0; frame < 600; frame++) {
        advance(16);
        const current = clock.getProgressMs();
        expect(current).toBeGreaterThan(previous);
        previous = current;
      }
      expect(Math.abs(clock.getProgressMs() - (before + 9600 + error))).toBeLessThan(5);
    }
  });

  test("reusing a snapshot in another view or after a lyrics fetch preserves its timeline", () => {
    const { clock, state, advance } = fixture();
    clock.update(state);
    advance(800);
    clock.update(state);
    expect(clock.getProgressMs()).toBe(5800);
    advance(800);
    expect(clock.getProgressMs()).toBe(6600);
  });

  test("pause holds the interpolated position through repeated stale paused reports and resumes smoothly", () => {
    const { clock, state, advance } = fixture();
    clock.update(state);
    advance(400);
    clock.update({ ...state, isPlaying: false });
    expect(clock.getProgressMs()).toBe(5400);
    advance(4000);
    clock.update({ ...state, isPlaying: false });
    expect(clock.getProgressMs()).toBe(5400);
    clock.update({ ...state, isPlaying: true });
    expect(clock.getProgressMs()).toBe(5400);
    advance(16);
    expect(clock.getProgressMs()).toBeGreaterThan(5400);
  });

  test("explicit small seeks, changed paused positions, large jumps, and tracks land immediately", () => {
    const { clock, state } = fixture();
    clock.update(state);
    let revision = clock.getRevision();
    clock.update({ ...state, progressMs: 5050 }, { seek: true });
    expect(clock.getProgressMs()).toBe(5050);
    expect(clock.getRevision()).toBe(++revision);
    clock.update({ ...state, progressMs: 18000 });
    expect(clock.getProgressMs()).toBe(18000);
    expect(clock.getRevision()).toBe(++revision);
    clock.update({ ...state, trackUri: "two", progressMs: 400, isPlaying: false });
    expect(clock.getProgressMs()).toBe(400);
    expect(clock.getTrackUri()).toBe("two");
    expect(clock.getRevision()).toBe(++revision);
    clock.update({ ...state, trackUri: "two", progressMs: 600, isPlaying: false });
    expect(clock.getProgressMs()).toBe(600);
    expect(clock.getRevision()).toBe(++revision);
  });

  test("clamps to a known track duration while allowing lyrics with an unknown duration", () => {
    const { clock, state, advance } = fixture();
    clock.update({ ...state, progressMs: 59000 });
    advance(5000);
    expect(clock.getProgressMs()).toBe(60000);
    clock.update({ ...state, durationMs: 0 });
    advance(60000);
    expect(clock.getProgressMs()).toBe(65000);
    clock.update(null);
    expect(clock.getProgressMs()).toBe(0);
    expect(clock.isPlaying()).toBe(false);
  });

  test("notifies both views once per report and releases subscribers", () => {
    const { clock, state } = fixture();
    const readings: number[] = [];
    const unsubscribe = clock.subscribe(() => readings.push(clock.getProgressMs()));
    clock.update(state);
    clock.update(state);
    expect(readings).toEqual([5000]);
    unsubscribe();
    clock.update(null);
    expect(readings).toEqual([5000]);
  });
});
