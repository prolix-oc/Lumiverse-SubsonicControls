import { afterEach, describe, expect, test } from "bun:test";
import { createLyricAutoScroller } from "../src/ui/lyric-auto-scroll";

const originalWindow = globalThis.window;
const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;

afterEach(() => {
  Object.defineProperty(globalThis, "window", { configurable: true, value: originalWindow });
  Object.defineProperty(globalThis, "requestAnimationFrame", {
    configurable: true,
    value: originalRequestAnimationFrame,
  });
  Object.defineProperty(globalThis, "cancelAnimationFrame", {
    configurable: true,
    value: originalCancelAnimationFrame,
  });
});

describe("lyric auto-scroll", () => {
  function fixture() {
    let now = performance.now();
    let nextFrameId = 0;
    const frames = new Map<number, FrameRequestCallback>();
    class MotionPreference extends EventTarget { matches = false; }
    const preference = new MotionPreference();
    Object.defineProperty(globalThis, "window", { configurable: true, value: { matchMedia: () => preference } });
    Object.defineProperty(globalThis, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => { const id = ++nextFrameId; frames.set(id, callback); return id; },
    });
    Object.defineProperty(globalThis, "cancelAnimationFrame", { configurable: true, value: (id: number) => frames.delete(id) });
    class Container extends EventTarget {
      clientHeight = 160;
      isConnected = true;
      scrollHeight = 900;
      scrollTop = 0;
      getBoundingClientRect() { return { top: 0 } as DOMRect; }
    }
    const container = new Container();
    const target = {
      isConnected: true,
      getBoundingClientRect: () => ({ top: 520 - container.scrollTop, height: 24 } as DOMRect),
    } as HTMLElement;
    const changes: boolean[] = [];
    const scroller = createLyricAutoScroller(container as unknown as HTMLElement, (browsing) => changes.push(browsing));
    function advance(elapsed: number) {
      now += elapsed;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(now));
    }
    return { container, target, changes, scroller, frames, advance, preference };
  }

  test("manual browsing stays parked across long passages, recentering, and menu suspension", () => {
    const { scroller, container, target, changes, frames, advance } = fixture();
    scroller.center(target);
    advance(16);
    container.dispatchEvent(new Event("wheel"));
    const browsedOffset = container.scrollTop;
    advance(5000);
    expect(scroller.center(target, { timeConstantMs: 25 })).toBe(false);
    scroller.suspend(true);
    scroller.suspend(false);
    expect(scroller.center(target)).toBe(false);
    expect(container.scrollTop).toBe(browsedOffset);
    expect(frames.size).toBe(0);
    expect(changes).toEqual([true]);
    scroller.resume();
    expect(changes).toEqual([true, false]);
    expect(scroller.center(target)).toBe(true);
    scroller.destroy();
  });

  test("suspending a glide ignores its queued programmatic scroll event", () => {
    const { scroller, container, target, frames, advance } = fixture();
    scroller.center(target);
    advance(16);
    scroller.suspend(true);
    container.dispatchEvent(new Event("scroll"));
    expect(scroller.isBrowsing()).toBe(false);
    expect(frames.size).toBe(0);
    scroller.suspend(false);
    expect(scroller.center(target)).toBe(true);
    scroller.destroy();
  });

  test("a settled follower does not enter browsing when a larger viewport clamps its offset", () => {
    const { scroller, container, target, frames, advance } = fixture();
    scroller.center(target);
    for (let count = 0; count < 100 && frames.size; count++) advance(16);
    expect(frames.size).toBe(0);
    container.clientHeight = 500;
    container.scrollTop = container.scrollHeight - container.clientHeight;
    container.dispatchEvent(new Event("scroll"));
    expect(scroller.isBrowsing()).toBe(false);
    expect(scroller.center(target)).toBe(true);
    scroller.destroy();
  });

  test("a pointer click can pause a glide without entering browsing, but scrollbar movement takes over", () => {
    const { scroller, container, target, frames } = fixture();
    scroller.center(target);
    container.dispatchEvent(new Event("pointerdown"));
    expect(frames.size).toBe(0);
    expect(scroller.isBrowsing()).toBe(false);
    container.dispatchEvent(new Event("scroll"));
    expect(scroller.isBrowsing()).toBe(false);
    container.scrollTop += 40;
    container.dispatchEvent(new Event("scroll"));
    expect(scroller.isBrowsing()).toBe(true);
    expect(scroller.center(target)).toBe(false);
    scroller.destroy();
  });

  test("keyboard browsing takes over and changing to reduced motion lands an active glide immediately", () => {
    const { scroller, container, target, preference, frames, advance } = fixture();
    scroller.center(target);
    advance(16);
    preference.matches = true;
    preference.dispatchEvent(new Event("change"));
    expect(container.scrollTop).toBe(452);
    expect(frames.size).toBe(0);
    expect(scroller.isBrowsing()).toBe(false);
    const key = new Event("keydown");
    Object.defineProperty(key, "key", { value: "PageUp" });
    container.dispatchEvent(key);
    expect(scroller.isBrowsing()).toBe(true);
    scroller.resume();
    expect(scroller.center(target)).toBe(false);
    expect(container.scrollTop).toBe(452);
    scroller.destroy();
  });

  test("settles precisely when the browser rounds scrollTop at high frame rates", () => {
    let nextFrameId = 0;
    let now = performance.now();
    const frames = new Map<number, FrameRequestCallback>();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { matchMedia: () => ({ matches: false }) },
    });
    Object.defineProperty(globalThis, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        const id = ++nextFrameId;
        frames.set(id, callback);
        return id;
      },
    });
    Object.defineProperty(globalThis, "cancelAnimationFrame", {
      configurable: true,
      value: (id: number) => frames.delete(id),
    });

    class RoundedScrollContainer extends EventTarget {
      clientHeight = 160;
      isConnected = true;
      scrollHeight = 900;
      offset = 0;
      get scrollTop() { return this.offset; }
      set scrollTop(value: number) { this.offset = Math.round(value); }
      getBoundingClientRect() { return { top: 0 } as DOMRect; }
    }
    const container = new RoundedScrollContainer();
    const target = {
      isConnected: true,
      getBoundingClientRect: () => ({ top: 520.25 - container.scrollTop, height: 24 } as DOMRect),
    } as HTMLElement;
    const scroller = createLyricAutoScroller(container as unknown as HTMLElement);
    expect(scroller.center(target)).toBe(true);
    for (let count = 0; count < 200 && frames.size; count++) {
      now += 8;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(now));
    }
    expect(Math.abs(container.scrollTop - 452.25)).toBeLessThan(0.5);
    expect(frames.size).toBe(0);
    scroller.destroy();
  });

  test("keeps gliding when a native resize clamps the scroll offset", () => {
    let nextFrameId = 0;
    let now = performance.now();
    const frames = new Map<number, FrameRequestCallback>();

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { matchMedia: () => ({ matches: false }) },
    });
    Object.defineProperty(globalThis, "requestAnimationFrame", {
      configurable: true,
      value: (callback: FrameRequestCallback) => {
        const id = ++nextFrameId;
        frames.set(id, callback);
        return id;
      },
    });
    Object.defineProperty(globalThis, "cancelAnimationFrame", {
      configurable: true,
      value: (id: number) => frames.delete(id),
    });

    class FakeScrollContainer extends EventTarget {
      clientHeight = 160;
      isConnected = true;
      scrollHeight = 900;
      scrollTop = 0;

      getBoundingClientRect() {
        return { height: this.clientHeight, top: 0 } as DOMRect;
      }
    }

    const container = new FakeScrollContainer();
    const target = {
      isConnected: true,
      getBoundingClientRect: () => ({
        height: 24,
        top: 520 - container.scrollTop,
      } as DOMRect),
    } as HTMLElement;

    const runFrame = () => {
      now += 16;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach((callback) => callback(now));
    };

    const scroller = createLyricAutoScroller(container as unknown as HTMLElement);
    scroller.center(target);
    runFrame();
    expect(container.scrollTop).toBeGreaterThan(0);
    expect(frames.size).toBe(1);

    container.scrollTop = 0;
    container.dispatchEvent(new Event("scroll"));
    expect(frames.size).toBe(1);

    runFrame();
    expect(container.scrollTop).toBeGreaterThan(0);

    container.dispatchEvent(new Event("wheel"));
    expect(frames.size).toBe(0);
    scroller.destroy();
  });
});
