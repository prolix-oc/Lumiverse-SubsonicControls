import type { PlaybackState } from "../types";
import { createCrossfadeArt, getTrackScopedArtUrl } from "./crossfade-art";

export interface NowPlayingUI { root: HTMLElement; update(state: PlaybackState | null, connected: boolean): void; destroy(): void; }
export function createNowPlayingUI(): NowPlayingUI {
  const root = document.createElement("div"); root.className = "spotify-section";
  const title = document.createElement("h3"); title.className = "spotify-section-title"; title.textContent = "Now Playing";
  const body = document.createElement("div"); body.className = "spotify-now-playing";
  const art = createCrossfadeArt("spotify-album-art");
  const info = document.createElement("div"); info.className = "spotify-track-info";
  const track = document.createElement("div"); track.className = "spotify-track-name";
  const artist = document.createElement("div"); artist.className = "spotify-track-artist";
  const album = document.createElement("div"); album.className = "spotify-track-album";
  const source = document.createElement("div"); source.className = "spotify-track-device";
  info.append(track, artist, album, source); body.append(art.el, info);
  const empty = document.createElement("div"); empty.className = "spotify-empty";
  root.append(title, body, empty);
  return { root, update(state, connected) {
    if (!connected) { body.style.display = "none"; empty.style.display = ""; empty.textContent = "Connect a music source to get started"; art.setUrl(null); return; }
    if (!state) { body.style.display = "none"; empty.style.display = ""; empty.textContent = "No active playback reported"; art.setUrl(null); return; }
    body.style.display = "flex"; empty.style.display = "none"; track.textContent = state.trackName; artist.textContent = state.artistName; album.textContent = state.albumName; source.textContent = state.source === "jukebox" ? "Server Jukebox" : state.source === "feishin" ? "Feishin Desktop" : "Server now playing"; art.setUrl(getTrackScopedArtUrl(state.albumArtUrl, state.trackUri));
  }, destroy() { art.destroy(); root.remove(); } };
}
