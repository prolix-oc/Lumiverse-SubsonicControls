import type { SpindleFrontendContext, SpindleFloatWidgetHandle } from "lumiverse-spindle-types";
import type { BackendToFrontend, FrontendToBackend, MiniPlayerStyle, PlaybackState } from "./types";
import { SPOTIFY_WIDGET_CSS } from "./ui/spotify-widget-styles";
import { createSettingsUI } from "./ui/settings";
import { createNowPlayingUI } from "./ui/now-playing";
import { createControlsUI } from "./ui/controls";
import { createSearchUI } from "./ui/search";
import { createLyricsUI } from "./ui/lyrics";
import { createMiniPlayerUI } from "./ui/mini-player";
import { createModernWidgetPlayerUI } from "./ui/modern-widget-player";
import { createCrossfadeArt, getTrackScopedArtUrl } from "./ui/crossfade-art";
import { createSongBadgeManager } from "./ui/song-badge";

const NOTE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
const WIDGET_EDGE_PAD = 12;
const WIDGET_PREFS_KEY = "subsonic-controls-widget-prefs";

export function setup(ctx: SpindleFrontendContext) {
  const cleanups: Array<() => void> = [];
  // The Subsonic UI intentionally uses the same drawer design system as the
  // companion Spotify extension. This stylesheet includes both the tab and
  // shared floating-player styles.
  cleanups.push(ctx.dom.addStyle(SPOTIFY_WIDGET_CSS));
  const send = (message: unknown) => ctx.sendToBackend(message as FrontendToBackend);

  const settings = createSettingsUI(send);
  const settingsMount = ctx.ui.mount("settings_extensions");
  settingsMount.appendChild(settings.root);
  cleanups.push(() => settings.destroy());

  const tab = ctx.ui.registerDrawerTab({
    id: "subsonic",
    title: "Subsonic Controls",
    shortName: "Subsonic",
    description: "Browse a Subsonic-compatible music server and control its optional Jukebox.",
    keywords: ["subsonic", "opensubsonic", "music", "jukebox", "lyrics"],
    headerTitle: "Subsonic",
    iconSvg: NOTE_ICON,
  });
  cleanups.push(() => tab.destroy());
  tab.root.classList.add("spotify-tab-root");
  const panel = document.createElement("div"); panel.className = "spotify-panel"; tab.root.appendChild(panel);

  function updateTabHeight() {
    const top = tab.root.getBoundingClientRect().top;
    const parentBottom = tab.root.parentElement?.getBoundingClientRect().bottom ?? window.innerHeight;
    const viewportBottom = window.visualViewport?.height ?? window.innerHeight;
    const bottom = Math.min(parentBottom, viewportBottom);
    tab.root.style.setProperty("--spotify-tab-height", `${Math.max(240, bottom - top - 2)}px`);
  }
  updateTabHeight();
  const tabHeightObserver = new ResizeObserver(updateTabHeight);
  tabHeightObserver.observe(tab.root);
  window.addEventListener("resize", updateTabHeight);
  cleanups.push(() => {
    tabHeightObserver.disconnect();
    window.removeEventListener("resize", updateTabHeight);
  });

  const nowPlaying = createNowPlayingUI();
  const controls = createControlsUI(send);
  const search = createSearchUI(send);
  const lyrics = createLyricsUI();
  panel.append(nowPlaying.root, controls.root, search.root, lyrics.root);
  cleanups.push(() => nowPlaying.destroy(), () => controls.destroy(), () => search.destroy(), () => lyrics.destroy());

  let connected = false;
  let currentState: PlaybackState | null = null;
  let lyricsTrackId: string | null = null;
  let jukeboxEnabled = false;
  let currentWidgetSize = 48;
  let currentArtShape: "circle" | "squircle" = "circle";
  let currentMiniPlayerStyle: MiniPlayerStyle = "default";
  let savedWidgetPosition: { x: number; y: number } | undefined;
  try {
    const stored = JSON.parse(localStorage.getItem(WIDGET_PREFS_KEY) || "null") as {
      size?: unknown; shape?: unknown; miniPlayerStyle?: unknown; x?: unknown; y?: unknown;
    } | null;
    if (typeof stored?.size === "number") currentWidgetSize = Math.max(24, Math.min(192, stored.size));
    if (stored?.shape === "squircle") currentArtShape = "squircle";
    if (stored?.miniPlayerStyle === "modern") currentMiniPlayerStyle = "modern";
    if (typeof stored?.x === "number" && typeof stored.y === "number") {
      savedWidgetPosition = { x: stored.x, y: stored.y };
    }
  } catch {}

  let widget: SpindleFloatWidgetHandle;
  let lastKnownPosition: { x: number; y: number } | null = null;
  function saveWidgetPrefs() {
    const position = lastKnownPosition ?? widget.getPosition();
    localStorage.setItem(WIDGET_PREFS_KEY, JSON.stringify({
      size: currentWidgetSize, shape: currentArtShape, miniPlayerStyle: currentMiniPlayerStyle, x: position.x, y: position.y,
    }));
  }

  const widgetContent = document.createElement("div");
  widgetContent.className = "spotify-float-widget";
  function animateWidgetMount() {
    widgetContent.classList.remove("spotify-float-widget-mounted");
    requestAnimationFrame(() => requestAnimationFrame(() => widgetContent.classList.add("spotify-float-widget-mounted")));
  }
  const legacyVisual = document.createElement("div");
  legacyVisual.className = "spotify-float-widget-legacy";
  const widgetIcon = document.createElement("div");
  widgetIcon.className = "spotify-float-widget-icon";
  widgetIcon.innerHTML = NOTE_ICON;
  const widgetArt = createCrossfadeArt("spotify-float-widget-art");
  widgetArt.el.style.display = "none";
  legacyVisual.append(widgetIcon, widgetArt.el);
  widgetContent.appendChild(legacyVisual);

  let modernWidgetExpanded = false;
  const modernWidget = createModernWidgetPlayerUI(send, () => tab.activate(), () => setModernWidgetExpanded(false));
  widgetContent.appendChild(modernWidget.root);
  const miniPlayer = createMiniPlayerUI(send, () => tab.activate(), () => {
    const rect = widget.root.getBoundingClientRect();
    return { x: rect.left, y: rect.top, w: rect.width, h: rect.height };
  });
  miniPlayer.setStyle("default");

  function getWidgetSize(expanded = modernWidgetExpanded) {
    if (currentMiniPlayerStyle === "modern" && expanded) {
      return currentState
        ? { width: Math.max(320, Math.min(368, window.innerWidth - 24)), height: Math.max(500, Math.min(600, window.innerHeight - 24)) }
        : { width: Math.max(280, Math.min(320, window.innerWidth - 24)), height: 196 };
    }
    return { width: currentWidgetSize, height: currentWidgetSize };
  }

  function clampWidgetPosition(size = getWidgetSize()) {
    const position = widget.getPosition();
    const maxX = Math.max(WIDGET_EDGE_PAD, window.innerWidth - size.width - WIDGET_EDGE_PAD);
    const maxY = Math.max(WIDGET_EDGE_PAD, window.innerHeight - size.height - WIDGET_EDGE_PAD);
    const x = Math.max(WIDGET_EDGE_PAD, Math.min(position.x, maxX));
    const y = Math.max(WIDGET_EDGE_PAD, Math.min(position.y, maxY));
    if (x !== position.x || y !== position.y) widget.moveTo(x, y);
  }

  function applyWidgetStyle() {
    const size = getWidgetSize();
    widget.root.style.touchAction = currentMiniPlayerStyle === "modern" && modernWidgetExpanded ? "pan-y" : "none";
    widget.root.style.width = `${size.width}px`;
    widget.root.style.height = `${size.height}px`;
    widgetContent.style.width = `${size.width}px`;
    widgetContent.style.height = `${size.height}px`;
    widgetContent.style.borderRadius = currentMiniPlayerStyle === "modern" && modernWidgetExpanded ? "30px" : currentArtShape === "circle" ? "50%" : "22%";
    modernWidget.setCollapsedSize(currentWidgetSize);
    if (currentMiniPlayerStyle === "modern") {
      widgetContent.classList.add("spotify-float-widget-modern-mode");
      legacyVisual.style.display = "none";
      modernWidget.root.style.display = "block";
    } else {
      widgetContent.classList.remove("spotify-float-widget-modern-mode");
      legacyVisual.style.display = "flex";
      modernWidget.root.style.display = "none";
    }
    widget.setSize(size.width, size.height);
  }

  function setModernWidgetExpanded(expanded: boolean) {
    modernWidgetExpanded = expanded && currentMiniPlayerStyle === "modern";
    miniPlayer.hide();
    modernWidget.setExpanded(modernWidgetExpanded);
    applyWidgetStyle();
    requestAnimationFrame(() => clampWidgetPosition());
  }

  function syncWidget() {
    widget.setVisible(connected);
    if (!connected) {
      miniPlayer.hide();
      modernWidgetExpanded = false;
      modernWidget.setExpanded(false);
    }
    miniPlayer.update(currentState, connected);
    modernWidget.update(currentState, connected);
    updateWidgetArt(currentState);
  }

  function updateWidgetArt(state: PlaybackState | null) {
    const artUrl = getTrackScopedArtUrl(state?.albumArtUrl ?? null, state?.trackUri);
    widgetIcon.style.display = artUrl ? "none" : "flex";
    widgetArt.el.style.display = artUrl ? "" : "none";
    widgetArt.setUrl(artUrl);
  }

  function createWidget(position = savedWidgetPosition) {
    widget = ctx.ui.createFloatWidget({ width: currentWidgetSize, height: currentWidgetSize, initialPosition: position, tooltip: "Subsonic", chromeless: true });
    widget.root.appendChild(widgetContent);
    animateWidgetMount();
    widget.onDragEnd((dragPosition) => {
      lastKnownPosition = dragPosition;
      clampWidgetPosition();
      saveWidgetPrefs();
    });
    applyWidgetStyle();
    syncWidget();
  }

  function recreateWidget() {
    miniPlayer.hide();
    modernWidgetExpanded = false;
    modernWidget.setExpanded(false);
    const position = widget.getPosition();
    lastKnownPosition = position;
    widget.destroy();
    createWidget(position);
    clampWidgetPosition();
    saveWidgetPrefs();
  }

  function showWidgetMenu(x: number, y: number) {
    void ctx.ui.showContextMenu({ position: { x, y }, items: [
      { key: "small", label: "Small (36px)", active: currentWidgetSize === 36 },
      { key: "medium", label: "Medium (48px)", active: currentWidgetSize === 48 },
      { key: "large", label: "Large (64px)", active: currentWidgetSize === 64 },
      { key: "divider", label: "", type: "divider" },
      { key: "circle", label: "Circle", active: currentArtShape === "circle" },
      { key: "squircle", label: "Squircle", active: currentArtShape === "squircle" },
      { key: "divider-2", label: "", type: "divider" },
      { key: "default", label: "Default Mini Player", active: currentMiniPlayerStyle === "default" },
      { key: "modern", label: "Modern Lyrics Mini Player", active: currentMiniPlayerStyle === "modern" },
    ] }).then(({ selectedKey }) => {
      if (!selectedKey) return;
      if (selectedKey === "small" || selectedKey === "medium" || selectedKey === "large") {
        currentWidgetSize = selectedKey === "small" ? 36 : selectedKey === "medium" ? 48 : 64;
        recreateWidget();
      } else if (selectedKey === "circle" || selectedKey === "squircle") {
        currentArtShape = selectedKey;
        applyWidgetStyle();
        saveWidgetPrefs();
      } else if (selectedKey === "default" || selectedKey === "modern") {
        currentMiniPlayerStyle = selectedKey;
        currentWidgetSize = selectedKey === "modern" ? 128 : 48;
        miniPlayer.setStyle(currentMiniPlayerStyle);
        recreateWidget();
      }
    });
  }

  widgetContent.addEventListener("click", (event) => {
    event.stopPropagation();
    if (currentMiniPlayerStyle === "modern") {
      if (!modernWidgetExpanded) setModernWidgetExpanded(true);
    } else {
      miniPlayer.toggle();
    }
  });
  widgetContent.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showWidgetMenu(event.clientX, event.clientY);
  });

  createWidget();
  clampWidgetPosition();
  const handleWidgetViewportResize = () => {
    if (modernWidgetExpanded) applyWidgetStyle();
    clampWidgetPosition();
  };
  window.addEventListener("resize", handleWidgetViewportResize);
  cleanups.push(() => window.removeEventListener("resize", handleWidgetViewportResize));
  cleanups.push(() => {
    lastKnownPosition = widget.getPosition();
    saveWidgetPrefs();
    widgetArt.destroy();
    miniPlayer.destroy();
    modernWidget.destroy();
    widget.destroy();
  });

  const songBadges = createSongBadgeManager(ctx, send);
  cleanups.push(() => songBadges.destroy());
  const requestChatSongs = (chatId: string | null) => { if (chatId) send({ type: "get_chat_songs", chatId }); };
  requestChatSongs(ctx.getActiveChat().chatId);
  cleanups.push(ctx.events.on("CHAT_SWITCHED", (payload) => {
    songBadges.reset();
    requestChatSongs((payload as { chatId?: string | null }).chatId || null);
  }));
  cleanups.push(ctx.events.on("CHARACTER_MESSAGE_RENDERED", (payload) => {
    const messageId = (payload as { messageId?: string }).messageId;
    if (messageId) songBadges.decorate(messageId);
  }));
  cleanups.push(ctx.events.on("MESSAGE_SWIPED", (payload) => {
    const message = (payload as { message?: { id?: string; swipe_id?: number } }).message;
    if (message?.id) songBadges.setActiveSwipe(message.id, message.swipe_id || 0);
  }));
  cleanups.push(ctx.events.on("MESSAGE_DELETED", (payload) => {
    const messageId = (payload as { messageId?: string }).messageId;
    if (messageId) songBadges.removeMessage(messageId);
  }));

  const messages = ctx.onBackendMessage((raw) => {
    const message = raw as BackendToFrontend;
    switch (message.type) {
      case "config":
        connected = message.connected;
        jukeboxEnabled = message.enableJukebox;
        settings.update(message.connected, message.serverUrl, message.username, message.hasPassword, message.enableJukebox, message.jukeboxUnavailableReason);
        controls.update(currentState, connected, jukeboxEnabled);
        syncWidget();
        break;
      case "state":
        connected = message.connected;
        currentState = message.playbackState;
        nowPlaying.update(currentState, connected);
        controls.update(currentState, connected, jukeboxEnabled);
        lyrics.updatePlayback(currentState);
        if (currentState?.trackUri && currentState.trackUri !== lyricsTrackId) {
          lyricsTrackId = currentState.trackUri;
          lyrics.setLoading(true);
          miniPlayer.setLyricsLoading(true);
          modernWidget.setLyricsLoading(true);
          send({ type: "get_lyrics" });
        } else if (!currentState) {
          lyricsTrackId = null;
          lyrics.clear();
          miniPlayer.updateLyrics(null, null, null, false);
          modernWidget.updateLyrics(null, null, null, false);
        }
        syncWidget();
        break;
      case "connected":
        connected = true;
        syncWidget();
        send({ type: "get_config" });
        send({ type: "get_state" });
        break;
      case "disconnected":
        connected = false; currentState = null; lyricsTrackId = null; jukeboxEnabled = false;
        nowPlaying.update(null, false); controls.update(null, false, false); lyrics.clear();
        miniPlayer.updateLyrics(null, null, null, false);
        modernWidget.updateLyrics(null, null, null, false);
        syncWidget();
        break;
      case "search_results": search.setResults(message.results); break;
      case "chat_songs": songBadges.setChatSongs(message.chatId, message.entries); break;
      case "message_song": songBadges.setMessageSong(message.chatId, message.messageId, message.swipeId, message.snapshot); break;
      case "lyrics":
        if (!lyricsTrackId || message.trackUri === lyricsTrackId) {
          lyrics.update(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
          lyrics.updatePlayback(currentState);
          miniPlayer.updateLyrics(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
          modernWidget.updateLyrics(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
        }
        break;
      case "error": console.warn("[Subsonic Controls]", message.message); break;
    }
  });
  cleanups.push(messages);

  // Desktop pop-outs run their own frontend instance. When the native window
  // returns this widget root, refresh this page immediately rather than
  // waiting for the next polling broadcast.
  const handleDesktopWidgetReturned = (event: Event) => {
    const detail = (event as CustomEvent<{ extensionId?: unknown }>).detail;
    if (detail?.extensionId !== ctx.manifest.identifier) return;
    send({ type: "get_config" });
    send({ type: "get_state" });
  };
  window.addEventListener("spindle:desktop-widget-returned", handleDesktopWidgetReturned);
  cleanups.push(() => window.removeEventListener("spindle:desktop-widget-returned", handleDesktopWidgetReturned));

  ctx.permissions.getGranted().then((granted) => {
    const needed = ["cors_proxy", "generation", "chat_mutation"].filter((permission) => !granted.includes(permission));
    if (needed.length) {
      void ctx.permissions.request(needed, { reason: "Subsonic Controls needs CORS access for your server, plus Generation and Chat Mutation to remember the song playing for each assistant reply." });
    }
  });
  const permissionChange = ctx.events.on("SPINDLE_PERMISSION_CHANGED", (payload: unknown) => {
    const change = payload as { extensionId?: string; permission?: string; granted?: boolean };
    if (change.extensionId !== ctx.manifest.identifier || change.permission !== "cors_proxy") return;
    if (change.granted) {
      send({ type: "get_config" }); send({ type: "get_state" });
      return;
    }
    connected = false;
    currentState = null;
    lyricsTrackId = null;
    jukeboxEnabled = false;
    settings.update(false, "", "", false, false, null);
    nowPlaying.update(null, false);
    controls.update(null, false, false);
    lyrics.clear();
    syncWidget();
  });
  cleanups.push(permissionChange);
  send({ type: "get_config" });
  send({ type: "get_state" });
  return () => { for (const cleanup of cleanups) cleanup(); };
}
