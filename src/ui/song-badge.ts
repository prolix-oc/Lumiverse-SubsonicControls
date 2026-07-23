import type { SpindleFrontendContext } from "lumiverse-spindle-types";
import type { MessageSongEntry, SongSnapshot } from "../types";
import { createCrossfadeArt, getTrackScopedArtUrl } from "./crossfade-art";

const NOTE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
const PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;

export interface SongBadgeManager {
  setChatSongs(chatId: string, entries: MessageSongEntry[]): void;
  setMessageSong(chatId: string, messageId: string, swipeId: number, snapshot: SongSnapshot): void;
  decorate(messageId: string): void;
  setActiveSwipe(messageId: string, swipeId: number): void;
  removeMessage(messageId: string): void;
  reset(): void;
  destroy(): void;
}

export function createSongBadgeManager(ctx: SpindleFrontendContext, send: (message: unknown) => void): SongBadgeManager {
  const cache = new Map<string, Map<number, SongSnapshot>>();
  const activeSwipe = new Map<string, number>();
  const badges = new Map<string, Element>();
  let currentChatId: string | null = null;
  let openMessageId: string | null = null;
  let popover: HTMLElement | null = null;
  let popArt: ReturnType<typeof createCrossfadeArt> | null = null;
  let popTrack: HTMLElement | null = null;
  let popArtist: HTMLElement | null = null;
  let popAlbum: HTMLElement | null = null;
  let popPlay: HTMLButtonElement | null = null;

  const snapshotFor = (messageId: string) => cache.get(messageId)?.get(activeSwipe.get(messageId) ?? 0) || null;

  function closePopover() {
    popover?.classList.remove("open");
    openMessageId = null;
  }

  function ensurePopover() {
    if (popover) return;
    popover = document.createElement("div");
    popover.className = "spotify-song-pop";
    const header = document.createElement("div"); header.className = "spotify-song-pop-header"; header.textContent = "Playing when generated";
    const body = document.createElement("div"); body.className = "spotify-song-pop-body";
    popArt = createCrossfadeArt("spotify-song-pop-art");
    const info = document.createElement("div"); info.className = "spotify-song-pop-info";
    popTrack = document.createElement("div"); popTrack.className = "spotify-song-pop-track";
    popArtist = document.createElement("div"); popArtist.className = "spotify-song-pop-artist";
    popAlbum = document.createElement("div"); popAlbum.className = "spotify-song-pop-album";
    info.append(popTrack, popArtist, popAlbum); body.append(popArt.el, info);
    const actions = document.createElement("div"); actions.className = "spotify-song-pop-actions";
    popPlay = document.createElement("button"); popPlay.type = "button"; popPlay.className = "spotify-song-pop-btn spotify-song-pop-btn-primary"; popPlay.innerHTML = `${PLAY_ICON}<span>Play</span>`;
    popPlay.onclick = () => { const snapshot = openMessageId ? snapshotFor(openMessageId) : null; if (snapshot) send({ type: "play", trackUri: snapshot.trackUri }); closePopover(); };
    actions.appendChild(popPlay); popover.append(header, body, actions); popover.addEventListener("click", (event) => event.stopPropagation()); document.body.appendChild(popover);
  }

  function openPopover(messageId: string, anchor: HTMLElement) {
    const snapshot = snapshotFor(messageId); if (!snapshot) return;
    ensurePopover(); openMessageId = messageId;
    popArt?.setUrl(getTrackScopedArtUrl(snapshot.albumArtUrl, snapshot.trackUri));
    if (popTrack) popTrack.textContent = snapshot.trackName;
    if (popArtist) popArtist.textContent = snapshot.artistName;
    if (popAlbum) popAlbum.textContent = snapshot.albumName;
    const rect = anchor.getBoundingClientRect(); const width = popover!.offsetWidth || 280;
    popover!.style.left = `${Math.max(8, Math.min(rect.right - width, window.innerWidth - width - 8))}px`;
    popover!.style.top = `${Math.min(window.innerHeight - (popover!.offsetHeight || 180) - 8, rect.bottom + 8)}px`;
    popover!.classList.add("open");
  }

  function decorate(messageId: string) {
    if (!cache.has(messageId)) return;
    let badge = badges.get(messageId);
    if (!badge || !badge.isConnected) {
      const bubble = ctx.dom.findMessageElement(messageId); if (!bubble) return;
      badge = ctx.dom.inject(bubble, `<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${NOTE_ICON}</button>`, "beforeend");
      badge.classList.add("spotify-song-badge-wrap");
      (badge as HTMLElement).dataset.corner = "right";
      badge.addEventListener("click", (event) => { event.preventDefault(); event.stopPropagation(); openMessageId === messageId ? closePopover() : openPopover(messageId, badge as HTMLElement); });
      badges.set(messageId, badge);
    }
    (badge as HTMLElement).style.display = snapshotFor(messageId) ? "" : "none";
  }

  document.addEventListener("click", closePopover, true);
  window.addEventListener("scroll", closePopover, true);

  return {
    setChatSongs(chatId, entries) {
      if (chatId !== currentChatId) this.reset(); currentChatId = chatId;
      for (const entry of entries) { cache.set(entry.messageId, new Map(Object.entries(entry.bySwipe).map(([swipeId, snapshot]) => [Number(swipeId), snapshot]))); activeSwipe.set(entry.messageId, entry.activeSwipe); decorate(entry.messageId); }
    },
    setMessageSong(chatId, messageId, swipeId, snapshot) {
      if (currentChatId && currentChatId !== chatId) return; currentChatId = chatId;
      const snapshots = cache.get(messageId) || new Map<number, SongSnapshot>(); snapshots.set(swipeId, snapshot); cache.set(messageId, snapshots); activeSwipe.set(messageId, swipeId); decorate(messageId);
    },
    decorate,
    setActiveSwipe(messageId, swipeId) { activeSwipe.set(messageId, swipeId); decorate(messageId); if (openMessageId === messageId && !snapshotFor(messageId)) closePopover(); },
    removeMessage(messageId) { cache.delete(messageId); activeSwipe.delete(messageId); const badge = badges.get(messageId); if (badge) { ctx.dom.uninject(badge); badges.delete(messageId); } },
    reset() { closePopover(); for (const messageId of [...badges.keys()]) this.removeMessage(messageId); cache.clear(); activeSwipe.clear(); currentChatId = null; },
    destroy() { this.reset(); document.removeEventListener("click", closePopover, true); window.removeEventListener("scroll", closePopover, true); popArt?.destroy(); popover?.remove(); },
  };
}
