interface RangeCommitOptions {
  onPreview?: (value: number) => void;
  onCommit: (value: number) => void;
  onInteractChange?: (active: boolean) => void;
  stopPropagation?: boolean;
}

interface ProgressCommitOptions {
  getMaxValue: () => number;
  onPreview: (value: number) => void;
  onCommit: (value: number) => void;
  onInteractChange?: (active: boolean) => void;
  stopPropagation?: boolean;
}

export function bindRangeCommitOnRelease(
  input: HTMLInputElement,
  options: RangeCommitOptions
): () => void {
  let interacting = false;

  function setInteracting(active: boolean) {
    if (interacting === active) return;
    interacting = active;
    options.onInteractChange?.(active);
  }

  function stopEvent(event: Event) {
    if (options.stopPropagation) event.stopPropagation();
  }

  function readValue(): number {
    return Number.parseInt(input.value, 10);
  }

  const handlePointerDown = (event: PointerEvent) => {
    stopEvent(event);
    setInteracting(true);
  };

  const handlePointerMove = (event: PointerEvent) => {
    stopEvent(event);
  };

  const handlePointerUp = (event: PointerEvent) => {
    stopEvent(event);
    setInteracting(false);
  };

  const handleTouchStart = (event: TouchEvent) => {
    stopEvent(event);
    setInteracting(true);
  };

  const handleTouchMove = (event: TouchEvent) => {
    stopEvent(event);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    stopEvent(event);
    setInteracting(false);
  };

  const handleClick = (event: MouseEvent) => {
    stopEvent(event);
  };

  const handleInput = (event: Event) => {
    stopEvent(event);
    setInteracting(true);
    options.onPreview?.(readValue());
  };

  const handleChange = (event: Event) => {
    stopEvent(event);
    const value = readValue();
    options.onPreview?.(value);
    options.onCommit(value);
    setInteracting(false);
  };

  const handleCancel = () => {
    setInteracting(false);
  };

  input.addEventListener("pointerdown", handlePointerDown);
  input.addEventListener("pointermove", handlePointerMove);
  input.addEventListener("pointerup", handlePointerUp);
  input.addEventListener("touchstart", handleTouchStart, { passive: true });
  input.addEventListener("touchmove", handleTouchMove, { passive: true });
  input.addEventListener("touchend", handleTouchEnd, { passive: true });
  input.addEventListener("click", handleClick);
  input.addEventListener("input", handleInput);
  input.addEventListener("change", handleChange);
  input.addEventListener("blur", handleCancel);
  input.addEventListener("pointercancel", handleCancel);
  input.addEventListener("lostpointercapture", handleCancel);

  return () => {
    input.removeEventListener("pointerdown", handlePointerDown);
    input.removeEventListener("pointermove", handlePointerMove);
    input.removeEventListener("pointerup", handlePointerUp);
    input.removeEventListener("touchstart", handleTouchStart);
    input.removeEventListener("touchmove", handleTouchMove);
    input.removeEventListener("touchend", handleTouchEnd);
    input.removeEventListener("click", handleClick);
    input.removeEventListener("input", handleInput);
    input.removeEventListener("change", handleChange);
    input.removeEventListener("blur", handleCancel);
    input.removeEventListener("pointercancel", handleCancel);
    input.removeEventListener("lostpointercapture", handleCancel);
  };
}

export function bindProgressCommitOnRelease(
  bar: HTMLElement,
  options: ProgressCommitOptions
): () => void {
  let interacting = false;
  let activePointerId: number | null = null;
  let previewValue = 0;

  function setInteracting(active: boolean) {
    if (interacting === active) return;
    interacting = active;
    options.onInteractChange?.(active);
  }

  function stopEvent(event: Event) {
    if (options.stopPropagation) event.stopPropagation();
  }

  function readValueFromClientX(clientX: number): number | null {
    const maxValue = options.getMaxValue();
    if (!Number.isFinite(maxValue) || maxValue <= 0) return null;

    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0) return null;

    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * maxValue);
  }

  function previewAt(clientX: number): number | null {
    const nextValue = readValueFromClientX(clientX);
    if (nextValue === null) return null;
    previewValue = nextValue;
    options.onPreview(nextValue);
    return nextValue;
  }

  function endInteraction(commit: boolean) {
    if (activePointerId !== null && bar.hasPointerCapture(activePointerId)) {
      bar.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
    if (commit) {
      options.onCommit(previewValue);
    }
    setInteracting(false);
  }

  const handlePointerDown = (event: PointerEvent) => {
    stopEvent(event);
    if (event.button !== 0) return;
    const nextValue = previewAt(event.clientX);
    if (nextValue === null) return;
    activePointerId = event.pointerId;
    setInteracting(true);
    try {
      bar.setPointerCapture(event.pointerId);
    } catch {}
  };

  const handlePointerMove = (event: PointerEvent) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId) return;
    previewAt(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId) return;
    previewAt(event.clientX);
    endInteraction(true);
  };

  const handlePointerCancel = (event: PointerEvent) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId) return;
    endInteraction(false);
  };

  const handleClick = (event: MouseEvent) => {
    stopEvent(event);
    event.preventDefault();
  };

  const handleTouchStart = (event: TouchEvent) => {
    stopEvent(event);
  };

  const handleTouchMove = (event: TouchEvent) => {
    stopEvent(event);
  };

  const handleTouchEnd = (event: TouchEvent) => {
    stopEvent(event);
  };

  bar.addEventListener("pointerdown", handlePointerDown);
  bar.addEventListener("pointermove", handlePointerMove);
  bar.addEventListener("pointerup", handlePointerUp);
  bar.addEventListener("pointercancel", handlePointerCancel);
  bar.addEventListener("click", handleClick);
  bar.addEventListener("touchstart", handleTouchStart, { passive: true });
  bar.addEventListener("touchmove", handleTouchMove, { passive: true });
  bar.addEventListener("touchend", handleTouchEnd, { passive: true });

  return () => {
    bar.removeEventListener("pointerdown", handlePointerDown);
    bar.removeEventListener("pointermove", handlePointerMove);
    bar.removeEventListener("pointerup", handlePointerUp);
    bar.removeEventListener("pointercancel", handlePointerCancel);
    bar.removeEventListener("click", handleClick);
    bar.removeEventListener("touchstart", handleTouchStart);
    bar.removeEventListener("touchmove", handleTouchMove);
    bar.removeEventListener("touchend", handleTouchEnd);
  };
}

