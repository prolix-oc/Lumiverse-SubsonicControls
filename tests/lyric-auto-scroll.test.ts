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
