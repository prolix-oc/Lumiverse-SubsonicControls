import type { SearchResult } from "../types";
const PLAY = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const QUEUE = `<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>`;
export interface SearchUI { root: HTMLElement; setResults(results: SearchResult[]): void; destroy(): void; }
export function createSearchUI(send: (message: unknown) => void): SearchUI {
  const root = document.createElement("div"); root.className = "subsonic-section";
  const title = document.createElement("h3"); title.className = "subsonic-section-title"; title.textContent = "Library Search";
  const input = document.createElement("input"); input.className = "subsonic-search-input"; input.placeholder = "Search your server's music library…";
  const list = document.createElement("div"); list.className = "subsonic-search-results"; root.append(title, input, list);
  let timer: ReturnType<typeof setTimeout> | null = null;
  input.oninput = () => { if (timer) clearTimeout(timer); timer = setTimeout(() => { const query = input.value.trim(); if (query.length >= 2) send({ type: "search", query }); else list.innerHTML = ""; }, 350); };
  const setResults = (results: SearchResult[]) => { list.innerHTML = ""; if (!results.length) { const empty = document.createElement("div"); empty.className = "subsonic-empty"; empty.textContent = "No tracks found"; list.appendChild(empty); return; }
    for (const result of results) { const item = document.createElement("div"); item.className = "subsonic-search-item";
      if (result.albumArtUrl) { const image = document.createElement("img"); image.className = "subsonic-search-item-art"; image.src = result.albumArtUrl; image.alt = result.album; item.appendChild(image); }
      const info = document.createElement("div"); info.className = "subsonic-search-item-info"; const name = document.createElement("div"); name.className = "subsonic-search-item-name"; name.textContent = result.name; const detail = document.createElement("div"); detail.className = "subsonic-search-item-artist"; detail.textContent = `${result.artist} — ${result.album}`; info.append(name, detail);
      const actions = document.createElement("div"); actions.className = "subsonic-search-item-actions"; const play = document.createElement("button"); play.className = "subsonic-search-item-btn"; play.title = "Play in server Jukebox"; play.innerHTML = PLAY; play.onclick = () => send({ type: "play", trackUri: result.uri }); const queue = document.createElement("button"); queue.className = "subsonic-search-item-btn"; queue.title = "Add to server Jukebox queue"; queue.innerHTML = QUEUE; queue.onclick = () => send({ type: "queue", trackUri: result.uri }); actions.append(play, queue); item.append(info, actions); list.appendChild(item); }
  };
  return { root, setResults, destroy() { if (timer) clearTimeout(timer); root.remove(); } };
}
