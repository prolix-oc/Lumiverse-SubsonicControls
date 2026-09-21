var Yt=`
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

.spotify-settings-check {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--lumiverse-text-muted);
  cursor: pointer;
}

.spotify-settings-check input[type="checkbox"] {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: #1db954;
  cursor: pointer;
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
  --spotify-modern-lyrics-body-min-height: 132px;
  --spotify-modern-lyrics-body-max-height: 176px;
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

/* Read-only now-playing mode has no transport row. Reclaim its 58px button
   height plus the adjacent grid gap for the lyrics viewport. */
.spotify-modern-widget-player[data-empty="false"][data-transport="false"] {
  --spotify-modern-lyrics-body-min-height: 200px;
  --spotify-modern-lyrics-body-max-height: 244px;
}

.spotify-modern-widget-player[data-empty="false"][data-transport="false"] .spotify-modern-widget-expanded {
  grid-template-rows: auto auto auto minmax(0, 1fr);
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
  min-height: var(--spotify-modern-lyrics-body-min-height);
  max-height: var(--spotify-modern-lyrics-body-max-height);
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
  grid-template-columns: minmax(0, 1fr);
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
  /* Reserve room before wrapping for the active line's 1.035 scale. */
  width: calc(96% - 12px);
  min-width: 0;
  margin-inline: auto;
  text-align: center;
  font-size: 16px;
  line-height: 1.24;
  font-weight: 600;
  letter-spacing: -0.018em;
  color: rgba(255, 255, 255, 0.22);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  text-wrap: pretty;
  transition: color 220ms ease, transform 220ms ease, text-shadow 220ms ease;
}

.spotify-modern-widget-lyric-line-enter {
  animation: spotify-lyrics-line-in 360ms cubic-bezier(0.18, 0.9, 0.22, 1) both;
  animation-delay: var(--spotify-modern-lyric-enter-delay, 0ms);
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

/* Neither Jukebox nor Feishin supports mini-player volume control. */
.spotify-mini-volume-row,
.spotify-modern-widget-volume-row {
  display: none !important;
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

/* When the tab has no remote transport controls, don't keep the extra tail
   that was reserved for them. Its re-centered active line now uses the full
   read-only lyric viewport. */
.spotify-lyrics-section[data-transport="false"] .spotify-lyrics-has-content {
  padding-bottom: 36px;
  scroll-padding-bottom: 36px;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 32px), transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0, black 40px, black calc(100% - 32px), transparent 100%);
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
}

/* Apple Music-esque lyric motion. Focus always moves forward: the leaving line
   contracts on a short, prompt ease-out while the arriving line springs up
   behind it, so a sung line never lingers at full size beside its successor.
   Only compositor-friendly properties move: opacity and transform animate,
   while the depth blur is a static per-tier value that never re-rasterizes
   mid-transition. */
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
  transition:
    opacity 320ms cubic-bezier(0.25, 0.7, 0.5, 1),
    background 220ms cubic-bezier(0.22, 1, 0.36, 1);
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
  transform: translateY(0) scale(0.955);
  transform-origin: center center;
  transition: transform 320ms cubic-bezier(0.25, 0.7, 0.5, 1);
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
  transition:
    opacity 520ms cubic-bezier(0.25, 0.7, 0.5, 1),
    background 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Only the arriving scale springs. Nothing that transforms carries a filter or
   a paint-invalidating property, so the compositor never has to re-rasterize a
   blurred layer mid-scale. */
.spotify-lyrics-line-active .spotify-lyrics-line-text {
  transform: translateY(0) scale(1.17);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.14);
  transition: transform 520ms cubic-bezier(0.34, 1.5, 0.5, 1);
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

/* Depth blur is static and sits only on receding lines, never on the active or
   adjacent line. A blur that animates, or that shares an element with a
   transform, forces the compositor to re-rasterize that layer every frame and
   leaves the text visibly soft mid-scale. These classes are emitted only while
   the Lyrics blur setting is on, so a disabled blur leaves the text unfiltered
   instead of carrying a no-op blur(0). */
.spotify-lyrics-line-blur-2 .spotify-lyrics-line-text {
  filter: blur(0.8px);
}

.spotify-lyrics-line-blur-3 .spotify-lyrics-line-text {
  filter: blur(1.5px);
}

.spotify-lyrics-line-blur-4 .spotify-lyrics-line-text {
  filter: blur(2.2px);
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

/* The blur-in radius is a variable so the Lyrics blur setting can zero it
   without a second copy of the motion. A custom property inside @keyframes is
   substituted when the animation starts, which is the only moment that
   matters here: the element is created, and the setting read, before it is
   inserted. */
@keyframes spotify-lyrics-line-in {
  from {
    opacity: 0;
    transform: translateY(16px);
    filter: blur(var(--spotify-lyrics-enter-blur, 8px));
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
    filter: blur(var(--spotify-lyrics-enter-blur, 6px));
  }

  to {
    opacity: 1;
    transform: none;
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spotify-lyrics-line,
  .spotify-lyrics-line .spotify-lyrics-line-text,
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

`;function Gt(e){let n=document.createElement("section");n.className="spotify-settings-card";let o=document.createElement("header");o.className="spotify-settings-card-header";let t=document.createElement("h3");t.textContent="Subsonic Controls";let l=document.createElement("span");l.className="spotify-status",o.append(t,l);let p=document.createElement("div");p.className="spotify-settings-card-body";let d=(A,ee,g)=>{let x=document.createElement("label");x.className="spotify-settings-label";let R=document.createTextNode(A);x.append(R);let M=document.createElement("input");return M.className="spotify-input",M.type=ee,M.placeholder=g,x.append(M),p.append(x),M},f=d("Subsonic server URL","url","https://music.example.com (or …/rest)"),c=d("Subsonic username","text","Subsonic username"),m=d("Subsonic password","password","Subsonic password"),y=d("Playback position offset (ms)","number","1000");y.min="-10000",y.max="10000",y.step="100";let v=document.createElement("div");v.style.cssText="font-size:0.8em;opacity:0.65;margin-top:-6px",v.textContent="Adds time to the server's reported playback position for synchronized lyrics. Default: 1000 ms; use a negative value if lyrics run ahead.",p.append(v);let C=document.createElement("label");C.className="spotify-settings-label",C.append("Playback controls");let w=document.createElement("select");w.className="spotify-input";for(let[A,ee]of[["none","Now playing only"],["jukebox","Server-side Jukebox"],["feishin","Feishin Desktop Remote"]]){let g=document.createElement("option");g.value=A,g.textContent=ee,w.append(g)}C.append(w),p.append(C);let N=document.createElement("div");N.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",N.textContent="Jukebox controls affect the server-side player.",p.append(N);let T=document.createElement("div");T.style.cssText="display:none;font-size:0.8em;color:#e74c3c;margin-top:4px",p.append(T);let E=document.createElement("div");E.style.display="none";let D=(A,ee,g)=>{let x=document.createElement("label");x.className="spotify-settings-label",x.append(A);let R=document.createElement("input");return R.className="spotify-input",R.type=ee,R.placeholder=g,x.append(R),E.append(x),R},b=D("Feishin Remote URL","url","http://192.168.1.20:4333"),q=D("Feishin username","text","Optional Remote username"),F=D("Feishin password","password","Optional Remote password"),ie=document.createElement("div");ie.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",ie.textContent="Feishin Remote requires WebSocket transport; its HTTP server only serves the Remote page and credentials. Library search and lyrics still use the Subsonic server above.",E.append(ie),p.append(E);let se=document.createElement("div");se.className="spotify-settings-row";let V=document.createElement("button");V.className="spotify-btn spotify-btn-primary",se.append(V),p.append(se),n.append(o,p);let j=!1,Y=!1,L=!1,k=!1,I=!1,z=[f,c,m,y,w,b,q,F];for(let A of z)A.addEventListener("input",()=>{L=!0});function Z(A,ee,g=!1){l.replaceChildren();let x=document.createElement("span");x.className=`spotify-status-dot ${ee?"connected":"disconnected"}`;let R=document.createElement("span");if(R.textContent=A,g)R.style.color="#e74c3c";l.append(x,R)}function W(){let A=w.value==="feishin";E.style.display=A?"":"none",N.style.display=w.value==="jukebox"?"":"none",T.style.display=w.value==="jukebox"&&T.textContent?"":"none"}w.onchange=()=>{L=!0,W()};function G(A,ee,g,x,R,M,_,oe,fe,de){if(j=A,k=x,I=oe,A||!Y&&!L)f.value=ee,c.value=g,b.value=M,q.value=_,y.value=String(fe),w.value=R;if(T.textContent=de||"",W(),Y&&!A)return;for(let $e of[f,c,m,w,b,q,F])$e.disabled=A;if(A)Y=!1,L=!1,m.value="",F.value="";m.placeholder=x?"Saved securely (re-enter to change)":"Subsonic password",F.placeholder=oe?"Saved securely (re-enter to change)":"Optional Remote password",V.textContent=A?"Disconnect":"Connect",V.className=A?"spotify-btn spotify-btn-danger":"spotify-btn spotify-btn-primary",V.disabled=!1,Z(A?"Connected":"Not connected",A)}return V.onclick=()=>{if(j)return void e({type:"disconnect"});let A=w.value;if(!f.value.trim()||!c.value.trim()||!m.value&&!k||A==="feishin"&&!b.value.trim()){Z("Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.",!1,!0);return}Y=!0,V.disabled=!0,V.textContent="Connecting…",e({type:"connect",serverUrl:f.value.trim(),username:c.value.trim(),password:m.value,remoteControl:A,feishinUrl:b.value.trim(),feishinUsername:q.value.trim(),feishinPassword:F.value,playbackPositionOffsetMs:Number(y.value)})},y.onchange=()=>{let A=Number(y.value);if(!Number.isFinite(A))return;if(y.value=String(Math.max(-1e4,Math.min(1e4,Math.round(A)))),j)e({type:"set_playback_position_offset",playbackPositionOffsetMs:Number(y.value)})},G(!1,"","",!1,"none","","",!1,1000,null),{root:n,update:G,setConnecting(){Y=!0,V.disabled=!0,V.textContent="Connecting…"},setError(A){j=!1,Y=!1,V.disabled=!1,V.textContent="Connect",V.className="spotify-btn spotify-btn-primary";for(let ee of[f,c,m,w,b,q,F])ee.disabled=!1;m.placeholder=k?"Saved securely (re-enter to change)":"Subsonic password",F.placeholder=I?"Saved securely (re-enter to change)":"Optional Remote password",Z(A,!1,!0)},destroy(){n.remove()}}}function Ge(e,n){if(!e)return null;if(!n)return e;if(/^(data|blob):/i.test(e))return e;try{let o=new URL(e);return o.searchParams.set("track",n),o.toString()}catch{let o=e.includes("?")?"&":"?";return`${e}${o}track=${encodeURIComponent(n)}`}}function Xe(e){let n=document.createElement("div");n.className=`${e} spotify-crossfade-art`,n.style.display="none";let o=document.createElement("img"),t=document.createElement("img");o.className="spotify-crossfade-img",t.className="spotify-crossfade-img",o.alt="",t.alt="",o.loading="eager",t.loading="eager",o.decoding="async",t.decoding="async",o.style.visibility="hidden",t.style.visibility="hidden",o.style.opacity="1",t.style.opacity="0",n.appendChild(o),n.appendChild(t);let l=null,p=o,d=t,f=!1;function c(v){v.onload=null,v.onerror=null,v.removeAttribute("src"),v.style.visibility="hidden"}function m(){n.style.display="none",p.style.opacity="1",d.style.opacity="0"}function y(v){if(v===l)return;if(l=v,!v){c(p),c(d),f=!1,m();return}if(!f){if(n.style.display="",p.onload=()=>{f=!0,p.style.visibility="visible"},p.onerror=()=>{l=null,c(p),m()},p.src=v,p.complete&&p.naturalWidth>0)f=!0,p.style.visibility="visible";return}if(n.style.display="",d.onload=()=>{d.style.visibility="visible",d.style.opacity="1",p.style.opacity="0";let C=p;p=d,d=C},d.onerror=()=>{l=null,c(d),d.style.opacity="0"},d.src=v,d.complete&&d.naturalWidth>0){d.style.visibility="visible",d.style.opacity="1",p.style.opacity="0";let C=p;p=d,d=C}}return{el:n,setUrl:y,destroy(){n.remove()}}}function Xt(){let e=document.createElement("div");e.className="spotify-section";let n=document.createElement("h3");n.className="spotify-section-title",n.textContent="Now Playing";let o=document.createElement("div");o.className="spotify-now-playing";let t=Xe("spotify-album-art"),l=document.createElement("div");l.className="spotify-track-info";let p=document.createElement("div");p.className="spotify-track-name";let d=document.createElement("div");d.className="spotify-track-artist";let f=document.createElement("div");f.className="spotify-track-album";let c=document.createElement("div");c.className="spotify-track-device",l.append(p,d,f,c),o.append(t.el,l);let m=document.createElement("div");return m.className="spotify-empty",e.append(n,o,m),{root:e,update(y,v){if(!v){o.style.display="none",m.style.display="",m.textContent="Connect a music source to get started",t.setUrl(null);return}if(!y){o.style.display="none",m.style.display="",m.textContent="No active playback reported",t.setUrl(null);return}o.style.display="flex",m.style.display="none",p.textContent=y.trackName,d.textContent=y.artistName,f.textContent=y.albumName,c.textContent=y.source==="jukebox"?"Server Jukebox":y.source==="feishin"?"Feishin Desktop":y.deviceName?`Playing on ${y.deviceName}`:"Server now playing",t.setUrl(Ge(y.albumArtUrl,y.trackUri))},destroy(){t.destroy(),e.remove()}}}function Jt(e){let n=document.createElement("div");n.className="spotify-section";let o=document.createElement("h3");o.className="spotify-section-title",o.textContent="Player Controls";let t=document.createElement("div");t.className="spotify-controls";let l=(m,y="")=>{let v=document.createElement("button");return v.className=`spotify-ctrl-btn ${y}`,v.innerHTML=m,v},p=l('<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>'),d=l('<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',"spotify-ctrl-btn-main"),f=l('<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>');p.onclick=()=>e({type:"previous"}),f.onclick=()=>e({type:"next"});let c=!1;return d.onclick=()=>e({type:c?"pause":"play"}),t.append(p,d,f),n.append(o,t),{root:n,update(m,y,v,C="Player Controls"){n.style.display=y&&v?"":"none",o.textContent=C,c=!!m?.isPlaying,d.innerHTML=c?'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'},destroy(){n.remove()}}}function Kt(e){let n=document.createElement("div");n.className="spotify-section";let o=document.createElement("h3");o.className="spotify-section-title",o.textContent="Library Search";let t=document.createElement("input");t.className="spotify-search-input",t.placeholder="Search your server's music library…";let l=document.createElement("div");l.className="spotify-search-results",n.append(o,t,l);let p=null,d=!0;return t.oninput=()=>{if(p)clearTimeout(p);p=setTimeout(()=>{let c=t.value.trim();if(c.length>=2)e({type:"search",query:c});else l.innerHTML=""},350)},{root:n,setResults:(c)=>{if(l.innerHTML="",!c.length){let m=document.createElement("div");m.className="spotify-empty",m.textContent="No tracks found",l.appendChild(m);return}for(let m of c){let y=document.createElement("div");if(y.className="spotify-search-item",m.albumArtUrl){let N=document.createElement("img");N.className="spotify-search-item-art",N.src=m.albumArtUrl,N.alt=m.album,y.appendChild(N)}let v=document.createElement("div");v.className="spotify-search-item-info";let C=document.createElement("div");C.className="spotify-search-item-name",C.textContent=m.name;let w=document.createElement("div");if(w.className="spotify-search-item-artist",w.textContent=`${m.artist} — ${m.album}`,v.append(C,w),d){let N=document.createElement("div");N.className="spotify-search-item-actions";let T=document.createElement("button");T.className="spotify-search-item-btn",T.title="Play in server Jukebox",T.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',T.onclick=()=>e({type:"play",trackUri:m.uri});let E=document.createElement("button");E.className="spotify-search-item-btn",E.title="Add to server Jukebox queue",E.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>',E.onclick=()=>e({type:"queue",trackUri:m.uri}),N.append(T,E),y.append(v,N)}else y.append(v);l.appendChild(y)}},setAvailable(c){if(n.style.display=c?"":"none",!c)l.innerHTML=""},setPlaybackAvailable(c){d=c,l.innerHTML=""},destroy(){if(p)clearTimeout(p);n.remove()}}}function wt(e){let n=null,o=null,t=null,l=0,p=!1,d=0;function f(w){let N=e.getBoundingClientRect(),T=w.getBoundingClientRect(),E=Math.max(0,e.scrollHeight-e.clientHeight);return Math.min(Math.max(e.scrollTop+(T.top+T.height/2)-(N.top+e.clientHeight/2),0),E)}function c(){if(n!==null)cancelAnimationFrame(n);n=null,o=null}function m(){c(),t=null,l=Date.now()}function y(){c(),t=null}function v(w){if(n=null,o===null||!o.isConnected||!e.isConnected){c();return}let N=Math.min(Math.max(w-d,0),100);d=w;let T=Math.max(0,e.scrollHeight-e.clientHeight),E=f(o),D=E-e.scrollTop;if(Math.abs(D)<0.5){t=E,e.scrollTop=E,c();return}let b=D*(1-Math.exp(-N/85)),q=1800*(N/1000),F=Math.abs(b)>q?Math.sign(b)*q:b,ie=Math.min(Math.max(e.scrollTop+F,0),T);t=ie,e.scrollTop=ie,n=requestAnimationFrame(v)}e.addEventListener("wheel",m,{passive:!0}),e.addEventListener("touchmove",m,{passive:!0}),e.addEventListener("pointerdown",m,{passive:!0});function C(){if(n!==null||o!==null)return;if(t!==null&&Math.abs(e.scrollTop-t)<=1)return;m()}return e.addEventListener("scroll",C,{passive:!0}),{center(w,N){if(p)return;if(!N?.force&&Date.now()-l<=2500)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){c(),t=f(w),e.scrollTop=t;return}if(o=w,n===null)d=performance.now(),n=requestAnimationFrame(v)},suspend(w){if(p===w)return!1;if(p=w,p)y();return!0},cancel:y,destroy(){y(),e.removeEventListener("wheel",m),e.removeEventListener("touchmove",m),e.removeEventListener("pointerdown",m),e.removeEventListener("scroll",C)}}}function hn(e){let n=/^(\d+):(\d{2})(?:\.(\d{1,3}))?$/.exec(e);if(!n)return null;let o=Number(n[1]),t=Number(n[2]),l=n[3]?Number(n[3].padEnd(3,"0")):0;if(!Number.isFinite(o)||!Number.isFinite(t)||t>59)return null;return o*60000+t*1000+l}function dt(e){if(!e)return[];let n=[];for(let t of e.split(/\r?\n/)){let l=[...t.matchAll(/\[([^\]]+)\]/g)].map((d)=>hn(d[1])).filter((d)=>d!==null);if(l.length===0)continue;let p=t.replace(/(?:\[[^\]]+\])+/g,"").trim();for(let d of l)n.push({timeMs:d,text:p})}let o=[];for(let t of n.sort((l,p)=>l.timeMs-p.timeMs)){let l=o[o.length-1];if(l?.timeMs===t.timeMs)l.text=[l.text,t.text].filter(Boolean).join(`
`);else o.push({...t})}return o}function Et(e){return e||"♪"}function Zt(e){return!e.includes(`
`)&&e.length>=36}function kt(e){let n=[],o=null,t=-1;function l(){if(!o)return 0;if(!o.isPlaying)return o.progressMs;return Math.min(o.progressMs+Date.now()-o.updatedAt,o.durationMs||1/0)}function p(){if(n.length===0){let v=t!==-1;return t=-1,v}let c=l(),m=-1;for(let v=0;v<n.length;v++){if(n[v].timeMs>c)break;m=v}let y=m!==t;return t=m,y}function d(){let c=n.map((y,v)=>({...y,index:v,displayText:Et(y.text),hasText:Boolean(y.text)}));if(!e||c.length<=e)return c;if(t<0)return c.slice(0,e);let m=Math.max(0,Math.min(t-Math.floor(e/2),c.length-e));return c.slice(m,m+e)}function f(){return n.map((c,m)=>({...c,index:m,displayText:Et(c.text),hasText:Boolean(c.text)}))}return{clear(){n=[],o=null,t=-1},setLyrics(c){n=c,t=-1,p()},setPlayback(c){o=c},refreshActiveLineIndex:p,getActiveLineIndex(){return t},hasLyrics(){return n.length>0},getIndexedLines:f,getSnapshot(){return p(),{activeLineIndex:t,lines:d()}}}}var vn=180;function Qt(e,n,o,t){let l=["spotify-lyrics-line"];if(!o)l.push("spotify-lyrics-line-blank");if(e===n)l.push("spotify-lyrics-line-active");else if(e<n)l.push("spotify-lyrics-line-past");else l.push("spotify-lyrics-line-future");if(n>=0){let p=Math.abs(e-n);if(p>=1){let d=Math.min(p,4);if(l.push(`spotify-lyrics-line-tier-${d}`),t&&d>=2)l.push(`spotify-lyrics-line-blur-${d}`)}}return l.join(" ")}function en(){let e=document.createElement("div");e.className="spotify-section spotify-lyrics-section",e.dataset.transport="false";let n=document.createElement("h3");n.className="spotify-section-title",n.textContent="Lyrics";let o=document.createElement("div");o.className="spotify-lyrics-body",e.append(n,o);let t=null,l=[],p=kt(),d=wt(o),f=null,c=-1,m=!0,y,v;function C(L){return L?.source==="feishin"||L?.source==="jukebox"}function w(){clearTimeout(v),v=void 0,o.classList.remove("spotify-lyrics-loading")}function N(){clearInterval(y),y=void 0}function T(){l.forEach((L)=>{let k=p.getIndexedLines()[L.index];L.el.className=Qt(L.index,c,k?.hasText??!1,m)})}function E(){if(m)e.style.removeProperty("--spotify-lyrics-enter-blur");else e.style.setProperty("--spotify-lyrics-enter-blur","0px")}function D(L,k=!1){c=L,T();let I=l.find((z)=>z.index===c);if(I)d.center(I.textEl,{force:k})}function b(L=!1){if(!l.length)return;if(p.refreshActiveLineIndex()||L)D(p.getActiveLineIndex(),L)}function q(){if(!y&&l.length)y=setInterval(b,200)}function F(){N(),d.cancel(),w(),o.innerHTML="",o.className="spotify-lyrics-body",t=null,l=[],p.clear(),f=null,c=-1,e.dataset.transport="false"}function ie(L,k){if(w(),!L)return;if(N(),d.cancel(),o.innerHTML="",o.className="spotify-lyrics-body spotify-lyrics-loading",t=k?.trackUri??t,l=[],p.setLyrics([]),k&&k.trackUri===t)f={trackUri:k.trackUri,progressMs:k.progressMs,durationMs:k.durationMs,isPlaying:k.isPlaying,updatedAt:Date.now()},p.setPlayback(f);else f=null,p.setPlayback(null);c=-1,v=setTimeout(()=>{if(!o.classList.contains("spotify-lyrics-loading"))return;let I=document.createElement("div");I.className="spotify-lyrics-status spotify-lyrics-status-loading",I.textContent="Loading lyrics...",o.appendChild(I)},vn)}function se(L){let k=dt(L);if(!k.length)return!1;w(),o.className="spotify-lyrics-body spotify-lyrics-has-content spotify-lyrics-synced",p.setLyrics(k);let I=p.getSnapshot();if(c=I.activeLineIndex,l=I.lines.map((z,Z)=>{let W=document.createElement("div"),G=document.createElement("div");if(W.className=Qt(z.index,c,z.hasText,m),W.classList.add("spotify-lyrics-line-enter"),W.style.setProperty("--spotify-lyrics-enter-delay",`${Math.min(Z*28,280)}ms`),G.className="spotify-lyrics-line-text",!z.hasText)G.classList.add("spotify-lyrics-line-symbol");if(Zt(z.text))G.classList.add("spotify-lyrics-line-text-long");return G.textContent=Et(z.text),W.appendChild(G),o.appendChild(W),{index:z.index,el:W,textEl:G}}),b(),f?.isPlaying)q();return!0}function V(L){w(),o.className="spotify-lyrics-body spotify-lyrics-has-content";let k=document.createElement("div");k.className="spotify-lyrics-text spotify-lyrics-text-enter",k.textContent=L,o.appendChild(k)}function j(L,k,I,z){if(N(),d.cancel(),w(),t=L,o.innerHTML="",l=[],c=-1,z)o.className="spotify-lyrics-body",o.textContent="♪ Instrumental";else if(!se(I||""))if(k)V(k);else o.className="spotify-lyrics-body",o.textContent="No lyrics available"}function Y(L){let k=String(C(L)),I=e.dataset.transport!==k;if(e.dataset.transport=k,!L||L.trackUri!==t){f=null,p.setPlayback(null),N();return}if(f={trackUri:L.trackUri,progressMs:L.progressMs,durationMs:L.durationMs,isPlaying:L.isPlaying,updatedAt:Date.now()},p.setPlayback(f),b(),L.isPlaying)q();else N();if(I&&l.length)requestAnimationFrame(()=>b(!0))}return{root:e,update:j,updatePlayback:Y,setLoading:ie,setAutoScrollSuspended(L){if(d.suspend(L)&&!L&&l.length)D(c,!0)},setBlurEnabled(L){if(m===L)return;m=L,E(),T()},clear:F,destroy(){N(),d.destroy(),w(),e.remove()}}}function Lt(e,n){let o=!1;function t(E){if(o===E)return;o=E,n.onInteractChange?.(E)}function l(E){if(n.stopPropagation)E.stopPropagation()}function p(){return Number.parseInt(e.value,10)}let d=(E)=>{l(E),t(!0)},f=(E)=>{l(E)},c=(E)=>{l(E),t(!1)},m=(E)=>{l(E),t(!0)},y=(E)=>{l(E)},v=(E)=>{l(E),t(!1)},C=(E)=>{l(E)},w=(E)=>{l(E),t(!0),n.onPreview?.(p())},N=(E)=>{l(E);let D=p();n.onPreview?.(D),n.onCommit(D),t(!1)},T=()=>{t(!1)};return e.addEventListener("pointerdown",d),e.addEventListener("pointermove",f),e.addEventListener("pointerup",c),e.addEventListener("touchstart",m,{passive:!0}),e.addEventListener("touchmove",y,{passive:!0}),e.addEventListener("touchend",v,{passive:!0}),e.addEventListener("click",C),e.addEventListener("input",w),e.addEventListener("change",N),e.addEventListener("blur",T),e.addEventListener("pointercancel",T),e.addEventListener("lostpointercapture",T),()=>{e.removeEventListener("pointerdown",d),e.removeEventListener("pointermove",f),e.removeEventListener("pointerup",c),e.removeEventListener("touchstart",m),e.removeEventListener("touchmove",y),e.removeEventListener("touchend",v),e.removeEventListener("click",C),e.removeEventListener("input",w),e.removeEventListener("change",N),e.removeEventListener("blur",T),e.removeEventListener("pointercancel",T),e.removeEventListener("lostpointercapture",T)}}function Ct(e,n){let o=!1,t=null,l=0;function p(b){if(o===b)return;o=b,n.onInteractChange?.(b)}function d(b){if(n.stopPropagation)b.stopPropagation()}function f(b){let q=n.getMaxValue();if(!Number.isFinite(q)||q<=0)return null;let F=e.getBoundingClientRect();if(F.width<=0)return null;let ie=Math.max(0,Math.min(1,(b-F.left)/F.width));return Math.round(ie*q)}function c(b){let q=f(b);if(q===null)return null;return l=q,n.onPreview(q),q}function m(b){if(t!==null&&e.hasPointerCapture(t))e.releasePointerCapture(t);if(t=null,b)n.onCommit(l);p(!1)}let y=(b)=>{if(d(b),b.button!==0)return;if(c(b.clientX)===null)return;t=b.pointerId,p(!0);try{e.setPointerCapture(b.pointerId)}catch{}},v=(b)=>{if(d(b),b.pointerId!==t)return;c(b.clientX)},C=(b)=>{if(d(b),b.pointerId!==t)return;c(b.clientX),m(!0)},w=(b)=>{if(d(b),b.pointerId!==t)return;m(!1)},N=(b)=>{d(b),b.preventDefault()},T=(b)=>{d(b)},E=(b)=>{d(b)},D=(b)=>{d(b)};return e.addEventListener("pointerdown",y),e.addEventListener("pointermove",v),e.addEventListener("pointerup",C),e.addEventListener("pointercancel",w),e.addEventListener("click",N),e.addEventListener("touchstart",T,{passive:!0}),e.addEventListener("touchmove",E,{passive:!0}),e.addEventListener("touchend",D,{passive:!0}),()=>{e.removeEventListener("pointerdown",y),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",C),e.removeEventListener("pointercancel",w),e.removeEventListener("click",N),e.removeEventListener("touchstart",T),e.removeEventListener("touchmove",E),e.removeEventListener("touchend",D)}}var bn='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',tn='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',xn='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',wn='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',En='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',kn='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',Ln='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',Cn='<svg viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>',nn="♪";function ct(e){let n=Math.floor(e/1000),o=Math.floor(n/60),t=n%60;return`${o}:${t.toString().padStart(2,"0")}`}var on=280,Mn=336,ue=8;function Tt(e){return e==="modern"?Mn:on}function Sn(e){if(!e)return[];return e.split(/\r?\n/).map((n)=>n.trim()).filter(Boolean).slice(0,5)}function rn(e,n,o){let t=document.createElement("div");t.className="spotify-mini-player",t.dataset.style="default",t.style.setProperty("--spotify-mini-player-width",`${on}px`);let l=Xe("spotify-mini-art"),p=document.createElement("div");p.className="spotify-mini-info";let d=document.createElement("div");d.className="spotify-mini-track";let f=document.createElement("div");f.className="spotify-mini-artist";let c=document.createElement("div");c.className="spotify-mini-album",p.appendChild(d),p.appendChild(f),p.appendChild(c);let m=document.createElement("button");m.className="spotify-mini-header-btn",m.innerHTML=kn,m.title="Open full player";let y=document.createElement("button");y.className="spotify-mini-header-btn",y.innerHTML=Ln,y.title="Collapse";let v=document.createElement("div");v.className="spotify-mini-header-btns",v.appendChild(m),v.appendChild(y);let C=document.createElement("div");C.className="spotify-mini-progress-row";let w=document.createElement("span");w.className="spotify-mini-time";let N=document.createElement("div");N.className="spotify-mini-progress-bar";let T=document.createElement("div");T.className="spotify-mini-progress-fill",N.appendChild(T);let E=document.createElement("span");E.className="spotify-mini-time",C.appendChild(w),C.appendChild(N),C.appendChild(E);let D=document.createElement("div");D.className="spotify-mini-controls";function b(r,h=""){let P=document.createElement("button");return P.className=`spotify-mini-btn ${h}`.trim(),P.innerHTML=r,P}let q=b(bn),F=b(tn,"spotify-mini-btn-main"),ie=b(wn);D.appendChild(q),D.appendChild(F),D.appendChild(ie);let se=document.createElement("div");se.className="spotify-mini-volume-row";let V=document.createElement("span");V.className="spotify-mini-volume-icon",V.innerHTML=En;let j=document.createElement("input");j.type="range",j.className="spotify-mini-volume-slider",j.min="0",j.max="100",j.value="50",se.appendChild(V),se.appendChild(j);let Y=document.createElement("div");Y.className="spotify-mini-device-row";let L=document.createElement("span");L.className="spotify-mini-device-icon",L.innerHTML=Cn;let k=document.createElement("span");k.className="spotify-mini-device-name";let I=document.createElement("button");I.className="spotify-mini-device-toggle",I.textContent="Switch",Y.appendChild(L),Y.appendChild(k),Y.appendChild(I);let z=document.createElement("div");z.className="spotify-mini-device-list";let Z=document.createElement("div");Z.className="spotify-mini-empty",Z.textContent="No active playback";let W=document.createElement("div");W.className="spotify-mini-header",W.appendChild(l.el),W.appendChild(p),W.appendChild(v),t.appendChild(W),t.appendChild(C);let G=document.createElement("div");G.className="spotify-mini-lyrics-section";let A=document.createElement("div");A.className="spotify-mini-lyrics-header",A.textContent="Lyrics";let ee=document.createElement("div");ee.className="spotify-mini-lyrics-body";let g=document.createElement("div");g.className="spotify-mini-lyrics-status";let x=Array.from({length:5},()=>{let r=document.createElement("div");return r.className="spotify-mini-lyric-line",ee.appendChild(r),r});ee.appendChild(g),G.appendChild(A),G.appendChild(ee),t.appendChild(G),t.appendChild(D),t.appendChild(se),t.appendChild(Y),t.appendChild(z),t.appendChild(Z);let R=!1,M=0,_=!1,oe=0,fe="default",de=null,$e=!1,ce=0,Ae=0,ae=!1,ve=null,Se=null,me=[],we=[],B=!1,Q=!1,J=-1,H=!1,ge=!1,he=!1,Pe=null,K=null,qe=null,Ee=!1,be=!1;function ke(r,h=!1){g.className=h?"spotify-mini-lyrics-status spotify-mini-lyrics-status-loading":"spotify-mini-lyrics-status",g.textContent=r,g.style.display="";for(let P of x)P.style.display="none",P.textContent="",P.className="spotify-mini-lyric-line"}function Fe(){g.style.display="none";for(let r of x)r.style.display=""}function Ue(){if(!ge||H)return;ge=!1,je(!0)}function Ze(){if(he)return;let r=Pe,h=K,P=qe;if(Pe=null,K=null,qe=null,r)tt(r.state,r.connected);if(h)ye(h);if(P!==null)pe(P);Ue()}function Ve(){if(!ae)return ce;return Math.min(ce+Math.max(0,Date.now()-Ae),M||1/0)}function Qe(){if(me.length===0)return[];let h=[];if(J<0)for(let P=0;P<Math.min(5,me.length);P++){let O=me[P];h.push({text:O.text||nn,index:P})}else{let P=Math.max(0,Math.min(J-2,me.length-5));for(let O=0;O<5&&P+O<me.length;O++){let De=P+O,nt=me[De];h.push({text:nt.text||nn,index:De})}}while(h.length<5)h.push({text:" ",index:-1-h.length});return h}function it(){if(Q){ke("Loading lyrics...",!0);return}if(B){ke("♪ Instrumental");return}if(me.length>0){Fe();let r=Qe();x.forEach((h,P)=>{let O=r[P]??{text:" ",index:-1-P},De=J<0?O.index:Math.abs(O.index-J);if(h.className="spotify-mini-lyric-line",O.index===J)h.classList.add("spotify-mini-lyric-line-active");else if(De===1)h.classList.add("spotify-mini-lyric-line-near");else if(De===2)h.classList.add("spotify-mini-lyric-line-mid");else h.classList.add("spotify-mini-lyric-line-far");h.textContent=O.text});return}if(we.length>0){Fe(),x.forEach((r,h)=>{r.className="spotify-mini-lyric-line spotify-mini-lyric-line-plain",r.textContent=we[h]??" "});return}ke("No lyrics available")}function je(r=!1){if(H){ge=!0;return}if(fe!=="modern"||me.length===0||!de||de.trackUri!==Se){if(r&&fe==="modern")it();return}let h=Ve(),P=-1;for(let O=0;O<me.length;O++){if(me[O].timeMs>h)break;P=O}if(r||P!==J)J=P,it()}function X(r=!1){let h=fe==="modern"&&$e&&Boolean(de);if(G.style.display=h?"":"none",!h)return;if(H){ge=!0;return}if(je(!0),r&&_)Le()}function Je(){if(he||!_||!ae||!M){ve=null;return}if(Ee){ve=requestAnimationFrame(Je);return}let r=Date.now()-Ae,h=Math.min(ce+r,M),P=h/M*100;T.style.width=`${P}%`,w.textContent=ct(h),je(),ve=requestAnimationFrame(Je)}function _e(){if(ve!==null)return;ve=requestAnimationFrame(Je)}function Re(){if(ve!==null)cancelAnimationFrame(ve),ve=null}function Ne(){return de?.source==="feishin"||de?.source==="jukebox"}q.addEventListener("click",(r)=>{if(r.stopPropagation(),!Ne())return;e({type:"previous"})}),ie.addEventListener("click",(r)=>{if(r.stopPropagation(),!Ne())return;e({type:"next"})}),F.addEventListener("click",(r)=>{if(r.stopPropagation(),!Ne())return;e({type:R?"pause":"play"})}),m.addEventListener("click",(r)=>{r.stopPropagation(),ze(),n()}),y.addEventListener("click",(r)=>{r.stopPropagation(),ze()});let le=Ct(N,{getMaxValue:()=>M,onInteractChange(r){Ee=r},onPreview(r){let h=M>0?r/M*100:0;T.style.width=`${h}%`,w.textContent=ct(r)},onCommit(r){if(de)de={...de,progressMs:r};if(ce=r,Ae=Date.now(),je(!0),e({type:"seek",positionMs:r}),_&&ae)_e()}}),Be=new Set,He=Lt(j,{onInteractChange(r){be=r},onPreview(r){for(let h of Be)h(r)},onCommit(r){e({type:"set_volume",percent:r})}}),te=!1,re=null;I.addEventListener("click",(r)=>{if(r.stopPropagation(),te)z.style.display="none",te=!1;else e({type:"get_devices"}),z.innerHTML='<div class="spotify-mini-device-loading">Loading devices…</div>',z.style.display="flex",te=!0}),t.addEventListener("pointerdown",(r)=>r.stopPropagation());function et(r){if(!t.contains(r.target))ze()}function Le(){let{x:r,y:h,w:P,h:O}=o(),{innerWidth:De,innerHeight:nt}=window,Oe=Tt(fe),Ce=r+P/2-Oe/2;Ce=Math.max(ue,Math.min(Ce,De-Oe-ue)),t.style.left=`${Ce}px`,t.style.top="0px",t.style.visibility="hidden",t.style.transform="scale(1)",t.style.display="flex";let Me=t.offsetHeight;oe=Me,t.style.visibility="",t.style.transform="",t.style.display="";let Ye,We=!1;if(h-Me-ue>=ue)Ye=h-Me-ue;else Ye=h+O+ue,We=!0;Ye=Math.max(ue,Math.min(Ye,nt-Me-ue)),t.style.left=`${Ce}px`,t.style.top=`${Ye}px`;let st=r+P/2-Ce,St=We?-ue:Me+ue;t.style.transformOrigin=`${st}px ${St}px`}function Te(){if(!_||!oe)return;let{x:r,y:h,w:P,h:O}=o(),{innerWidth:De,innerHeight:nt}=window,Oe=Tt(fe),Ce=r+P/2-Oe/2;Ce=Math.max(ue,Math.min(Ce,De-Oe-ue));let Me,Ye=!1;if(h-oe-ue>=ue)Me=h-oe-ue;else Me=h+O+ue,Ye=!0;Me=Math.max(ue,Math.min(Me,nt-oe-ue)),t.style.left=`${Ce}px`,t.style.top=`${Me}px`;let We=r+P/2-Ce,st=Ye?-ue:oe+ue;t.style.transformOrigin=`${We}px ${st}px`}function rt(){if(!document.body.contains(t))document.body.appendChild(t);if(Le(),t.classList.remove("open","closing"),t.offsetHeight,t.classList.add("open"),_=!0,ae)_e();setTimeout(()=>document.addEventListener("click",et),0)}function ze(){if(!_)return;_=!1,document.removeEventListener("click",et),Re(),Le(),t.classList.remove("open"),t.classList.add("closing");let r=()=>{t.classList.remove("closing"),t.removeEventListener("transitionend",r)};t.addEventListener("transitionend",r),setTimeout(r,250)}function tt(r,h){if(de=r,$e=h,he){Pe={state:r,connected:h};return}if(!h||!r){Ee=!1,be=!1,l.setUrl(null),W.style.display="none",C.style.display="none",G.style.display="none",D.style.display="none",se.style.display="none",Y.style.display="none",z.style.display="none",te=!1,Z.style.display="",Z.textContent=!h?"Connect to Subsonic in Settings":"No active playback",M=0,T.style.width="0%",w.textContent=ct(0),E.textContent=ct(0),Re();return}W.style.display="",C.style.display="";let P=Ne();if(D.style.display=P?"flex":"none",D.hidden=!P,q.disabled=!P,F.disabled=!P,ie.disabled=!P,se.hidden=!0,se.style.display="none",Z.style.display="none",r.deviceName)k.textContent=r.deviceName,Y.style.display="",re=r.deviceId??null;else Y.style.display="none";if(d.textContent=r.trackName,f.textContent=r.artistName,c.textContent=r.albumName,M=r.durationMs,l.setUrl(Ge(r.albumArtUrl,r.trackUri)),R=r.isPlaying,ae=r.isPlaying,F.innerHTML=R?xn:tn,!Ee){ce=r.progressMs,Ae=Date.now();let O=r.durationMs>0?r.progressMs/r.durationMs*100:0;T.style.width=`${O}%`,w.textContent=ct(r.progressMs)}if(E.textContent=ct(r.durationMs),r.volume!==null&&!be)j.value=String(r.volume);if(_&&R)_e();else Re();X()}function Ke(r,h,P,O){Se=r,me=dt(P),we=Sn(h),B=O,Q=!1,J=-1,X(!0)}function u(r){if(Q=r,r)Se=de?.trackUri??null,me=[],we=[],B=!1,J=-1;X(!0)}function U(r){if(fe=r,t.dataset.style=r,t.style.setProperty("--spotify-mini-player-width",`${Tt(r)}px`),X(!0),_)Le()}function ye(r){if(he){K=r;return}if(z.innerHTML="",r.length===0){z.innerHTML='<div class="spotify-mini-device-loading">No devices found</div>';return}for(let h of r){let P=document.createElement("div");if(P.className=`spotify-mini-device-item${h.isActive?" active":""}`,P.innerHTML=`<span class="spotify-mini-device-item-name">${h.name}</span><span class="spotify-mini-device-item-type">${h.type}</span>`,!h.isActive)P.addEventListener("click",(O)=>{O.stopPropagation(),e({type:"transfer_playback",deviceId:h.id}),z.style.display="none",te=!1});z.appendChild(P)}}function pe(r){if(he){qe=r;return}j.value=String(r)}return{root:t,update:tt,updateLyrics:Ke,setLyricsLoading:u,setLyricsUpdateSuspended(r){if(H=r,!r)Ue()},setUiSuspended(r){if(he=r,H=r,r){Re();return}if(Ze(),_&&ae)_e()},setStyle:U,setDevices:ye,setVolume:pe,onVolumeChange(r){Be.add(r)},toggle(){if(_)ze();else rt()},hide:ze,isOpen:()=>_,reposition:Te,destroy(){ze(),Re(),le(),He(),Be.clear(),t.remove()}}}var Pn='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',sn='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',Nn='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',Tn='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',zn='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',In='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',An='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',zt='<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',Un=4000;function Mt(e){let n=Math.floor(e/1000),o=Math.floor(n/60),t=n%60;return`${o}:${t.toString().padStart(2,"0")}`}function _n(e){if(!e)return[];return e.split(/\r?\n/).map((n)=>n.trim()).filter(Boolean)}function pt(e){e.addEventListener("pointerdown",(n)=>n.stopPropagation()),e.addEventListener("pointermove",(n)=>n.stopPropagation()),e.addEventListener("pointerup",(n)=>n.stopPropagation()),e.addEventListener("touchstart",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("touchmove",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("touchend",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("click",(n)=>n.stopPropagation())}function It(e){let n=document.createElement("div");n.className=`${e} spotify-modern-widget-marquee`,n.dataset.marqueePhase="idle";let o=document.createElement("div");o.className=`${e}-content spotify-modern-widget-marquee-content`,n.appendChild(o);let t=null;function l(){if(t)clearTimeout(t),t=null;n.dataset.marqueePhase="idle",o.classList.remove("spotify-modern-widget-marquee-animate")}function p(f){if(n.dataset.marqueePhase="scrolling",o.classList.remove("spotify-modern-widget-marquee-animate"),f)o.offsetWidth;o.classList.add("spotify-modern-widget-marquee-animate")}function d(f){if(t)clearTimeout(t),t=null;n.dataset.marqueePhase="rest",o.classList.remove("spotify-modern-widget-marquee-animate"),t=setTimeout(()=>{t=null,p(f)},Un)}return o.addEventListener("animationend",(f)=>{if(f.animationName!=="spotify-modern-marquee"||n.dataset.marqueePhase!=="scrolling")return;d(!0)}),{root:n,setText(f){o.textContent=f,n.setAttribute("aria-label",f)},refresh(f,c=!1){if(!f){n.dataset.overflow="false",l(),n.style.removeProperty("--spotify-modern-marquee-distance"),n.style.removeProperty("--spotify-modern-marquee-duration");return}let m=Math.ceil(o.scrollWidth-n.clientWidth);if(m<=6){n.dataset.overflow="false",l(),n.style.removeProperty("--spotify-modern-marquee-distance"),n.style.removeProperty("--spotify-modern-marquee-duration");return}n.dataset.overflow="true",n.style.setProperty("--spotify-modern-marquee-distance",`${m}px`),n.style.setProperty("--spotify-modern-marquee-duration",`${Math.max(8,Math.min(20,8+m/18))}s`);let y=t!==null,v=n.dataset.marqueePhase==="scrolling";if(c||!y&&!v)d(c)}}}function an(e,n,o){let t=document.createElement("div");t.className="spotify-modern-widget-player",t.dataset.expanded="false",t.dataset.transport="false";let l=document.createElement("div");l.className="spotify-modern-widget-compact";let p=Xe("spotify-modern-widget-compact-art"),d=document.createElement("div");d.className="spotify-modern-widget-compact-fallback",d.innerHTML=zt;let f=document.createElement("div");f.className="spotify-modern-widget-compact-overlay";let c=document.createElement("div");c.className="spotify-modern-widget-compact-status";let m=document.createElement("div");m.className="spotify-modern-widget-compact-progress",f.appendChild(c),l.appendChild(p.el),l.appendChild(d),l.appendChild(f),l.appendChild(m);let y=document.createElement("div");y.className="spotify-modern-widget-expanded";let v=document.createElement("div");v.className="spotify-modern-widget-header";let C=document.createElement("div");C.className="spotify-modern-widget-eyebrow",C.textContent="Now Playing";let w=document.createElement("div");w.className="spotify-modern-widget-header-buttons";let N=document.createElement("button");N.className="spotify-modern-widget-icon-btn",N.innerHTML=In,N.title="Open full player";let T=document.createElement("button");T.className="spotify-modern-widget-icon-btn",T.innerHTML=An,T.title="Collapse",pt(N),pt(T),N.addEventListener("click",()=>n()),T.addEventListener("click",()=>o()),w.appendChild(N),w.appendChild(T),v.appendChild(C),v.appendChild(w);let E=document.createElement("div");E.className="spotify-modern-widget-hero";let D=Xe("spotify-modern-widget-art");D.el.title="Collapse";let b=document.createElement("div");b.className="spotify-modern-widget-art-fallback",b.innerHTML=zt,b.title="Collapse",pt(D.el),pt(b),D.el.addEventListener("click",()=>o()),b.addEventListener("click",()=>o());let q=document.createElement("div");q.className="spotify-modern-widget-meta";let F=It("spotify-modern-widget-track"),ie=It("spotify-modern-widget-artist"),se=It("spotify-modern-widget-album");q.appendChild(F.root),q.appendChild(ie.root),q.appendChild(se.root),E.appendChild(D.el),E.appendChild(b),E.appendChild(q);let V=document.createElement("div");V.className="spotify-modern-widget-progress-row";let j=document.createElement("span");j.className="spotify-modern-widget-time";let Y=document.createElement("div");Y.className="spotify-modern-widget-progress-bar";let L=document.createElement("div");L.className="spotify-modern-widget-progress-fill",Y.appendChild(L);let k=document.createElement("span");k.className="spotify-modern-widget-time",V.appendChild(j),V.appendChild(Y),V.appendChild(k);let I=document.createElement("div");I.className="spotify-modern-widget-lyrics";let z=document.createElement("div");z.className="spotify-modern-widget-section-label",z.textContent="Lyrics";let Z=document.createElement("div");Z.className="spotify-modern-widget-lyrics-body";let W=document.createElement("div");W.className="spotify-modern-widget-lyrics-track",Z.appendChild(W),I.appendChild(z),I.appendChild(Z);let G=document.createElement("div");G.className="spotify-modern-widget-controls";let A=document.createElement("button");A.className="spotify-modern-widget-btn",A.innerHTML=Pn;let ee=document.createElement("button");ee.className="spotify-modern-widget-btn spotify-modern-widget-btn-main",ee.innerHTML=sn;let g=document.createElement("button");g.className="spotify-modern-widget-btn",g.innerHTML=Tn,G.appendChild(A),G.appendChild(ee),G.appendChild(g);let x=document.createElement("div");x.className="spotify-modern-widget-volume-row";let R=document.createElement("span");R.className="spotify-modern-widget-volume-icon",R.innerHTML=zn;let M=document.createElement("input");M.type="range",M.min="0",M.max="100",M.value="50",M.className="spotify-modern-widget-volume-slider",x.appendChild(R),x.appendChild(M);let _=document.createElement("div");_.className="spotify-modern-widget-empty";let oe=document.createElement("div");oe.className="spotify-modern-widget-empty-icon",oe.innerHTML=zt;let fe=document.createElement("div");fe.className="spotify-modern-widget-empty-title",fe.textContent="No music playing.";let de=document.createElement("div");de.className="spotify-modern-widget-empty-subtitle",de.textContent="Your speakers are enjoying a brief moment of mindfulness.",_.appendChild(oe),_.appendChild(fe),_.appendChild(de),y.appendChild(v),y.appendChild(E),y.appendChild(V),y.appendChild(I),y.appendChild(G),y.appendChild(x),y.appendChild(_),t.appendChild(l),t.appendChild(y),[Y,A,ee,g,M].forEach((u)=>pt(u)),pt(Z);let $e=!1,ce=null,Ae=!1,ae=0,ve=0,Se=0,me=!1,we=null,B=null,Q=kt(),J=[],H=!1,ge=!1,he="",Pe=[],K=wt(Z),qe="",Ee=null,be=null,ke=!1,Fe=!1,Ue=new ResizeObserver(()=>{Ve(!1)});Ue.observe(q),Ue.observe(t);let Ze=new ResizeObserver(()=>{if(!Ae)return;Ne(!0)});Ze.observe(Z);function Ve(u){requestAnimationFrame(()=>{F.refresh(Ae,u),ie.refresh(Ae,u),se.refresh(Ae,u)})}function Qe(u){if(Ee)clearTimeout(Ee);if(be)clearTimeout(be);Ve(u),Ee=setTimeout(()=>Ve(u),180),be=setTimeout(()=>Ve(u),460)}function it(u){p.setUrl(u),d.style.display=u?"none":"flex"}function je(u){D.setUrl(u),b.style.display=u?"none":"flex"}function X(){if(!me)return ve;return Math.min(ve+Math.max(0,Date.now()-Se),ae||1/0)}function Je(u,U){m.style.setProperty("--spotify-modern-widget-compact-progress",`${Math.max(0,Math.min(100,u))}%`),m.style.opacity=U?"1":"0"}function _e(){K.cancel(),W.innerHTML="",Z.scrollTop=0,Pe=[]}function Re(){_e(),Pe=Q.getIndexedLines().map((U,ye)=>{let pe=document.createElement("div");return pe.className="spotify-modern-widget-lyric-line spotify-modern-widget-lyric-line-enter",pe.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(ye*22,110)}ms`),pe.textContent=U.displayText,W.appendChild(pe),pe})}function Ne(u=!1){if(!Q.hasLyrics())return;let U=Q.getActiveLineIndex(),ye=U>=0?Pe[U]:Pe[0];if(ye)K.center(ye,{force:u})}function le(u=!0){let U=Q.getActiveLineIndex();if(Q.getIndexedLines().forEach((pe,r)=>{let h=Pe[r];if(!h)return;if(h.className="spotify-modern-widget-lyric-line",pe.index===U)h.classList.add("active");else if(U>=0){let P=Math.abs(pe.index-U);if(P===1)h.classList.add("near");else if(P===2)h.classList.add("mid");else h.classList.add("far")}else h.classList.add("far")}),!u)return;Ne()}function Be(){if(_e(),!$e||!ce){he="";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status",U.textContent=$e?"Start playback to see lyrics":"Connect Subsonic to see lyrics",W.appendChild(U);return}if(ge){he="loading";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status spotify-modern-widget-lyrics-status-loading",U.textContent="Loading lyrics...",W.appendChild(U);return}if(H){he="instrumental";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status",U.textContent="♪ Instrumental",W.appendChild(U);return}if(Q.hasLyrics()&&ce.trackUri===B){he=Q.getIndexedLines().map((ye)=>`${ye.index}:${ye.text}`).join("|"),Re(),le(!1);return}if(J.length>0){let U=J.join("|"),ye=U!==he;he=U,J.forEach((pe,r)=>{let h=document.createElement("div");if(h.className="spotify-modern-widget-lyric-line plain",ye)h.classList.add("spotify-modern-widget-lyric-line-enter"),h.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(r*20,100)}ms`);h.textContent=pe,W.appendChild(h)});return}he="empty";let u=document.createElement("div");u.className="spotify-modern-widget-lyrics-status",u.textContent="No lyrics available",W.appendChild(u)}function He(u=!1){if(!ce||ce.trackUri!==B||!Q.hasLyrics()){if(u)Be();return}if(Q.setPlayback({trackUri:ce.trackUri,progressMs:X(),durationMs:ae,isPlaying:me,updatedAt:Date.now()}),u){Be();return}if(Q.refreshActiveLineIndex())le(!0)}function te(){if(!ce||!$e||!me||!ae){we=null;return}if(ke){we=requestAnimationFrame(te);return}let u=X(),U=ae>0?u/ae*100:0;L.style.width=`${U}%`,Je(U,!0),j.textContent=Mt(u),He(),we=requestAnimationFrame(te)}function re(){if(we!==null)return;we=requestAnimationFrame(te)}function et(){if(we!==null)cancelAnimationFrame(we),we=null}function Le(){return ce?.source==="feishin"||ce?.source==="jukebox"}A.addEventListener("click",()=>{if(Le())e({type:"previous"})}),g.addEventListener("click",()=>{if(Le())e({type:"next"})}),ee.addEventListener("click",()=>{if(Le())e({type:ce?.isPlaying?"pause":"play"})});let Te=Ct(Y,{getMaxValue:()=>ae,onInteractChange(u){ke=u},onPreview(u){let U=ae>0?u/ae*100:0;L.style.width=`${U}%`,Je(U,ae>0),j.textContent=Mt(u)},onCommit(u){if(ce)ce={...ce,progressMs:u};if(ve=u,Se=Date.now(),He(!0),e({type:"seek",positionMs:u}),me)re()},stopPropagation:!0}),rt=Lt(M,{onInteractChange(u){Fe=u},onCommit(u){e({type:"set_volume",percent:u})},stopPropagation:!0});function ze(u,U){if(ce=u,$e=U,t.dataset.empty=!u?"true":"false",!U||!u){ke=!1,Fe=!1,C.textContent=U?"Standby":"Connect Subsonic",c.textContent=U?"No playback":"Connect Subsonic",_.style.display="grid",E.style.display="none",V.style.display="none",I.style.display="none",G.style.display="none",x.style.display="none",Je(0,!1),it(null),je(null),Q.setPlayback(null),qe="",et(),Be();return}C.textContent="Now Playing";let ye=Ge(u.albumArtUrl,u.trackUri);it(ye),je(ye),c.textContent=u.isPlaying?"Playing":"Paused";let pe=`${u.trackName}|${u.artistName}|${u.albumName}`,r=pe!==qe;qe=pe,F.setText(u.trackName),ie.setText(u.artistName),se.setText(u.albumName),E.style.display="grid",V.style.display="grid",I.style.display="grid",_.style.display="none",ae=u.durationMs,me=u.isPlaying;let h=Le(),P=t.dataset.transport!==String(h);if(t.dataset.transport=String(h),G.style.display=h?"flex":"none",G.hidden=!h,A.disabled=!h,ee.disabled=!h,g.disabled=!h,x.hidden=!0,x.style.display="none",Q.setPlayback({trackUri:u.trackUri,progressMs:ke?ve:u.progressMs,durationMs:u.durationMs,isPlaying:u.isPlaying,updatedAt:ke?Se:Date.now()}),ee.innerHTML=u.isPlaying?Nn:sn,!Fe)M.value=String(u.volume??Number(M.value));if(!ke){ve=u.progressMs,Se=Date.now();let O=u.durationMs>0?u.progressMs/u.durationMs*100:0;L.style.width=`${O}%`,Je(O,u.durationMs>0),j.textContent=Mt(u.progressMs)}if(k.textContent=Mt(u.durationMs),Q.hasLyrics()&&u.trackUri===B)if(Pe.length===0)Be();else He();else if(W.childElementCount===0)Be();if(P&&Q.hasLyrics()&&u.trackUri===B)requestAnimationFrame(()=>requestAnimationFrame(()=>le(!0)));if(Qe(r),u.isPlaying)re();else et()}function tt(u,U,ye,pe){B=u;let r=dt(ye);Q.setLyrics(r),J=_n(U),H=pe,ge=!1,He(!0)}function Ke(u){if(ge=u,u)B=ce?.trackUri??null,Q.clear(),J=[],H=!1;Be()}return{root:t,update:ze,updateLyrics:tt,setLyricsLoading:Ke,setLyricsBlur(u){if(u)I.style.removeProperty("--spotify-lyrics-enter-blur");else I.style.setProperty("--spotify-lyrics-enter-blur","0px")},setAutoScrollSuspended(u){if(K.suspend(u)&&!u&&Q.hasLyrics())le(!0)},setCollapsedSize(u){t.style.setProperty("--spotify-modern-widget-collapsed-size",`${u}px`)},setExpanded(u){if(Ae=u,t.dataset.expanded=String(u),Qe(!0),u)requestAnimationFrame(()=>Ne(!0))},isExpanded(){return Ae},destroy(){if(et(),K.destroy(),Te(),rt(),Ee)clearTimeout(Ee);if(be)clearTimeout(be);Ue.disconnect(),Ze.disconnect(),p.destroy(),D.destroy(),t.remove()}}}var At="right",Rn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',Hn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';function Dn(e){try{return new Date(e).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return""}}function ln(e,n){let o=new Map,t=new Map,l=new Map,p=null,d=null,f=null,c=null,m=null,y=null,v=null,C=null,w=null,N=null;function T(g){return o.get(g)?.get(t.get(g)??0)??null}function E(g){return(o.get(g)?.size??0)>0}function D(g){let x=l.get(g);if(x)x.style.display=T(g)?"":"none"}function b(g){if(!E(g))return;let x=l.get(g);if(!x||!x.isConnected){let R=e.dom.findMessageElement(g);if(!R)return;let M=e.dom.inject(R,`<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${Rn}</button>`,"beforeend");M.classList.add("spotify-song-badge-wrap"),M.dataset.corner=At,M.addEventListener("click",(_)=>{_.stopPropagation(),_.preventDefault(),I(g,M)}),l.set(g,M),x=M}D(g)}function q(){for(let{messageId:g}of e.dom.listMessageElements())if(E(g))b(g)}function F(){if(d)return;d=document.createElement("div"),d.className="spotify-song-pop";let g=document.createElement("div");g.className="spotify-song-pop-header",g.textContent="Playing when generated";let x=document.createElement("div");x.className="spotify-song-pop-body",f=Xe("spotify-song-pop-art"),f.el.style.display="";let R=document.createElement("div");R.className="spotify-song-pop-info",c=document.createElement("div"),c.className="spotify-song-pop-track",m=document.createElement("div"),m.className="spotify-song-pop-artist",y=document.createElement("div"),y.className="spotify-song-pop-album",v=document.createElement("div"),v.className="spotify-song-pop-when",R.append(c,m,y,v),x.append(f.el,R);let M=document.createElement("div");M.className="spotify-song-pop-actions",C=document.createElement("button"),C.type="button",C.className="spotify-song-pop-btn spotify-song-pop-btn-primary",C.innerHTML=`${Hn}<span>Play</span>`,C.addEventListener("click",(_)=>{_.stopPropagation();let oe=w?T(w):null;if(oe?.trackUri)n({type:"play",trackUri:oe.trackUri});k()}),M.appendChild(C),d.append(g,x,M),d.addEventListener("click",(_)=>_.stopPropagation()),document.body.appendChild(d)}function ie(g){if(F(),!g){if(f?.setUrl(null),c)c.textContent="No track playing";if(m)m.textContent="";if(y)y.textContent="Nothing was playing when this version was written.";if(v)v.textContent="";if(C)C.style.display="none";return}if(f?.setUrl(Ge(g.albumArtUrl,g.trackUri)),c)c.textContent=g.trackName;if(m)m.textContent=g.artistName;if(y)y.textContent=g.albumName;if(v)v.textContent=Dn(g.capturedAt);if(C)C.style.display=""}function se(g){if(!d)return;let x=g.getBoundingClientRect(),R=d.offsetWidth||280,M=d.offsetHeight||200,_=8,oe=x.top-M-8,fe="bottom";if(oe<_)oe=x.bottom+8,fe="top";let de=At==="right"?x.right-R:x.left;de=Math.max(_,Math.min(de,window.innerWidth-R-_)),oe=Math.max(_,Math.min(oe,window.innerHeight-M-_)),d.style.left=`${de}px`,d.style.top=`${oe}px`,d.style.transformOrigin=`${fe} ${At}`}function V(g){let x=g.target;if(!(x instanceof Node))return;if(d?.contains(x)||N?.contains(x))return;k()}function j(){k()}function Y(g){if(g.key==="Escape")k()}function L(g,x){ie(T(g)),w=g,N=x,d.classList.add("open"),se(x),setTimeout(()=>{document.addEventListener("click",V,!0),window.addEventListener("scroll",j,!0),window.addEventListener("resize",j,!0),document.addEventListener("keydown",Y,!0)},0)}function k(){if(!d||!w)return;d.classList.remove("open"),w=null,N=null,document.removeEventListener("click",V,!0),window.removeEventListener("scroll",j,!0),window.removeEventListener("resize",j,!0),document.removeEventListener("keydown",Y,!0)}function I(g,x){if(w===g)k();else{if(w)k();L(g,x)}}function z(g,x){if(g!==p)A();p=g;let R=new Set(x.map((M)=>M.messageId));for(let M of[...o.keys()])if(!R.has(M))G(M);for(let M of x){let _=new Map;for(let[oe,fe]of Object.entries(M.bySwipe))_.set(Number(oe),fe);o.set(M.messageId,_),t.set(M.messageId,M.activeSwipe),b(M.messageId)}q()}function Z(g,x,R,M){if(p&&g!==p)return;p=g;let _=o.get(x)??new Map;if(_.set(R,M),o.set(x,_),t.set(x,R),b(x),w===x)ie(T(x))}function W(g,x){if(t.set(g,x),D(g),w===g){let R=T(g);if(R)ie(R);else k()}}function G(g){if(w===g)k();o.delete(g),t.delete(g);let x=l.get(g);if(x){try{e.dom.uninject(x)}catch{}l.delete(g)}}function A(){k();for(let g of l.values())try{e.dom.uninject(g)}catch{}l.clear(),o.clear(),t.clear(),p=null}function ee(){A(),f?.destroy(),d?.remove(),d=null}return{setChatSongs:z,setMessageSong:Z,decorate:b,decorateMounted:q,setActiveSwipe:W,removeMessage:G,reset:A,destroy:ee}}var On={width:320,height:196},qn={width:348,height:520};var dn={width:300,height:420};function cn({desktopPopout:e,hasPlayback:n,viewportHeight:o,viewportWidth:t}){let l=n?qn:On;if(e)return{...l};if(!n)return{width:Math.max(280,Math.min(l.width,t-24)),height:l.height};return{width:Math.max(dn.width,Math.min(l.width,t-24)),height:Math.max(dn.height,Math.min(l.height,o-24))}}var pn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',mt=12,mn="subsonic-controls-widget-prefs";function un(e){let n=[],o="__TAURI_INTERNALS__"in window&&new URLSearchParams(window.location.search).has("desktopWidgetExtension");n.push(e.dom.addStyle(Yt));let t=(i)=>e.sendToBackend(i),l=null,p=0,d=null,f=new Map,c=48,m=new Map;function y(i){if(/^(data|blob):/i.test(i))return Promise.resolve(i);return new Promise((s)=>{let a=crypto.randomUUID(),S=setTimeout(()=>{m.delete(a),s(null)},15000);m.set(a,{resolve:s,timer:S}),e.sendToBackend({type:"__cors_proxy_request",requestId:a,url:i,options:{method:"GET",mediaType:"image"}})})}function v(i,s){let a=m.get(i);if(!a)return;m.delete(i),clearTimeout(a.timer);let S=s?.headers?.["content-type"]||s?.headers?.["Content-Type"]||"image/jpeg";a.resolve(s?.status&&s.status>=200&&s.status<300&&s.encoding==="base64"&&s.body?`data:${S};base64,${s.body}`:null)}function C(){if(d)clearTimeout(d);d=null}function w(){C(),p+=1,t({type:"album_colors",colors:null})}function N(i,s){f.delete(i),f.set(i,s);while(f.size>c){let a=f.keys().next().value;if(!a)break;f.delete(a)}}function T(i=1800){C(),d=setTimeout(()=>{d=null,w()},i)}function E(i){return new Promise((s)=>{let a=new Image;a.onload=()=>{try{let S=document.createElement("canvas"),ne=32;S.width=32,S.height=32;let xe=S.getContext("2d");if(!xe)return s(null);xe.drawImage(a,0,0,32,32);let Ie=xe.getImageData(0,0,32,32).data,vt=0,at=0,_t=0.5,Rt=-1,Ht=0,Dt=0,Ot=0,bt=0;for(let ut=0;ut<Ie.length;ut+=4){let Wt=Ie[ut],$t=Ie[ut+1],Vt=Ie[ut+2];Ht+=Wt,Dt+=$t,Ot+=Vt,bt+=1;let ft=Wt/255,lt=$t/255,yt=Vt/255,ot=Math.max(ft,lt,yt),gt=Math.min(ft,lt,yt),Pt=(ot+gt)/2,xt=0,Nt=0;if(ot!==gt){let ht=ot-gt;if(Nt=Pt>0.5?ht/(2-ot-gt):ht/(ot+gt),ot===ft)xt=((lt-yt)/ht+(lt<yt?6:0))/6;else if(ot===lt)xt=((yt-ft)/ht+2)/6;else xt=((ft-lt)/ht+4)/6}let jt=Nt*(1-Math.abs(Pt-0.5)*1.6);if(jt>Rt)Rt=jt,vt=xt,at=Nt,_t=Pt}let qt=Math.round(Ht/bt),Ft=Math.round(Dt/bt),Bt=Math.round(Ot/bt),gn=0.299*qt+0.587*Ft+0.114*Bt;s({dominant:{r:qt,g:Ft,b:Bt},dominantHsl:{h:Math.round(vt*360),s:Math.round(at*100),l:Math.round(_t*100)},isLight:gn>152})}catch{s(null)}},a.onerror=()=>s(null),y(i).then((S)=>{if(S)a.src=S;else s(null)})})}let D="none",b=Gt(t);e.ui.mount("settings_extensions").appendChild(b.root),n.push(()=>b.destroy());let F=e.ui.registerDrawerTab({id:"subsonic",title:"Subsonic Controls",shortName:"Subsonic",description:"Browse a Subsonic-compatible music server and control its optional Jukebox.",keywords:["subsonic","opensubsonic","music","jukebox","lyrics"],headerTitle:"Subsonic",iconSvg:pn});n.push(()=>F.destroy()),F.root.classList.add("spotify-tab-root");let ie=document.createElement("div");ie.className="spotify-panel",F.root.appendChild(ie);function se(){let i=F.root.getBoundingClientRect().top,s=F.root.parentElement?.getBoundingClientRect().bottom??window.innerHeight,a=window.visualViewport?.height??window.innerHeight,S=Math.min(s,a);F.root.style.setProperty("--spotify-tab-height",`${Math.max(240,S-i-2)}px`)}se();let V=new ResizeObserver(se);V.observe(F.root),window.addEventListener("resize",se),n.push(()=>{V.disconnect(),window.removeEventListener("resize",se)});let j=Xt(),Y=Jt(t),L=Kt(t),k=en();ie.append(j.root,Y.root,L.root,k.root),n.push(()=>j.destroy(),()=>Y.destroy(),()=>L.destroy(),()=>k.destroy());let I=!1,z=null,Z=null,W=!1,G="",A="",ee=!1,g="",x="",R=!1,M=1000,_=null,oe={small:36,medium:48,large:64},fe={small:112,medium:128,large:144},de=24,$e=256,ce=96,Ae=256;function ae(i){return i==="modern"?fe:oe}function ve(i){return i==="modern"?{min:ce,max:Ae}:{min:de,max:$e}}function Se(i,s){let{min:a,max:S}=ve(s);return Math.max(a,Math.min(i,S))}function me(i){return i==="small"||i==="medium"||i==="large"||i==="custom"}function we(i,s){let a=ae(s);if(i===a.small)return"small";if(i===a.large)return"large";return i===a.medium?"medium":"custom"}let B=48,Q="circle",J="medium",H="default",ge=!0,he,Pe=null;try{let i=JSON.parse(localStorage.getItem(mn)||"null");if(i?.miniPlayerStyle==="modern")H="modern";if(i?.lyricsBlur===!1)ge=!1;if(typeof i?.size==="number")B=Se(i.size,H);if(i?.shape==="squircle")Q="squircle";if(J=me(i?.sizeMode)?i.sizeMode:we(B,H),J!=="custom")B=ae(H)[J];if(typeof i?.x==="number"&&typeof i.y==="number")he={x:i.x,y:i.y};if(i)Pe={size:B,shape:Q,sizeMode:J,miniPlayerStyle:H,lyricsBlur:ge,...he}}catch{}let K,qe=null,Ee=!1;function be(){let i=K.getPosition(),s={size:B,shape:Q,sizeMode:J,miniPlayerStyle:H,lyricsBlur:ge,x:i.x,y:i.y};Ee=!0,localStorage.setItem(mn,JSON.stringify(s)),t({type:"set_widget_preferences",preferences:s})}let ke=null,Fe=null,Ue=null;function Ze(){let{min:i,max:s}=ve(H);if(ke)ke.textContent=H==="modern"?"Collapsed Modern Player Size (px)":"Custom Widget Size (px)";if(Fe)Fe.textContent=H==="modern"?`Controls the compact size of the modern player before it expands (${i}–${s}px).`:`Controls the floating widget size (${i}–${s}px).`;if(Ue)Ue.min=String(i),Ue.max=String(s),Ue.placeholder=H==="modern"?"e.g. 128":"e.g. 56",Ue.value=J==="custom"?String(B):""}let Ve=b.root.querySelector(".spotify-settings-card-body");if(Ve){let i=document.createElement("div");i.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let s=document.createElement("label");s.className="spotify-settings-label",ke=document.createElement("span"),Fe=document.createElement("div"),Fe.style.cssText="font-size:0.8em;opacity:0.6;margin-top:2px";let a=document.createElement("div");a.className="spotify-settings-row";let S=document.createElement("input");S.className="spotify-input",S.type="number",S.step="1",S.style.width="80px",Ue=S;let ne=document.createElement("button");ne.type="button",ne.className="spotify-btn spotify-btn-primary",ne.textContent="Apply",ne.style.cssText="font-size:0.85em;padding:4px 12px";let xe=()=>{let Ie=S.valueAsNumber;if(!Number.isFinite(Ie))return;J="custom",pe(Se(Math.round(Ie),H))};ne.addEventListener("click",xe),S.addEventListener("keydown",(Ie)=>{if(Ie.key!=="Enter")return;Ie.preventDefault(),xe()}),a.append(S,ne),s.append(ke,a,Fe),Ve.append(i,s)}Ze();let Qe=null;function it(){if(Qe)Qe.checked=ge}function je(){k.setBlurEnabled(ge),te.setLyricsBlur(ge),it()}if(Ve){let i=document.createElement("div");i.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let s=document.createElement("label");s.className="spotify-settings-check";let a=document.createElement("input");a.type="checkbox",a.checked=ge,Qe=a;let S=document.createElement("span");S.textContent="Lyrics blur",s.append(a,S);let ne=document.createElement("div");ne.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",ne.textContent="Depth-blurs receding lyric lines and fades new lines in through a blur. Turn off for crisp text.";let xe=document.createElement("div");xe.append(s,ne),a.addEventListener("change",()=>{ge=a.checked,je(),be()}),Ve.append(i,xe)}let X=document.createElement("div");X.className="spotify-float-widget";function Je(){X.classList.remove("spotify-float-widget-mounted"),requestAnimationFrame(()=>requestAnimationFrame(()=>X.classList.add("spotify-float-widget-mounted")))}let _e=document.createElement("div");_e.className="spotify-float-widget-legacy";let Re=document.createElement("div");Re.className="spotify-float-widget-icon",Re.innerHTML=pn;let Ne=Xe("spotify-float-widget-art");Ne.el.style.display="none",_e.append(Re,Ne.el),X.appendChild(_e);let le=!1,Be=420,He=null,te=an(t,()=>F.activate(),()=>tt(!1));X.appendChild(te.root);let re=rn(t,()=>F.activate(),()=>{let i=K.root.getBoundingClientRect();return{x:i.left,y:i.top,w:i.width,h:i.height}});re.setStyle("default");function et(){return cn({desktopPopout:o,hasPlayback:Boolean(z),viewportHeight:window.innerHeight,viewportWidth:window.innerWidth})}function Le(i=le){if(H==="modern")return i?et():{width:B,height:B};return{width:B,height:B}}function Te(i=Le()){let s=K.getPosition(),a=Math.max(mt,window.innerWidth-i.width-mt),S=Math.max(mt,window.innerHeight-i.height-mt),ne=Math.max(mt,Math.min(s.x,a)),xe=Math.max(mt,Math.min(s.y,S));if(ne!==s.x||xe!==s.y)K.moveTo(ne,xe)}function rt(i,s=!1){if(He)clearTimeout(He);let a=()=>{He=null,K.setSize(i.width,i.height)};if(s)He=setTimeout(a,Be);else a()}function ze({delaySizeRequest:i=!1}={}){let s=Le(),a=H==="modern"&&le?"pan-y":"none";if(K.root.style.touchAction=a,K.root.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)",X.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1)",X.style.touchAction=a,te.setCollapsedSize(B),H==="modern")X.classList.add("spotify-float-widget-modern-mode"),_e.style.display="none",te.root.style.display="block",K.root.style.width=`${s.width}px`,K.root.style.height=`${s.height}px`,X.style.width=`${s.width}px`,X.style.height=`${s.height}px`,X.style.borderRadius=le?"30px":`${Math.max(18,Math.round(B*0.28))}px`,rt(s,i);else{X.classList.remove("spotify-float-widget-modern-mode"),_e.style.display="flex",te.root.style.display="none";let S=Q==="circle"?"50%":"22%";K.root.style.width=`${B}px`,K.root.style.height=`${B}px`,X.style.width=`${B}px`,X.style.height=`${B}px`,X.style.borderRadius=S;let ne=Math.round(B*0.5),xe=Re.querySelector("svg");if(xe)xe.style.width=`${ne}px`,xe.style.height=`${ne}px`;rt(s)}}function tt(i){let s=le;le=i&&H==="modern",re.hide(),Te(Le(le)),te.setExpanded(le),ze({delaySizeRequest:s&&!le}),requestAnimationFrame(()=>Te(Le()))}function Ke(){if(K.root.style.display=I?"":"none",!I)re.hide(),le=!1,te.setExpanded(!1);re.update(z,I),te.update(z,I),u(z)}function u(i){let s=Ge(i?.albumArtUrl??null,i?.trackUri);Re.style.display=s?"none":"flex",Ne.el.style.display=s?"":"none",Ne.setUrl(s)}function U(i=he){if(K=e.ui.createFloatWidget({width:B,height:B,tooltip:"Subsonic",chromeless:!0}),K.root.appendChild(X),Je(),K.onDragEnd((s)=>{qe=s,Te(),be()}),ze(),Ke(),i)K.moveTo(i.x,i.y)}function ye(){pe(B)}function pe(i){re.hide(),le=!1,te.setExpanded(!1);let s=K.getPosition();qe=s,K.destroy(),B=Se(i,H),Ze(),U(s),Te(),be()}function r(i){let s=i.miniPlayerStyle==="modern"?"modern":"default",a=me(i.sizeMode)?i.sizeMode:we(i.size,s);H=s,ge=i.lyricsBlur!==!1,Q=i.shape==="squircle"?"squircle":"circle",J=a,B=a==="custom"?Se(i.size,s):ae(s)[a],re.setStyle(s),re.hide(),le=!1,te.setExpanded(!1);let S=typeof i.x==="number"&&typeof i.y==="number"?{x:i.x,y:i.y}:K.getPosition();qe=S,K.destroy(),Ze(),U(S),Te(),je()}let h=0;async function P(i,s){let a=[{key:"small",label:"Small",active:J==="small"},{key:"medium",label:"Medium",active:J==="medium"},{key:"large",label:"Large",active:J==="large"},{key:"custom",label:"Custom…",active:J==="custom"}];if(H!=="modern")a.push({key:"shape-divider",label:"",type:"divider"},{key:"circle",label:"Circle",active:Q==="circle"},{key:"squircle",label:"Squircle",active:Q==="squircle"});a.push({key:"style-divider",label:"",type:"divider"},{key:"mini-default",label:"Default Mini Player",active:H==="default"},{key:"mini-modern",label:"Modern Lyrics Mini Player",active:H==="modern"}),h+=1,re.setUiSuspended(!0),te.setAutoScrollSuspended(!0),k.setAutoScrollSuspended(!0);let S;try{({selectedKey:S}=await e.ui.showContextMenu({position:{x:i,y:s},items:a}))}finally{if(h=Math.max(0,h-1),h===0)re.setUiSuspended(!1),te.setAutoScrollSuspended(!1),k.setAutoScrollSuspended(!1)}if(!S)return;if(S==="small"||S==="medium"||S==="large")J=S,pe(ae(H)[S]);else if(S==="custom")e.events.emit("open-settings",{view:"extensions"});else if(S==="circle"||S==="squircle")Q=S,be(),ze();else if(S==="mini-default"||S==="mini-modern"){if(H=S==="mini-modern"?"modern":"default",B=J==="custom"?Se(B,H):ae(H)[J],re.setStyle(H),H!=="modern")le=!1,te.setExpanded(!1);re.hide(),be(),Ze(),ze(),Te()}}let O=!1,De={x:0,y:0},nt=5;X.addEventListener("pointerdown",(i)=>{if(O=!1,De={x:i.clientX,y:i.clientY},!re.isOpen())return;let s=null,a=()=>{if(O&&s===null)s=requestAnimationFrame(()=>{re.reposition(),s=null})},S=()=>{if(document.removeEventListener("pointermove",a),s!==null)cancelAnimationFrame(s)};document.addEventListener("pointermove",a),document.addEventListener("pointerup",S,{once:!0})}),X.addEventListener("pointermove",(i)=>{if(O)return;let s=Math.abs(i.clientX-De.x),a=Math.abs(i.clientY-De.y);if(s>nt||a>nt)O=!0}),X.addEventListener("pointerup",()=>{requestAnimationFrame(()=>Te())}),X.addEventListener("click",(i)=>{if(O){i.stopPropagation(),O=!1;return}if(i.stopPropagation(),H==="modern"){if(!le)tt(!0);return}re.toggle()}),X.addEventListener("contextmenu",(i)=>{i.preventDefault(),i.stopPropagation(),P(i.clientX,i.clientY)});let Oe=null,Ce=!1,Me={x:0,y:0};X.addEventListener("touchstart",(i)=>{Ce=!1;let s=i.touches[0];Me={x:s.clientX,y:s.clientY},Oe=setTimeout(()=>{Ce=!0,navigator.vibrate?.(50),P(s.clientX,s.clientY)},500)}),X.addEventListener("touchmove",(i)=>{if(!Oe)return;let s=i.touches[0];if(Math.abs(s.clientX-Me.x)>10||Math.abs(s.clientY-Me.y)>10)clearTimeout(Oe),Oe=null}),X.addEventListener("touchend",(i)=>{if(Oe)clearTimeout(Oe),Oe=null;if(Ce){Ce=!1;return}if(H==="modern"&&le){O=!1;return}if(!O){if(i.cancelable)i.preventDefault();if(H==="modern"){if(!le)tt(!0)}else re.toggle()}O=!1}),U(),Te(),je();let Ye=()=>{if(H==="modern"&&le){ze(),requestAnimationFrame(()=>Te(Le()));return}Te()};window.addEventListener("resize",Ye),n.push(()=>window.removeEventListener("resize",Ye)),n.push(()=>{if(He)clearTimeout(He);qe=K.getPosition(),be(),Ne.destroy(),re.destroy(),te.destroy(),K.destroy()});let We=ln(e,t);n.push(()=>We.destroy());let st=(i)=>{if(i)t({type:"get_chat_songs",chatId:i})};st(e.getActiveChat().chatId),n.push(e.events.on("CHAT_SWITCHED",(i)=>{We.reset(),st(i.chatId||null)})),n.push(e.events.on("CHARACTER_MESSAGE_RENDERED",(i)=>{let s=i.messageId;if(s)We.decorate(s)})),n.push(e.events.on("MESSAGE_SWIPED",(i)=>{let s=i.message;if(s?.id)We.setActiveSwipe(s.id,s.swipe_id||0)})),n.push(e.events.on("MESSAGE_DELETED",(i)=>{let s=i.messageId;if(s)We.removeMessage(s)}));let St=e.onBackendMessage((i)=>{let s=i;if(s.type==="__cors_proxy_response"&&s.requestId){v(s.requestId,s.error?void 0:s.result);return}let a=i;switch(a.type){case"config":if(G&&G!==a.serverUrl)f.clear();D=a.remoteControl,I=a.connected,W=a.remoteControl==="jukebox",G=a.serverUrl,A=a.username,ee=a.hasPassword,g=a.feishinUrl,x=a.feishinUsername,R=a.hasFeishinPassword,M=a.playbackPositionOffsetMs,_=a.jukeboxUnavailableReason,b.update(a.connected,a.serverUrl,a.username,a.hasPassword,a.remoteControl,a.feishinUrl,a.feishinUsername,a.hasFeishinPassword,a.playbackPositionOffsetMs,a.jukeboxUnavailableReason),L.setAvailable(!0),L.setPlaybackAvailable(a.remoteControl==="jukebox"),Y.update(z,I,a.remoteControl!=="none",a.remoteControl==="feishin"?"Feishin Controls":"Jukebox Controls"),Ke();break;case"widget_preferences":if(a.preferences&&!Ee)r(a.preferences);else if(!a.preferences&&!Ee&&Pe)t({type:"set_widget_preferences",preferences:Pe});else if(!a.preferences&&!Ee)be();break;case"state":if(I=a.connected,z=a.playbackState,j.update(z,I),Y.update(z,I,D!=="none",D==="feishin"?"Feishin Controls":"Jukebox Controls"),k.updatePlayback(z),z?.trackUri&&z.trackUri!==Z)Z=z.trackUri,k.setLoading(!0,z),re.setLyricsLoading(!0),te.setLyricsLoading(!0),t({type:"get_lyrics"});else if(!z)Z=null,k.clear(),re.updateLyrics(null,null,null,!1),te.updateLyrics(null,null,null,!1);Ke();let S=Ge(z?.albumArtUrl??null,z?.trackUri),ne=z?.albumArtKey||S;if(S!==l)if(l=S,S){C();let Ie=ne&&a.albumPalette?.artworkKey===ne?a.albumPalette.colors:f.get(ne||"");if(ne&&Ie)N(ne,Ie),t({type:"album_colors",colors:Ie,artworkKey:ne});else{let vt=++p;E(S).then((at)=>{if(vt!==p||S!==l)return;if(at){if(ne)N(ne,at);t({type:"album_colors",colors:at,artworkKey:ne})}else if(!I)w()})}}else if(I)T();else w();break;case"connected":I=!0,Ke(),t({type:"get_config"}),t({type:"get_state"});break;case"disconnected":I=!1,z=null,Z=null,W=!1,L.setAvailable(!0),L.setPlaybackAvailable(D==="jukebox"),l=null,f.clear(),w(),j.update(null,!1),Y.update(null,!1,!1),k.clear(),re.updateLyrics(null,null,null,!1),te.updateLyrics(null,null,null,!1),Ke();break;case"search_results":L.setResults(a.results);break;case"chat_songs":We.setChatSongs(a.chatId,a.entries);break;case"message_song":We.setMessageSong(a.chatId,a.messageId,a.swipeId,a.snapshot);break;case"lyrics":if(!Z||a.trackUri===Z)k.update(a.trackUri,a.plainLyrics,a.syncedLyrics,a.instrumental),k.updatePlayback(z),re.updateLyrics(a.trackUri,a.plainLyrics,a.syncedLyrics,a.instrumental),te.updateLyrics(a.trackUri,a.plainLyrics,a.syncedLyrics,a.instrumental);break;case"error":if(a.operation==="connect"||a.authenticationFailure)b.setError(a.message);console.warn("[Subsonic Controls]",a.message);break}});n.push(St);let Ut=(i)=>{if(i.detail?.extensionId!==e.manifest.identifier)return;t({type:"get_config"}),t({type:"get_state"})};window.addEventListener("spindle:desktop-widget-returned",Ut),n.push(()=>window.removeEventListener("spindle:desktop-widget-returned",Ut)),e.permissions.getGranted().then((i)=>{let s=["cors_proxy","ui_panels","app_manipulation","generation","chat_mutation"].filter((a)=>!i.includes(a));if(s.length)e.permissions.request(s,{reason:"Subsonic Controls needs CORS access for your server, a panel and album-art theme support, plus Generation and Chat Mutation to remember the song playing for each assistant reply."})});let yn=e.events.on("SPINDLE_PERMISSION_CHANGED",(i)=>{let s=i;if(s.extensionId!==e.manifest.identifier||s.permission!=="cors_proxy")return;if(s.granted){t({type:"get_config"}),t({type:"get_state"});return}I=!1,z=null,Z=null,W=!1,l=null,f.clear(),w(),b.update(!1,"","",!1,"none","","",!1,M,null),j.update(null,!1),Y.update(null,!1,!1),k.clear(),Ke()});return n.push(yn),n.push(()=>{C(),p+=1;for(let[i,s]of m)clearTimeout(s.timer),s.resolve(null),m.delete(i)}),t({type:"get_config"}),t({type:"get_state"}),t({type:"get_widget_preferences"}),()=>{for(let i of n)i()}}function Fn(e,n={}){let o={...n},t={componentId:`desktop-widget-detached-${crypto.randomUUID()}`,element:e instanceof HTMLElement?e:document.createElement("div"),update(l){o={...o,...l}},destroy(){},getValue(){if("checked"in o)return o.checked;return o.value},focus(){},blur(){}};return new Proxy(t,{get(l,p,d){if(p==="then")return;if(Reflect.has(l,p))return Reflect.get(l,p,d);return()=>{return}}})}function fn(e){let n=new Set,o=!1,t=()=>{let f=document.createElement("div");return n.add(f),f},l=(f)=>f instanceof Element&&[...n].some((c)=>c===f||c.contains(f)),p=new Proxy(e.components,{get(f,c,m){let y=Reflect.get(f,c,m);if(typeof y!=="function"||!String(c).startsWith("mount"))return y;return(v,C)=>{if(!o||l(v))return Fn(v,C);return Reflect.apply(y,f,[v,C])}}}),d=new Proxy(e.ui,{get(f,c,m){if(c==="mount")return()=>t();if(c==="createFloatWidget"){let y=Reflect.get(f,c,m);return(...v)=>(o=!0,Reflect.apply(y,f,v))}if(c==="registerDrawerTab")return(y)=>({root:t(),tabId:y.id||"desktop-widget-detached",setTitle(){},setShortName(){},setBadge(){},activate(){},destroy(){},onActivate(){return()=>{}}});return Reflect.get(f,c,m)}});return new Proxy(e,{get(f,c,m){if(c==="components")return p;if(c==="ui")return d;return Reflect.get(f,c,m)}})}function Pi(e,n){return un(fn(e))}export{Pi as setupWidget};
