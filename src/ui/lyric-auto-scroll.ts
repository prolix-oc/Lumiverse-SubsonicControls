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
  /** Center a fixed layout anchor; return whether an animated glide was accepted. */
  center(target: HTMLElement, options?: { timeConstantMs?: number }): boolean;
  /** Pause auto-centering; returns whether this call changed that state. */
  suspend(suspended: boolean): boolean;
  /** Abandon any in-flight glide, e.g. before the track is rebuilt. */
  cancel(): void;
  /** Explicitly return from lyric browsing to playback following. */
  resume(): void;
  isBrowsing(): boolean;
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
export function createLyricAutoScroller(container: HTMLElement, onBrowsingChange?: (browsing: boolean) => void): LyricAutoScroller {
  let frame: number | null = null;
  let target: HTMLElement | null = null;
  /** Offset our last write produced, used to tell our scrolls from the user's. */
  let expected: number | null = null;
  let browsing = false;
  let suspended = false;
  let previousFrameAt = 0;
  // Some browsers round scrollTop writes. Keep the fractional travel between
  // frames so a small remaining distance cannot stall the follower forever.
  let position: number | null = null;
  let timeConstantMs = SCROLL_TIME_CONSTANT_MS;
  let layoutHeight = container.clientHeight;
  let layoutScrollHeight = container.scrollHeight;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function rememberLayout() {
    layoutHeight = container.clientHeight;
    layoutScrollHeight = container.scrollHeight;
  }

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
    position = null;
  }

  function noteUserScroll() {
    stop();
    expected = null;
    if (!browsing) {
      browsing = true;
      onBrowsingChange?.(true);
    }
  }

  function handlePointerDown() {
    stop();
    expected = container.scrollTop;
    rememberLayout();
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) noteUserScroll();
  }

  function handleMotionChange() {
    if (!reducedMotion.matches || !target) return;
    const goal = centringOffset(target);
    stop();
    expected = goal;
    container.scrollTop = goal;
  }

  function cancel() {
    stop();
    // A scroll event from our final write may still be queued. Cancelling for
    // a menu or layout change must not mistake that event for manual browsing.
    expected = container.scrollTop;
    rememberLayout();
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
    if (position === null || expected === null || Math.abs(container.scrollTop - expected) > 1) {
      position = container.scrollTop;
    }
    const remaining = goal - position;
    if (Math.abs(remaining) < SCROLL_SETTLE_PX) {
      expected = goal;
      container.scrollTop = goal;
      stop();
      return;
    }
    const eased = remaining * (1 - Math.exp(-elapsed / timeConstantMs));
    const ceiling = SCROLL_MAX_SPEED_PX_PER_S * (elapsed / 1000);
    const travel = Math.abs(eased) > ceiling ? Math.sign(eased) * ceiling : eased;
    const next = Math.min(Math.max(position + travel, 0), limit);
    position = next;
    expected = next;
    container.scrollTop = next;
    frame = requestAnimationFrame(step);
  }

  container.addEventListener("wheel", noteUserScroll, { passive: true });
  container.addEventListener("touchmove", noteUserScroll, { passive: true });
  container.addEventListener("pointerdown", handlePointerDown, { passive: true });
  container.addEventListener("keydown", handleKeyDown);
  reducedMotion.addEventListener?.("change", handleMotionChange);
  // Scrollbar drags and momentum arrive without a pointer event on the content,
  // so anything that moved the track away from our own last write counts as the
  // user taking over. Ignore scroll events while a glide is active: resizing a
  // native pop-out can clamp scrollTop and emit a scroll event even though the
  // user did not touch the lyric viewport. Real wheel/touch/pointer input is
  // handled above and cancels the glide before its scroll event arrives.
  function handleScroll() {
    const layoutChanged = layoutHeight !== container.clientHeight || layoutScrollHeight !== container.scrollHeight;
    rememberLayout();
    if (frame !== null || target !== null) return;
    // A settled follower can also be clamped when controls disappear or the
    // window grows. ResizeObserver will recenter once spacing is updated.
    if (layoutChanged) {
      expected = container.scrollTop;
      return;
    }
    if (expected !== null && Math.abs(container.scrollTop - expected) <= 1) return;
    noteUserScroll();
  }
  container.addEventListener("scroll", handleScroll, { passive: true });

  return {
    center(targetEl, options) {
      if (suspended || browsing) return false;
      rememberLayout();
      if (reducedMotion.matches) {
        stop();
        expected = centringOffset(targetEl);
        container.scrollTop = expected;
        return false;
      }
      target = targetEl;
      timeConstantMs = Math.max(1, options?.timeConstantMs ?? SCROLL_TIME_CONSTANT_MS);
      // The first write waits for the next frame so a freshly rebuilt track is
      // laid out before the glide starts.
      if (frame === null) {
        previousFrameAt = performance.now();
        frame = requestAnimationFrame(step);
      }
      return true;
    },
    suspend(next) {
      if (suspended === next) return false;
      suspended = next;
      if (suspended) cancel();
      return true;
    },
    cancel,
    resume() {
      if (!browsing) return;
      browsing = false;
      onBrowsingChange?.(false);
    },
    isBrowsing: () => browsing,
    destroy() {
      cancel();
      container.removeEventListener("wheel", noteUserScroll);
      container.removeEventListener("touchmove", noteUserScroll);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("keydown", handleKeyDown);
      container.removeEventListener("scroll", handleScroll);
      reducedMotion.removeEventListener?.("change", handleMotionChange);
    },
  };
}
