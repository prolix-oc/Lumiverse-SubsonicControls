import { createLyricAutoScroller } from "./lyric-auto-scroll";

/** Shared boundary spacing and browsing controls for both lyric surfaces. */
export function createLyricViewport(container: HTMLElement, centerActiveLine: () => void) {
  const returnButton = document.createElement("button");
  returnButton.type = "button";
  returnButton.className = "spotify-lyrics-return-live";
  returnButton.textContent = "Return to live lyrics";
  returnButton.hidden = true;
  container.tabIndex = 0;
  container.setAttribute("aria-label", "Lyrics");
  let anchors: readonly HTMLElement[] = [];
  let layoutFrame: number | null = null;
  const autoScroll = createLyricAutoScroller(container, (browsing) => {
    returnButton.hidden = !browsing || anchors.length === 0;
  });

  function refreshLayout() {
    layoutFrame = null;
    if (!anchors.length || !container.isConnected || container.clientHeight === 0) return;
    const firstHeight = anchors[0].offsetHeight;
    const lastHeight = anchors[anchors.length - 1].offsetHeight;
    container.style.setProperty("--spotify-lyrics-leading-space", `${Math.max(0, (container.clientHeight - firstHeight) / 2)}px`);
    container.style.setProperty("--spotify-lyrics-trailing-space", `${Math.max(0, (container.clientHeight - lastHeight) / 2)}px`);
    centerActiveLine();
  }

  function scheduleLayout() {
    if (layoutFrame === null) layoutFrame = requestAnimationFrame(refreshLayout);
  }
  const observer = new ResizeObserver(scheduleLayout);

  function setLines(lines: readonly HTMLElement[]) {
    autoScroll.cancel();
    anchors = lines;
    autoScroll.resume();
    returnButton.hidden = true;
    container.dataset.synced = String(lines.length > 0);
    observer.disconnect();
    if (layoutFrame !== null) cancelAnimationFrame(layoutFrame);
    layoutFrame = null;
    if (lines.length) {
      observer.observe(container);
      observer.observe(lines[0]);
      if (lines.length > 1) observer.observe(lines[lines.length - 1]);
      scheduleLayout();
    } else {
      container.style.removeProperty("--spotify-lyrics-leading-space");
      container.style.removeProperty("--spotify-lyrics-trailing-space");
    }
  }

  returnButton.addEventListener("click", () => {
    autoScroll.resume();
    centerActiveLine();
    container.focus({ preventScroll: true });
  });

  return {
    autoScroll,
    returnButton,
    setLines,
    reset: () => setLines([]),
    destroy() {
      if (layoutFrame !== null) cancelAnimationFrame(layoutFrame);
      observer.disconnect();
      autoScroll.destroy();
      returnButton.remove();
    },
  };
}
