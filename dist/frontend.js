// src/ui/spotify-widget-styles.ts
var SPOTIFY_WIDGET_CSS = `
@property --spotify-modern-marquee-left-fade {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

@property --spotify-modern-marquee-right-fade {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}

.spotify-tab-root {
  display: flex;
  width: 100%;
  height: var(--spotify-tab-height, 100%);
  max-height: var(--spotify-tab-height, 100%);
  min-height: 0;
  overflow: hidden;
  overscroll-behavior: none;
}

.spotify-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 12px 0;
  flex: 1 1 auto;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--lumiverse-text);
}

.spotify-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}

.spotify-section-title {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--lumiverse-text-muted);
  margin: 0;
}

/* Settings card (matches SimTracker pattern) */
.spotify-settings-card {
  width: 100%;
  border: 1px solid var(--lumiverse-border);
  border-radius: calc(var(--lumiverse-radius) + 2px);
  background: linear-gradient(180deg, var(--lumiverse-fill) 0%, var(--lumiverse-fill-subtle) 100%);
  color: var(--lumiverse-text);
  overflow: hidden;
}

.spotify-settings-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid var(--lumiverse-border);
}

.spotify-settings-card-header h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.spotify-settings-card-body {
  padding: 12px;
  display: grid;
  gap: 10px;
}

.spotify-settings-label {
  font-size: 11px;
  color: var(--lumiverse-text-muted);
  display: grid;
  gap: 5px;
}

.spotify-settings-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.spotify-input {
  width: 100%;
  padding: 6px 8px;
  background: var(--lumiverse-fill-subtle);
  border: 1px solid var(--lumiverse-border);
  border-radius: 8px;
  color: var(--lumiverse-text);
  font-size: 12px;
  outline: none;
  box-sizing: border-box;
  transition: border-color var(--lumiverse-transition-fast);
}

.spotify-input:focus {
  border-color: var(--lumiverse-border-hover);
}

.spotify-btn {
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid var(--lumiverse-border);
  background: var(--lumiverse-fill-subtle);
  color: var(--lumiverse-text);
  font-size: 12px;
  cursor: pointer;
  transition: all var(--lumiverse-transition-fast);
  white-space: nowrap;
}

.spotify-btn:hover {
  background: var(--lumiverse-fill);
  border-color: var(--lumiverse-border-hover);
}

.spotify-btn-primary {
  background: #1db954;
  border-color: #1db954;
  color: #fff;
}

.spotify-btn-primary:hover {
  background: #1ed760;
  border-color: #1ed760;
}

.spotify-btn-danger {
  border-color: #e74c3c;
  color: #e74c3c;
}

.spotify-btn-danger:hover {
  background: rgba(231, 76, 60, 0.1);
}

.spotify-status {
  font-size: 11px;
  color: var(--lumiverse-text-dim);
}

.spotify-status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}

.spotify-status-dot.connected {
  background: #1db954;
}

.spotify-status-dot.disconnected {
  background: #e74c3c;
}

/* Now Playing */
.spotify-now-playing {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px;
  background: var(--lumiverse-fill-subtle);
  border-radius: var(--lumiverse-radius);
  border: 1px solid var(--lumiverse-border);
}

.spotify-album-art {
  width: 56px;
  height: 56px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--lumiverse-fill);
}

.spotify-track-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spotify-track-name {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-track-artist {
  font-size: 12px;
  color: var(--lumiverse-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-track-album {
  font-size: 11px;
  color: var(--lumiverse-text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-track-device {
  font-size: 10px;
  color: var(--lumiverse-text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.7;
}

/* Progress bar */
.spotify-progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--lumiverse-text-dim);
}

.spotify-progress-bar {
  flex: 1;
  height: 4px;
  background: var(--lumiverse-fill);
  border-radius: 2px;
  cursor: pointer;
  padding: 8px 0;
  background-clip: content-box;
  position: relative;
}

.spotify-progress-fill {
  position: absolute;
  top: 8px;
  left: 0;
  height: 4px;
  background: #1db954;
  border-radius: 2px;
  pointer-events: none;
}

/* Controls */
.spotify-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.spotify-ctrl-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--lumiverse-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--lumiverse-transition-fast);
  padding: 0;
}

.spotify-ctrl-btn:hover {
  background: var(--lumiverse-fill-subtle);
}

.spotify-ctrl-btn.active {
  color: #1db954;
}

.spotify-ctrl-btn-main {
  width: 56px;
  height: 56px;
  background: #1db954;
  color: #fff;
}

.spotify-ctrl-btn-main:hover {
  background: #1ed760;
}

.spotify-ctrl-btn svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.spotify-ctrl-btn-main svg {
  width: 26px;
  height: 26px;
}

/* Volume */
.spotify-volume-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 4px;
}

.spotify-volume-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--lumiverse-fill-subtle);
  border: none;
  outline: none;
}

.spotify-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--lumiverse-primary);
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.spotify-volume-slider::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: var(--lumiverse-fill-subtle);
  border: none;
}

.spotify-volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--lumiverse-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* Search */
.spotify-search-input {
  width: 100%;
  padding: 8px 12px;
  background: var(--lumiverse-fill);
  border: 1px solid var(--lumiverse-border);
  border-radius: var(--lumiverse-radius);
  color: var(--lumiverse-text);
  font-size: 13px;
  outline: none;
  box-sizing: border-box;
}

.spotify-search-input:focus {
  border-color: var(--lumiverse-border-hover);
}

.spotify-search-results {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.spotify-search-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: var(--lumiverse-radius);
  cursor: default;
  transition: background var(--lumiverse-transition-fast);
}

.spotify-search-item:hover {
  background: var(--lumiverse-fill-subtle);
}

.spotify-search-item-art {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--lumiverse-fill);
}

.spotify-search-item-info {
  flex: 1;
  min-width: 0;
}

.spotify-search-item-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-search-item-artist {
  font-size: 11px;
  color: var(--lumiverse-text-muted);
}

.spotify-search-item-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.spotify-search-item-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--lumiverse-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.spotify-search-item-btn:hover {
  background: var(--lumiverse-fill);
  color: var(--lumiverse-text);
}

.spotify-search-item-btn svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

/* Float widget */
.spotify-float-widget {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background: var(--lumiverse-fill-subtle);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: box-shadow var(--lumiverse-transition-fast), opacity 320ms cubic-bezier(0.22, 1, 0.36, 1);
  touch-action: none;
}

.spotify-float-widget.spotify-float-widget-mounted {
  opacity: 1;
}

.spotify-float-widget:hover {
  box-shadow: 0 0 0 2px #1db954;
}

.spotify-float-widget-modern-mode {
  background: transparent;
  box-shadow: none;
}

.spotify-float-widget-modern-mode:hover {
  box-shadow: none;
}

.spotify-float-widget-legacy {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotify-float-widget-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotify-float-widget-icon svg {
  width: 24px;
  height: 24px;
  fill: var(--lumiverse-text-muted);
}

.spotify-float-widget-art {
  width: 100%;
  height: 100%;
}

/* Modern expanding widget player */
.spotify-modern-widget-player {
  --spotify-modern-widget-collapsed-size: 48px;
  --spotify-modern-widget-empty-expanded-width: 300px;
  --spotify-modern-widget-empty-expanded-height: 196px;
  --spotify-modern-expanded-surface: var(--lcs-glass-bg, var(--lumiverse-bg-elevated));
  --spotify-modern-expanded-surface-alt: var(--lcs-glass-bg-hover, var(--lumiverse-bg));
  --spotify-modern-widget-motion-duration: 420ms;
  --spotify-modern-widget-motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: inherit;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.022) 0%, rgba(255, 255, 255, 0.008) 42%, rgba(255, 255, 255, 0.014) 100%),
    linear-gradient(180deg, var(--spotify-modern-expanded-surface) 0%, var(--spotify-modern-expanded-surface-alt) 100%);
  border: 1px solid var(--lcs-glass-border, var(--lumiverse-border));
  box-shadow:
    0 14px 34px var(--lumiverse-fill-heavy),
    var(--lumiverse-highlight-inset),
    inset 0 -1px 0 var(--lcs-glass-border, var(--lumiverse-border));
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  color: #fff;
  transition:
    width var(--spotify-modern-widget-motion-duration) var(--spotify-modern-widget-motion-ease),
    height var(--spotify-modern-widget-motion-duration) var(--spotify-modern-widget-motion-ease),
    border-radius var(--spotify-modern-widget-motion-duration) var(--spotify-modern-widget-motion-ease),
    box-shadow var(--spotify-modern-widget-motion-duration) var(--spotify-modern-widget-motion-ease),
    border-color 320ms ease,
    background 320ms ease;
}

[data-glass] .spotify-modern-widget-player {
  -webkit-backdrop-filter: blur(var(--lcs-glass-blur, 8px));
  backdrop-filter: blur(var(--lcs-glass-blur, 8px));
  will-change: backdrop-filter;
}

.spotify-modern-widget-player[data-expanded="false"] {
  width: var(--spotify-modern-widget-collapsed-size);
  height: var(--spotify-modern-widget-collapsed-size);
}

.spotify-modern-widget-player[data-expanded="true"] {
  min-height: 420px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.024) 0%, rgba(255, 255, 255, 0.01) 100%),
    linear-gradient(180deg, var(--spotify-modern-expanded-surface) 0%, var(--spotify-modern-expanded-surface-alt) 100%);
  border-color: var(--lcs-glass-border, var(--lumiverse-border));
  box-shadow: var(--lumiverse-shadow-xl);
}

.spotify-modern-widget-player[data-expanded="true"][data-empty="true"] {
  min-height: var(--spotify-modern-widget-empty-expanded-height);
}

.spotify-modern-widget-compact,
.spotify-modern-widget-expanded {
  position: absolute;
  inset: 0;
  clip-path: inset(0 0 0 0);
  transition:
    opacity 260ms cubic-bezier(0.22, 1, 0.36, 1),
    clip-path var(--spotify-modern-widget-motion-duration) var(--spotify-modern-widget-motion-ease);
}

.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-expanded,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-compact {
  opacity: 0;
  pointer-events: none;
  clip-path: inset(0 calc(100% - var(--spotify-modern-widget-collapsed-size)) calc(100% - var(--spotify-modern-widget-collapsed-size)) 0);
}

.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-expanded,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-compact {
  opacity: 1;
  clip-path: inset(0 0 0 0);
}

.spotify-modern-widget-compact {
  inset: 0 auto auto 0;
  width: var(--spotify-modern-widget-collapsed-size);
  height: var(--spotify-modern-widget-collapsed-size);
  border-radius: inherit;
  overflow: hidden;
  padding: 6px;
  box-sizing: border-box;
}

.spotify-modern-widget-compact-art {
  width: 100%;
  height: 100%;
  border-radius: max(14px, calc(var(--spotify-modern-widget-collapsed-size) * 0.24));
  overflow: hidden;
}

.spotify-modern-widget-compact-fallback {
  position: absolute;
  inset: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: max(14px, calc(var(--spotify-modern-widget-collapsed-size) * 0.24));
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
}

.spotify-modern-widget-compact-fallback svg {
  width: 46%;
  height: 46%;
  fill: rgba(255, 255, 255, 0.78);
}

.spotify-modern-widget-compact-overlay {
  position: absolute;
  inset: 12px 12px 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
  pointer-events: none;
}

.spotify-modern-widget-compact-status {
  display: none;
}

.spotify-modern-widget-compact-progress {
  --spotify-modern-widget-compact-progress: 0%;
  position: absolute;
  inset: 4px;
  z-index: 2;
  border-radius: max(16px, calc(var(--spotify-modern-widget-collapsed-size) * 0.26));
  padding: 2px;
  pointer-events: none;
  background:
    conic-gradient(
      from -90deg,
      rgba(255, 255, 255, 0.88) 0 var(--spotify-modern-widget-compact-progress),
      rgba(255, 255, 255, 0.16) var(--spotify-modern-widget-compact-progress) 100%
    );
  box-shadow: 0 0 18px rgba(255, 255, 255, 0.08);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  transition: opacity 180ms ease, background 180ms ease;
}

.spotify-modern-widget-expanded {
  display: grid;
  grid-template-rows: auto auto auto 1fr auto auto auto;
  gap: 10px;
  padding: 14px 14px 12px;
  box-sizing: border-box;
  min-height: 100%;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.014) 0%, rgba(255, 255, 255, 0.005) 100%),
    linear-gradient(180deg, var(--spotify-modern-expanded-surface) 0%, var(--spotify-modern-expanded-surface-alt) 100%);
}

.spotify-modern-widget-player[data-empty="true"] .spotify-modern-widget-expanded {
  grid-template-rows: auto 1fr;
  gap: 12px;
}

.spotify-modern-widget-header,
.spotify-modern-widget-meta,
.spotify-modern-widget-progress-row,
.spotify-modern-widget-lyrics,
.spotify-modern-widget-controls,
.spotify-modern-widget-volume-row,
.spotify-modern-widget-empty {
  transition: opacity 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-header,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-meta,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-progress-row,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-lyrics,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-controls,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-volume-row,
.spotify-modern-widget-player[data-expanded="false"] .spotify-modern-widget-empty {
  opacity: 0;
}

.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-header,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-meta,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-progress-row,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-lyrics,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-controls,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-volume-row,
.spotify-modern-widget-player[data-expanded="true"] .spotify-modern-widget-empty {
  opacity: 1;
}

.spotify-modern-widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.spotify-modern-widget-eyebrow,
.spotify-modern-widget-section-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.48);
}

.spotify-modern-widget-header-buttons {
  display: flex;
  gap: 6px;
}

.spotify-modern-widget-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.78);
  cursor: pointer;
}

.spotify-modern-widget-icon-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.spotify-modern-widget-icon-btn svg,
.spotify-modern-widget-btn svg,
.spotify-modern-widget-volume-icon svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.spotify-modern-widget-hero {
  display: grid;
  grid-template-columns: 108px 1fr;
  gap: 14px;
  align-items: center;
}

.spotify-modern-widget-art,
.spotify-modern-widget-art-fallback {
  width: 108px;
  height: 108px;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
}

.spotify-modern-widget-art {
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.28);
}

.spotify-modern-widget-art-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 100%);
}

.spotify-modern-widget-art-fallback svg {
  width: 40%;
  height: 40%;
  fill: rgba(255, 255, 255, 0.82);
}

.spotify-modern-widget-meta {
  min-width: 0;
  display: grid;
  gap: 5px;
}

.spotify-modern-widget-marquee {
  --spotify-modern-marquee-left-fade: 0px;
  --spotify-modern-marquee-right-fade: 0px;
  position: relative;
  min-width: 0;
  overflow: hidden;
  -webkit-mask-image: none;
  mask-image: none;
  transition:
    --spotify-modern-marquee-left-fade 220ms cubic-bezier(0.22, 1, 0.36, 1),
    --spotify-modern-marquee-right-fade 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.spotify-modern-widget-marquee[data-overflow="true"] {
  --spotify-modern-marquee-right-fade: 18px;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent 0,
    black var(--spotify-modern-marquee-left-fade),
    black calc(100% - var(--spotify-modern-marquee-right-fade)),
    transparent 100%
  );
  mask-image: linear-gradient(
    90deg,
    transparent 0,
    black var(--spotify-modern-marquee-left-fade),
    black calc(100% - var(--spotify-modern-marquee-right-fade)),
    transparent 100%
  );
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

.spotify-modern-widget-marquee[data-overflow="true"][data-marquee-phase="scrolling"] {
  --spotify-modern-marquee-left-fade: 18px;
}

.spotify-modern-widget-marquee-content {
  width: max-content;
  min-width: 100%;
  white-space: nowrap;
  will-change: transform;
}

.spotify-modern-widget-marquee-animate {
  animation: spotify-modern-marquee var(--spotify-modern-marquee-duration, 10s) ease-in-out 2 alternate;
}

.spotify-modern-widget-track {
  font-size: 20px;
  line-height: 1.12;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.spotify-modern-widget-artist {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.74);
}

.spotify-modern-widget-album {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.48);
}

.spotify-modern-widget-progress-row {
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  gap: 8px;
  align-items: center;
}

.spotify-modern-widget-time {
  font-size: 10px;
  text-align: center;
  color: rgba(255, 255, 255, 0.56);
}

.spotify-modern-widget-progress-bar {
  position: relative;
  height: 6px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.14);
  cursor: pointer;
}

.spotify-modern-widget-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  width: 0;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #f7f8fb 0%, #c7cfdd 100%);
}

.spotify-modern-widget-lyrics {
  display: grid;
  gap: 8px;
  min-height: 0;
  padding: 14px 14px 12px;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.032) 0%, rgba(255, 255, 255, 0.012) 100%),
    var(--spotify-modern-expanded-surface);
  border: 1px solid var(--lcs-glass-border, var(--lumiverse-border));
  overflow: hidden;
}

.spotify-modern-widget-lyrics-body {
  min-height: 132px;
  max-height: 176px;
  display: block;
  gap: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;
  scroll-padding-top: 36%;
  scroll-padding-bottom: 24px;
  overscroll-behavior: contain;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--lumiverse-fill-strong) transparent;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 18px, black calc(100% - 18px), transparent 100%);
}

.spotify-modern-widget-lyrics-track {
  width: 100%;
  display: grid;
  gap: 4px;
  padding: 0 0 2px;
}

.spotify-modern-widget-lyrics-status {
  text-align: center;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.58);
}

.spotify-modern-widget-lyrics-status-loading {
  animation: spotify-lyrics-loading-pulse 1.15s ease-in-out infinite;
}

.spotify-modern-widget-lyric-line {
  text-align: center;
  font-size: 16px;
  line-height: 1.24;
  font-weight: 600;
  letter-spacing: -0.018em;
  color: rgba(255, 255, 255, 0.22);
  white-space: pre-wrap;
  text-wrap: pretty;
  transition: color 220ms ease, transform 220ms ease, text-shadow 220ms ease;
}

.spotify-modern-widget-lyric-line-enter {
  animation: spotify-lyrics-line-in 360ms cubic-bezier(0.18, 0.9, 0.22, 1) both;
  animation-delay: var(--spotify-modern-lyric-enter-delay, 0ms);
}

.spotify-modern-widget-lyric-line-long {
  max-width: calc(100% - 24px);
  margin-inline: auto;
}

.spotify-modern-widget-lyric-line.active {
  color: #fff;
  transform: scale(1.035);
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.12);
}

.spotify-modern-widget-lyric-line.near {
  color: rgba(255, 255, 255, 0.64);
}

.spotify-modern-widget-lyric-line.mid {
  color: rgba(255, 255, 255, 0.38);
}

.spotify-modern-widget-lyric-line.far,
.spotify-modern-widget-lyric-line.plain {
  color: rgba(255, 255, 255, 0.24);
}

.spotify-modern-widget-lyric-line.plain {
  color: rgba(255, 255, 255, 0.52);
}

.spotify-modern-widget-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: auto;
}

.spotify-modern-widget-btn {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  cursor: pointer;
}

.spotify-modern-widget-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.spotify-modern-widget-btn-main {
  width: 58px;
  height: 58px;
  background: linear-gradient(180deg, #fbfcff 0%, #d8deea 100%);
  color: #11131a;
}

.spotify-modern-widget-btn-main:hover {
  background: linear-gradient(180deg, #fff 0%, #e7ebf3 100%);
}

.spotify-modern-widget-btn-main svg {
  width: 22px;
  height: 22px;
}

.spotify-modern-widget-volume-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 6px 2px;
  margin-top: -2px;
}

.spotify-modern-widget-volume-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.58);
}

.spotify-modern-widget-volume-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  outline: none;
  border: none;
}

.spotify-modern-widget-volume-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 999px;
  background: transparent;
}

.spotify-modern-widget-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  margin-top: -5px;
  border-radius: 50%;
  background: #f4f6fa;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.spotify-modern-widget-volume-slider::-moz-range-track {
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: none;
}

.spotify-modern-widget-volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f4f6fa;
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.spotify-modern-widget-empty {
  display: none;
  align-content: center;
  justify-items: center;
  gap: 10px;
  min-height: 0;
  text-align: center;
  padding: 10px 12px 16px;
}

.spotify-modern-widget-empty-icon {
  width: 62px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%),
    rgba(255, 255, 255, 0.02);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    0 12px 24px rgba(0, 0, 0, 0.18);
}

.spotify-modern-widget-empty-icon svg {
  width: 28px;
  height: 28px;
  fill: rgba(255, 255, 255, 0.84);
}

.spotify-modern-widget-empty-title {
  font-size: 24px;
  line-height: 1.06;
  font-weight: 700;
  letter-spacing: -0.035em;
  color: #fff;
}

.spotify-modern-widget-empty-subtitle {
  max-width: 26ch;
  font-size: 12px;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: rgba(255, 255, 255, 0.58);
}

@keyframes spotify-modern-marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-1 * var(--spotify-modern-marquee-distance, 0px)));
  }
}

/* Empty state */
.spotify-empty {
  text-align: center;
  padding: 16px;
  color: var(--lumiverse-text-dim);
  font-size: 13px;
}

/* Crossfade album art */
.spotify-crossfade-art {
  position: relative;
  overflow: hidden;
}

.spotify-crossfade-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease;
}

/* Mini player popup */
.spotify-mini-player {
  position: fixed;
  z-index: 9990;
  width: var(--spotify-mini-player-width, 280px);
  background: var(--lumiverse-bg);
  border: 1px solid var(--lumiverse-border);
  border-radius: 12px;
  box-shadow: var(--lumiverse-shadow-xl);
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--lumiverse-text);
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.spotify-mini-player[data-style="modern"] {
  gap: 12px;
  padding: 14px;
  border-radius: 24px;
  border-color: rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%),
    linear-gradient(180deg, rgba(18, 18, 20, 0.96) 0%, rgba(10, 10, 12, 0.98) 100%);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(26px) saturate(1.15);
}

.spotify-mini-player.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

.spotify-mini-player.closing {
  display: flex;
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.spotify-mini-header {
  display: flex;
  gap: 10px;
  align-items: center;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-header {
  align-items: stretch;
  gap: 14px;
}

.spotify-mini-art {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--lumiverse-fill);
}

.spotify-mini-player[data-style="modern"] .spotify-mini-art {
  width: 94px;
  height: 94px;
  border-radius: 22px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
}

.spotify-mini-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-info {
  justify-content: center;
  gap: 4px;
}

.spotify-mini-track {
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-track {
  font-size: 18px;
  line-height: 1.15;
  letter-spacing: -0.02em;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.spotify-mini-artist {
  font-size: 11px;
  color: var(--lumiverse-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-artist {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.spotify-mini-album {
  display: none;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.48);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-album {
  display: block;
}

.spotify-mini-header-btns {
  display: flex;
  gap: 2px;
  flex-shrink: 0;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-header-btns {
  align-self: flex-start;
  gap: 6px;
}

.spotify-mini-header-btn {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--lumiverse-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.15s ease;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-header-btn {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.72);
  background: rgba(255, 255, 255, 0.08);
}

.spotify-mini-header-btn:hover {
  background: var(--lumiverse-fill-subtle);
  color: var(--lumiverse-text);
}

.spotify-mini-player[data-style="modern"] .spotify-mini-header-btn:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
}

.spotify-mini-header-btn svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.spotify-mini-progress-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-progress-row {
  gap: 8px;
}

.spotify-mini-time {
  font-size: 10px;
  color: var(--lumiverse-text-dim);
  min-width: 28px;
  text-align: center;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-time {
  min-width: 32px;
  color: rgba(255, 255, 255, 0.56);
}

.spotify-mini-progress-bar {
  flex: 1;
  height: 4px;
  background: var(--lumiverse-fill);
  border-radius: 2px;
  cursor: pointer;
  padding: 6px 0;
  background-clip: content-box;
  position: relative;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-progress-bar {
  height: 6px;
  padding: 7px 0;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 999px;
}

.spotify-mini-progress-fill {
  position: absolute;
  top: 6px;
  left: 0;
  height: 4px;
  background: #1db954;
  border-radius: 2px;
  pointer-events: none;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-progress-fill {
  top: 7px;
  height: 6px;
  border-radius: 999px;
  background: linear-gradient(90deg, #f6f7fb 0%, #c7ccd8 100%);
}

.spotify-mini-lyrics-section {
  display: none;
  flex-direction: column;
  gap: 8px;
  padding: 14px 14px 12px;
  border-radius: 20px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.spotify-mini-lyrics-header {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.46);
}

.spotify-mini-lyrics-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 132px;
  min-height: 132px;
  justify-content: center;
  overflow: hidden;
}

.spotify-mini-lyrics-status {
  font-size: 13px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.58);
  text-align: center;
}

.spotify-mini-lyrics-status-loading {
  animation: spotify-lyrics-loading-pulse 1.15s ease-in-out infinite;
}

.spotify-mini-lyric-line {
  font-size: 16px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.018em;
  text-align: center;
  color: rgba(255, 255, 255, 0.22);
  transition: color 220ms ease, transform 220ms ease, opacity 220ms ease;
  white-space: pre-wrap;
  text-wrap: pretty;
}

.spotify-mini-lyric-line-active {
  color: #fff;
  transform: scale(1.035);
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.12);
}

.spotify-mini-lyric-line-near {
  color: rgba(255, 255, 255, 0.62);
}

.spotify-mini-lyric-line-mid {
  color: rgba(255, 255, 255, 0.38);
}

.spotify-mini-lyric-line-far,
.spotify-mini-lyric-line-plain {
  color: rgba(255, 255, 255, 0.24);
}

.spotify-mini-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-controls {
  gap: 12px;
}

.spotify-mini-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--lumiverse-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.15s ease;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-btn {
  width: 42px;
  height: 42px;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(255, 255, 255, 0.08);
}

.spotify-mini-btn:hover {
  background: var(--lumiverse-fill-subtle);
}

.spotify-mini-player[data-style="modern"] .spotify-mini-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.spotify-mini-btn svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

.spotify-mini-btn-main {
  width: 56px;
  height: 56px;
  background: #1db954;
  color: #fff;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-btn-main {
  width: 58px;
  height: 58px;
  background: linear-gradient(180deg, #f5f7fb 0%, #d6dce8 100%);
  color: #111318;
}

.spotify-mini-btn-main:hover {
  background: #1ed760;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-btn-main:hover {
  background: linear-gradient(180deg, #ffffff 0%, #e4e9f2 100%);
}

.spotify-mini-btn-main svg {
  width: 26px;
  height: 26px;
}

.spotify-mini-volume-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-volume-row {
  padding: 0 4px;
}

.spotify-mini-volume-icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  color: var(--lumiverse-text-muted);
}

.spotify-mini-player[data-style="modern"] .spotify-mini-volume-icon {
  color: rgba(255, 255, 255, 0.56);
}

.spotify-mini-volume-icon svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.spotify-mini-volume-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: var(--lumiverse-fill-subtle);
  border: none;
  outline: none;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-volume-slider {
  background: rgba(255, 255, 255, 0.12);
}

.spotify-mini-volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--lumiverse-primary);
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.spotify-mini-volume-slider::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: var(--lumiverse-fill-subtle);
  border: none;
}

.spotify-mini-volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--lumiverse-primary);
  cursor: pointer;
  border: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.spotify-mini-empty {
  text-align: center;
  padding: 12px 8px;
  color: var(--lumiverse-text-dim);
  font-size: 12px;
}

/* Mini player device row */
.spotify-mini-device-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-top: 2px;
  border-top: 1px solid var(--lumiverse-border);
  padding: 6px 0 0;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-device-row {
  padding-top: 4px;
  border-top-color: rgba(255, 255, 255, 0.08);
}

.spotify-mini-device-icon {
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  color: var(--lumiverse-text-dim);
  flex-shrink: 0;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-device-icon {
  color: rgba(255, 255, 255, 0.48);
}

.spotify-mini-device-icon svg {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.spotify-mini-device-name {
  flex: 1;
  font-size: 11px;
  color: var(--lumiverse-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-device-name {
  color: rgba(255, 255, 255, 0.62);
}

.spotify-mini-device-toggle {
  padding: 2px 8px;
  border-radius: 4px;
  border: 1px solid var(--lumiverse-border);
  background: transparent;
  color: var(--lumiverse-text-muted);
  font-size: 10px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.spotify-mini-player[data-style="modern"] .spotify-mini-device-toggle {
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.76);
}

.spotify-mini-device-toggle:hover {
  background: var(--lumiverse-fill-subtle);
  color: var(--lumiverse-text);
}

.spotify-mini-player[data-style="modern"] .spotify-mini-device-toggle:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.spotify-mini-device-list {
  display: none;
  flex-direction: column;
  gap: 2px;
  padding: 4px 0 0;
}

.spotify-mini-device-loading {
  font-size: 11px;
  color: var(--lumiverse-text-dim);
  text-align: center;
  padding: 6px;
}

.spotify-mini-device-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.1s ease;
  font-size: 11px;
}

.spotify-mini-device-item:hover {
  background: var(--lumiverse-fill-subtle);
}

.spotify-mini-device-item.active {
  color: #1db954;
  cursor: default;
}

.spotify-mini-device-item-name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-mini-device-item-type {
  color: var(--lumiverse-text-dim);
  font-size: 10px;
  text-transform: capitalize;
  flex-shrink: 0;
}

/* Lyrics */
.spotify-lyrics-section {
  min-height: 0;
  flex: 1 1 auto;
  overflow: hidden;
}

.spotify-lyrics-body {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 48px;
  overflow: hidden;
}

.spotify-lyrics-has-content {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--lumiverse-fill-strong) transparent;
  position: relative;
  padding-top: 28px;
  padding-bottom: 112px;
  padding-inline: 6px;
  scroll-padding-top: 34%;
  scroll-padding-bottom: 112px;
  box-sizing: border-box;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 56px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 56px), transparent 100%);
}

.spotify-lyrics-status {
  padding: 12px 0;
  text-align: center;
  font-size: 12px;
  color: var(--lumiverse-text-dim);
  font-style: italic;
}

.spotify-lyrics-status-loading {
  letter-spacing: 0.02em;
  animation: spotify-lyrics-loading-pulse 1.15s ease-in-out infinite;
}

.spotify-lyrics-text {
  white-space: pre-wrap;
  font-size: 16px;
  line-height: 1.65;
  color: var(--lumiverse-text-muted);
  text-align: center;
  text-wrap: pretty;
  padding: 8px 12px 24px;
}

.spotify-lyrics-synced {
  gap: 2px;
  scroll-behavior: smooth;
}

.spotify-lyrics-line {
  --spotify-lyrics-line-opacity: 1;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  color: var(--lumiverse-text-dim);
  text-align: center;
  opacity: var(--spotify-lyrics-line-opacity);
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  transition: color 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms cubic-bezier(0.22, 1, 0.36, 1), background 220ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.spotify-lyrics-line-text {
  display: block;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.35;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: normal;
  text-wrap: pretty;
  letter-spacing: -0.015em;
  transform: translateY(0);
  transform-origin: center center;
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), text-shadow 240ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.spotify-lyrics-line-text-long {
  max-width: calc(100% - 32px);
  margin-inline: auto;
}

.spotify-lyrics-line-enter {
  animation: spotify-lyrics-line-in 420ms cubic-bezier(0.18, 0.9, 0.22, 1) both;
  animation-delay: var(--spotify-lyrics-enter-delay, 0ms);
}

.spotify-lyrics-line:hover {
  background: var(--lumiverse-fill-subtle);
}

.spotify-lyrics-line-active {
  --spotify-lyrics-line-opacity: 1;
  color: var(--lumiverse-text);
  opacity: 1;
}

.spotify-lyrics-line-active .spotify-lyrics-line-text {
  transform: scale(1.17);
  text-shadow: 0 0 18px rgba(255, 255, 255, 0.1);
  filter: brightness(1.12);
}

.spotify-lyrics-line-tier-1 {
  --spotify-lyrics-line-opacity: 0.78;
  color: var(--lumiverse-text-muted);
}

.spotify-lyrics-line-tier-2 {
  --spotify-lyrics-line-opacity: 0.56;
  color: var(--lumiverse-text-muted);
}

.spotify-lyrics-line-tier-3 {
  --spotify-lyrics-line-opacity: 0.38;
}

.spotify-lyrics-line-tier-4 {
  --spotify-lyrics-line-opacity: 0.24;
}

.spotify-lyrics-line-past {
  --spotify-lyrics-line-opacity: 0.3;
}

.spotify-lyrics-line-future {
  --spotify-lyrics-line-opacity: 0.42;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-1,
.spotify-lyrics-line-future.spotify-lyrics-line-tier-1 {
  --spotify-lyrics-line-opacity: 0.78;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-2,
.spotify-lyrics-line-future.spotify-lyrics-line-tier-2 {
  --spotify-lyrics-line-opacity: 0.56;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-3,
.spotify-lyrics-line-future.spotify-lyrics-line-tier-3 {
  --spotify-lyrics-line-opacity: 0.38;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-4,
.spotify-lyrics-line-future.spotify-lyrics-line-tier-4 {
  --spotify-lyrics-line-opacity: 0.24;
}

.spotify-lyrics-line-blank {
  min-height: 22px;
  --spotify-lyrics-line-opacity: 0.18;
}

.spotify-lyrics-line-blank .spotify-lyrics-line-text {
  font-size: 15px;
  letter-spacing: 0.08em;
}

.spotify-lyrics-line-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  min-height: 1em;
}

.spotify-lyrics-text-enter {
  animation: spotify-lyrics-text-in 340ms cubic-bezier(0.18, 0.9, 0.22, 1) both;
}

@keyframes spotify-lyrics-loading-pulse {
  0%,
  100% {
    opacity: 0.38;
  }

  50% {
    opacity: 0.8;
  }
}

@keyframes spotify-lyrics-line-in {
  from {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(8px);
  }

  to {
    opacity: var(--spotify-lyrics-line-opacity);
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes spotify-lyrics-text-in {
  from {
    opacity: 0;
    transform: translateY(10px);
    filter: blur(6px);
  }

  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spotify-lyrics-line,
  .spotify-lyrics-text,
  .spotify-lyrics-status-loading {
    animation: none !important;
    transition: none;
  }
}

/* ─── Per-message "song that was playing" badge ─────────────────────────── */

.spotify-song-badge-wrap {
  position: absolute;
  bottom: 8px;
  z-index: 4;
  line-height: 0;
}

.spotify-song-badge-wrap[data-corner="right"] {
  right: 8px;
}

.spotify-song-badge-wrap[data-corner="left"] {
  left: 8px;
}

.spotify-song-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 1px solid var(--lumiverse-border);
  border-radius: 50%;
  background: var(--lumiverse-fill-subtle, rgba(127, 127, 127, 0.12));
  color: var(--lumiverse-text-dim);
  cursor: pointer;
  opacity: 0.55;
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  transition: opacity 160ms ease, color 160ms ease, border-color 160ms ease,
              transform 160ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.spotify-song-badge:hover,
.spotify-song-badge:focus-visible {
  opacity: 1;
  color: #1db954;
  border-color: #1db954;
  transform: scale(1.08);
  outline: none;
}

.spotify-song-badge svg {
  width: 14px;
  height: 14px;
}

/* ─── Song popover (sleek view, lazy-rendered on click) ─────────────────── */

.spotify-song-pop {
  position: fixed;
  z-index: 9991;
  width: 280px;
  max-width: calc(100vw - 16px);
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--lumiverse-bg);
  border: 1px solid var(--lumiverse-border);
  border-radius: 14px;
  box-shadow: var(--lumiverse-shadow-xl);
  -webkit-backdrop-filter: blur(20px) saturate(1.1);
  backdrop-filter: blur(20px) saturate(1.1);
  color: var(--lumiverse-text);
  font-family: system-ui, -apple-system, sans-serif;
  transform: scale(0.85);
  opacity: 0;
  pointer-events: none;
  transition: transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1),
              opacity 140ms ease;
}

.spotify-song-pop.open {
  transform: scale(1);
  opacity: 1;
  pointer-events: auto;
}

.spotify-song-pop-header {
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--lumiverse-text-dim);
  display: flex;
  align-items: center;
  gap: 6px;
}

.spotify-song-pop-header::before {
  content: "♪";
  color: #1db954;
  font-size: 12px;
}

.spotify-song-pop-body {
  display: flex;
  gap: 12px;
  align-items: center;
}

.spotify-song-pop-art {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--lumiverse-fill);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
}

.spotify-song-pop-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.spotify-song-pop-track {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.spotify-song-pop-artist {
  font-size: 12px;
  color: var(--lumiverse-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-song-pop-album {
  font-size: 11px;
  color: var(--lumiverse-text-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spotify-song-pop-when {
  margin-top: 2px;
  font-size: 10.5px;
  color: var(--lumiverse-text-dim);
}

.spotify-song-pop-actions {
  display: flex;
  gap: 6px;
}

.spotify-song-pop-btn {
  flex: 1 1 0;
  min-width: 0;
  box-sizing: border-box;
  height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 8px;
  border: 1px solid var(--lumiverse-border);
  border-radius: 9px;
  background: var(--lumiverse-fill-subtle, rgba(127, 127, 127, 0.1));
  color: var(--lumiverse-text);
  font-size: 12px;
  font-weight: 600;
  font-family: inherit;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: background 140ms ease, border-color 140ms ease, transform 120ms ease;
}

.spotify-song-pop-btn svg {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.spotify-song-pop-btn:hover {
  border-color: var(--lumiverse-border-hover, var(--lumiverse-border));
  transform: translateY(-1px);
}

.spotify-song-pop-btn:active {
  transform: translateY(0);
}

.spotify-song-pop-btn-primary {
  background: #1db954;
  border-color: #1db954;
  color: #fff;
}

.spotify-song-pop-btn-primary:hover {
  background: #1ed760;
  border-color: #1ed760;
}

@media (prefers-reduced-motion: reduce) {
  .spotify-song-badge,
  .spotify-song-pop,
  .spotify-song-pop-btn {
    transition: none;
  }
}

`;

// src/ui/settings.ts
function createSettingsUI(sendToBackend) {
  const root = document.createElement("section");
  root.className = "spotify-settings-card";
  const header = document.createElement("header");
  header.className = "spotify-settings-card-header";
  const title = document.createElement("h3");
  title.textContent = "Subsonic Controls";
  const status = document.createElement("span");
  status.className = "spotify-status";
  header.append(title, status);
  const body = document.createElement("div");
  body.className = "spotify-settings-card-body";
  const makeField = (labelText, type, placeholder) => {
    const wrapper = document.createElement("label");
    wrapper.className = "spotify-settings-label";
    const label = document.createTextNode(labelText);
    wrapper.append(label);
    const input = document.createElement("input");
    input.className = "spotify-input";
    input.type = type;
    input.placeholder = placeholder;
    wrapper.append(input);
    body.append(wrapper);
    return input;
  };
  const serverUrl = makeField("Subsonic server URL", "url", "https://music.example.com (or …/rest)");
  const username = makeField("Subsonic username", "text", "Subsonic username");
  const password = makeField("Subsonic password", "password", "Subsonic password");
  const controllerLabel = document.createElement("label");
  controllerLabel.className = "spotify-settings-label";
  controllerLabel.append("Playback controls");
  const controller = document.createElement("select");
  controller.className = "spotify-input";
  for (const [value, label] of [["none", "Now playing only"], ["jukebox", "Server-side Jukebox"], ["feishin", "Feishin Desktop Remote"]]) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    controller.append(option);
  }
  controllerLabel.append(controller);
  body.append(controllerLabel);
  const jukeboxNote = document.createElement("div");
  jukeboxNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px";
  jukeboxNote.textContent = "Jukebox controls affect the server-side player.";
  body.append(jukeboxNote);
  const jukeboxUnavailable = document.createElement("div");
  jukeboxUnavailable.style.cssText = "display:none;font-size:0.8em;color:#e74c3c;margin-top:4px";
  body.append(jukeboxUnavailable);
  const feishinFields = document.createElement("div");
  feishinFields.style.display = "none";
  const makeFeishinField = (labelText, type, placeholder) => {
    const wrapper = document.createElement("label");
    wrapper.className = "spotify-settings-label";
    wrapper.append(labelText);
    const input = document.createElement("input");
    input.className = "spotify-input";
    input.type = type;
    input.placeholder = placeholder;
    wrapper.append(input);
    feishinFields.append(wrapper);
    return input;
  };
  const feishinUrl = makeFeishinField("Feishin Remote URL", "url", "http://192.168.1.20:4333");
  const feishinUsername = makeFeishinField("Feishin username", "text", "Optional Remote username");
  const feishinPassword = makeFeishinField("Feishin password", "password", "Optional Remote password");
  const feishinNote = document.createElement("div");
  feishinNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px";
  feishinNote.textContent = "Feishin Remote requires WebSocket transport; its HTTP server only serves the Remote page and credentials. Library search and lyrics still use the Subsonic server above.";
  feishinFields.append(feishinNote);
  body.append(feishinFields);
  const actions = document.createElement("div");
  actions.className = "spotify-settings-row";
  const button = document.createElement("button");
  button.className = "spotify-btn spotify-btn-primary";
  actions.append(button);
  body.append(actions);
  root.append(header, body);
  let isConnected = false;
  function syncControllerFields() {
    const isFeishin = controller.value === "feishin";
    feishinFields.style.display = isFeishin ? "" : "none";
    jukeboxNote.style.display = controller.value === "jukebox" ? "" : "none";
    jukeboxUnavailable.style.display = controller.value === "jukebox" && jukeboxUnavailable.textContent ? "" : "none";
  }
  controller.onchange = syncControllerFields;
  function update(connected, url, user, hasPassword, remoteControl, remoteUrl, remoteUser, hasRemotePassword, unavailable) {
    isConnected = connected;
    if (url)
      serverUrl.value = url;
    if (user)
      username.value = user;
    if (remoteUrl)
      feishinUrl.value = remoteUrl;
    if (remoteUser)
      feishinUsername.value = remoteUser;
    controller.value = remoteControl;
    jukeboxUnavailable.textContent = unavailable || "";
    syncControllerFields();
    for (const input of [serverUrl, username, password, controller, feishinUrl, feishinUsername, feishinPassword])
      input.disabled = connected;
    password.value = "";
    feishinPassword.value = "";
    password.placeholder = hasPassword ? "Saved securely (re-enter to change)" : "Subsonic password";
    feishinPassword.placeholder = hasRemotePassword ? "Saved securely (re-enter to change)" : "Optional Remote password";
    button.textContent = connected ? "Disconnect" : "Connect";
    button.className = connected ? "spotify-btn spotify-btn-danger" : "spotify-btn spotify-btn-primary";
    button.disabled = false;
    status.innerHTML = connected ? '<span class="spotify-status-dot connected"></span>Connected' : '<span class="spotify-status-dot disconnected"></span>Not connected';
  }
  button.onclick = () => {
    if (isConnected)
      return void sendToBackend({ type: "disconnect" });
    const remoteControl = controller.value;
    if (!serverUrl.value.trim() || !username.value.trim() || !password.value || remoteControl === "feishin" && !feishinUrl.value.trim()) {
      status.innerHTML = '<span class="spotify-status-dot disconnected"></span><span style="color:#e74c3c">Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.</span>';
      return;
    }
    button.disabled = true;
    button.textContent = "Connecting…";
    sendToBackend({ type: "connect", serverUrl: serverUrl.value.trim(), username: username.value.trim(), password: password.value, remoteControl, feishinUrl: feishinUrl.value.trim(), feishinUsername: feishinUsername.value.trim(), feishinPassword: feishinPassword.value });
  };
  update(false, "", "", false, "none", "", "", false, null);
  return { root, update, setConnecting() {
    button.disabled = true;
    button.textContent = "Connecting…";
  }, destroy() {
    root.remove();
  } };
}

// src/ui/crossfade-art.ts
function getTrackScopedArtUrl(url, trackUri) {
  if (!url)
    return null;
  if (!trackUri)
    return url;
  try {
    const scopedUrl = new URL(url);
    scopedUrl.searchParams.set("track", trackUri);
    return scopedUrl.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}track=${encodeURIComponent(trackUri)}`;
  }
}
function createCrossfadeArt(className) {
  const el = document.createElement("div");
  el.className = `${className} spotify-crossfade-art`;
  el.style.display = "none";
  const imgA = document.createElement("img");
  const imgB = document.createElement("img");
  imgA.className = "spotify-crossfade-img";
  imgB.className = "spotify-crossfade-img";
  imgA.alt = "";
  imgB.alt = "";
  imgA.loading = "eager";
  imgB.loading = "eager";
  imgA.decoding = "async";
  imgB.decoding = "async";
  imgA.style.visibility = "hidden";
  imgB.style.visibility = "hidden";
  imgA.style.opacity = "1";
  imgB.style.opacity = "0";
  el.appendChild(imgA);
  el.appendChild(imgB);
  let currentUrl = null;
  let activeImg = imgA;
  let inactiveImg = imgB;
  let hasLoadedOnce = false;
  function resetImage(img) {
    img.onload = null;
    img.onerror = null;
    img.removeAttribute("src");
    img.style.visibility = "hidden";
  }
  function hideArt() {
    el.style.display = "none";
    activeImg.style.opacity = "1";
    inactiveImg.style.opacity = "0";
  }
  function setUrl(url) {
    if (url === currentUrl)
      return;
    currentUrl = url;
    if (!url) {
      resetImage(activeImg);
      resetImage(inactiveImg);
      hasLoadedOnce = false;
      hideArt();
      return;
    }
    if (!hasLoadedOnce) {
      el.style.display = "";
      activeImg.onload = () => {
        hasLoadedOnce = true;
        activeImg.style.visibility = "visible";
      };
      activeImg.onerror = () => {
        currentUrl = null;
        resetImage(activeImg);
        hideArt();
      };
      activeImg.src = url;
      if (activeImg.complete && activeImg.naturalWidth > 0) {
        hasLoadedOnce = true;
        activeImg.style.visibility = "visible";
      }
      return;
    }
    el.style.display = "";
    inactiveImg.onload = () => {
      inactiveImg.style.visibility = "visible";
      inactiveImg.style.opacity = "1";
      activeImg.style.opacity = "0";
      const tmp = activeImg;
      activeImg = inactiveImg;
      inactiveImg = tmp;
    };
    inactiveImg.onerror = () => {
      currentUrl = null;
      resetImage(inactiveImg);
      inactiveImg.style.opacity = "0";
    };
    inactiveImg.src = url;
    if (inactiveImg.complete && inactiveImg.naturalWidth > 0) {
      inactiveImg.style.visibility = "visible";
      inactiveImg.style.opacity = "1";
      activeImg.style.opacity = "0";
      const tmp = activeImg;
      activeImg = inactiveImg;
      inactiveImg = tmp;
    }
  }
  return {
    el,
    setUrl,
    destroy() {
      el.remove();
    }
  };
}

// src/ui/now-playing.ts
function createNowPlayingUI() {
  const root = document.createElement("div");
  root.className = "spotify-section";
  const title = document.createElement("h3");
  title.className = "spotify-section-title";
  title.textContent = "Now Playing";
  const body = document.createElement("div");
  body.className = "spotify-now-playing";
  const art = createCrossfadeArt("spotify-album-art");
  const info = document.createElement("div");
  info.className = "spotify-track-info";
  const track = document.createElement("div");
  track.className = "spotify-track-name";
  const artist = document.createElement("div");
  artist.className = "spotify-track-artist";
  const album = document.createElement("div");
  album.className = "spotify-track-album";
  const source = document.createElement("div");
  source.className = "spotify-track-device";
  info.append(track, artist, album, source);
  body.append(art.el, info);
  const empty = document.createElement("div");
  empty.className = "spotify-empty";
  root.append(title, body, empty);
  return { root, update(state, connected) {
    if (!connected) {
      body.style.display = "none";
      empty.style.display = "";
      empty.textContent = "Connect a music source to get started";
      art.setUrl(null);
      return;
    }
    if (!state) {
      body.style.display = "none";
      empty.style.display = "";
      empty.textContent = "No active playback reported";
      art.setUrl(null);
      return;
    }
    body.style.display = "flex";
    empty.style.display = "none";
    track.textContent = state.trackName;
    artist.textContent = state.artistName;
    album.textContent = state.albumName;
    source.textContent = state.source === "jukebox" ? "Server Jukebox" : state.source === "feishin" ? "Feishin Desktop" : "Server now playing";
    art.setUrl(getTrackScopedArtUrl(state.albumArtUrl, state.trackUri));
  }, destroy() {
    art.destroy();
    root.remove();
  } };
}

// src/ui/controls.ts
var PREVIOUS = `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
var PLAY = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
var PAUSE = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
var NEXT = `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
function createControlsUI(send) {
  const root = document.createElement("div");
  root.className = "spotify-section";
  const title = document.createElement("h3");
  title.className = "spotify-section-title";
  title.textContent = "Player Controls";
  const row = document.createElement("div");
  row.className = "spotify-controls";
  const button = (icon, className = "") => {
    const element = document.createElement("button");
    element.className = `spotify-ctrl-btn ${className}`;
    element.innerHTML = icon;
    return element;
  };
  const previous = button(PREVIOUS);
  const playPause = button(PLAY, "spotify-ctrl-btn-main");
  const next = button(NEXT);
  previous.onclick = () => send({ type: "previous" });
  next.onclick = () => send({ type: "next" });
  let isPlaying = false;
  playPause.onclick = () => send({ type: isPlaying ? "pause" : "play" });
  row.append(previous, playPause, next);
  root.append(title, row);
  return { root, update(state, connected, enabled, titleText = "Player Controls") {
    root.style.display = connected && enabled ? "" : "none";
    title.textContent = titleText;
    isPlaying = !!state?.isPlaying;
    playPause.innerHTML = isPlaying ? PAUSE : PLAY;
  }, destroy() {
    root.remove();
  } };
}

// src/ui/search.ts
var PLAY2 = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
var QUEUE = `<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>`;
function createSearchUI(send) {
  const root = document.createElement("div");
  root.className = "spotify-section";
  const title = document.createElement("h3");
  title.className = "spotify-section-title";
  title.textContent = "Library Search";
  const input = document.createElement("input");
  input.className = "spotify-search-input";
  input.placeholder = "Search your server's music library…";
  const list = document.createElement("div");
  list.className = "spotify-search-results";
  root.append(title, input, list);
  let timer = null;
  let playbackAvailable = true;
  input.oninput = () => {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(() => {
      const query = input.value.trim();
      if (query.length >= 2)
        send({ type: "search", query });
      else
        list.innerHTML = "";
    }, 350);
  };
  const setResults = (results) => {
    list.innerHTML = "";
    if (!results.length) {
      const empty = document.createElement("div");
      empty.className = "spotify-empty";
      empty.textContent = "No tracks found";
      list.appendChild(empty);
      return;
    }
    for (const result of results) {
      const item = document.createElement("div");
      item.className = "spotify-search-item";
      if (result.albumArtUrl) {
        const image = document.createElement("img");
        image.className = "spotify-search-item-art";
        image.src = result.albumArtUrl;
        image.alt = result.album;
        item.appendChild(image);
      }
      const info = document.createElement("div");
      info.className = "spotify-search-item-info";
      const name = document.createElement("div");
      name.className = "spotify-search-item-name";
      name.textContent = result.name;
      const detail = document.createElement("div");
      detail.className = "spotify-search-item-artist";
      detail.textContent = `${result.artist} — ${result.album}`;
      info.append(name, detail);
      if (playbackAvailable) {
        const actions = document.createElement("div");
        actions.className = "spotify-search-item-actions";
        const play = document.createElement("button");
        play.className = "spotify-search-item-btn";
        play.title = "Play in server Jukebox";
        play.innerHTML = PLAY2;
        play.onclick = () => send({ type: "play", trackUri: result.uri });
        const queue = document.createElement("button");
        queue.className = "spotify-search-item-btn";
        queue.title = "Add to server Jukebox queue";
        queue.innerHTML = QUEUE;
        queue.onclick = () => send({ type: "queue", trackUri: result.uri });
        actions.append(play, queue);
        item.append(info, actions);
      } else
        item.append(info);
      list.appendChild(item);
    }
  };
  return { root, setResults, setAvailable(available) {
    root.style.display = available ? "" : "none";
    if (!available)
      list.innerHTML = "";
  }, setPlaybackAvailable(available) {
    playbackAvailable = available;
    list.innerHTML = "";
  }, destroy() {
    if (timer)
      clearTimeout(timer);
    root.remove();
  } };
}

// src/ui/synced-lyrics-model.ts
var EMPTY_SYNCED_LINE_SYMBOL = "♪";
function parseTimestamp(raw) {
  const match = /^(\d+):(\d{2})(?:\.(\d{1,3}))?$/.exec(raw);
  if (!match)
    return null;
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  const fraction = match[3] ? Number(match[3].padEnd(3, "0")) : 0;
  if (!Number.isFinite(minutes) || !Number.isFinite(seconds) || seconds > 59)
    return null;
  return minutes * 60000 + seconds * 1000 + fraction;
}
function parseSyncedLyrics(value) {
  if (!value)
    return [];
  const parsed = [];
  for (const line of value.split(/\r?\n/)) {
    const timestamps = [...line.matchAll(/\[([^\]]+)\]/g)].map((match) => parseTimestamp(match[1])).filter((timeMs) => timeMs !== null);
    if (timestamps.length === 0)
      continue;
    const text = line.replace(/(?:\[[^\]]+\])+/g, "").trim();
    for (const timeMs of timestamps)
      parsed.push({ timeMs, text });
  }
  const grouped = [];
  for (const line of parsed.sort((a, b) => a.timeMs - b.timeMs)) {
    const previous = grouped[grouped.length - 1];
    if (previous?.timeMs === line.timeMs) {
      previous.text = [previous.text, line.text].filter(Boolean).join(`
`);
    } else {
      grouped.push({ ...line });
    }
  }
  return grouped;
}
function getLineDisplayText(text) {
  return text || EMPTY_SYNCED_LINE_SYMBOL;
}
function shouldReserveScaleGutter(text) {
  return !text.includes(`
`) && text.length >= 36;
}
function createSyncedLyricsModel(maxLines) {
  let lyrics = [];
  let playback = null;
  let activeLineIndex = -1;
  function getProgressMs() {
    if (!playback)
      return 0;
    if (!playback.isPlaying)
      return playback.progressMs;
    return Math.min(playback.progressMs + Date.now() - playback.updatedAt, playback.durationMs || Infinity);
  }
  function refreshActiveLineIndex() {
    if (lyrics.length === 0) {
      const changed2 = activeLineIndex !== -1;
      activeLineIndex = -1;
      return changed2;
    }
    const progressMs = getProgressMs();
    let nextActiveLineIndex = -1;
    for (let i = 0;i < lyrics.length; i++) {
      if (lyrics[i].timeMs > progressMs)
        break;
      nextActiveLineIndex = i;
    }
    const changed = nextActiveLineIndex !== activeLineIndex;
    activeLineIndex = nextActiveLineIndex;
    return changed;
  }
  function getVisibleLines() {
    const indexed = lyrics.map((line, index) => ({
      ...line,
      index,
      displayText: getLineDisplayText(line.text),
      hasText: Boolean(line.text)
    }));
    if (!maxLines || indexed.length <= maxLines)
      return indexed;
    if (activeLineIndex < 0)
      return indexed.slice(0, maxLines);
    const start = Math.max(0, Math.min(activeLineIndex - Math.floor(maxLines / 2), indexed.length - maxLines));
    return indexed.slice(start, start + maxLines);
  }
  function getIndexedLines() {
    return lyrics.map((line, index) => ({
      ...line,
      index,
      displayText: getLineDisplayText(line.text),
      hasText: Boolean(line.text)
    }));
  }
  return {
    clear() {
      lyrics = [];
      playback = null;
      activeLineIndex = -1;
    },
    setLyrics(nextLyrics) {
      lyrics = nextLyrics;
      activeLineIndex = -1;
      refreshActiveLineIndex();
    },
    setPlayback(nextPlayback) {
      playback = nextPlayback;
    },
    refreshActiveLineIndex,
    getActiveLineIndex() {
      return activeLineIndex;
    },
    hasLyrics() {
      return lyrics.length > 0;
    },
    getIndexedLines,
    getSnapshot() {
      refreshActiveLineIndex();
      return {
        activeLineIndex,
        lines: getVisibleLines()
      };
    }
  };
}

// src/ui/lyrics.ts
var USER_SCROLL_SUPPRESS_MS = 2500;
var LOADING_STATUS_DELAY_MS = 180;
function getLineClassName(index, activeLineIndex, hasText) {
  const classes = ["spotify-lyrics-line"];
  if (!hasText)
    classes.push("spotify-lyrics-line-blank");
  if (index === activeLineIndex)
    classes.push("spotify-lyrics-line-active");
  else if (index < activeLineIndex)
    classes.push("spotify-lyrics-line-past");
  else
    classes.push("spotify-lyrics-line-future");
  if (activeLineIndex >= 0) {
    const distance = Math.abs(index - activeLineIndex);
    if (distance === 1)
      classes.push("spotify-lyrics-line-tier-1");
    else if (distance === 2)
      classes.push("spotify-lyrics-line-tier-2");
    else if (distance === 3)
      classes.push("spotify-lyrics-line-tier-3");
    else if (distance >= 4)
      classes.push("spotify-lyrics-line-tier-4");
  }
  return classes.join(" ");
}
function createLyricsUI() {
  const root = document.createElement("div");
  root.className = "spotify-section spotify-lyrics-section";
  const title = document.createElement("h3");
  title.className = "spotify-section-title";
  title.textContent = "Lyrics";
  const body = document.createElement("div");
  body.className = "spotify-lyrics-body";
  root.append(title, body);
  let currentTrackUri = null;
  let syncedLines = [];
  const syncedLyricsModel = createSyncedLyricsModel();
  let playback = null;
  let activeLineIndex = -1;
  let tickTimer = null;
  let autoScrollTimer = null;
  let loadingTimer = null;
  let isAutoScrolling = false;
  let lastUserScrollAt = 0;
  let autoScrollSuspended = false;
  function stopLoadingState() {
    if (loadingTimer)
      clearTimeout(loadingTimer);
    loadingTimer = null;
    body.classList.remove("spotify-lyrics-loading");
  }
  function stopAutoScrollTracking() {
    if (autoScrollTimer)
      clearTimeout(autoScrollTimer);
    autoScrollTimer = null;
    isAutoScrolling = false;
  }
  function stopTicking() {
    if (tickTimer)
      clearInterval(tickTimer);
    tickTimer = null;
  }
  function noteUserScroll() {
    stopAutoScrollTracking();
    lastUserScrollAt = Date.now();
  }
  body.addEventListener("wheel", noteUserScroll, { passive: true });
  body.addEventListener("touchmove", noteUserScroll, { passive: true });
  body.addEventListener("pointerdown", noteUserScroll, { passive: true });
  body.addEventListener("scroll", () => {
    if (!isAutoScrolling)
      lastUserScrollAt = Date.now();
  }, { passive: true });
  function centerLine(line, behavior = "smooth") {
    requestAnimationFrame(() => {
      const bodyRect = body.getBoundingClientRect();
      const textRect = line.textEl.getBoundingClientRect();
      const target = body.scrollTop + (textRect.top + textRect.height / 2) - (bodyRect.top + body.clientHeight / 2);
      body.scrollTo({ top: Math.max(0, Math.min(target, body.scrollHeight - body.clientHeight)), behavior });
    });
  }
  function updateLineClasses(nextActiveLineIndex, forceCenter = false) {
    activeLineIndex = nextActiveLineIndex;
    syncedLines.forEach((line) => {
      const snapshot = syncedLyricsModel.getIndexedLines()[line.index];
      line.el.className = getLineClassName(line.index, activeLineIndex, snapshot?.hasText ?? false);
    });
    const active = syncedLines.find((line) => line.index === activeLineIndex);
    if (active && !autoScrollSuspended && (forceCenter || Date.now() - lastUserScrollAt > USER_SCROLL_SUPPRESS_MS)) {
      isAutoScrolling = true;
      if (autoScrollTimer)
        clearTimeout(autoScrollTimer);
      centerLine(active);
      autoScrollTimer = setTimeout(stopAutoScrollTracking, 700);
    }
  }
  function updateActiveLine() {
    if (syncedLines.length && syncedLyricsModel.refreshActiveLineIndex()) {
      updateLineClasses(syncedLyricsModel.getActiveLineIndex());
    }
  }
  function startTicking() {
    if (!tickTimer && syncedLines.length)
      tickTimer = setInterval(updateActiveLine, 200);
  }
  function clear() {
    stopTicking();
    stopAutoScrollTracking();
    stopLoadingState();
    body.innerHTML = "";
    body.className = "spotify-lyrics-body";
    currentTrackUri = null;
    syncedLines = [];
    syncedLyricsModel.clear();
    playback = null;
    activeLineIndex = -1;
  }
  function setLoading(loading, playbackState) {
    stopLoadingState();
    if (!loading)
      return;
    stopTicking();
    stopAutoScrollTracking();
    body.innerHTML = "";
    body.className = "spotify-lyrics-body spotify-lyrics-loading";
    currentTrackUri = playbackState?.trackUri ?? currentTrackUri;
    syncedLines = [];
    syncedLyricsModel.setLyrics([]);
    if (playbackState && playbackState.trackUri === currentTrackUri) {
      playback = {
        trackUri: playbackState.trackUri,
        progressMs: playbackState.progressMs,
        durationMs: playbackState.durationMs,
        isPlaying: playbackState.isPlaying,
        updatedAt: Date.now()
      };
      syncedLyricsModel.setPlayback(playback);
    } else {
      playback = null;
      syncedLyricsModel.setPlayback(null);
    }
    activeLineIndex = -1;
    loadingTimer = setTimeout(() => {
      if (!body.classList.contains("spotify-lyrics-loading"))
        return;
      const status = document.createElement("div");
      status.className = "spotify-lyrics-status spotify-lyrics-status-loading";
      status.textContent = "Loading lyrics...";
      body.appendChild(status);
    }, LOADING_STATUS_DELAY_MS);
  }
  function renderSyncedLyrics(value) {
    const lines = parseSyncedLyrics(value);
    if (!lines.length)
      return false;
    stopLoadingState();
    body.className = "spotify-lyrics-body spotify-lyrics-has-content spotify-lyrics-synced";
    syncedLyricsModel.setLyrics(lines);
    const snapshot = syncedLyricsModel.getSnapshot();
    activeLineIndex = snapshot.activeLineIndex;
    syncedLines = snapshot.lines.map((line, renderIndex) => {
      const el = document.createElement("div");
      const textEl = document.createElement("div");
      el.className = getLineClassName(line.index, activeLineIndex, line.hasText);
      el.classList.add("spotify-lyrics-line-enter");
      el.style.setProperty("--spotify-lyrics-enter-delay", `${Math.min(renderIndex * 28, 280)}ms`);
      textEl.className = "spotify-lyrics-line-text";
      if (!line.hasText)
        textEl.classList.add("spotify-lyrics-line-symbol");
      if (shouldReserveScaleGutter(line.text))
        textEl.classList.add("spotify-lyrics-line-text-long");
      textEl.textContent = getLineDisplayText(line.text);
      el.appendChild(textEl);
      body.appendChild(el);
      return { index: line.index, el, textEl };
    });
    updateActiveLine();
    if (playback?.isPlaying)
      startTicking();
    return true;
  }
  function renderPlainLyrics(value) {
    stopLoadingState();
    body.className = "spotify-lyrics-body spotify-lyrics-has-content";
    const text = document.createElement("div");
    text.className = "spotify-lyrics-text spotify-lyrics-text-enter";
    text.textContent = value;
    body.appendChild(text);
  }
  function update(trackUri, plainLyrics, syncedLyrics, instrumental) {
    stopTicking();
    stopAutoScrollTracking();
    stopLoadingState();
    currentTrackUri = trackUri;
    body.innerHTML = "";
    syncedLines = [];
    activeLineIndex = -1;
    if (instrumental) {
      body.className = "spotify-lyrics-body";
      body.textContent = "♪ Instrumental";
    } else if (!renderSyncedLyrics(syncedLyrics || "")) {
      if (plainLyrics)
        renderPlainLyrics(plainLyrics);
      else {
        body.className = "spotify-lyrics-body";
        body.textContent = "No lyrics available";
      }
    }
  }
  function updatePlayback(state) {
    if (!state || state.trackUri !== currentTrackUri) {
      playback = null;
      syncedLyricsModel.setPlayback(null);
      stopTicking();
      return;
    }
    playback = { trackUri: state.trackUri, progressMs: state.progressMs, durationMs: state.durationMs, isPlaying: state.isPlaying, updatedAt: Date.now() };
    syncedLyricsModel.setPlayback(playback);
    updateActiveLine();
    if (state.isPlaying)
      startTicking();
    else
      stopTicking();
  }
  return {
    root,
    update,
    updatePlayback,
    setLoading,
    setAutoScrollSuspended(suspended) {
      if (autoScrollSuspended === suspended)
        return;
      autoScrollSuspended = suspended;
      if (suspended)
        stopAutoScrollTracking();
      else if (syncedLines.length)
        updateLineClasses(activeLineIndex, true);
    },
    clear,
    destroy() {
      stopTicking();
      stopAutoScrollTracking();
      stopLoadingState();
      root.remove();
    }
  };
}

// src/ui/release-commit.ts
function bindRangeCommitOnRelease(input, options) {
  let interacting = false;
  function setInteracting(active) {
    if (interacting === active)
      return;
    interacting = active;
    options.onInteractChange?.(active);
  }
  function stopEvent(event) {
    if (options.stopPropagation)
      event.stopPropagation();
  }
  function readValue() {
    return Number.parseInt(input.value, 10);
  }
  const handlePointerDown = (event) => {
    stopEvent(event);
    setInteracting(true);
  };
  const handlePointerMove = (event) => {
    stopEvent(event);
  };
  const handlePointerUp = (event) => {
    stopEvent(event);
    setInteracting(false);
  };
  const handleTouchStart = (event) => {
    stopEvent(event);
    setInteracting(true);
  };
  const handleTouchMove = (event) => {
    stopEvent(event);
  };
  const handleTouchEnd = (event) => {
    stopEvent(event);
    setInteracting(false);
  };
  const handleClick = (event) => {
    stopEvent(event);
  };
  const handleInput = (event) => {
    stopEvent(event);
    setInteracting(true);
    options.onPreview?.(readValue());
  };
  const handleChange = (event) => {
    stopEvent(event);
    const value = readValue();
    options.onPreview?.(value);
    options.onCommit(value);
    setInteracting(false);
  };
  const handleCancel = () => {
    setInteracting(false);
  };
  input.addEventListener("pointerdown", handlePointerDown);
  input.addEventListener("pointermove", handlePointerMove);
  input.addEventListener("pointerup", handlePointerUp);
  input.addEventListener("touchstart", handleTouchStart, { passive: true });
  input.addEventListener("touchmove", handleTouchMove, { passive: true });
  input.addEventListener("touchend", handleTouchEnd, { passive: true });
  input.addEventListener("click", handleClick);
  input.addEventListener("input", handleInput);
  input.addEventListener("change", handleChange);
  input.addEventListener("blur", handleCancel);
  input.addEventListener("pointercancel", handleCancel);
  input.addEventListener("lostpointercapture", handleCancel);
  return () => {
    input.removeEventListener("pointerdown", handlePointerDown);
    input.removeEventListener("pointermove", handlePointerMove);
    input.removeEventListener("pointerup", handlePointerUp);
    input.removeEventListener("touchstart", handleTouchStart);
    input.removeEventListener("touchmove", handleTouchMove);
    input.removeEventListener("touchend", handleTouchEnd);
    input.removeEventListener("click", handleClick);
    input.removeEventListener("input", handleInput);
    input.removeEventListener("change", handleChange);
    input.removeEventListener("blur", handleCancel);
    input.removeEventListener("pointercancel", handleCancel);
    input.removeEventListener("lostpointercapture", handleCancel);
  };
}
function bindProgressCommitOnRelease(bar, options) {
  let interacting = false;
  let activePointerId = null;
  let previewValue = 0;
  function setInteracting(active) {
    if (interacting === active)
      return;
    interacting = active;
    options.onInteractChange?.(active);
  }
  function stopEvent(event) {
    if (options.stopPropagation)
      event.stopPropagation();
  }
  function readValueFromClientX(clientX) {
    const maxValue = options.getMaxValue();
    if (!Number.isFinite(maxValue) || maxValue <= 0)
      return null;
    const rect = bar.getBoundingClientRect();
    if (rect.width <= 0)
      return null;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(pct * maxValue);
  }
  function previewAt(clientX) {
    const nextValue = readValueFromClientX(clientX);
    if (nextValue === null)
      return null;
    previewValue = nextValue;
    options.onPreview(nextValue);
    return nextValue;
  }
  function endInteraction(commit) {
    if (activePointerId !== null && bar.hasPointerCapture(activePointerId)) {
      bar.releasePointerCapture(activePointerId);
    }
    activePointerId = null;
    if (commit) {
      options.onCommit(previewValue);
    }
    setInteracting(false);
  }
  const handlePointerDown = (event) => {
    stopEvent(event);
    if (event.button !== 0)
      return;
    const nextValue = previewAt(event.clientX);
    if (nextValue === null)
      return;
    activePointerId = event.pointerId;
    setInteracting(true);
    try {
      bar.setPointerCapture(event.pointerId);
    } catch {}
  };
  const handlePointerMove = (event) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId)
      return;
    previewAt(event.clientX);
  };
  const handlePointerUp = (event) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId)
      return;
    previewAt(event.clientX);
    endInteraction(true);
  };
  const handlePointerCancel = (event) => {
    stopEvent(event);
    if (event.pointerId !== activePointerId)
      return;
    endInteraction(false);
  };
  const handleClick = (event) => {
    stopEvent(event);
    event.preventDefault();
  };
  const handleTouchStart = (event) => {
    stopEvent(event);
  };
  const handleTouchMove = (event) => {
    stopEvent(event);
  };
  const handleTouchEnd = (event) => {
    stopEvent(event);
  };
  bar.addEventListener("pointerdown", handlePointerDown);
  bar.addEventListener("pointermove", handlePointerMove);
  bar.addEventListener("pointerup", handlePointerUp);
  bar.addEventListener("pointercancel", handlePointerCancel);
  bar.addEventListener("click", handleClick);
  bar.addEventListener("touchstart", handleTouchStart, { passive: true });
  bar.addEventListener("touchmove", handleTouchMove, { passive: true });
  bar.addEventListener("touchend", handleTouchEnd, { passive: true });
  return () => {
    bar.removeEventListener("pointerdown", handlePointerDown);
    bar.removeEventListener("pointermove", handlePointerMove);
    bar.removeEventListener("pointerup", handlePointerUp);
    bar.removeEventListener("pointercancel", handlePointerCancel);
    bar.removeEventListener("click", handleClick);
    bar.removeEventListener("touchstart", handleTouchStart);
    bar.removeEventListener("touchmove", handleTouchMove);
    bar.removeEventListener("touchend", handleTouchEnd);
  };
}

// src/ui/mini-player.ts
var ICON_PREV = `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
var ICON_PLAY = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
var ICON_PAUSE = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
var ICON_NEXT = `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
var ICON_VOLUME = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`;
var ICON_EXPAND = `<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`;
var ICON_COLLAPSE = `<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
var ICON_DEVICE = `<svg viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>`;
var EMPTY_SYNCED_LINE_SYMBOL2 = "♪";
function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
var POPUP_W_DEFAULT = 280;
var POPUP_W_MODERN = 336;
var GAP = 8;
function getPopupWidth(style) {
  return style === "modern" ? POPUP_W_MODERN : POPUP_W_DEFAULT;
}
function getCompactPlainLyricLines(lyrics) {
  if (!lyrics)
    return [];
  return lyrics.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).slice(0, 5);
}
function createMiniPlayerUI(sendToBackend, onExpandClick, getWidgetRect) {
  const root = document.createElement("div");
  root.className = "spotify-mini-player";
  root.dataset.style = "default";
  root.style.setProperty("--spotify-mini-player-width", `${POPUP_W_DEFAULT}px`);
  const art = createCrossfadeArt("spotify-mini-art");
  const info = document.createElement("div");
  info.className = "spotify-mini-info";
  const trackName = document.createElement("div");
  trackName.className = "spotify-mini-track";
  const artistName = document.createElement("div");
  artistName.className = "spotify-mini-artist";
  const albumName = document.createElement("div");
  albumName.className = "spotify-mini-album";
  info.appendChild(trackName);
  info.appendChild(artistName);
  info.appendChild(albumName);
  const expandBtn = document.createElement("button");
  expandBtn.className = "spotify-mini-header-btn";
  expandBtn.innerHTML = ICON_EXPAND;
  expandBtn.title = "Open full player";
  const collapseBtn = document.createElement("button");
  collapseBtn.className = "spotify-mini-header-btn";
  collapseBtn.innerHTML = ICON_COLLAPSE;
  collapseBtn.title = "Collapse";
  const headerBtns = document.createElement("div");
  headerBtns.className = "spotify-mini-header-btns";
  headerBtns.appendChild(expandBtn);
  headerBtns.appendChild(collapseBtn);
  const progressRow = document.createElement("div");
  progressRow.className = "spotify-mini-progress-row";
  const progressTime = document.createElement("span");
  progressTime.className = "spotify-mini-time";
  const progressBar = document.createElement("div");
  progressBar.className = "spotify-mini-progress-bar";
  const progressFill = document.createElement("div");
  progressFill.className = "spotify-mini-progress-fill";
  progressBar.appendChild(progressFill);
  const durationTime = document.createElement("span");
  durationTime.className = "spotify-mini-time";
  progressRow.appendChild(progressTime);
  progressRow.appendChild(progressBar);
  progressRow.appendChild(durationTime);
  const controls = document.createElement("div");
  controls.className = "spotify-mini-controls";
  function makeBtn(html, cls = "") {
    const b = document.createElement("button");
    b.className = `spotify-mini-btn ${cls}`.trim();
    b.innerHTML = html;
    return b;
  }
  const prevBtn = makeBtn(ICON_PREV);
  const playPauseBtn = makeBtn(ICON_PLAY, "spotify-mini-btn-main");
  const nextBtn = makeBtn(ICON_NEXT);
  controls.appendChild(prevBtn);
  controls.appendChild(playPauseBtn);
  controls.appendChild(nextBtn);
  const volumeRow = document.createElement("div");
  volumeRow.className = "spotify-mini-volume-row";
  const volumeIcon = document.createElement("span");
  volumeIcon.className = "spotify-mini-volume-icon";
  volumeIcon.innerHTML = ICON_VOLUME;
  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.className = "spotify-mini-volume-slider";
  volumeSlider.min = "0";
  volumeSlider.max = "100";
  volumeSlider.value = "50";
  volumeRow.appendChild(volumeIcon);
  volumeRow.appendChild(volumeSlider);
  const deviceRow = document.createElement("div");
  deviceRow.className = "spotify-mini-device-row";
  const deviceIcon = document.createElement("span");
  deviceIcon.className = "spotify-mini-device-icon";
  deviceIcon.innerHTML = ICON_DEVICE;
  const deviceName = document.createElement("span");
  deviceName.className = "spotify-mini-device-name";
  const deviceToggle = document.createElement("button");
  deviceToggle.className = "spotify-mini-device-toggle";
  deviceToggle.textContent = "Switch";
  deviceRow.appendChild(deviceIcon);
  deviceRow.appendChild(deviceName);
  deviceRow.appendChild(deviceToggle);
  const deviceList = document.createElement("div");
  deviceList.className = "spotify-mini-device-list";
  const emptyState = document.createElement("div");
  emptyState.className = "spotify-mini-empty";
  emptyState.textContent = "No active playback";
  const header = document.createElement("div");
  header.className = "spotify-mini-header";
  header.appendChild(art.el);
  header.appendChild(info);
  header.appendChild(headerBtns);
  root.appendChild(header);
  root.appendChild(progressRow);
  const lyricsSection = document.createElement("div");
  lyricsSection.className = "spotify-mini-lyrics-section";
  const lyricsHeader = document.createElement("div");
  lyricsHeader.className = "spotify-mini-lyrics-header";
  lyricsHeader.textContent = "Lyrics";
  const lyricsBody = document.createElement("div");
  lyricsBody.className = "spotify-mini-lyrics-body";
  const lyricsStatus = document.createElement("div");
  lyricsStatus.className = "spotify-mini-lyrics-status";
  const lyricLineEls = Array.from({ length: 5 }, () => {
    const el = document.createElement("div");
    el.className = "spotify-mini-lyric-line";
    lyricsBody.appendChild(el);
    return el;
  });
  lyricsBody.appendChild(lyricsStatus);
  lyricsSection.appendChild(lyricsHeader);
  lyricsSection.appendChild(lyricsBody);
  root.appendChild(lyricsSection);
  root.appendChild(controls);
  root.appendChild(volumeRow);
  root.appendChild(deviceRow);
  root.appendChild(deviceList);
  root.appendChild(emptyState);
  let isPlaying = false;
  let currentDuration = 0;
  let visible = false;
  let cachedPopupH = 0;
  let currentStyle = "default";
  let currentState = null;
  let currentConnected = false;
  let lastProgressMs = 0;
  let lastUpdateTime = 0;
  let lastIsPlaying = false;
  let animFrameId = null;
  let lyricsTrackUri = null;
  let syncedLyrics = [];
  let plainLyricLines = [];
  let lyricsInstrumental = false;
  let lyricsLoading = false;
  let activeLyricLineIndex = -1;
  let lyricsUpdateSuspended = false;
  let pendingLyricsRefresh = false;
  let uiSuspended = false;
  let pendingPlaybackRefresh = null;
  let pendingDevices = null;
  let pendingVolume = null;
  let isProgressScrubbing = false;
  let isVolumeInteracting = false;
  function setLyricsStatus(message, loading = false) {
    lyricsStatus.className = loading ? "spotify-mini-lyrics-status spotify-mini-lyrics-status-loading" : "spotify-mini-lyrics-status";
    lyricsStatus.textContent = message;
    lyricsStatus.style.display = "";
    for (const el of lyricLineEls) {
      el.style.display = "none";
      el.textContent = "";
      el.className = "spotify-mini-lyric-line";
    }
  }
  function showLyricRows() {
    lyricsStatus.style.display = "none";
    for (const el of lyricLineEls) {
      el.style.display = "";
    }
  }
  function flushPendingLyricsRefresh() {
    if (!pendingLyricsRefresh || lyricsUpdateSuspended)
      return;
    pendingLyricsRefresh = false;
    updateActiveLyricLine(true);
  }
  function flushPendingUiRefresh() {
    if (uiSuspended)
      return;
    const nextPlaybackRefresh = pendingPlaybackRefresh;
    const nextDevices = pendingDevices;
    const nextVolume = pendingVolume;
    pendingPlaybackRefresh = null;
    pendingDevices = null;
    pendingVolume = null;
    if (nextPlaybackRefresh) {
      update(nextPlaybackRefresh.state, nextPlaybackRefresh.connected);
    }
    if (nextDevices) {
      setDevices(nextDevices);
    }
    if (nextVolume !== null) {
      setVolume(nextVolume);
    }
    flushPendingLyricsRefresh();
  }
  function getInterpolatedProgressMs() {
    if (!lastIsPlaying)
      return lastProgressMs;
    return Math.min(lastProgressMs + Math.max(0, Date.now() - lastUpdateTime), currentDuration || Infinity);
  }
  function getLyricWindow() {
    const windowSize = 5;
    if (syncedLyrics.length === 0)
      return [];
    const lines = [];
    if (activeLyricLineIndex < 0) {
      for (let index = 0;index < Math.min(windowSize, syncedLyrics.length); index++) {
        const line = syncedLyrics[index];
        lines.push({ text: line.text || EMPTY_SYNCED_LINE_SYMBOL2, index });
      }
    } else {
      const start = Math.max(0, Math.min(activeLyricLineIndex - 2, syncedLyrics.length - windowSize));
      for (let offset = 0;offset < windowSize && start + offset < syncedLyrics.length; offset++) {
        const index = start + offset;
        const line = syncedLyrics[index];
        lines.push({ text: line.text || EMPTY_SYNCED_LINE_SYMBOL2, index });
      }
    }
    while (lines.length < windowSize) {
      lines.push({ text: " ", index: -1 - lines.length });
    }
    return lines;
  }
  function renderLyricsWindow() {
    if (lyricsLoading) {
      setLyricsStatus("Loading lyrics...", true);
      return;
    }
    if (lyricsInstrumental) {
      setLyricsStatus("♪ Instrumental");
      return;
    }
    if (syncedLyrics.length > 0) {
      showLyricRows();
      const lines = getLyricWindow();
      lyricLineEls.forEach((el, idx) => {
        const line = lines[idx] ?? { text: " ", index: -1 - idx };
        const distance = activeLyricLineIndex < 0 ? line.index : Math.abs(line.index - activeLyricLineIndex);
        el.className = "spotify-mini-lyric-line";
        if (line.index === activeLyricLineIndex)
          el.classList.add("spotify-mini-lyric-line-active");
        else if (distance === 1)
          el.classList.add("spotify-mini-lyric-line-near");
        else if (distance === 2)
          el.classList.add("spotify-mini-lyric-line-mid");
        else
          el.classList.add("spotify-mini-lyric-line-far");
        el.textContent = line.text;
      });
      return;
    }
    if (plainLyricLines.length > 0) {
      showLyricRows();
      lyricLineEls.forEach((el, idx) => {
        el.className = "spotify-mini-lyric-line spotify-mini-lyric-line-plain";
        el.textContent = plainLyricLines[idx] ?? " ";
      });
      return;
    }
    setLyricsStatus("No lyrics available");
  }
  function updateActiveLyricLine(force = false) {
    if (lyricsUpdateSuspended) {
      pendingLyricsRefresh = true;
      return;
    }
    if (currentStyle !== "modern" || syncedLyrics.length === 0 || !currentState || currentState.trackUri !== lyricsTrackUri) {
      if (force && currentStyle === "modern")
        renderLyricsWindow();
      return;
    }
    const progressMs = getInterpolatedProgressMs();
    let nextActiveLineIndex = -1;
    for (let i = 0;i < syncedLyrics.length; i++) {
      if (syncedLyrics[i].timeMs > progressMs)
        break;
      nextActiveLineIndex = i;
    }
    if (force || nextActiveLineIndex !== activeLyricLineIndex) {
      activeLyricLineIndex = nextActiveLineIndex;
      renderLyricsWindow();
    }
  }
  function refreshLyrics(reposition = false) {
    const shouldShowLyrics = currentStyle === "modern" && currentConnected && Boolean(currentState);
    lyricsSection.style.display = shouldShowLyrics ? "" : "none";
    if (!shouldShowLyrics)
      return;
    if (lyricsUpdateSuspended) {
      pendingLyricsRefresh = true;
      return;
    }
    updateActiveLyricLine(true);
    if (reposition && visible)
      applyPosition();
  }
  function tickProgress() {
    if (uiSuspended || !visible || !lastIsPlaying || !currentDuration) {
      animFrameId = null;
      return;
    }
    if (isProgressScrubbing) {
      animFrameId = requestAnimationFrame(tickProgress);
      return;
    }
    const elapsed = Date.now() - lastUpdateTime;
    const interpolated = Math.min(lastProgressMs + elapsed, currentDuration);
    const pct = interpolated / currentDuration * 100;
    progressFill.style.width = `${pct}%`;
    progressTime.textContent = formatTime(interpolated);
    updateActiveLyricLine();
    animFrameId = requestAnimationFrame(tickProgress);
  }
  function startTicking() {
    if (animFrameId !== null)
      return;
    animFrameId = requestAnimationFrame(tickProgress);
  }
  function stopTicking() {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }
  function supportsMiniPlayerTransport() {
    return currentState?.source !== "feishin" && currentState?.source !== "jukebox";
  }
  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport())
      return;
    sendToBackend({ type: "previous" });
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport())
      return;
    sendToBackend({ type: "next" });
  });
  playPauseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!supportsMiniPlayerTransport())
      return;
    sendToBackend({ type: isPlaying ? "pause" : "play" });
  });
  expandBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hide();
    onExpandClick();
  });
  collapseBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    hide();
  });
  const cleanupProgressCommit = bindProgressCommitOnRelease(progressBar, {
    getMaxValue: () => currentDuration,
    onInteractChange(active) {
      isProgressScrubbing = active;
    },
    onPreview(positionMs) {
      const pct = currentDuration > 0 ? positionMs / currentDuration * 100 : 0;
      progressFill.style.width = `${pct}%`;
      progressTime.textContent = formatTime(positionMs);
    },
    onCommit(positionMs) {
      if (currentState) {
        currentState = { ...currentState, progressMs: positionMs };
      }
      lastProgressMs = positionMs;
      lastUpdateTime = Date.now();
      updateActiveLyricLine(true);
      sendToBackend({ type: "seek", positionMs });
      if (visible && lastIsPlaying)
        startTicking();
    }
  });
  const volumeChangeHandlers = new Set;
  const cleanupVolumeCommit = bindRangeCommitOnRelease(volumeSlider, {
    onInteractChange(active) {
      isVolumeInteracting = active;
    },
    onPreview(percent) {
      for (const handler of volumeChangeHandlers)
        handler(percent);
    },
    onCommit(percent) {
      sendToBackend({ type: "set_volume", percent });
    }
  });
  let deviceListOpen = false;
  let currentDeviceId = null;
  deviceToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (deviceListOpen) {
      deviceList.style.display = "none";
      deviceListOpen = false;
    } else {
      sendToBackend({ type: "get_devices" });
      deviceList.innerHTML = '<div class="spotify-mini-device-loading">Loading devices…</div>';
      deviceList.style.display = "flex";
      deviceListOpen = true;
    }
  });
  root.addEventListener("pointerdown", (e) => e.stopPropagation());
  function onDocClick(e) {
    if (!root.contains(e.target)) {
      hide();
    }
  }
  function applyPosition() {
    const { x: ax, y: ay, w: aw, h: ah } = getWidgetRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const popupW = getPopupWidth(currentStyle);
    let left = ax + aw / 2 - popupW / 2;
    left = Math.max(GAP, Math.min(left, vw - popupW - GAP));
    root.style.left = `${left}px`;
    root.style.top = "0px";
    root.style.visibility = "hidden";
    root.style.transform = "scale(1)";
    root.style.display = "flex";
    const popupH = root.offsetHeight;
    cachedPopupH = popupH;
    root.style.visibility = "";
    root.style.transform = "";
    root.style.display = "";
    let top;
    let below = false;
    if (ay - popupH - GAP >= GAP) {
      top = ay - popupH - GAP;
    } else {
      top = ay + ah + GAP;
      below = true;
    }
    top = Math.max(GAP, Math.min(top, vh - popupH - GAP));
    root.style.left = `${left}px`;
    root.style.top = `${top}px`;
    const originX = ax + aw / 2 - left;
    const originY = below ? -GAP : popupH + GAP;
    root.style.transformOrigin = `${originX}px ${originY}px`;
  }
  function repositionFast() {
    if (!visible || !cachedPopupH)
      return;
    const { x: ax, y: ay, w: aw, h: ah } = getWidgetRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const popupW = getPopupWidth(currentStyle);
    let left = ax + aw / 2 - popupW / 2;
    left = Math.max(GAP, Math.min(left, vw - popupW - GAP));
    let top;
    let below = false;
    if (ay - cachedPopupH - GAP >= GAP) {
      top = ay - cachedPopupH - GAP;
    } else {
      top = ay + ah + GAP;
      below = true;
    }
    top = Math.max(GAP, Math.min(top, vh - cachedPopupH - GAP));
    root.style.left = `${left}px`;
    root.style.top = `${top}px`;
    const originX = ax + aw / 2 - left;
    const originY = below ? -GAP : cachedPopupH + GAP;
    root.style.transformOrigin = `${originX}px ${originY}px`;
  }
  function show() {
    if (!document.body.contains(root)) {
      document.body.appendChild(root);
    }
    applyPosition();
    root.classList.remove("open", "closing");
    root.offsetHeight;
    root.classList.add("open");
    visible = true;
    if (lastIsPlaying)
      startTicking();
    setTimeout(() => document.addEventListener("click", onDocClick), 0);
  }
  function hide() {
    if (!visible)
      return;
    visible = false;
    document.removeEventListener("click", onDocClick);
    stopTicking();
    applyPosition();
    root.classList.remove("open");
    root.classList.add("closing");
    const cleanup = () => {
      root.classList.remove("closing");
      root.removeEventListener("transitionend", cleanup);
    };
    root.addEventListener("transitionend", cleanup);
    setTimeout(cleanup, 250);
  }
  function update(state, connected) {
    currentState = state;
    currentConnected = connected;
    if (uiSuspended) {
      pendingPlaybackRefresh = { state, connected };
      return;
    }
    if (!connected || !state) {
      isProgressScrubbing = false;
      isVolumeInteracting = false;
      art.setUrl(null);
      header.style.display = "none";
      progressRow.style.display = "none";
      lyricsSection.style.display = "none";
      controls.style.display = "none";
      volumeRow.style.display = "none";
      deviceRow.style.display = "none";
      deviceList.style.display = "none";
      deviceListOpen = false;
      emptyState.style.display = "";
      emptyState.textContent = !connected ? "Connect to Subsonic in Settings" : "No active playback";
      currentDuration = 0;
      progressFill.style.width = "0%";
      progressTime.textContent = formatTime(0);
      durationTime.textContent = formatTime(0);
      stopTicking();
      return;
    }
    header.style.display = "";
    progressRow.style.display = "";
    const canUseTransport = supportsMiniPlayerTransport();
    controls.style.display = "";
    controls.hidden = !canUseTransport;
    prevBtn.disabled = !canUseTransport;
    playPauseBtn.disabled = !canUseTransport;
    nextBtn.disabled = !canUseTransport;
    volumeRow.hidden = true;
    emptyState.style.display = "none";
    if (state.deviceName) {
      deviceName.textContent = state.deviceName;
      deviceRow.style.display = "";
      currentDeviceId = state.deviceId ?? null;
    } else {
      deviceRow.style.display = "none";
    }
    trackName.textContent = state.trackName;
    artistName.textContent = state.artistName;
    albumName.textContent = state.albumName;
    currentDuration = state.durationMs;
    art.setUrl(getTrackScopedArtUrl(state.albumArtUrl, state.trackUri));
    isPlaying = state.isPlaying;
    lastIsPlaying = state.isPlaying;
    playPauseBtn.innerHTML = isPlaying ? ICON_PAUSE : ICON_PLAY;
    if (!isProgressScrubbing) {
      lastProgressMs = state.progressMs;
      lastUpdateTime = Date.now();
      const pct = state.durationMs > 0 ? state.progressMs / state.durationMs * 100 : 0;
      progressFill.style.width = `${pct}%`;
      progressTime.textContent = formatTime(state.progressMs);
    }
    durationTime.textContent = formatTime(state.durationMs);
    if (state.volume !== null && !isVolumeInteracting) {
      volumeSlider.value = String(state.volume);
    }
    if (visible && isPlaying) {
      startTicking();
    } else {
      stopTicking();
    }
    refreshLyrics();
  }
  function updateLyrics(trackUri, plainLyrics, syncedLyricsText, instrumental) {
    lyricsTrackUri = trackUri;
    syncedLyrics = parseSyncedLyrics(syncedLyricsText);
    plainLyricLines = getCompactPlainLyricLines(plainLyrics);
    lyricsInstrumental = instrumental;
    lyricsLoading = false;
    activeLyricLineIndex = -1;
    refreshLyrics(true);
  }
  function setLyricsLoading(loading) {
    lyricsLoading = loading;
    if (loading) {
      lyricsTrackUri = currentState?.trackUri ?? null;
      syncedLyrics = [];
      plainLyricLines = [];
      lyricsInstrumental = false;
      activeLyricLineIndex = -1;
    }
    refreshLyrics(true);
  }
  function setStyle(style) {
    currentStyle = style;
    root.dataset.style = style;
    root.style.setProperty("--spotify-mini-player-width", `${getPopupWidth(style)}px`);
    refreshLyrics(true);
    if (visible)
      applyPosition();
  }
  function setDevices(devices) {
    if (uiSuspended) {
      pendingDevices = devices;
      return;
    }
    deviceList.innerHTML = "";
    if (devices.length === 0) {
      deviceList.innerHTML = '<div class="spotify-mini-device-loading">No devices found</div>';
      return;
    }
    for (const dev of devices) {
      const item = document.createElement("div");
      item.className = `spotify-mini-device-item${dev.isActive ? " active" : ""}`;
      item.innerHTML = `<span class="spotify-mini-device-item-name">${dev.name}</span><span class="spotify-mini-device-item-type">${dev.type}</span>`;
      if (!dev.isActive) {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          sendToBackend({ type: "transfer_playback", deviceId: dev.id });
          deviceList.style.display = "none";
          deviceListOpen = false;
        });
      }
      deviceList.appendChild(item);
    }
  }
  function setVolume(percent) {
    if (uiSuspended) {
      pendingVolume = percent;
      return;
    }
    volumeSlider.value = String(percent);
  }
  return {
    root,
    update,
    updateLyrics,
    setLyricsLoading,
    setLyricsUpdateSuspended(suspended) {
      lyricsUpdateSuspended = suspended;
      if (!suspended)
        flushPendingLyricsRefresh();
    },
    setUiSuspended(suspended) {
      uiSuspended = suspended;
      lyricsUpdateSuspended = suspended;
      if (suspended) {
        stopTicking();
        return;
      }
      flushPendingUiRefresh();
      if (visible && lastIsPlaying)
        startTicking();
    },
    setStyle,
    setDevices,
    setVolume,
    onVolumeChange(handler) {
      volumeChangeHandlers.add(handler);
    },
    toggle() {
      if (visible) {
        hide();
      } else {
        show();
      }
    },
    hide,
    isOpen: () => visible,
    reposition: repositionFast,
    destroy() {
      hide();
      stopTicking();
      cleanupProgressCommit();
      cleanupVolumeCommit();
      volumeChangeHandlers.clear();
      root.remove();
    }
  };
}

// src/ui/modern-widget-player.ts
var USER_SCROLL_SUPPRESS_MS2 = 2500;
var ICON_PREV2 = `<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>`;
var ICON_PLAY2 = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
var ICON_PAUSE2 = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
var ICON_NEXT2 = `<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>`;
var ICON_VOLUME2 = `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>`;
var ICON_EXPAND2 = `<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>`;
var ICON_COLLAPSE2 = `<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>`;
var ICON_NOTE = `<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
var MARQUEE_REST_MS = 4000;
function formatTime2(ms) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
function getCompactPlainLyricLines2(lyrics) {
  if (!lyrics)
    return [];
  return lyrics.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}
function stopEventPropagation(el) {
  el.addEventListener("pointerdown", (e) => e.stopPropagation());
  el.addEventListener("pointermove", (e) => e.stopPropagation());
  el.addEventListener("pointerup", (e) => e.stopPropagation());
  el.addEventListener("touchstart", (e) => e.stopPropagation(), { passive: true });
  el.addEventListener("touchmove", (e) => e.stopPropagation(), { passive: true });
  el.addEventListener("touchend", (e) => e.stopPropagation(), { passive: true });
  el.addEventListener("click", (e) => e.stopPropagation());
}
function createMarqueeLabel(baseClass) {
  const root = document.createElement("div");
  root.className = `${baseClass} spotify-modern-widget-marquee`;
  root.dataset.marqueePhase = "idle";
  const content = document.createElement("div");
  content.className = `${baseClass}-content spotify-modern-widget-marquee-content`;
  root.appendChild(content);
  let marqueeCycleTimer = null;
  function stopMarquee() {
    if (marqueeCycleTimer) {
      clearTimeout(marqueeCycleTimer);
      marqueeCycleTimer = null;
    }
    root.dataset.marqueePhase = "idle";
    content.classList.remove("spotify-modern-widget-marquee-animate");
  }
  function startMarqueePass(restart) {
    root.dataset.marqueePhase = "scrolling";
    content.classList.remove("spotify-modern-widget-marquee-animate");
    if (restart) {
      content.offsetWidth;
    }
    content.classList.add("spotify-modern-widget-marquee-animate");
  }
  function queueMarqueeStart(restart) {
    if (marqueeCycleTimer) {
      clearTimeout(marqueeCycleTimer);
      marqueeCycleTimer = null;
    }
    root.dataset.marqueePhase = "rest";
    content.classList.remove("spotify-modern-widget-marquee-animate");
    marqueeCycleTimer = setTimeout(() => {
      marqueeCycleTimer = null;
      startMarqueePass(restart);
    }, MARQUEE_REST_MS);
  }
  content.addEventListener("animationend", (event) => {
    if (event.animationName !== "spotify-modern-marquee" || root.dataset.marqueePhase !== "scrolling") {
      return;
    }
    queueMarqueeStart(true);
  });
  return {
    root,
    setText(value) {
      content.textContent = value;
      root.setAttribute("aria-label", value);
    },
    refresh(expanded, restart = false) {
      if (!expanded) {
        root.dataset.overflow = "false";
        stopMarquee();
        root.style.removeProperty("--spotify-modern-marquee-distance");
        root.style.removeProperty("--spotify-modern-marquee-duration");
        return;
      }
      const overflow = Math.ceil(content.scrollWidth - root.clientWidth);
      if (overflow <= 6) {
        root.dataset.overflow = "false";
        stopMarquee();
        root.style.removeProperty("--spotify-modern-marquee-distance");
        root.style.removeProperty("--spotify-modern-marquee-duration");
        return;
      }
      root.dataset.overflow = "true";
      root.style.setProperty("--spotify-modern-marquee-distance", `${overflow}px`);
      root.style.setProperty("--spotify-modern-marquee-duration", `${Math.max(8, Math.min(20, 8 + overflow / 18))}s`);
      const isQueued = marqueeCycleTimer !== null;
      const isScrolling = root.dataset.marqueePhase === "scrolling";
      if (restart || !isQueued && !isScrolling) {
        queueMarqueeStart(restart);
      }
    }
  };
}
function createModernWidgetPlayerUI(sendToBackend, onExpandClick, onCollapseClick) {
  const root = document.createElement("div");
  root.className = "spotify-modern-widget-player";
  root.dataset.expanded = "false";
  const compact = document.createElement("div");
  compact.className = "spotify-modern-widget-compact";
  const compactArt = createCrossfadeArt("spotify-modern-widget-compact-art");
  const compactFallback = document.createElement("div");
  compactFallback.className = "spotify-modern-widget-compact-fallback";
  compactFallback.innerHTML = ICON_NOTE;
  const compactOverlay = document.createElement("div");
  compactOverlay.className = "spotify-modern-widget-compact-overlay";
  const compactStatus = document.createElement("div");
  compactStatus.className = "spotify-modern-widget-compact-status";
  const compactProgress = document.createElement("div");
  compactProgress.className = "spotify-modern-widget-compact-progress";
  compactOverlay.appendChild(compactStatus);
  compact.appendChild(compactArt.el);
  compact.appendChild(compactFallback);
  compact.appendChild(compactOverlay);
  compact.appendChild(compactProgress);
  const expanded = document.createElement("div");
  expanded.className = "spotify-modern-widget-expanded";
  const header = document.createElement("div");
  header.className = "spotify-modern-widget-header";
  const eyebrow = document.createElement("div");
  eyebrow.className = "spotify-modern-widget-eyebrow";
  eyebrow.textContent = "Now Playing";
  const headerButtons = document.createElement("div");
  headerButtons.className = "spotify-modern-widget-header-buttons";
  const openFullBtn = document.createElement("button");
  openFullBtn.className = "spotify-modern-widget-icon-btn";
  openFullBtn.innerHTML = ICON_EXPAND2;
  openFullBtn.title = "Open full player";
  const collapseBtn = document.createElement("button");
  collapseBtn.className = "spotify-modern-widget-icon-btn";
  collapseBtn.innerHTML = ICON_COLLAPSE2;
  collapseBtn.title = "Collapse";
  stopEventPropagation(openFullBtn);
  stopEventPropagation(collapseBtn);
  openFullBtn.addEventListener("click", () => onExpandClick());
  collapseBtn.addEventListener("click", () => onCollapseClick());
  headerButtons.appendChild(openFullBtn);
  headerButtons.appendChild(collapseBtn);
  header.appendChild(eyebrow);
  header.appendChild(headerButtons);
  const hero = document.createElement("div");
  hero.className = "spotify-modern-widget-hero";
  const heroArt = createCrossfadeArt("spotify-modern-widget-art");
  heroArt.el.title = "Collapse";
  const heroFallback = document.createElement("div");
  heroFallback.className = "spotify-modern-widget-art-fallback";
  heroFallback.innerHTML = ICON_NOTE;
  heroFallback.title = "Collapse";
  stopEventPropagation(heroArt.el);
  stopEventPropagation(heroFallback);
  heroArt.el.addEventListener("click", () => onCollapseClick());
  heroFallback.addEventListener("click", () => onCollapseClick());
  const meta = document.createElement("div");
  meta.className = "spotify-modern-widget-meta";
  const trackName = createMarqueeLabel("spotify-modern-widget-track");
  const artistName = createMarqueeLabel("spotify-modern-widget-artist");
  const albumName = createMarqueeLabel("spotify-modern-widget-album");
  meta.appendChild(trackName.root);
  meta.appendChild(artistName.root);
  meta.appendChild(albumName.root);
  hero.appendChild(heroArt.el);
  hero.appendChild(heroFallback);
  hero.appendChild(meta);
  const progressRow = document.createElement("div");
  progressRow.className = "spotify-modern-widget-progress-row";
  const progressTime = document.createElement("span");
  progressTime.className = "spotify-modern-widget-time";
  const progressBar = document.createElement("div");
  progressBar.className = "spotify-modern-widget-progress-bar";
  const progressFill = document.createElement("div");
  progressFill.className = "spotify-modern-widget-progress-fill";
  progressBar.appendChild(progressFill);
  const durationTime = document.createElement("span");
  durationTime.className = "spotify-modern-widget-time";
  progressRow.appendChild(progressTime);
  progressRow.appendChild(progressBar);
  progressRow.appendChild(durationTime);
  const lyricsSection = document.createElement("div");
  lyricsSection.className = "spotify-modern-widget-lyrics";
  const lyricsHeader = document.createElement("div");
  lyricsHeader.className = "spotify-modern-widget-section-label";
  lyricsHeader.textContent = "Lyrics";
  const lyricsBody = document.createElement("div");
  lyricsBody.className = "spotify-modern-widget-lyrics-body";
  const lyricsTrack = document.createElement("div");
  lyricsTrack.className = "spotify-modern-widget-lyrics-track";
  lyricsBody.appendChild(lyricsTrack);
  lyricsSection.appendChild(lyricsHeader);
  lyricsSection.appendChild(lyricsBody);
  const controls = document.createElement("div");
  controls.className = "spotify-modern-widget-controls";
  const prevBtn = document.createElement("button");
  prevBtn.className = "spotify-modern-widget-btn";
  prevBtn.innerHTML = ICON_PREV2;
  const playPauseBtn = document.createElement("button");
  playPauseBtn.className = "spotify-modern-widget-btn spotify-modern-widget-btn-main";
  playPauseBtn.innerHTML = ICON_PLAY2;
  const nextBtn = document.createElement("button");
  nextBtn.className = "spotify-modern-widget-btn";
  nextBtn.innerHTML = ICON_NEXT2;
  controls.appendChild(prevBtn);
  controls.appendChild(playPauseBtn);
  controls.appendChild(nextBtn);
  const volumeRow = document.createElement("div");
  volumeRow.className = "spotify-modern-widget-volume-row";
  const volumeIcon = document.createElement("span");
  volumeIcon.className = "spotify-modern-widget-volume-icon";
  volumeIcon.innerHTML = ICON_VOLUME2;
  const volumeSlider = document.createElement("input");
  volumeSlider.type = "range";
  volumeSlider.min = "0";
  volumeSlider.max = "100";
  volumeSlider.value = "50";
  volumeSlider.className = "spotify-modern-widget-volume-slider";
  volumeRow.appendChild(volumeIcon);
  volumeRow.appendChild(volumeSlider);
  const emptyState = document.createElement("div");
  emptyState.className = "spotify-modern-widget-empty";
  const emptyIcon = document.createElement("div");
  emptyIcon.className = "spotify-modern-widget-empty-icon";
  emptyIcon.innerHTML = ICON_NOTE;
  const emptyTitle = document.createElement("div");
  emptyTitle.className = "spotify-modern-widget-empty-title";
  emptyTitle.textContent = "No music playing.";
  const emptySubtitle = document.createElement("div");
  emptySubtitle.className = "spotify-modern-widget-empty-subtitle";
  emptySubtitle.textContent = "Your speakers are enjoying a brief moment of mindfulness.";
  emptyState.appendChild(emptyIcon);
  emptyState.appendChild(emptyTitle);
  emptyState.appendChild(emptySubtitle);
  expanded.appendChild(header);
  expanded.appendChild(hero);
  expanded.appendChild(progressRow);
  expanded.appendChild(lyricsSection);
  expanded.appendChild(controls);
  expanded.appendChild(volumeRow);
  expanded.appendChild(emptyState);
  root.appendChild(compact);
  root.appendChild(expanded);
  [progressBar, prevBtn, playPauseBtn, nextBtn, volumeSlider].forEach((el) => stopEventPropagation(el));
  stopEventPropagation(lyricsBody);
  let connected = false;
  let state = null;
  let isExpandedState = false;
  let currentDuration = 0;
  let lastProgressMs = 0;
  let lastUpdateTime = 0;
  let lastIsPlaying = false;
  let animFrameId = null;
  let lyricsTrackUri = null;
  const syncedLyricsModel = createSyncedLyricsModel();
  let plainLyricLines = [];
  let lyricsInstrumental = false;
  let lyricsLoading = false;
  let lastRenderedLyricSignature = "";
  let syncedLyricEls = [];
  let autoScrollTimer = null;
  let isAutoScrolling = false;
  let lastUserScrollAt = 0;
  let autoScrollSuspended = false;
  let lastMetadataSignature = "";
  let marqueeRefreshTimer = null;
  let marqueeRefreshTimerLate = null;
  let isProgressScrubbing = false;
  let isVolumeInteracting = false;
  const marqueeObserver = new ResizeObserver(() => {
    refreshMarquees(false);
  });
  marqueeObserver.observe(meta);
  marqueeObserver.observe(root);
  function stopAutoScrollTracking() {
    if (autoScrollTimer) {
      clearTimeout(autoScrollTimer);
      autoScrollTimer = null;
    }
    isAutoScrolling = false;
  }
  function noteUserScroll() {
    stopAutoScrollTracking();
    lastUserScrollAt = Date.now();
  }
  lyricsBody.addEventListener("wheel", noteUserScroll, { passive: true });
  lyricsBody.addEventListener("touchmove", noteUserScroll, { passive: true });
  lyricsBody.addEventListener("pointerdown", noteUserScroll, { passive: true });
  lyricsBody.addEventListener("scroll", () => {
    if (!isAutoScrolling)
      lastUserScrollAt = Date.now();
  }, { passive: true });
  function refreshMarquees(restart) {
    requestAnimationFrame(() => {
      trackName.refresh(isExpandedState, restart);
      artistName.refresh(isExpandedState, restart);
      albumName.refresh(isExpandedState, restart);
    });
  }
  function scheduleMarqueeRefresh(restart) {
    if (marqueeRefreshTimer)
      clearTimeout(marqueeRefreshTimer);
    if (marqueeRefreshTimerLate)
      clearTimeout(marqueeRefreshTimerLate);
    refreshMarquees(restart);
    marqueeRefreshTimer = setTimeout(() => refreshMarquees(restart), 180);
    marqueeRefreshTimerLate = setTimeout(() => refreshMarquees(restart), 460);
  }
  function renderCompactArt(trackArtUrl) {
    compactArt.setUrl(trackArtUrl);
    compactFallback.style.display = trackArtUrl ? "none" : "flex";
  }
  function renderHeroArt(trackArtUrl) {
    heroArt.setUrl(trackArtUrl);
    heroFallback.style.display = trackArtUrl ? "none" : "flex";
  }
  function getInterpolatedProgressMs() {
    if (!lastIsPlaying)
      return lastProgressMs;
    return Math.min(lastProgressMs + Math.max(0, Date.now() - lastUpdateTime), currentDuration || Infinity);
  }
  function setCompactProgress(pct, visible) {
    compactProgress.style.setProperty("--spotify-modern-widget-compact-progress", `${Math.max(0, Math.min(100, pct))}%`);
    compactProgress.style.opacity = visible ? "1" : "0";
  }
  function clearLyricsTrack() {
    stopAutoScrollTracking();
    lyricsTrack.innerHTML = "";
    lyricsBody.scrollTop = 0;
    syncedLyricEls = [];
  }
  function buildSyncedLyricsTrack() {
    clearLyricsTrack();
    const indexedLines = syncedLyricsModel.getIndexedLines();
    syncedLyricEls = indexedLines.map((line, renderIndex) => {
      const el = document.createElement("div");
      el.className = "spotify-modern-widget-lyric-line spotify-modern-widget-lyric-line-enter";
      el.style.setProperty("--spotify-modern-lyric-enter-delay", `${Math.min(renderIndex * 22, 110)}ms`);
      if (shouldReserveScaleGutter(line.text)) {
        el.classList.add("spotify-modern-widget-lyric-line-long");
      }
      el.textContent = line.displayText;
      lyricsTrack.appendChild(el);
      return el;
    });
  }
  function updateSyncedLyricsPresentation(shouldAutoscroll = true) {
    const activeLineIndex = syncedLyricsModel.getActiveLineIndex();
    const indexedLines = syncedLyricsModel.getIndexedLines();
    indexedLines.forEach((line, idx) => {
      const el = syncedLyricEls[idx];
      if (!el)
        return;
      el.className = "spotify-modern-widget-lyric-line";
      if (shouldReserveScaleGutter(line.text)) {
        el.classList.add("spotify-modern-widget-lyric-line-long");
      }
      if (line.index === activeLineIndex) {
        el.classList.add("active");
      } else if (activeLineIndex >= 0) {
        const distance = Math.abs(line.index - activeLineIndex);
        if (distance === 1)
          el.classList.add("near");
        else if (distance === 2)
          el.classList.add("mid");
        else
          el.classList.add("far");
      } else {
        el.classList.add("far");
      }
    });
    const activeEl = activeLineIndex >= 0 ? syncedLyricEls[activeLineIndex] : syncedLyricEls[0];
    if (!activeEl || !shouldAutoscroll)
      return;
    if (autoScrollSuspended)
      return;
    const shouldCenter = Date.now() - lastUserScrollAt > USER_SCROLL_SUPPRESS_MS2;
    if (!shouldCenter)
      return;
    requestAnimationFrame(() => {
      const targetScrollTop = activeEl.offsetTop + activeEl.offsetHeight / 2 - lyricsBody.clientHeight / 2;
      const maxScrollTop = Math.max(0, lyricsBody.scrollHeight - lyricsBody.clientHeight);
      isAutoScrolling = true;
      lyricsBody.scrollTo({
        top: Math.max(0, Math.min(targetScrollTop, maxScrollTop)),
        behavior: "smooth"
      });
      if (autoScrollTimer)
        clearTimeout(autoScrollTimer);
      autoScrollTimer = setTimeout(stopAutoScrollTracking, 700);
    });
  }
  function renderLyrics() {
    clearLyricsTrack();
    if (!connected || !state) {
      lastRenderedLyricSignature = "";
      const status2 = document.createElement("div");
      status2.className = "spotify-modern-widget-lyrics-status";
      status2.textContent = connected ? "Start playback to see lyrics" : "Connect Subsonic to see lyrics";
      lyricsTrack.appendChild(status2);
      return;
    }
    if (lyricsLoading) {
      lastRenderedLyricSignature = "loading";
      const status2 = document.createElement("div");
      status2.className = "spotify-modern-widget-lyrics-status spotify-modern-widget-lyrics-status-loading";
      status2.textContent = "Loading lyrics...";
      lyricsTrack.appendChild(status2);
      return;
    }
    if (lyricsInstrumental) {
      lastRenderedLyricSignature = "instrumental";
      const status2 = document.createElement("div");
      status2.className = "spotify-modern-widget-lyrics-status";
      status2.textContent = "♪ Instrumental";
      lyricsTrack.appendChild(status2);
      return;
    }
    if (syncedLyricsModel.hasLyrics() && state.trackUri === lyricsTrackUri) {
      const nextSignature = syncedLyricsModel.getIndexedLines().map((line) => `${line.index}:${line.text}`).join("|");
      lastRenderedLyricSignature = nextSignature;
      buildSyncedLyricsTrack();
      updateSyncedLyricsPresentation(false);
      return;
    }
    if (plainLyricLines.length > 0) {
      const nextSignature = plainLyricLines.join("|");
      const shouldAnimate = nextSignature !== lastRenderedLyricSignature;
      lastRenderedLyricSignature = nextSignature;
      plainLyricLines.forEach((line, renderIndex) => {
        const el = document.createElement("div");
        el.className = "spotify-modern-widget-lyric-line plain";
        if (shouldAnimate) {
          el.classList.add("spotify-modern-widget-lyric-line-enter");
          el.style.setProperty("--spotify-modern-lyric-enter-delay", `${Math.min(renderIndex * 20, 100)}ms`);
        }
        el.textContent = line;
        lyricsTrack.appendChild(el);
      });
      return;
    }
    lastRenderedLyricSignature = "empty";
    const status = document.createElement("div");
    status.className = "spotify-modern-widget-lyrics-status";
    status.textContent = "No lyrics available";
    lyricsTrack.appendChild(status);
  }
  function updateActiveLyricLine(force = false) {
    if (!state || state.trackUri !== lyricsTrackUri || !syncedLyricsModel.hasLyrics()) {
      if (force)
        renderLyrics();
      return;
    }
    syncedLyricsModel.setPlayback({
      trackUri: state.trackUri,
      progressMs: getInterpolatedProgressMs(),
      durationMs: currentDuration,
      isPlaying: lastIsPlaying,
      updatedAt: Date.now()
    });
    if (force) {
      renderLyrics();
      return;
    }
    if (syncedLyricsModel.refreshActiveLineIndex()) {
      updateSyncedLyricsPresentation(true);
    }
  }
  function tickProgress() {
    if (!state || !connected || !lastIsPlaying || !currentDuration) {
      animFrameId = null;
      return;
    }
    if (isProgressScrubbing) {
      animFrameId = requestAnimationFrame(tickProgress);
      return;
    }
    const interpolated = getInterpolatedProgressMs();
    const pct = currentDuration > 0 ? interpolated / currentDuration * 100 : 0;
    progressFill.style.width = `${pct}%`;
    setCompactProgress(pct, true);
    progressTime.textContent = formatTime2(interpolated);
    updateActiveLyricLine();
    animFrameId = requestAnimationFrame(tickProgress);
  }
  function startTicking() {
    if (animFrameId !== null)
      return;
    animFrameId = requestAnimationFrame(tickProgress);
  }
  function stopTicking() {
    if (animFrameId !== null) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
  }
  function supportsMiniPlayerTransport() {
    return state?.source !== "feishin" && state?.source !== "jukebox";
  }
  prevBtn.addEventListener("click", () => {
    if (supportsMiniPlayerTransport())
      sendToBackend({ type: "previous" });
  });
  nextBtn.addEventListener("click", () => {
    if (supportsMiniPlayerTransport())
      sendToBackend({ type: "next" });
  });
  playPauseBtn.addEventListener("click", () => {
    if (supportsMiniPlayerTransport())
      sendToBackend({ type: state?.isPlaying ? "pause" : "play" });
  });
  const cleanupProgressCommit = bindProgressCommitOnRelease(progressBar, {
    getMaxValue: () => currentDuration,
    onInteractChange(active) {
      isProgressScrubbing = active;
    },
    onPreview(positionMs) {
      const pct = currentDuration > 0 ? positionMs / currentDuration * 100 : 0;
      progressFill.style.width = `${pct}%`;
      setCompactProgress(pct, currentDuration > 0);
      progressTime.textContent = formatTime2(positionMs);
    },
    onCommit(positionMs) {
      if (state) {
        state = { ...state, progressMs: positionMs };
      }
      lastProgressMs = positionMs;
      lastUpdateTime = Date.now();
      updateActiveLyricLine(true);
      sendToBackend({ type: "seek", positionMs });
      if (lastIsPlaying)
        startTicking();
    },
    stopPropagation: true
  });
  const cleanupVolumeCommit = bindRangeCommitOnRelease(volumeSlider, {
    onInteractChange(active) {
      isVolumeInteracting = active;
    },
    onCommit(percent) {
      sendToBackend({ type: "set_volume", percent });
    },
    stopPropagation: true
  });
  function update(playbackState, isConnected) {
    state = playbackState;
    connected = isConnected;
    root.dataset.empty = !playbackState ? "true" : "false";
    if (!isConnected || !playbackState) {
      isProgressScrubbing = false;
      isVolumeInteracting = false;
      eyebrow.textContent = isConnected ? "Standby" : "Connect Subsonic";
      compactStatus.textContent = isConnected ? "No playback" : "Connect Subsonic";
      emptyState.style.display = "grid";
      hero.style.display = "none";
      progressRow.style.display = "none";
      lyricsSection.style.display = "none";
      controls.style.display = "none";
      volumeRow.style.display = "none";
      setCompactProgress(0, false);
      renderCompactArt(null);
      renderHeroArt(null);
      syncedLyricsModel.setPlayback(null);
      lastMetadataSignature = "";
      stopTicking();
      renderLyrics();
      return;
    }
    eyebrow.textContent = "Now Playing";
    const artUrl = getTrackScopedArtUrl(playbackState.albumArtUrl, playbackState.trackUri);
    renderCompactArt(artUrl);
    renderHeroArt(artUrl);
    compactStatus.textContent = playbackState.isPlaying ? "Playing" : "Paused";
    const metadataSignature = `${playbackState.trackName}|${playbackState.artistName}|${playbackState.albumName}`;
    const metadataChanged = metadataSignature !== lastMetadataSignature;
    lastMetadataSignature = metadataSignature;
    trackName.setText(playbackState.trackName);
    artistName.setText(playbackState.artistName);
    albumName.setText(playbackState.albumName);
    hero.style.display = "grid";
    progressRow.style.display = "grid";
    lyricsSection.style.display = "grid";
    controls.style.display = "flex";
    volumeRow.style.display = "flex";
    emptyState.style.display = "none";
    currentDuration = playbackState.durationMs;
    lastIsPlaying = playbackState.isPlaying;
    const canUseTransport = supportsMiniPlayerTransport();
    controls.hidden = !canUseTransport;
    prevBtn.disabled = !canUseTransport;
    playPauseBtn.disabled = !canUseTransport;
    nextBtn.disabled = !canUseTransport;
    volumeRow.hidden = true;
    syncedLyricsModel.setPlayback({
      trackUri: playbackState.trackUri,
      progressMs: isProgressScrubbing ? lastProgressMs : playbackState.progressMs,
      durationMs: playbackState.durationMs,
      isPlaying: playbackState.isPlaying,
      updatedAt: isProgressScrubbing ? lastUpdateTime : Date.now()
    });
    playPauseBtn.innerHTML = playbackState.isPlaying ? ICON_PAUSE2 : ICON_PLAY2;
    if (!isVolumeInteracting) {
      volumeSlider.value = String(playbackState.volume ?? Number(volumeSlider.value));
    }
    if (!isProgressScrubbing) {
      lastProgressMs = playbackState.progressMs;
      lastUpdateTime = Date.now();
      const pct = playbackState.durationMs > 0 ? playbackState.progressMs / playbackState.durationMs * 100 : 0;
      progressFill.style.width = `${pct}%`;
      setCompactProgress(pct, playbackState.durationMs > 0);
      progressTime.textContent = formatTime2(playbackState.progressMs);
    }
    durationTime.textContent = formatTime2(playbackState.durationMs);
    if (syncedLyricsModel.hasLyrics() && playbackState.trackUri === lyricsTrackUri) {
      if (syncedLyricEls.length === 0)
        renderLyrics();
      else
        updateActiveLyricLine();
    } else if (lyricsTrack.childElementCount === 0) {
      renderLyrics();
    }
    scheduleMarqueeRefresh(metadataChanged);
    if (playbackState.isPlaying)
      startTicking();
    else
      stopTicking();
  }
  function updateLyrics(trackUri, plainLyrics, syncedLyricsText, instrumental) {
    lyricsTrackUri = trackUri;
    const parsedSyncedLyrics = parseSyncedLyrics(syncedLyricsText);
    syncedLyricsModel.setLyrics(parsedSyncedLyrics);
    plainLyricLines = getCompactPlainLyricLines2(plainLyrics);
    lyricsInstrumental = instrumental;
    lyricsLoading = false;
    updateActiveLyricLine(true);
  }
  function setLyricsLoading(loading) {
    lyricsLoading = loading;
    if (loading) {
      lyricsTrackUri = state?.trackUri ?? null;
      syncedLyricsModel.clear();
      plainLyricLines = [];
      lyricsInstrumental = false;
    }
    renderLyrics();
  }
  return {
    root,
    update,
    updateLyrics,
    setLyricsLoading,
    setAutoScrollSuspended(suspended) {
      if (autoScrollSuspended === suspended)
        return;
      autoScrollSuspended = suspended;
      if (suspended) {
        stopAutoScrollTracking();
      } else if (syncedLyricsModel.hasLyrics()) {
        updateSyncedLyricsPresentation(true);
      }
    },
    setCollapsedSize(size) {
      root.style.setProperty("--spotify-modern-widget-collapsed-size", `${size}px`);
    },
    setExpanded(expandedValue) {
      isExpandedState = expandedValue;
      root.dataset.expanded = String(expandedValue);
      scheduleMarqueeRefresh(true);
    },
    isExpanded() {
      return isExpandedState;
    },
    destroy() {
      stopTicking();
      stopAutoScrollTracking();
      cleanupProgressCommit();
      cleanupVolumeCommit();
      if (marqueeRefreshTimer)
        clearTimeout(marqueeRefreshTimer);
      if (marqueeRefreshTimerLate)
        clearTimeout(marqueeRefreshTimerLate);
      marqueeObserver.disconnect();
      compactArt.destroy();
      heroArt.destroy();
      root.remove();
    }
  };
}

// src/ui/song-badge.ts
var BADGE_CORNER = "right";
var ICON_NOTE2 = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
var ICON_PLAY3 = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
function formatCaptured(ms) {
  try {
    return new Date(ms).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  } catch {
    return "";
  }
}
function createSongBadgeManager(ctx, sendToBackend) {
  const cache = new Map;
  const activeSwipe = new Map;
  const badges = new Map;
  let currentChatId = null;
  let pop = null;
  let popArt = null;
  let popTrack = null;
  let popArtist = null;
  let popAlbum = null;
  let popWhen = null;
  let popPlayBtn = null;
  let openForMessageId = null;
  let openAnchor = null;
  function snapshotFor(messageId) {
    const entry = cache.get(messageId);
    return entry?.get(activeSwipe.get(messageId) ?? 0) ?? null;
  }
  function hasAnySnapshot(messageId) {
    return (cache.get(messageId)?.size ?? 0) > 0;
  }
  function refreshBadge(messageId) {
    const wrapper = badges.get(messageId);
    if (wrapper)
      wrapper.style.display = snapshotFor(messageId) ? "" : "none";
  }
  function decorate(messageId) {
    if (!hasAnySnapshot(messageId))
      return;
    let wrapper = badges.get(messageId);
    if (!wrapper || !wrapper.isConnected) {
      const bubble = ctx.dom.findMessageElement(messageId);
      if (!bubble)
        return;
      const injected = ctx.dom.inject(bubble, `<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${ICON_NOTE2}</button>`, "beforeend");
      injected.classList.add("spotify-song-badge-wrap");
      injected.dataset.corner = BADGE_CORNER;
      injected.addEventListener("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        toggleFor(messageId, injected);
      });
      badges.set(messageId, injected);
      wrapper = injected;
    }
    refreshBadge(messageId);
  }
  function decorateMounted() {
    for (const { messageId } of ctx.dom.listMessageElements()) {
      if (hasAnySnapshot(messageId))
        decorate(messageId);
    }
  }
  function ensurePopover() {
    if (pop)
      return;
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
    popTrack = document.createElement("div");
    popTrack.className = "spotify-song-pop-track";
    popArtist = document.createElement("div");
    popArtist.className = "spotify-song-pop-artist";
    popAlbum = document.createElement("div");
    popAlbum.className = "spotify-song-pop-album";
    popWhen = document.createElement("div");
    popWhen.className = "spotify-song-pop-when";
    info.append(popTrack, popArtist, popAlbum, popWhen);
    body.append(popArt.el, info);
    const actions = document.createElement("div");
    actions.className = "spotify-song-pop-actions";
    popPlayBtn = document.createElement("button");
    popPlayBtn.type = "button";
    popPlayBtn.className = "spotify-song-pop-btn spotify-song-pop-btn-primary";
    popPlayBtn.innerHTML = `${ICON_PLAY3}<span>Play</span>`;
    popPlayBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const snapshot = openForMessageId ? snapshotFor(openForMessageId) : null;
      if (snapshot?.trackUri)
        sendToBackend({ type: "play", trackUri: snapshot.trackUri });
      closePopover();
    });
    actions.appendChild(popPlayBtn);
    pop.append(header, body, actions);
    pop.addEventListener("click", (event) => event.stopPropagation());
    document.body.appendChild(pop);
  }
  function renderPopover(snapshot) {
    ensurePopover();
    if (!snapshot) {
      popArt?.setUrl(null);
      if (popTrack)
        popTrack.textContent = "No track playing";
      if (popArtist)
        popArtist.textContent = "";
      if (popAlbum)
        popAlbum.textContent = "Nothing was playing when this version was written.";
      if (popWhen)
        popWhen.textContent = "";
      if (popPlayBtn)
        popPlayBtn.style.display = "none";
      return;
    }
    popArt?.setUrl(getTrackScopedArtUrl(snapshot.albumArtUrl, snapshot.trackUri));
    if (popTrack)
      popTrack.textContent = snapshot.trackName;
    if (popArtist)
      popArtist.textContent = snapshot.artistName;
    if (popAlbum)
      popAlbum.textContent = snapshot.albumName;
    if (popWhen)
      popWhen.textContent = formatCaptured(snapshot.capturedAt);
    if (popPlayBtn)
      popPlayBtn.style.display = "";
  }
  function positionPopover(anchor) {
    if (!pop)
      return;
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
  function onOutsidePointer(event) {
    const target = event.target;
    if (!(target instanceof Node))
      return;
    if (pop?.contains(target) || openAnchor?.contains(target))
      return;
    closePopover();
  }
  function onScroll() {
    closePopover();
  }
  function onKey(event) {
    if (event.key === "Escape")
      closePopover();
  }
  function openPopover(messageId, anchor) {
    renderPopover(snapshotFor(messageId));
    openForMessageId = messageId;
    openAnchor = anchor;
    pop.classList.add("open");
    positionPopover(anchor);
    setTimeout(() => {
      document.addEventListener("click", onOutsidePointer, true);
      window.addEventListener("scroll", onScroll, true);
      window.addEventListener("resize", onScroll, true);
      document.addEventListener("keydown", onKey, true);
    }, 0);
  }
  function closePopover() {
    if (!pop || !openForMessageId)
      return;
    pop.classList.remove("open");
    openForMessageId = null;
    openAnchor = null;
    document.removeEventListener("click", onOutsidePointer, true);
    window.removeEventListener("scroll", onScroll, true);
    window.removeEventListener("resize", onScroll, true);
    document.removeEventListener("keydown", onKey, true);
  }
  function toggleFor(messageId, anchor) {
    if (openForMessageId === messageId)
      closePopover();
    else {
      if (openForMessageId)
        closePopover();
      openPopover(messageId, anchor);
    }
  }
  function setChatSongs(chatId, entries) {
    if (chatId !== currentChatId)
      reset();
    currentChatId = chatId;
    const incoming = new Set(entries.map((entry) => entry.messageId));
    for (const messageId of [...cache.keys()]) {
      if (!incoming.has(messageId))
        removeMessage(messageId);
    }
    for (const entry of entries) {
      const snapshots = new Map;
      for (const [swipeId, snapshot] of Object.entries(entry.bySwipe))
        snapshots.set(Number(swipeId), snapshot);
      cache.set(entry.messageId, snapshots);
      activeSwipe.set(entry.messageId, entry.activeSwipe);
      decorate(entry.messageId);
    }
    decorateMounted();
  }
  function setMessageSong(chatId, messageId, swipeId, snapshot) {
    if (currentChatId && chatId !== currentChatId)
      return;
    currentChatId = chatId;
    const snapshots = cache.get(messageId) ?? new Map;
    snapshots.set(swipeId, snapshot);
    cache.set(messageId, snapshots);
    activeSwipe.set(messageId, swipeId);
    decorate(messageId);
    if (openForMessageId === messageId)
      renderPopover(snapshotFor(messageId));
  }
  function setActiveSwipe(messageId, swipeId) {
    activeSwipe.set(messageId, swipeId);
    refreshBadge(messageId);
    if (openForMessageId === messageId) {
      const snapshot = snapshotFor(messageId);
      if (snapshot)
        renderPopover(snapshot);
      else
        closePopover();
    }
  }
  function removeMessage(messageId) {
    if (openForMessageId === messageId)
      closePopover();
    cache.delete(messageId);
    activeSwipe.delete(messageId);
    const wrapper = badges.get(messageId);
    if (wrapper) {
      try {
        ctx.dom.uninject(wrapper);
      } catch {}
      badges.delete(messageId);
    }
  }
  function reset() {
    closePopover();
    for (const wrapper of badges.values()) {
      try {
        ctx.dom.uninject(wrapper);
      } catch {}
    }
    badges.clear();
    cache.clear();
    activeSwipe.clear();
    currentChatId = null;
  }
  function destroy() {
    reset();
    popArt?.destroy();
    pop?.remove();
    pop = null;
  }
  return { setChatSongs, setMessageSong, decorate, decorateMounted, setActiveSwipe, removeMessage, reset, destroy };
}

// src/frontend.ts
var NOTE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>`;
var WIDGET_EDGE_PAD = 12;
var WIDGET_PREFS_KEY = "subsonic-controls-widget-prefs";
function setup(ctx) {
  const cleanups = [];
  cleanups.push(ctx.dom.addStyle(SPOTIFY_WIDGET_CSS));
  const send = (message) => ctx.sendToBackend(message);
  let lastThemeArtUrl = null;
  let themeApplySeq = 0;
  let pendingThemeClearTimer = null;
  const pendingPaletteImages = new Map;
  function fetchPaletteImage(url) {
    return new Promise((resolve) => {
      const requestId = crypto.randomUUID();
      const timer = setTimeout(() => {
        pendingPaletteImages.delete(requestId);
        resolve(null);
      }, 15000);
      pendingPaletteImages.set(requestId, { resolve, timer });
      ctx.sendToBackend({
        type: "__cors_proxy_request",
        requestId,
        url,
        options: { method: "GET", mediaType: "image" }
      });
    });
  }
  function resolvePaletteImage(requestId, result) {
    const pending = pendingPaletteImages.get(requestId);
    if (!pending)
      return;
    pendingPaletteImages.delete(requestId);
    clearTimeout(pending.timer);
    const contentType = result?.headers?.["content-type"] || result?.headers?.["Content-Type"] || "image/jpeg";
    pending.resolve(result?.status && result.status >= 200 && result.status < 300 && result.encoding === "base64" && result.body ? `data:${contentType};base64,${result.body}` : null);
  }
  function cancelPendingThemeClear() {
    if (pendingThemeClearTimer)
      clearTimeout(pendingThemeClearTimer);
    pendingThemeClearTimer = null;
  }
  function clearAlbumTheme() {
    cancelPendingThemeClear();
    themeApplySeq += 1;
    send({ type: "album_colors", colors: null });
  }
  function scheduleAlbumThemeClear(delayMs = 1800) {
    cancelPendingThemeClear();
    pendingThemeClearTimer = setTimeout(() => {
      pendingThemeClearTimer = null;
      clearAlbumTheme();
    }, delayMs);
  }
  function extractColorsFromImage(url) {
    return new Promise((resolve) => {
      const image = new Image;
      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const size = 32;
          canvas.width = size;
          canvas.height = size;
          const context = canvas.getContext("2d");
          if (!context)
            return resolve(null);
          context.drawImage(image, 0, 0, size, size);
          const pixels = context.getImageData(0, 0, size, size).data;
          let bestH = 0, bestS = 0, bestL = 0.5, bestScore = -1;
          let red = 0, green = 0, blue = 0, count = 0;
          for (let index = 0;index < pixels.length; index += 4) {
            const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
            red += r;
            green += g;
            blue += b;
            count += 1;
            const rn = r / 255, gn = g / 255, bn = b / 255;
            const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
            const lightness = (max + min) / 2;
            let hue = 0, saturation = 0;
            if (max !== min) {
              const delta = max - min;
              saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
              if (max === rn)
                hue = ((gn - bn) / delta + (gn < bn ? 6 : 0)) / 6;
              else if (max === gn)
                hue = ((bn - rn) / delta + 2) / 6;
              else
                hue = ((rn - gn) / delta + 4) / 6;
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
            isLight: luminance > 152
          });
        } catch {
          resolve(null);
        }
      };
      image.onerror = () => resolve(null);
      fetchPaletteImage(url).then((dataUrl) => {
        if (dataUrl)
          image.src = dataUrl;
        else
          resolve(null);
      });
    });
  }
  let remoteControl = "none";
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
    iconSvg: NOTE_ICON
  });
  cleanups.push(() => tab.destroy());
  tab.root.classList.add("spotify-tab-root");
  const panel = document.createElement("div");
  panel.className = "spotify-panel";
  tab.root.appendChild(panel);
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
  let currentState = null;
  let lyricsTrackId = null;
  let jukeboxEnabled = false;
  let configuredServerUrl = "";
  let configuredUsername = "";
  let configuredHasPassword = false;
  let configuredFeishinUrl = "";
  let configuredFeishinUsername = "";
  let configuredHasFeishinPassword = false;
  let configuredJukeboxUnavailableReason = null;
  const DEFAULT_SIZE_PRESETS = { small: 36, medium: 48, large: 64 };
  const MODERN_SIZE_PRESETS = { small: 112, medium: 128, large: 144 };
  const DEFAULT_WIDGET_SIZE_MIN = 24;
  const DEFAULT_WIDGET_SIZE_MAX = 128;
  const MODERN_WIDGET_SIZE_MIN = 112;
  const MODERN_WIDGET_SIZE_MAX = 192;
  function getSizePresets(style) {
    return style === "modern" ? MODERN_SIZE_PRESETS : DEFAULT_SIZE_PRESETS;
  }
  function getSizeBounds(style) {
    return style === "modern" ? { min: MODERN_WIDGET_SIZE_MIN, max: MODERN_WIDGET_SIZE_MAX } : { min: DEFAULT_WIDGET_SIZE_MIN, max: DEFAULT_WIDGET_SIZE_MAX };
  }
  function clampWidgetSize(size, style) {
    const { min, max } = getSizeBounds(style);
    return Math.max(min, Math.min(size, max));
  }
  function isSizeMode(value) {
    return value === "small" || value === "medium" || value === "large" || value === "custom";
  }
  function inferSizeMode(size, style) {
    const presets = getSizePresets(style);
    if (size === presets.small)
      return "small";
    if (size === presets.large)
      return "large";
    return size === presets.medium ? "medium" : "custom";
  }
  let currentWidgetSize = 48;
  let currentArtShape = "circle";
  let currentSizeMode = "medium";
  let currentMiniPlayerStyle = "default";
  let savedWidgetPosition;
  try {
    const stored = JSON.parse(localStorage.getItem(WIDGET_PREFS_KEY) || "null");
    if (stored?.miniPlayerStyle === "modern")
      currentMiniPlayerStyle = "modern";
    if (typeof stored?.size === "number")
      currentWidgetSize = clampWidgetSize(stored.size, currentMiniPlayerStyle);
    if (stored?.shape === "squircle")
      currentArtShape = "squircle";
    currentSizeMode = isSizeMode(stored?.sizeMode) ? stored.sizeMode : inferSizeMode(currentWidgetSize, currentMiniPlayerStyle);
    if (currentSizeMode !== "custom")
      currentWidgetSize = getSizePresets(currentMiniPlayerStyle)[currentSizeMode];
    if (typeof stored?.x === "number" && typeof stored.y === "number") {
      savedWidgetPosition = { x: stored.x, y: stored.y };
    }
  } catch {}
  let widget;
  let lastKnownPosition = null;
  function saveWidgetPrefs() {
    const position = lastKnownPosition ?? widget.getPosition();
    localStorage.setItem(WIDGET_PREFS_KEY, JSON.stringify({
      size: currentWidgetSize,
      shape: currentArtShape,
      sizeMode: currentSizeMode,
      miniPlayerStyle: currentMiniPlayerStyle,
      x: position.x,
      y: position.y
    }));
  }
  let widgetSizeLabelTitle = null;
  let widgetSizeHint = null;
  let widgetSizeInputRef = null;
  function updateWidgetCustomizationUI() {
    const { min, max } = getSizeBounds(currentMiniPlayerStyle);
    if (widgetSizeLabelTitle) {
      widgetSizeLabelTitle.textContent = currentMiniPlayerStyle === "modern" ? "Collapsed Modern Player Size (px)" : "Custom Widget Size (px)";
    }
    if (widgetSizeHint) {
      widgetSizeHint.textContent = currentMiniPlayerStyle === "modern" ? "Controls the compact size of the modern player before it expands." : "Controls the floating widget size.";
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
      if (Number.isNaN(value) || value < min || value > max)
        return;
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
  let widgetSizeRequestTimer = null;
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
    return {
      width: Math.max(320, Math.min(368, window.innerWidth - 24)),
      height: Math.max(500, Math.min(600, window.innerHeight - 24))
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
    if (x !== position.x || y !== position.y)
      widget.moveTo(x, y);
  }
  function requestWidgetSize(size, delay = false) {
    if (widgetSizeRequestTimer)
      clearTimeout(widgetSizeRequestTimer);
    const commit = () => {
      widgetSizeRequestTimer = null;
      widget.setSize(size.width, size.height);
    };
    if (delay)
      widgetSizeRequestTimer = setTimeout(commit, WIDGET_SIZE_TRANSITION_MS);
    else
      commit();
  }
  function applyWidgetStyle({ delaySizeRequest = false } = {}) {
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
        iconSvg.style.width = `${iconSize}px`;
        iconSvg.style.height = `${iconSize}px`;
      }
      requestWidgetSize(size);
    }
  }
  function setModernWidgetExpanded(expanded) {
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
  function updateWidgetArt(state) {
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
    if (position)
      widget.moveTo(position.x, position.y);
  }
  function recreateWidget() {
    recreateWidgetWithSize(currentWidgetSize);
  }
  function recreateWidgetWithSize(newSize) {
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
  async function showWidgetMenu(x, y) {
    const items = [
      { key: "small", label: "Small", active: currentSizeMode === "small" },
      { key: "medium", label: "Medium", active: currentSizeMode === "medium" },
      { key: "large", label: "Large", active: currentSizeMode === "large" },
      { key: "custom", label: "Custom…", active: currentSizeMode === "custom" }
    ];
    if (currentMiniPlayerStyle !== "modern") {
      items.push({ key: "shape-divider", label: "", type: "divider" }, { key: "circle", label: "Circle", active: currentArtShape === "circle" }, { key: "squircle", label: "Squircle", active: currentArtShape === "squircle" });
    }
    items.push({ key: "style-divider", label: "", type: "divider" }, { key: "mini-default", label: "Default Mini Player", active: currentMiniPlayerStyle === "default" }, { key: "mini-modern", label: "Modern Lyrics Mini Player", active: currentMiniPlayerStyle === "modern" });
    openContextMenuCount += 1;
    miniPlayer.setUiSuspended(true);
    modernWidget.setAutoScrollSuspended(true);
    lyrics.setAutoScrollSuspended(true);
    let selectedKey;
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
    if (!selectedKey)
      return;
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
      currentWidgetSize = currentSizeMode === "custom" ? clampWidgetSize(currentWidgetSize, currentMiniPlayerStyle) : getSizePresets(currentMiniPlayerStyle)[currentSizeMode];
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
    if (!miniPlayer.isOpen())
      return;
    let dragRaf = null;
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
      if (dragRaf !== null)
        cancelAnimationFrame(dragRaf);
    };
    document.addEventListener("pointermove", onDragMove);
    document.addEventListener("pointerup", onDragEnd, { once: true });
  });
  widgetContent.addEventListener("pointermove", (event) => {
    if (didDrag)
      return;
    const dx = Math.abs(event.clientX - pointerStartPos.x);
    const dy = Math.abs(event.clientY - pointerStartPos.y);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD)
      didDrag = true;
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
      if (!modernWidgetExpanded)
        setModernWidgetExpanded(true);
      return;
    }
    miniPlayer.toggle();
  });
  widgetContent.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showWidgetMenu(event.clientX, event.clientY);
  });
  let longPressTimer = null;
  let longPressFired = false;
  let longPressStart = { x: 0, y: 0 };
  widgetContent.addEventListener("touchstart", (event) => {
    longPressFired = false;
    const touch = event.touches[0];
    longPressStart = { x: touch.clientX, y: touch.clientY };
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      navigator.vibrate?.(50);
      showWidgetMenu(touch.clientX, touch.clientY);
    }, 500);
  });
  widgetContent.addEventListener("touchmove", (event) => {
    if (!longPressTimer)
      return;
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
      if (event.cancelable)
        event.preventDefault();
      if (currentMiniPlayerStyle === "modern") {
        if (!modernWidgetExpanded)
          setModernWidgetExpanded(true);
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
    if (widgetSizeRequestTimer)
      clearTimeout(widgetSizeRequestTimer);
    lastKnownPosition = widget.getPosition();
    saveWidgetPrefs();
    widgetArt.destroy();
    miniPlayer.destroy();
    modernWidget.destroy();
    widget.destroy();
  });
  const songBadges = createSongBadgeManager(ctx, send);
  cleanups.push(() => songBadges.destroy());
  const requestChatSongs = (chatId) => {
    if (chatId)
      send({ type: "get_chat_songs", chatId });
  };
  requestChatSongs(ctx.getActiveChat().chatId);
  cleanups.push(ctx.events.on("CHAT_SWITCHED", (payload) => {
    songBadges.reset();
    requestChatSongs(payload.chatId || null);
  }));
  cleanups.push(ctx.events.on("CHARACTER_MESSAGE_RENDERED", (payload) => {
    const messageId = payload.messageId;
    if (messageId)
      songBadges.decorate(messageId);
  }));
  cleanups.push(ctx.events.on("MESSAGE_SWIPED", (payload) => {
    const message = payload.message;
    if (message?.id)
      songBadges.setActiveSwipe(message.id, message.swipe_id || 0);
  }));
  cleanups.push(ctx.events.on("MESSAGE_DELETED", (payload) => {
    const messageId = payload.messageId;
    if (messageId)
      songBadges.removeMessage(messageId);
  }));
  const messages = ctx.onBackendMessage((raw) => {
    const proxyResponse = raw;
    if (proxyResponse.type === "__cors_proxy_response" && proxyResponse.requestId) {
      resolvePaletteImage(proxyResponse.requestId, proxyResponse.error ? undefined : proxyResponse.result);
      return;
    }
    const message = raw;
    switch (message.type) {
      case "config":
        remoteControl = message.remoteControl;
        connected = message.connected;
        jukeboxEnabled = message.remoteControl === "jukebox";
        configuredServerUrl = message.serverUrl;
        configuredUsername = message.username;
        configuredHasPassword = message.hasPassword;
        configuredFeishinUrl = message.feishinUrl;
        configuredFeishinUsername = message.feishinUsername;
        configuredHasFeishinPassword = message.hasFeishinPassword;
        configuredJukeboxUnavailableReason = message.jukeboxUnavailableReason;
        settings.update(message.connected, message.serverUrl, message.username, message.hasPassword, message.remoteControl, message.feishinUrl, message.feishinUsername, message.hasFeishinPassword, message.jukeboxUnavailableReason);
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
        if (artUrl !== lastThemeArtUrl) {
          lastThemeArtUrl = artUrl;
          if (artUrl) {
            cancelPendingThemeClear();
            const applySeq = ++themeApplySeq;
            extractColorsFromImage(artUrl).then((colors) => {
              if (applySeq !== themeApplySeq || artUrl !== lastThemeArtUrl)
                return;
              if (colors)
                send({ type: "album_colors", colors });
              else if (!connected)
                clearAlbumTheme();
            });
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
        connected = false;
        currentState = null;
        lyricsTrackId = null;
        jukeboxEnabled = false;
        settings.update(false, configuredServerUrl, configuredUsername, configuredHasPassword, remoteControl, configuredFeishinUrl, configuredFeishinUsername, configuredHasFeishinPassword, null);
        search.setAvailable(true);
        search.setPlaybackAvailable(remoteControl === "jukebox");
        lastThemeArtUrl = null;
        clearAlbumTheme();
        nowPlaying.update(null, false);
        controls.update(null, false, false);
        lyrics.clear();
        miniPlayer.updateLyrics(null, null, null, false);
        modernWidget.updateLyrics(null, null, null, false);
        syncWidget();
        break;
      case "search_results":
        search.setResults(message.results);
        break;
      case "chat_songs":
        songBadges.setChatSongs(message.chatId, message.entries);
        break;
      case "message_song":
        songBadges.setMessageSong(message.chatId, message.messageId, message.swipeId, message.snapshot);
        break;
      case "lyrics":
        if (!lyricsTrackId || message.trackUri === lyricsTrackId) {
          lyrics.update(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
          lyrics.updatePlayback(currentState);
          miniPlayer.updateLyrics(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
          modernWidget.updateLyrics(message.trackUri, message.plainLyrics, message.syncedLyrics, message.instrumental);
        }
        break;
      case "error":
        console.warn("[Subsonic Controls]", message.message);
        break;
    }
  });
  cleanups.push(messages);
  const handleDesktopWidgetReturned = (event) => {
    const detail = event.detail;
    if (detail?.extensionId !== ctx.manifest.identifier)
      return;
    send({ type: "get_config" });
    send({ type: "get_state" });
  };
  window.addEventListener("spindle:desktop-widget-returned", handleDesktopWidgetReturned);
  cleanups.push(() => window.removeEventListener("spindle:desktop-widget-returned", handleDesktopWidgetReturned));
  ctx.permissions.getGranted().then((granted) => {
    const needed = ["cors_proxy", "generation", "chat_mutation"].filter((permission) => !granted.includes(permission));
    if (needed.length) {
      ctx.permissions.request(needed, { reason: "Subsonic Controls needs CORS access for your server, plus Generation and Chat Mutation to remember the song playing for each assistant reply." });
    }
  });
  const permissionChange = ctx.events.on("SPINDLE_PERMISSION_CHANGED", (payload) => {
    const change = payload;
    if (change.extensionId !== ctx.manifest.identifier || change.permission !== "cors_proxy")
      return;
    if (change.granted) {
      send({ type: "get_config" });
      send({ type: "get_state" });
      return;
    }
    connected = false;
    currentState = null;
    lyricsTrackId = null;
    jukeboxEnabled = false;
    lastThemeArtUrl = null;
    clearAlbumTheme();
    settings.update(false, "", "", false, "none", "", "", false, null);
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
  return () => {
    for (const cleanup of cleanups)
      cleanup();
  };
}
export {
  setup
};
