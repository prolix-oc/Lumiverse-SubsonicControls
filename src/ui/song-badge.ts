import type { SpindleFrontendContext } from "lumiverse-spindle-types";
import type { MessageSongEntry, SongSnapshot } from "../types";
import { createCrossfadeArt, getTrackScopedArtUrl } from "./crossfade-art";

const BADGE_CORNER: "left" | "right" = "right";
const ICON_NOTE = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
const ICON_PLAY = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;

export interface SongBadgeManager {
  setChatSongs(chatId: string, entries: MessageSongEntry[]): void;
  setMessageSong(chatId: string, messageId: string, swipeId: number, snapshot: SongSnapshot): void;
  decorate(messageId: string): void;
  decorateMounted(): void;
  setActiveSwipe(messageId: string, swipeId: number): void;
  removeMessage(messageId: string): void;
  reset(): void;
  destroy(): void;
}

function formatCaptured(ms: number): string {
  try {
    return new Date(ms).toLocaleString(undefined, {
      month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    });
  } catch {
    return "";
  }
}

/**
 * The Subsonic copy deliberately shares Spotify's injection, positioning, and
 * transition lifecycle. The only omitted actions are Spotify-specific share
 * and open links: a Subsonic song URI is not a public URL.
 */
export function createSongBadgeManager(
  ctx: SpindleFrontendContext,
  sendToBackend: (message: unknown) => void,
): SongBadgeManager {
  const cache = new Map<string, Map<number, SongSnapshot>>();
  const activeSwipe = new Map<string, number>();
  const badges = new Map<string, Element>();
  let currentChatId: string | null = null;
  let pop: HTMLElement | null = null;
  let popArt: ReturnType<typeof createCrossfadeArt> | null = null;
  let popTrack: HTMLElement | null = null;
  let popArtist: HTMLElement | null = null;
  let popAlbum: HTMLElement | null = null;
  let popWhen: HTMLElement | null = null;
  let popPlayBtn: HTMLButtonElement | null = null;
  let openForMessageId: string | null = null;
  let openAnchor: HTMLElement | null = null;

  function snapshotFor(messageId: string): SongSnapshot | null {
    const entry = cache.get(messageId);
    return entry?.get(activeSwipe.get(messageId) ?? 0) ?? null;
  }

  function hasAnySnapshot(messageId: string): boolean {
    return (cache.get(messageId)?.size ?? 0) > 0;
  }

  function refreshBadge(messageId: string): void {
    const wrapper = badges.get(messageId) as HTMLElement | undefined;
    if (wrapper) wrapper.style.display = snapshotFor(messageId) ? "" : "none";
  }

  function decorate(messageId: string): void {
    if (!hasAnySnapshot(messageId)) return;
    let wrapper = badges.get(messageId);
    if (!wrapper || !wrapper.isConnected) {
      const bubble = ctx.dom.findMessageElement(messageId);
      if (!bubble) return;
      const injected = ctx.dom.inject(
        bubble,
        `<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${ICON_NOTE}</button>`,
        "beforeend",
      );
      injected.classList.add("spotify-song-badge-wrap");
      (injected as HTMLElement).dataset.corner = BADGE_CORNER;
      injected.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        toggleFor(messageId, injected as HTMLElement);
      });
      badges.set(messageId, injected);
      wrapper = injected;
    }
    refreshBadge(messageId);
  }

  function decorateMounted(): void {
    for (const { messageId } of ctx.dom.listMessageElements()) {
      if (hasAnySnapshot(messageId)) decorate(messageId);
    }
  }

  function ensurePopover(): void {
    if (pop) return;
    pop = document.createElement("div");
    pop.className = "spotify-song-pop";
    const header = document.createElement("div");
    header.className = "spotify-song-pop-header";
    header.textContent = "Playing when generated";
    const body = document.createElement("div");
    body.className = "spotify-song-pop-body";
    popArt = createCrossfadeArt("spotify-song-pop-art");
    popArt.el.style.display = "";
    const info = document.createElement("div");
    info.className = "spotify-song-pop-info";
    popTrack = document.createElement("div"); popTrack.className = "spotify-song-pop-track";
    popArtist = document.createElement("div"); popArtist.className = "spotify-song-pop-artist";
    popAlbum = document.createElement("div"); popAlbum.className = "spotify-song-pop-album";
    popWhen = document.createElement("div"); popWhen.className = "spotify-song-pop-when";
    info.append(popTrack, popArtist, popAlbum, popWhen);
    body.append(popArt.el, info);
    const actions = document.createElement("div");
    actions.className = "spotify-song-pop-actions";
    popPlayBtn = document.createElement("button");
    popPlayBtn.type = "button";
    popPlayBtn.className = "spotify-song-pop-btn spotify-song-pop-btn-primary";
    popPlayBtn.innerHTML = `${ICON_PLAY}<span>Play</span>`;
    popPlayBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const snapshot = openForMessageId ? snapshotFor(openForMessageId) : null;
      if (snapshot?.trackUri) sendToBackend({ type: "play", trackUri: snapshot.trackUri });
      closePopover();
    });
    actions.appendChild(popPlayBtn);
    pop.append(header, body, actions);
    pop.addEventListener("click", (event) => event.stopPropagation());
    document.body.appendChild(pop);
  }

  function renderPopover(snapshot: SongSnapshot | null): void {
    ensurePopover();
    if (!snapshot) {
      popArt?.setUrl(null);
      if (popTrack) popTrack.textContent = "No track playing";
      if (popArtist) popArtist.textContent = "";
      if (popAlbum) popAlbum.textContent = "Nothing was playing when this version was written.";
      if (popWhen) popWhen.textContent = "";
      if (popPlayBtn) popPlayBtn.style.display = "none";
      return;
    }
    popArt?.setUrl(getTrackScopedArtUrl(snapshot.albumArtUrl, snapshot.trackUri));
    if (popTrack) popTrack.textContent = snapshot.trackName;
    if (popArtist) popArtist.textContent = snapshot.artistName;
    if (popAlbum) popAlbum.textContent = snapshot.albumName;
    if (popWhen) popWhen.textContent = formatCaptured(snapshot.capturedAt);
    if (popPlayBtn) popPlayBtn.style.display = "";
  }

  function positionPopover(anchor: HTMLElement): void {
    if (!pop) return;
    const rect = anchor.getBoundingClientRect();
    const width = pop.offsetWidth || 280;
    const height = pop.offsetHeight || 200;
    const pad = 8;
    let top = rect.top - height - 8;
    let originY = "bottom";
    if (top < pad) {
      top = rect.bottom + 8;
      originY = "top";
    }
    let left = BADGE_CORNER === "right" ? rect.right - width : rect.left;
    left = Math.max(pad, Math.min(left, window.innerWidth - width - pad));
    top = Math.max(pad, Math.min(top, window.innerHeight - height - pad));
    pop.style.left = `${left}px`;
    pop.style.top = `${top}px`;
    pop.style.transformOrigin = `${originY} ${BADGE_CORNER}`;
  }

  function onOutsidePointer(event: Event): void {
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (pop?.contains(target) || openAnchor?.contains(target)) return;
    closePopover();
  }
  function onScroll(): void { closePopover(); }
  function onKey(event: KeyboardEvent): void { if (event.key === "Escape") closePopover(); }

  function openPopover(messageId: string, anchor: HTMLElement): void {
    renderPopover(snapshotFor(messageId));
    openForMessageId = messageId;
    openAnchor = anchor;
    pop!.classList.add("open");
    positionPopover(anchor);
    setTimeout(() => {
      document.addEventListener("click", onOutsidePointer, true);
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", onScroll, true);
      document.addEventListener("keydown", onKey, true);
    }, 0);
  }

  function closePopover(): void {
    if (!pop || !openForMessageId) return;
    pop.classList.remove("open");
    openForMessageId = null;
    openAnchor = null;
    document.removeEventListener("click", onOutsidePointer, true);
    window.removeEventListener("scroll", onScroll, true);
    window.removeEventListener("resize", onScroll, true);
    document.removeEventListener("keydown", onKey, true);
  }

  function toggleFor(messageId: string, anchor: HTMLElement): void {
    if (openForMessageId === messageId) closePopover();
    else {
      if (openForMessageId) closePopover();
      openPopover(messageId, anchor);
    }
  }

  function setChatSongs(chatId: string, entries: MessageSongEntry[]): void {
    if (chatId !== currentChatId) reset();
    currentChatId = chatId;
    const incoming = new Set(entries.map((entry) => entry.messageId));
    for (const messageId of [...cache.keys()]) {
      if (!incoming.has(messageId)) removeMessage(messageId);
    }
    for (const entry of entries) {
      const snapshots = new Map<number, SongSnapshot>();
      for (const [swipeId, snapshot] of Object.entries(entry.bySwipe)) snapshots.set(Number(swipeId), snapshot);
      cache.set(entry.messageId, snapshots);
      activeSwipe.set(entry.messageId, entry.activeSwipe);
      decorate(entry.messageId);
    }
    decorateMounted();
  }

  function setMessageSong(chatId: string, messageId: string, swipeId: number, snapshot: SongSnapshot): void {
    if (currentChatId && chatId !== currentChatId) return;
    currentChatId = chatId;
    const snapshots = cache.get(messageId) ?? new Map<number, SongSnapshot>();
    snapshots.set(swipeId, snapshot);
    cache.set(messageId, snapshots);
    activeSwipe.set(messageId, swipeId);
    decorate(messageId);
    if (openForMessageId === messageId) renderPopover(snapshotFor(messageId));
  }

  function setActiveSwipe(messageId: string, swipeId: number): void {
    activeSwipe.set(messageId, swipeId);
    refreshBadge(messageId);
    if (openForMessageId === messageId) {
      const snapshot = snapshotFor(messageId);
      if (snapshot) renderPopover(snapshot);
      else closePopover();
    }
  }

  function removeMessage(messageId: string): void {
    if (openForMessageId === messageId) closePopover();
    cache.delete(messageId);
    activeSwipe.delete(messageId);
    const wrapper = badges.get(messageId);
    if (wrapper) {
      try { ctx.dom.uninject(wrapper); } catch { /* best effort */ }
      badges.delete(messageId);
    }
  }

  function reset(): void {
    closePopover();
    for (const wrapper of badges.values()) {
      try { ctx.dom.uninject(wrapper); } catch { /* best effort */ }
    }
    badges.clear();
    cache.clear();
    activeSwipe.clear();
    currentChatId = null;
  }

  function destroy(): void {
    reset();
    popArt?.destroy();
    pop?.remove();
    pop = null;
  }

  return { setChatSongs, setMessageSong, decorate, decorateMounted, setActiveSwipe, removeMessage, reset, destroy };
}
