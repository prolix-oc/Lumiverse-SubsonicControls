import type { PlaybackState } from "../types";

export interface LyricsUI {
  root: HTMLElement;
  update(trackId: string | null, plainLyrics: string | null, syncedLyrics: string | null, instrumental: boolean): void;
  updatePlayback(state: PlaybackState | null): void;
  setLoading(loading: boolean): void;
  clear(): void;
  destroy(): void;
}

export function createLyricsUI(): LyricsUI {
  const root = document.createElement("section"); root.className = "subsonic-section subsonic-lyrics-section";
  const title = document.createElement("h3"); title.className = "subsonic-section-title"; title.textContent = "Lyrics";
  const body = document.createElement("div"); body.className = "subsonic-lyrics-body";
  root.append(title, body);
  const show = (text: string, className = "") => { body.className = `subsonic-lyrics-body ${className}`.trim(); body.textContent = text; };
  return {
    root,
    update(_trackId, plainLyrics, syncedLyrics, instrumental) {
      if (instrumental) show("Instrumental");
      else if (syncedLyrics || plainLyrics) show(syncedLyrics || plainLyrics || "", "subsonic-lyrics-text");
      else show("No lyrics are available for this track.");
    },
    updatePlayback(_state) {},
    setLoading(loading) { if (loading) show("Loading lyrics…", "subsonic-lyrics-loading"); },
    clear() { show(""); },
    destroy() { root.remove(); },
  };
}
