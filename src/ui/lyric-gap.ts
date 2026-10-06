export function createLyricGap() {
  const gap = document.createElement("span");
  gap.className = "spotify-lyric-gap";
  gap.setAttribute("role", "img");
  gap.setAttribute("aria-label", "Instrumental break");
  for (let index = 0; index < 3; index++) {
    const dot = document.createElement("span");
    dot.className = "spotify-lyric-gap-dot";
    dot.style.setProperty("--spotify-lyric-dot-index", String(index));
    dot.setAttribute("aria-hidden", "true");
    gap.appendChild(dot);
  }
  return gap;
}

/** Fade the breath just before the next explicitly timed line begins. */
export function updateLyricGap(container: HTMLElement, remainingMs: number, hasGap: boolean) {
  if (!hasGap) {
    container.style.removeProperty("--spotify-lyric-gap-opacity");
    return;
  }
  container.style.setProperty("--spotify-lyric-gap-opacity", String(Math.min(1, Math.max(0, remainingMs / 350))));
}
