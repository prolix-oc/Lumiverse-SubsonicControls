import type { SpindleFrontendContext, SpindleFloatWidgetHandle } from "lumiverse-spindle-types";
import type { AlbumColors, BackendToFrontend, FrontendToBackend, MiniPlayerStyle, PlaybackState, RemoteControl } from "./types";
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

  // ─── Album art color extraction (for theme) ──────────────────────────

  let lastThemeArtUrl: string | null = null;
  let themeApplySeq = 0;
  let pendingThemeClearTimer: ReturnType<typeof setTimeout> | null = null;
  const albumPaletteCache = new Map<string, AlbumColors>();
  const ALBUM_PALETTE_CACHE_LIMIT = 48;
  type ProxiedImageResponse = {
    status?: number;
    headers?: Record<string, string>;
    body?: string;
    encoding?: string;
  };
  const pendingPaletteImages = new Map<string, {
    resolve: (url: string | null) => void;
    timer: ReturnType<typeof setTimeout>;
  }>();
  function fetchPaletteImage(url: string): Promise<string | null> {
    return new Promise((resolve) => {
      const requestId = crypto.randomUUID();
      const timer = setTimeout(() => {
        pendingPaletteImages.delete(requestId);
        resolve(null);
      }, 15_000);
      pendingPaletteImages.set(requestId, { resolve, timer });
      // Handled by Spindle's built-in image CORS bridge before this extension's
      // ordinary backend message handler sees the request.
      ctx.sendToBackend({
        type: "__cors_proxy_request",
        requestId,
        url,
        options: { method: "GET", mediaType: "image" },
      });
    });
  }
  function resolvePaletteImage(requestId: string, result: ProxiedImageResponse | undefined) {
    const pending = pendingPaletteImages.get(requestId);
    if (!pending) return;
    pendingPaletteImages.delete(requestId);
    clearTimeout(pending.timer);
    const contentType = result?.headers?.["content-type"] || result?.headers?.["Content-Type"] || "image/jpeg";
    pending.resolve(result?.status && result.status >= 200 && result.status < 300 && result.encoding === "base64" && result.body
      ? `data:${contentType};base64,${result.body}`
      : null);
  }
  function cancelPendingThemeClear() {
    if (pendingThemeClearTimer) clearTimeout(pendingThemeClearTimer);
    pendingThemeClearTimer = null;
  }
  function clearAlbumTheme() {
    cancelPendingThemeClear();
    themeApplySeq += 1;
    send({ type: "album_colors", colors: null });
  }
  function rememberAlbumPalette(artworkKey: string, colors: AlbumColors) {
    // Keep the in-page cache small; the backend keeps the durable cache used
    // to restore the active palette after page and extension reloads.
    albumPaletteCache.delete(artworkKey);
    albumPaletteCache.set(artworkKey, colors);
    while (albumPaletteCache.size > ALBUM_PALETTE_CACHE_LIMIT) {
      const oldestKey = albumPaletteCache.keys().next().value;
      if (!oldestKey) break;
      albumPaletteCache.delete(oldestKey);
    }
  }
  // Keep a palette through short server-side gaps while Navidrome advances
  // tracks, preventing the UI from flashing back to the base theme.
  function scheduleAlbumThemeClear(delayMs = 1800) {
    cancelPendingThemeClear();
    pendingThemeClearTimer = setTimeout(() => {
      pendingThemeClearTimer = null;
      clearAlbumTheme();
    }, delayMs);
  }
  function extractColorsFromImage(url: string): Promise<AlbumColors | null> {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const size = 32;
          canvas.width = size;
          canvas.height = size;
          const context = canvas.getContext("2d");
          if (!context) return resolve(null);
          context.drawImage(image, 0, 0, size, size);
          const pixels = context.getImageData(0, 0, size, size).data;
          let bestH = 0, bestS = 0, bestL = 0.5, bestScore = -1;
          let red = 0, green = 0, blue = 0, count = 0;
          for (let index = 0; index < pixels.length; index += 4) {
            const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
            red += r; green += g; blue += b; count += 1;
            const rn = r / 255, gn = g / 255, bn = b / 255;
            const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
            const lightness = (max + min) / 2;
            let hue = 0, saturation = 0;
            if (max !== min) {
              const delta = max - min;
              saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
              if (max === rn) hue = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
              else if (max === gn) hue = ((bn - rn) / delta + 2) / 6;
              else hue = ((rn - gn) / delta + 4) / 6;
            }
            const score = saturation * (1 - Math.abs(lightness - 0.5) * 1.6);
            if (score > bestScore) {
              bestScore = score;
              bestH = hue;
              bestS = saturation;
              bestL = lightness;
            }
          }
          const averageRed = Math.round(red / count);
          const averageGreen = Math.round(green / count);
          const averageBlue = Math.round(blue / count);
          const luminance = 0.299 * averageRed + 0.587 * averageGreen + 0.114 * averageBlue;
          resolve({
            dominant: { r: averageRed, g: averageGreen, b: averageBlue },
            dominantHsl: { h: Math.round(bestH * 360), s: Math.round(bestS * 100), l: Math.round(bestL * 100) },
            isLight: luminance > 152,
          });
        } catch {
          resolve(null);
        }
      };
      image.onerror = () => resolve(null);
      void fetchPaletteImage(url).then((dataUrl) => {
        if (dataUrl) image.src = dataUrl;
        else resolve(null);
      });
    });
  }

  let remoteControl: RemoteControl = "none";
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
  let configuredServerUrl = "";
  let configuredUsername = "";
  let configuredHasPassword = false;
  let configuredFeishinUrl = "";
  let configuredFeishinUsername = "";
  let configuredHasFeishinPassword = false;
  let configuredPlaybackPositionOffsetMs = 1_000;
  let configuredJukeboxUnavailableReason: string | null = null;
  type ArtShape = "circle" | "squircle";
  type SizeMode = "small" | "medium" | "large" | "custom";
  const DEFAULT_SIZE_PRESETS: Record<Exclude<SizeMode, "custom">, number> = { small: 36, medium: 48, large: 64 };
  const MODERN_SIZE_PRESETS: Record<Exclude<SizeMode, "custom">, number> = { small: 112, medium: 128, large: 144 };
  const DEFAULT_WIDGET_SIZE_MIN = 24;
  const DEFAULT_WIDGET_SIZE_MAX = 128;
  const MODERN_WIDGET_SIZE_MIN = 112;
  const MODERN_WIDGET_SIZE_MAX = 192;

  function getSizePresets(style: MiniPlayerStyle): Record<Exclude<SizeMode, "custom">, number> {
    return style === "modern" ? MODERN_SIZE_PRESETS : DEFAULT_SIZE_PRESETS;
  }

  function getSizeBounds(style: MiniPlayerStyle) {
    return style === "modern"
      ? { min: MODERN_WIDGET_SIZE_MIN, max: MODERN_WIDGET_SIZE_MAX }
      : { min: DEFAULT_WIDGET_SIZE_MIN, max: DEFAULT_WIDGET_SIZE_MAX };
  }

  function clampWidgetSize(size: number, style: MiniPlayerStyle): number {
    const { min, max } = getSizeBounds(style);
    return Math.max(min, Math.min(size, max));
  }

  function isSizeMode(value: unknown): value is SizeMode {
    return value === "small" || value === "medium" || value === "large" || value === "custom";
  }

  function inferSizeMode(size: number, style: MiniPlayerStyle): SizeMode {
    const presets = getSizePresets(style);
    if (size === presets.small) return "small";
    if (size === presets.large) return "large";
    return size === presets.medium ? "medium" : "custom";
  }

  let currentWidgetSize = 48;
  let currentArtShape: ArtShape = "circle";
  let currentSizeMode: SizeMode = "medium";
  let currentMiniPlayerStyle: MiniPlayerStyle = "default";
  let savedWidgetPosition: { x: number; y: number } | undefined;
  try {
    const stored = JSON.parse(localStorage.getItem(WIDGET_PREFS_KEY) || "null") as {
      size?: unknown; shape?: unknown; sizeMode?: unknown; miniPlayerStyle?: unknown; x?: unknown; y?: unknown;
    } | null;
    if (stored?.miniPlayerStyle === "modern") currentMiniPlayerStyle = "modern";
    if (typeof stored?.size === "number") currentWidgetSize = clampWidgetSize(stored.size, currentMiniPlayerStyle);
    if (stored?.shape === "squircle") currentArtShape = "squircle";
    currentSizeMode = isSizeMode(stored?.sizeMode) ? stored.sizeMode : inferSizeMode(currentWidgetSize, currentMiniPlayerStyle);
    if (currentSizeMode !== "custom") currentWidgetSize = getSizePresets(currentMiniPlayerStyle)[currentSizeMode];
    if (typeof stored?.x === "number" && typeof stored.y === "number") {
      savedWidgetPosition = { x: stored.x, y: stored.y };
    }
  } catch {}

  let widget: SpindleFloatWidgetHandle;
  let lastKnownPosition: { x: number; y: number } | null = null;
  function saveWidgetPrefs() {
    const position = lastKnownPosition ?? widget.getPosition();
    localStorage.setItem(WIDGET_PREFS_KEY, JSON.stringify({
      size: currentWidgetSize, shape: currentArtShape, sizeMode: currentSizeMode, miniPlayerStyle: currentMiniPlayerStyle, x: position.x, y: position.y,
    }));
  }

  let widgetSizeLabelTitle: HTMLSpanElement | null = null;
  let widgetSizeHint: HTMLDivElement | null = null;
  let widgetSizeInputRef: HTMLInputElement | null = null;
  function updateWidgetCustomizationUI() {
    const { min, max } = getSizeBounds(currentMiniPlayerStyle);
    if (widgetSizeLabelTitle) {
      widgetSizeLabelTitle.textContent = currentMiniPlayerStyle === "modern"
        ? "Collapsed Modern Player Size (px)"
        : "Custom Widget Size (px)";
    }
    if (widgetSizeHint) {
      widgetSizeHint.textContent = currentMiniPlayerStyle === "modern"
        ? "Controls the compact size of the modern player before it expands."
        : "Controls the floating widget size.";
    }
    if (widgetSizeInputRef) {
      widgetSizeInputRef.min = String(min);
      widgetSizeInputRef.max = String(max);
      widgetSizeInputRef.placeholder = currentMiniPlayerStyle === "modern" ? "e.g. 128" : "e.g. 56";
      widgetSizeInputRef.value = currentSizeMode === "custom" ? String(currentWidgetSize) : "";
    }
  }

  const settingsBody = settings.root.querySelector(".spotify-settings-card-body");
  if (settingsBody) {
    const divider = document.createElement("div");
    divider.style.cssText = "height:1px;background:var(--lumiverse-border);margin:4px 0";
    const label = document.createElement("label");
    label.className = "spotify-settings-label";
    widgetSizeLabelTitle = document.createElement("span");
    widgetSizeHint = document.createElement("div");
    widgetSizeHint.style.cssText = "font-size:0.8em;opacity:0.6;margin-top:2px";
    const row = document.createElement("div");
    row.className = "spotify-settings-row";
    const input = document.createElement("input");
    input.className = "spotify-input";
    input.type = "number";
    input.style.width = "80px";
    widgetSizeInputRef = input;
    const apply = document.createElement("button");
    apply.className = "spotify-btn spotify-btn-primary";
    apply.textContent = "Apply";
    apply.style.cssText = "font-size:0.85em;padding:4px 12px";
    apply.addEventListener("click", () => {
      const value = Number.parseInt(input.value, 10);
      const { min, max } = getSizeBounds(currentMiniPlayerStyle);
      if (Number.isNaN(value) || value < min || value > max) return;
      currentSizeMode = "custom";
      recreateWidgetWithSize(value);
    });
    row.append(input, apply);
    label.append(widgetSizeLabelTitle, row, widgetSizeHint);
    settingsBody.append(divider, label);
  }
  updateWidgetCustomizationUI();

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
  const WIDGET_SIZE_TRANSITION_MS = 420;
  let widgetSizeRequestTimer: ReturnType<typeof setTimeout> | null = null;
  const modernWidget = createModernWidgetPlayerUI(send, () => tab.activate(), () => setModernWidgetExpanded(false));
  widgetContent.appendChild(modernWidget.root);
  const miniPlayer = createMiniPlayerUI(send, () => tab.activate(), () => {
    const rect = widget.root.getBoundingClientRect();
    return { x: rect.left, y: rect.top, w: rect.width, h: rect.height };
  });
  miniPlayer.setStyle("default");

  function getModernExpandedSize() {
    if (!currentState) {
      return { width: Math.max(280, Math.min(320, window.innerWidth - 24)), height: 196 };
    }
    // Keep the modern player compact enough for the original floating-widget
    // footprint while still leaving room for the lyric animation viewport.
    return {
      width: Math.max(300, Math.min(348, window.innerWidth - 24)),
      height: Math.max(420, Math.min(520, window.innerHeight - 24)),
    };
  }

  function getWidgetLayoutSize(expanded = modernWidgetExpanded) {
    if (currentMiniPlayerStyle === "modern") {
      return expanded ? getModernExpandedSize() : { width: currentWidgetSize, height: currentWidgetSize };
    }
    return { width: currentWidgetSize, height: currentWidgetSize };
  }

  function clampWidgetPosition(size = getWidgetLayoutSize()) {
    const position = widget.getPosition();
    const maxX = Math.max(WIDGET_EDGE_PAD, window.innerWidth - size.width - WIDGET_EDGE_PAD);
    const maxY = Math.max(WIDGET_EDGE_PAD, window.innerHeight - size.height - WIDGET_EDGE_PAD);
    const x = Math.max(WIDGET_EDGE_PAD, Math.min(position.x, maxX));
    const y = Math.max(WIDGET_EDGE_PAD, Math.min(position.y, maxY));
    if (x !== position.x || y !== position.y) widget.moveTo(x, y);
  }

  function requestWidgetSize(size: { width: number; height: number }, delay = false) {
    if (widgetSizeRequestTimer) clearTimeout(widgetSizeRequestTimer);
    const commit = () => {
      widgetSizeRequestTimer = null;
      widget.setSize(size.width, size.height);
    };
    if (delay) widgetSizeRequestTimer = setTimeout(commit, WIDGET_SIZE_TRANSITION_MS);
    else commit();
  }

  function applyWidgetStyle({ delaySizeRequest = false }: { delaySizeRequest?: boolean } = {}) {
    const size = getWidgetLayoutSize();
    const touchAction = currentMiniPlayerStyle === "modern" && modernWidgetExpanded ? "pan-y" : "none";
    widget.root.style.touchAction = touchAction;
    widget.root.style.transition = "width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)";
    widgetContent.style.transition = "width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1)";
    widgetContent.style.touchAction = touchAction;
    modernWidget.setCollapsedSize(currentWidgetSize);
    if (currentMiniPlayerStyle === "modern") {
      widgetContent.classList.add("spotify-float-widget-modern-mode");
      legacyVisual.style.display = "none";
      modernWidget.root.style.display = "block";
      widget.root.style.width = `${size.width}px`;
      widget.root.style.height = `${size.height}px`;
      widgetContent.style.width = `${size.width}px`;
      widgetContent.style.height = `${size.height}px`;
      widgetContent.style.borderRadius = modernWidgetExpanded ? "30px" : `${Math.max(18, Math.round(currentWidgetSize * 0.28))}px`;
      // On collapse, let the visual transition finish before committing the
      // compact host bounds; otherwise the native window cuts it off early.
      requestWidgetSize(size, delaySizeRequest);
    } else {
      widgetContent.classList.remove("spotify-float-widget-modern-mode");
      legacyVisual.style.display = "flex";
      modernWidget.root.style.display = "none";
      const radius = currentArtShape === "circle" ? "50%" : "22%";
      widget.root.style.width = `${currentWidgetSize}px`;
      widget.root.style.height = `${currentWidgetSize}px`;
      widgetContent.style.width = `${currentWidgetSize}px`;
      widgetContent.style.height = `${currentWidgetSize}px`;
      widgetContent.style.borderRadius = radius;
      const iconSize = Math.round(currentWidgetSize * 0.5);
      const iconSvg = widgetIcon.querySelector("svg");
      if (iconSvg) {
        (iconSvg as SVGElement).style.width = `${iconSize}px`;
        (iconSvg as SVGElement).style.height = `${iconSize}px`;
      }
      requestWidgetSize(size);
    }
  }

  function setModernWidgetExpanded(expanded: boolean) {
    const wasExpanded = modernWidgetExpanded;
    modernWidgetExpanded = expanded && currentMiniPlayerStyle === "modern";
    miniPlayer.hide();
    clampWidgetPosition(getWidgetLayoutSize(modernWidgetExpanded));
    modernWidget.setExpanded(modernWidgetExpanded);
    applyWidgetStyle({ delaySizeRequest: wasExpanded && !modernWidgetExpanded });
    requestAnimationFrame(() => clampWidgetPosition(getWidgetLayoutSize()));
  }

  function syncWidget() {
    widget.root.style.display = connected ? "" : "none";
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
    widget = ctx.ui.createFloatWidget({ width: currentWidgetSize, height: currentWidgetSize, tooltip: "Subsonic", chromeless: true });
    widget.root.appendChild(widgetContent);
    animateWidgetMount();
    widget.onDragEnd((dragPosition) => {
      lastKnownPosition = dragPosition;
      clampWidgetPosition();
      saveWidgetPrefs();
    });
    applyWidgetStyle();
    syncWidget();
    if (position) widget.moveTo(position.x, position.y);
  }

  function recreateWidget() {
    recreateWidgetWithSize(currentWidgetSize);
  }

  function recreateWidgetWithSize(newSize: number) {
    miniPlayer.hide();
    modernWidgetExpanded = false;
    modernWidget.setExpanded(false);
    const position = widget.getPosition();
    lastKnownPosition = position;
    widget.destroy();
    currentWidgetSize = clampWidgetSize(newSize, currentMiniPlayerStyle);
    updateWidgetCustomizationUI();
    createWidget(position);
    clampWidgetPosition();
    saveWidgetPrefs();
  }

  let openContextMenuCount = 0;
  async function showWidgetMenu(x: number, y: number) {
    const items: Array<{ key: string; label: string; active?: boolean; type?: "divider" }> = [
      { key: "small", label: "Small", active: currentSizeMode === "small" },
      { key: "medium", label: "Medium", active: currentSizeMode === "medium" },
      { key: "large", label: "Large", active: currentSizeMode === "large" },
      { key: "custom", label: "Custom…", active: currentSizeMode === "custom" },
    ];
    if (currentMiniPlayerStyle !== "modern") {
      items.push(
        { key: "shape-divider", label: "", type: "divider" },
        { key: "circle", label: "Circle", active: currentArtShape === "circle" },
        { key: "squircle", label: "Squircle", active: currentArtShape === "squircle" },
      );
    }
    items.push(
      { key: "style-divider", label: "", type: "divider" },
      { key: "mini-default", label: "Default Mini Player", active: currentMiniPlayerStyle === "default" },
      { key: "mini-modern", label: "Modern Lyrics Mini Player", active: currentMiniPlayerStyle === "modern" },
    );

    openContextMenuCount += 1;
    miniPlayer.setUiSuspended(true);
    modernWidget.setAutoScrollSuspended(true);
    lyrics.setAutoScrollSuspended(true);
    let selectedKey: string | null | undefined;
    try {
      ({ selectedKey } = await ctx.ui.showContextMenu({ position: { x, y }, items }));
    } finally {
      openContextMenuCount = Math.max(0, openContextMenuCount - 1);
      if (openContextMenuCount === 0) {
        miniPlayer.setUiSuspended(false);
        modernWidget.setAutoScrollSuspended(false);
        lyrics.setAutoScrollSuspended(false);
      }
    }
    if (!selectedKey) return;
    if (selectedKey === "small" || selectedKey === "medium" || selectedKey === "large") {
      currentSizeMode = selectedKey;
      recreateWidgetWithSize(getSizePresets(currentMiniPlayerStyle)[selectedKey]);
    } else if (selectedKey === "custom") {
      ctx.events.emit("open-settings", { view: "extensions" });
    } else if (selectedKey === "circle" || selectedKey === "squircle") {
      currentArtShape = selectedKey;
      saveWidgetPrefs();
      applyWidgetStyle();
    } else if (selectedKey === "mini-default" || selectedKey === "mini-modern") {
      currentMiniPlayerStyle = selectedKey === "mini-modern" ? "modern" : "default";
      currentWidgetSize = currentSizeMode === "custom"
        ? clampWidgetSize(currentWidgetSize, currentMiniPlayerStyle)
        : getSizePresets(currentMiniPlayerStyle)[currentSizeMode];
      miniPlayer.setStyle(currentMiniPlayerStyle);
      if (currentMiniPlayerStyle !== "modern") {
        modernWidgetExpanded = false;
        modernWidget.setExpanded(false);
      }
      miniPlayer.hide();
      saveWidgetPrefs();
      updateWidgetCustomizationUI();
      applyWidgetStyle();
      clampWidgetPosition();
    }
  }

  let didDrag = false;
  let pointerStartPos = { x: 0, y: 0 };
  const DRAG_THRESHOLD = 5;
  widgetContent.addEventListener("pointerdown", (event) => {
    didDrag = false;
    pointerStartPos = { x: event.clientX, y: event.clientY };
    if (!miniPlayer.isOpen()) return;
    let dragRaf: number | null = null;
    const onDragMove = () => {
      if (didDrag && dragRaf === null) {
        dragRaf = requestAnimationFrame(() => {
          miniPlayer.reposition();
          dragRaf = null;
        });
      }
    };
    const onDragEnd = () => {
      document.removeEventListener("pointermove", onDragMove);
      if (dragRaf !== null) cancelAnimationFrame(dragRaf);
    };
    document.addEventListener("pointermove", onDragMove);
    document.addEventListener("pointerup", onDragEnd, { once: true });
  });
  widgetContent.addEventListener("pointermove", (event) => {
    if (didDrag) return;
    const dx = Math.abs(event.clientX - pointerStartPos.x);
    const dy = Math.abs(event.clientY - pointerStartPos.y);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) didDrag = true;
  });
  widgetContent.addEventListener("pointerup", () => {
    requestAnimationFrame(() => clampWidgetPosition());
  });
  widgetContent.addEventListener("click", (event) => {
    if (didDrag) {
      event.stopPropagation();
      didDrag = false;
      return;
    }
    event.stopPropagation();
    if (currentMiniPlayerStyle === "modern") {
      if (!modernWidgetExpanded) setModernWidgetExpanded(true);
      return;
    }
    miniPlayer.toggle();
  });
  widgetContent.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showWidgetMenu(event.clientX, event.clientY);
  });

  let longPressTimer: ReturnType<typeof setTimeout> | null = null;
  let longPressFired = false;
  let longPressStart = { x: 0, y: 0 };
  widgetContent.addEventListener("touchstart", (event) => {
    longPressFired = false;
    const touch = event.touches[0];
    longPressStart = { x: touch.clientX, y: touch.clientY };
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      navigator.vibrate?.(50);
      void showWidgetMenu(touch.clientX, touch.clientY);
    }, 500);
  });
  widgetContent.addEventListener("touchmove", (event) => {
    if (!longPressTimer) return;
    const touch = event.touches[0];
    if (Math.abs(touch.clientX - longPressStart.x) > 10 || Math.abs(touch.clientY - longPressStart.y) > 10) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  });
  widgetContent.addEventListener("touchend", (event) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    if (longPressFired) {
      longPressFired = false;
      return;
    }
    if (currentMiniPlayerStyle === "modern" && modernWidgetExpanded) {
      didDrag = false;
      return;
    }
    if (!didDrag) {
      if (event.cancelable) event.preventDefault();
      if (currentMiniPlayerStyle === "modern") {
        if (!modernWidgetExpanded) setModernWidgetExpanded(true);
      } else {
        miniPlayer.toggle();
      }
    }
    didDrag = false;
  });

  createWidget();
  clampWidgetPosition();
  const handleWidgetViewportResize = () => {
    if (currentMiniPlayerStyle === "modern" && modernWidgetExpanded) {
      applyWidgetStyle();
      requestAnimationFrame(() => clampWidgetPosition(getWidgetLayoutSize()));
      return;
    }
    clampWidgetPosition();
  };
  window.addEventListener("resize", handleWidgetViewportResize);
  cleanups.push(() => window.removeEventListener("resize", handleWidgetViewportResize));
  cleanups.push(() => {
    if (widgetSizeRequestTimer) clearTimeout(widgetSizeRequestTimer);
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
    const proxyResponse = raw as { type?: string; requestId?: string; result?: ProxiedImageResponse; error?: string };
    if (proxyResponse.type === "__cors_proxy_response" && proxyResponse.requestId) {
      resolvePaletteImage(proxyResponse.requestId, proxyResponse.error ? undefined : proxyResponse.result);
      return;
    }
    const message = raw as BackendToFrontend;
    switch (message.type) {
      case "config":
        if (configuredServerUrl && configuredServerUrl !== message.serverUrl) albumPaletteCache.clear();
        remoteControl = message.remoteControl;
        connected = message.connected;
        jukeboxEnabled = message.remoteControl === "jukebox";
        configuredServerUrl = message.serverUrl;
        configuredUsername = message.username;
        configuredHasPassword = message.hasPassword;
        configuredFeishinUrl = message.feishinUrl;
        configuredFeishinUsername = message.feishinUsername;
        configuredHasFeishinPassword = message.hasFeishinPassword;
        configuredPlaybackPositionOffsetMs = message.playbackPositionOffsetMs;
        configuredJukeboxUnavailableReason = message.jukeboxUnavailableReason;
        settings.update(message.connected, message.serverUrl, message.username, message.hasPassword, message.remoteControl, message.feishinUrl, message.feishinUsername, message.hasFeishinPassword, message.playbackPositionOffsetMs, message.jukeboxUnavailableReason);
        search.setAvailable(true);
        search.setPlaybackAvailable(message.remoteControl === "jukebox");
        controls.update(currentState, connected, message.remoteControl !== "none", message.remoteControl === "feishin" ? "Feishin Controls" : "Jukebox Controls");
        syncWidget();
        break;
      case "state":
        connected = message.connected;
        currentState = message.playbackState;
        nowPlaying.update(currentState, connected);
        controls.update(currentState, connected, remoteControl !== "none", remoteControl === "feishin" ? "Feishin Controls" : "Jukebox Controls");
        lyrics.updatePlayback(currentState);
        if (currentState?.trackUri && currentState.trackUri !== lyricsTrackId) {
          lyricsTrackId = currentState.trackUri;
          lyrics.setLoading(true, currentState);
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
        const artUrl = getTrackScopedArtUrl(currentState?.albumArtUrl ?? null, currentState?.trackUri);
        const artworkKey = currentState?.albumArtKey || artUrl;
        if (artUrl !== lastThemeArtUrl) {
          lastThemeArtUrl = artUrl;
          if (artUrl) {
            cancelPendingThemeClear();
            const restoredFromBackend = artworkKey && message.albumPalette?.artworkKey === artworkKey;
            const restoredPalette = restoredFromBackend
              ? message.albumPalette!.colors
              : albumPaletteCache.get(artworkKey || "");
            if (artworkKey && restoredPalette) {
              rememberAlbumPalette(artworkKey, restoredPalette);
              // The backend has already restored a durable palette before it
              // sent this state. A local cache entry is sent only when it was
              // not included in that response.
              if (!restoredFromBackend) send({ type: "album_colors", colors: restoredPalette, artworkKey });
            } else {
              const applySeq = ++themeApplySeq;
              void extractColorsFromImage(artUrl).then((colors) => {
                if (applySeq !== themeApplySeq || artUrl !== lastThemeArtUrl) return;
                if (colors) {
                  if (artworkKey) rememberAlbumPalette(artworkKey, colors);
                  send({ type: "album_colors", colors, artworkKey });
                } else if (!connected) clearAlbumTheme();
              });
            }
          } else if (connected) {
            scheduleAlbumThemeClear();
          } else {
            clearAlbumTheme();
          }
        }
        break;
      case "connected":
        connected = true;
        syncWidget();
        send({ type: "get_config" });
        send({ type: "get_state" });
        break;
      case "disconnected":
        connected = false; currentState = null; lyricsTrackId = null; jukeboxEnabled = false;
        settings.update(false, configuredServerUrl, configuredUsername, configuredHasPassword, remoteControl, configuredFeishinUrl, configuredFeishinUsername, configuredHasFeishinPassword, configuredPlaybackPositionOffsetMs, null);
        search.setAvailable(true);
        search.setPlaybackAvailable(remoteControl === "jukebox");
        lastThemeArtUrl = null;
        albumPaletteCache.clear();
        clearAlbumTheme();
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
    const needed = ["cors_proxy", "ui_panels", "app_manipulation", "generation", "chat_mutation"].filter((permission) => !granted.includes(permission));
    if (needed.length) {
      void ctx.permissions.request(needed, { reason: "Subsonic Controls needs CORS access for your server, a panel and album-art theme support, plus Generation and Chat Mutation to remember the song playing for each assistant reply." });
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
    lastThemeArtUrl = null;
    albumPaletteCache.clear();
    clearAlbumTheme();
    settings.update(false, "", "", false, "none", "", "", false, configuredPlaybackPositionOffsetMs, null);
    nowPlaying.update(null, false);
    controls.update(null, false, false);
    lyrics.clear();
    syncWidget();
  });
  cleanups.push(permissionChange);
  cleanups.push(() => {
    cancelPendingThemeClear();
    themeApplySeq += 1;
    for (const [requestId, pending] of pendingPaletteImages) {
      clearTimeout(pending.timer);
      pending.resolve(null);
      pendingPaletteImages.delete(requestId);
    }
  });
  send({ type: "get_config" });
  send({ type: "get_state" });
  return () => { for (const cleanup of cleanups) cleanup(); };
}
