export interface LyricMotionLine {
  index: number;
  /** Layout stays fixed while the inner row moves. */
  anchorEl: HTMLElement;
  el: HTMLElement;
}

export function getLyricMotionTiming(remainingMs = Infinity) {
  const durationMs = Math.min(360, Math.max(80, remainingMs * 0.65));
  return {
    durationMs,
    staggerMs: durationMs / 15,
    arrivalMs: durationMs + 20,
    releaseMs: Math.min(190, durationMs * 0.55),
    highlightMs: Math.min(140, durationMs * 0.4),
    scrollTimeConstantMs: Math.max(25, durationMs / (360 / 85)),
  };
}

/** A small trailing wave layered over the shared scroll follower. */
export function createLyricLineMotion(container: HTMLElement) {
  const animations = new Map<HTMLElement, Animation>();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let timing = getLyricMotionTiming();

  function setCadence(remainingMs: number) {
    timing = getLyricMotionTiming(remainingMs);
    container.style.setProperty("--spotify-lyric-arrival-ms", `${timing.arrivalMs}ms`);
    container.style.setProperty("--spotify-lyric-release-ms", `${timing.releaseMs}ms`);
    container.style.setProperty("--spotify-lyric-highlight-ms", `${timing.highlightMs}ms`);
    return timing;
  }

  function cancel() {
    animations.forEach((animation) => animation.cancel());
    animations.clear();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) cancel();
  }

  function currentOffset(el: HTMLElement): number {
    const transform = getComputedStyle(el).transform;
    if (transform === "none") return 0;
    const values = transform.slice(transform.indexOf("(") + 1, -1).split(",").map(Number);
    return values[transform.startsWith("matrix3d") ? 13 : 5] || 0;
  }

  function play(lines: readonly LyricMotionLine[], previousIndex: number, activeIndex: number) {
    // Initial positioning, seeks, and clock corrections get a quiet landing.
    if (reducedMotion.matches || previousIndex < 0 || activeIndex !== previousIndex + 1) {
      cancel();
      return;
    }

    const viewport = container.getBoundingClientRect();
    if (!container.isConnected || container.clientHeight === 0) {
      cancel();
      return;
    }

    // Capture the rendered offsets before cancelling so rapid lyric changes
    // continue from their current positions instead of restarting at zero.
    const visible = lines.flatMap((line) => {
      const distance = Math.abs(line.index - activeIndex);
      if (distance > 4) return [];
      const rect = line.anchorEl.getBoundingClientRect();
      if (rect.bottom < viewport.top || rect.top > viewport.bottom) return [];
      return [{ line, distance, height: rect.height, offset: animations.has(line.el) ? currentOffset(line.el) : 0 }];
    });
    cancel();

    visible.forEach(({ line, distance, height, offset }) => {
      if (distance === 0 && Math.abs(offset) < 0.1) return;
      const amplitude = distance === 0 ? 0 : Math.min(8, height * 0.18 + distance * 0.7);
      const trail = line.index < activeIndex ? amplitude * 0.65 : amplitude;
      const animation = line.el.animate(
        distance === 0
          ? [{ transform: `translateY(${offset}px)` }, { transform: "translateY(0)" }]
          : [
            { transform: `translateY(${offset}px)`, offset: 0, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
            { transform: `translateY(${trail}px)`, offset: 0.25, easing: "cubic-bezier(0.25, 0.7, 0.5, 1)" },
            { transform: "translateY(0)", offset: 1 },
          ],
        {
          duration: distance === 0 ? Math.min(180, timing.durationMs) : timing.durationMs,
          delay: Math.min(distance, 3) * timing.staggerMs,
          easing: distance === 0 ? "ease-out" : "linear",
          fill: "backwards",
        },
      );
      animations.set(line.el, animation);
      animation.onfinish = () => {
        if (animations.get(line.el) === animation) animations.delete(line.el);
      };
    });
  }

  container.addEventListener("wheel", cancel, { passive: true });
  container.addEventListener("touchmove", cancel, { passive: true });
  container.addEventListener("pointerdown", cancel, { passive: true });
  container.addEventListener("keydown", handleKeyDown);
  reducedMotion.addEventListener("change", cancel);

  return {
    play,
    setCadence,
    cancel,
    destroy() {
      cancel();
      container.removeEventListener("wheel", cancel);
      container.removeEventListener("touchmove", cancel);
      container.removeEventListener("pointerdown", cancel);
      container.removeEventListener("keydown", handleKeyDown);
      reducedMotion.removeEventListener("change", cancel);
    },
  };
}
