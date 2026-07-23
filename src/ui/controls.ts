import type { PlaybackState } from "../types";

const PREVIOUS = `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
const PLAY = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const PAUSE = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const NEXT = `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;

export interface ControlsUI { root: HTMLElement; update(state: PlaybackState | null, connected: boolean, jukeboxEnabled: boolean): void; destroy(): void; }
export function createControlsUI(send: (message: unknown) => void): ControlsUI {
  const root = document.createElement("div"); root.className = "spotify-section";
  const title = document.createElement("h3"); title.className = "spotify-section-title"; title.textContent = "Jukebox Controls";
  const row = document.createElement("div"); row.className = "spotify-controls";
  const button = (icon: string, className = "") => { const element = document.createElement("button"); element.className = `spotify-ctrl-btn ${className}`; element.innerHTML = icon; return element; };
  const previous = button(PREVIOUS); const playPause = button(PLAY, "spotify-ctrl-btn-main"); const next = button(NEXT);
  previous.onclick = () => send({ type: "previous" }); next.onclick = () => send({ type: "next" });
  let isPlaying = false;
  playPause.onclick = () => send({ type: isPlaying ? "pause" : "play" });
  row.append(previous, playPause, next); root.append(title, row);
  return { root, update(state, connected, jukeboxEnabled) { root.style.display = connected && jukeboxEnabled ? "" : "none"; isPlaying = !!state?.isPlaying; playPause.innerHTML = isPlaying ? PAUSE : PLAY; }, destroy() { root.remove(); } };
}
