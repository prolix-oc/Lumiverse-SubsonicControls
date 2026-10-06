import { afterEach, describe, expect, test } from "bun:test";
import { createLyricLineMotion, getLyricMotionTiming, type LyricMotionLine } from "../src/ui/lyric-line-motion";

const originalWindow = globalThis.window;
const originalGetComputedStyle = globalThis.getComputedStyle;
const cleanups: Array<() => void> = [];

afterEach(() => {
  cleanups.splice(0).forEach((cleanup) => cleanup());
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, "getComputedStyle", { configurable: true, value: originalGetComputedStyle });
});

function fixture() {
  class MotionPreference extends EventTarget {
    matches = false;
  }
  const preference = new MotionPreference();
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: { matchMedia: () => preference },
  });
  Object.defineProperty(globalThis, "getComputedStyle", {
    configurable: true,
    value: (el: { renderedOffset: number }) => ({ transform: `matrix(1, 0, 0, 1, 0, ${el.renderedOffset})` }),
  });

  class Container extends EventTarget {
    clientHeight = 240;
    isConnected = true;
    properties = new Map<string, string>();
    style = { setProperty: (name: string, value: string) => this.properties.set(name, value) };
    getBoundingClientRect() {
      return { top: 0, bottom: 240 } as DOMRect;
    }
  }
  class FakeAnimation {
    cancelled = false;
    onfinish: (() => void) | null = null;
    cancel() { this.cancelled = true; }
  }
  const recordings: Array<{ index: number; keyframes: Keyframe[]; options: KeyframeAnimationOptions; animation: FakeAnimation }> = [];
  const rows = Array.from({ length: 16 }, (_, index) => ({
    renderedOffset: 0,
    animate(keyframes: Keyframe[], options: KeyframeAnimationOptions) {
      const animation = new FakeAnimation();
      recordings.push({ index, keyframes, options, animation });
      return animation;
    },
  }));
  const lines: LyricMotionLine[] = rows.map((row, index) => ({
    index,
    el: row as unknown as HTMLElement,
    anchorEl: {
      getBoundingClientRect: () => ({ top: (index - 3) * 40, bottom: (index - 2) * 40, height: 40 }),
    } as HTMLElement,
  }));
  const container = new Container();
  const motion = createLyricLineMotion(container as unknown as HTMLElement);
  cleanups.push(() => motion.destroy());
  return { motion, recordings, rows, lines, preference, container };
}

describe("lyric line wave", () => {
  test("shortens the wave, text handoff, and scroll settling to fit a quick line", () => {
    const normal = getLyricMotionTiming(3000);
    const rapid = getLyricMotionTiming(200);
    expect(normal.durationMs).toBe(360);
    expect(rapid.durationMs + 3 * rapid.staggerMs).toBeLessThan(200);
    expect(rapid.arrivalMs).toBeLessThan(200);
    expect(rapid.scrollTimeConstantMs).toBeLessThan(normal.scrollTimeConstantMs);
    const { motion, recordings, lines, container } = fixture();
    motion.setCadence(200);
    motion.play(lines, 4, 5);
    expect(recordings.every((record) => Number(record.options.duration) + Number(record.options.delay) < 200)).toBe(true);
    expect(container.properties.get("--spotify-lyric-arrival-ms")).toBe(`${rapid.arrivalMs}ms`);
    expect(container.properties.get("--spotify-lyric-highlight-ms")).toBe(`${rapid.highlightMs}ms`);
  });

  test("lets the active line lead and limits trailing motion to nearby visible rows", () => {
    const { motion, recordings, lines } = fixture();
    motion.play(lines, 4, 5);
    expect(recordings.length).toBeGreaterThan(0);
    expect(recordings.some((record) => record.index === 5)).toBe(false);
    expect(recordings.every((record) => record.index >= 2 && record.index <= 9)).toBe(true);
    expect(recordings.every((record) => Number(record.options.delay) <= 90)).toBe(true);
    expect(recordings.every((record) => record.keyframes.at(-1)?.transform === "translateY(0)")).toBe(true);
  });

  test("continues interrupted rows from their rendered positions without piling up animations", () => {
    const { motion, recordings, rows, lines } = fixture();
    motion.play(lines, 4, 5);
    const firstPass = [...recordings];
    rows[6].renderedOffset = 4.5;
    motion.play(lines, 5, 6);
    expect(firstPass.every((record) => record.animation.cancelled)).toBe(true);
    const arrivingLine = recordings.slice(firstPass.length).find((record) => record.index === 6);
    expect(arrivingLine?.keyframes[0].transform).toBe("translateY(4.5px)");
    expect(arrivingLine?.keyframes.at(-1)?.transform).toBe("translateY(0)");
    expect(arrivingLine?.options.delay).toBe(0);
  });

  test("avoids the wave on initial positioning, seeks, backward corrections, and hidden views", () => {
    const { motion, recordings, lines, container } = fixture();
    motion.play(lines, -1, 5);
    motion.play(lines, 3, 7);
    motion.play(lines, 5, 4);
    container.clientHeight = 0;
    motion.play(lines, 4, 5);
    expect(recordings).toHaveLength(0);
  });

  test("yields to manual input and to a reduced-motion preference change", () => {
    const { motion, recordings, lines, container, preference } = fixture();
    for (const input of ["wheel", "touchmove", "pointerdown"]) {
      motion.play(lines, 4, 5);
      container.dispatchEvent(new Event(input));
      expect(recordings.every((record) => record.animation.cancelled)).toBe(true);
    }
    motion.play(lines, 4, 5);
    preference.matches = true;
    preference.dispatchEvent(new Event("change"));
    expect(recordings.every((record) => record.animation.cancelled)).toBe(true);
    const previousCount = recordings.length;
    motion.play(lines, 5, 6);
    expect(recordings).toHaveLength(previousCount);
  });

  test("cleans up completed waves and input listeners on destruction", () => {
    const { motion, recordings, lines, container } = fixture();
    motion.play(lines, 4, 5);
    recordings.forEach((record) => record.animation.onfinish?.());
    motion.destroy();
    container.dispatchEvent(new Event("wheel"));
    expect(recordings.every((record) => !record.animation.cancelled)).toBe(true);
  });
});
