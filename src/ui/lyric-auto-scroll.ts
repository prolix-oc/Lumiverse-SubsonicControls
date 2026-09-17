const USER_SCROLL_SUPPRESS_MS = 2500;

/**
 * Rate at which the track eases toward its target, expressed as a time
 * constant. Because this is a rate rather than a duration, a one-line nudge and
 * a ten-line jump settle on the same clock instead of snapping at different
 * speeds the way `scroll-behavior: smooth` does.
 */
const SCROLL_TIME_CONSTANT_MS = 85;
/**
 * Ceiling on one frame's travel (about 0.85 of a line height at 60Hz). Normal
 * line-to-line moves never reach it; it exists so a seek across many lines
 * cruises instead of flinging the track past the eye.
 */
const SCROLL_MAX_SPEED_PX_PER_S = 1800;
/** Distance from the target at which the glide ends and the exact offset lands. */
const SCROLL_SETTLE_PX = 0.5;

export interface LyricAutoScroller {
  /** Ease `target` toward the vertical midpoint of the container. */
  center(target: HTMLElement, options?: { force?: boolean }): void;
  /** Pause auto-centering; returns whether this call changed that state. */
  suspend(suspended: boolean): boolean;
  /** Abandon any in-flight glide, e.g. before the track is rebuilt. */
  cancel(): void;
  destroy(): void;
}

/**
 * Keeps the sung lyric line centered inside its scrolling container.
 *
 * The browser's native smooth scrolling is a poor fit for lyric playback: every
 * call starts from a standstill, its duration is fixed rather than tuned to the
 * lyric highlight, and a line that lands mid-flight makes the track visibly
 * hitch. Easing toward a moving target on each frame instead carries its
 * momentum through interruptions, so consecutive lines glide into place and a
 * line change mid-scroll simply bends toward the new position.
 */
export function createLyricAutoScroller(container: HTMLElement): LyricAutoScroller {
  let frame: number | null = null;
  let target: HTMLElement | null = null;
  /** Offset our last write produced, used to tell our scrolls from the user's. */
  let expected: number | null = null;
  let lastUserScrollAt = 0;
  let suspended = false;
  let previousFrameAt = 0;

  /**
   * Offset that puts `element`'s midpoint at the container's. Re-measured every
   * frame rather than cached: the rects a freshly restyled line reports during
   * the current task sit a pixel or two off, and artwork or a font swap can
   * shift the track mid-glide.
   */
  function centringOffset(element: HTMLElement): number {
    const containerRect = container.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();
    const limit = Math.max(0, container.scrollHeight - container.clientHeight);
    return Math.min(
      Math.max(
        container.scrollTop + (targetRect.top + targetRect.height / 2) - (containerRect.top + container.clientHeight / 2),
        0,
      ),
      limit,
    );
  }

  function stop() {
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
    target = null;
  }

  function noteUserScroll() {
    stop();
    expected = null;
    lastUserScrollAt = Date.now();
  }

  function cancel() {
    stop();
    expected = null;
  }

  function step(now: number) {
    frame = null;
    if (target === null || !target.isConnected || !container.isConnected) {
      stop();
      return;
    }
    // A stalled tab must not teleport the track, so bound the elapsed time.
    const elapsed = Math.min(Math.max(now - previousFrameAt, 0), 100);
    previousFrameAt = now;
    const limit = Math.max(0, container.scrollHeight - container.clientHeight);
    const goal = centringOffset(target);
    const remaining = goal - container.scrollTop;
    if (Math.abs(remaining) < SCROLL_SETTLE_PX) {
      expected = goal;
      container.scrollTop = goal;
      stop();
      return;
    }
    const eased = remaining * (1 - Math.exp(-elapsed / SCROLL_TIME_CONSTANT_MS));
    const ceiling = SCROLL_MAX_SPEED_PX_PER_S * (elapsed / 1000);
    const travel = Math.abs(eased) > ceiling ? Math.sign(eased) * ceiling : eased;
    const next = Math.min(Math.max(container.scrollTop + travel, 0), limit);
    expected = next;
    container.scrollTop = next;
    frame = requestAnimationFrame(step);
  }

  container.addEventListener("wheel", noteUserScroll, { passive: true });
  container.addEventListener("touchmove", noteUserScroll, { passive: true });
  container.addEventListener("pointerdown", noteUserScroll, { passive: true });
  // Scrollbar drags and momentum arrive without a pointer event on the content,
  // so anything that moved the track away from our own last write counts as the
  // user taking over.
  function handleScroll() {
    if (expected !== null && Math.abs(container.scrollTop - expected) <= 1) return;
    noteUserScroll();
  }
  container.addEventListener("scroll", handleScroll, { passive: true });

  return {
    center(targetEl, options) {
      if (suspended) return;
      if (!options?.force && Date.now() - lastUserScrollAt <= USER_SCROLL_SUPPRESS_MS) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        stop();
        expected = centringOffset(targetEl);
        container.scrollTop = expected;
        return;
      }
      target = targetEl;
      // The first write waits for the next frame so a freshly rebuilt track is
      // laid out before the glide starts.
      if (frame === null) {
        previousFrameAt = performance.now();
        frame = requestAnimationFrame(step);
      }
    },
    suspend(next) {
      if (suspended === next) return false;
      suspended = next;
      if (suspended) cancel();
      return true;
    },
    cancel,
    destroy() {
      cancel();
      container.removeEventListener("wheel", noteUserScroll);
      container.removeEventListener("touchmove", noteUserScroll);
      container.removeEventListener("pointerdown", noteUserScroll);
      container.removeEventListener("scroll", handleScroll);
    },
  };
}
