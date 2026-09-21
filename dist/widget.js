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

`;function Gt(e){let n=document.createElement("section");n.className="spotify-settings-card";let o=document.createElement("header");o.className="spotify-settings-card-header";let t=document.createElement("h3");t.textContent="Subsonic Controls";let a=document.createElement("span");a.className="spotify-status",o.append(t,a);let p=document.createElement("div");p.className="spotify-settings-card-body";let d=(A,ee,g)=>{let x=document.createElement("label");x.className="spotify-settings-label";let R=document.createTextNode(A);x.append(R);let M=document.createElement("input");return M.className="spotify-input",M.type=ee,M.placeholder=g,x.append(M),p.append(x),M},f=d("Subsonic server URL","url","https://music.example.com (or …/rest)"),c=d("Subsonic username","text","Subsonic username"),m=d("Subsonic password","password","Subsonic password"),y=d("Playback position offset (ms)","number","1000");y.min="-10000",y.max="10000",y.step="100";let v=document.createElement("div");v.style.cssText="font-size:0.8em;opacity:0.65;margin-top:-6px",v.textContent="Adds time to the server's reported playback position for synchronized lyrics. Default: 1000 ms; use a negative value if lyrics run ahead.",p.append(v);let C=document.createElement("label");C.className="spotify-settings-label",C.append("Playback controls");let w=document.createElement("select");w.className="spotify-input";for(let[A,ee]of[["none","Now playing only"],["jukebox","Server-side Jukebox"],["feishin","Feishin Desktop Remote"]]){let g=document.createElement("option");g.value=A,g.textContent=ee,w.append(g)}C.append(w),p.append(C);let N=document.createElement("div");N.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",N.textContent="Jukebox controls affect the server-side player.",p.append(N);let T=document.createElement("div");T.style.cssText="display:none;font-size:0.8em;color:#e74c3c;margin-top:4px",p.append(T);let E=document.createElement("div");E.style.display="none";let O=(A,ee,g)=>{let x=document.createElement("label");x.className="spotify-settings-label",x.append(A);let R=document.createElement("input");return R.className="spotify-input",R.type=ee,R.placeholder=g,x.append(R),E.append(x),R},b=O("Feishin Remote URL","url","http://192.168.1.20:4333"),q=O("Feishin username","text","Optional Remote username"),F=O("Feishin password","password","Optional Remote password"),ne=document.createElement("div");ne.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",ne.textContent="Feishin Remote requires WebSocket transport; its HTTP server only serves the Remote page and credentials. Library search and lyrics still use the Subsonic server above.",E.append(ne),p.append(E);let se=document.createElement("div");se.className="spotify-settings-row";let V=document.createElement("button");V.className="spotify-btn spotify-btn-primary",se.append(V),p.append(se),n.append(o,p);let j=!1,Y=!1,L=!1,k=!1,I=!1,z=[f,c,m,y,w,b,q,F];for(let A of z)A.addEventListener("input",()=>{L=!0});function Z(A,ee,g=!1){a.replaceChildren();let x=document.createElement("span");x.className=`spotify-status-dot ${ee?"connected":"disconnected"}`;let R=document.createElement("span");if(R.textContent=A,g)R.style.color="#e74c3c";a.append(x,R)}function W(){let A=w.value==="feishin";E.style.display=A?"":"none",N.style.display=w.value==="jukebox"?"":"none",T.style.display=w.value==="jukebox"&&T.textContent?"":"none"}w.onchange=()=>{L=!0,W()};function G(A,ee,g,x,R,M,_,ie,fe,de){if(j=A,k=x,I=ie,A||!Y&&!L)f.value=ee,c.value=g,b.value=M,q.value=_,y.value=String(fe),w.value=R;if(T.textContent=de||"",W(),Y&&!A)return;for(let We of[f,c,m,w,b,q,F])We.disabled=A;if(A)Y=!1,L=!1,m.value="",F.value="";m.placeholder=x?"Saved securely (re-enter to change)":"Subsonic password",F.placeholder=ie?"Saved securely (re-enter to change)":"Optional Remote password",V.textContent=A?"Disconnect":"Connect",V.className=A?"spotify-btn spotify-btn-danger":"spotify-btn spotify-btn-primary",V.disabled=!1,Z(A?"Connected":"Not connected",A)}return V.onclick=()=>{if(j)return void e({type:"disconnect"});let A=w.value;if(!f.value.trim()||!c.value.trim()||!m.value&&!k||A==="feishin"&&!b.value.trim()){Z("Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.",!1,!0);return}Y=!0,V.disabled=!0,V.textContent="Connecting…",e({type:"connect",serverUrl:f.value.trim(),username:c.value.trim(),password:m.value,remoteControl:A,feishinUrl:b.value.trim(),feishinUsername:q.value.trim(),feishinPassword:F.value,playbackPositionOffsetMs:Number(y.value)})},y.onchange=()=>{let A=Number(y.value);if(!Number.isFinite(A))return;if(y.value=String(Math.max(-1e4,Math.min(1e4,Math.round(A)))),j)e({type:"set_playback_position_offset",playbackPositionOffsetMs:Number(y.value)})},G(!1,"","",!1,"none","","",!1,1000,null),{root:n,update:G,setConnecting(){Y=!0,V.disabled=!0,V.textContent="Connecting…"},setError(A){j=!1,Y=!1,V.disabled=!1,V.textContent="Connect",V.className="spotify-btn spotify-btn-primary";for(let ee of[f,c,m,w,b,q,F])ee.disabled=!1;m.placeholder=k?"Saved securely (re-enter to change)":"Subsonic password",F.placeholder=I?"Saved securely (re-enter to change)":"Optional Remote password",Z(A,!1,!0)},destroy(){n.remove()}}}function Ye(e,n){if(!e)return null;if(!n)return e;if(/^(data|blob):/i.test(e))return e;try{let o=new URL(e);return o.searchParams.set("track",n),o.toString()}catch{let o=e.includes("?")?"&":"?";return`${e}${o}track=${encodeURIComponent(n)}`}}function Ge(e){let n=document.createElement("div");n.className=`${e} spotify-crossfade-art`,n.style.display="none";let o=document.createElement("img"),t=document.createElement("img");o.className="spotify-crossfade-img",t.className="spotify-crossfade-img",o.alt="",t.alt="",o.loading="eager",t.loading="eager",o.decoding="async",t.decoding="async",o.style.visibility="hidden",t.style.visibility="hidden",o.style.opacity="1",t.style.opacity="0",n.appendChild(o),n.appendChild(t);let a=null,p=o,d=t,f=!1;function c(v){v.onload=null,v.onerror=null,v.removeAttribute("src"),v.style.visibility="hidden"}function m(){n.style.display="none",p.style.opacity="1",d.style.opacity="0"}function y(v){if(v===a)return;if(a=v,!v){c(p),c(d),f=!1,m();return}if(!f){if(n.style.display="",p.onload=()=>{f=!0,p.style.visibility="visible"},p.onerror=()=>{a=null,c(p),m()},p.src=v,p.complete&&p.naturalWidth>0)f=!0,p.style.visibility="visible";return}if(n.style.display="",d.onload=()=>{d.style.visibility="visible",d.style.opacity="1",p.style.opacity="0";let C=p;p=d,d=C},d.onerror=()=>{a=null,c(d),d.style.opacity="0"},d.src=v,d.complete&&d.naturalWidth>0){d.style.visibility="visible",d.style.opacity="1",p.style.opacity="0";let C=p;p=d,d=C}}return{el:n,setUrl:y,destroy(){n.remove()}}}function Xt(){let e=document.createElement("div");e.className="spotify-section";let n=document.createElement("h3");n.className="spotify-section-title",n.textContent="Now Playing";let o=document.createElement("div");o.className="spotify-now-playing";let t=Ge("spotify-album-art"),a=document.createElement("div");a.className="spotify-track-info";let p=document.createElement("div");p.className="spotify-track-name";let d=document.createElement("div");d.className="spotify-track-artist";let f=document.createElement("div");f.className="spotify-track-album";let c=document.createElement("div");c.className="spotify-track-device",a.append(p,d,f,c),o.append(t.el,a);let m=document.createElement("div");return m.className="spotify-empty",e.append(n,o,m),{root:e,update(y,v){if(!v){o.style.display="none",m.style.display="",m.textContent="Connect a music source to get started",t.setUrl(null);return}if(!y){o.style.display="none",m.style.display="",m.textContent="No active playback reported",t.setUrl(null);return}o.style.display="flex",m.style.display="none",p.textContent=y.trackName,d.textContent=y.artistName,f.textContent=y.albumName,c.textContent=y.source==="jukebox"?"Server Jukebox":y.source==="feishin"?"Feishin Desktop":y.deviceName?`Playing on ${y.deviceName}`:"Server now playing",t.setUrl(Ye(y.albumArtUrl,y.trackUri))},destroy(){t.destroy(),e.remove()}}}function Jt(e){let n=document.createElement("div");n.className="spotify-section";let o=document.createElement("h3");o.className="spotify-section-title",o.textContent="Player Controls";let t=document.createElement("div");t.className="spotify-controls";let a=(m,y="")=>{let v=document.createElement("button");return v.className=`spotify-ctrl-btn ${y}`,v.innerHTML=m,v},p=a('<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>'),d=a('<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',"spotify-ctrl-btn-main"),f=a('<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>');p.onclick=()=>e({type:"previous"}),f.onclick=()=>e({type:"next"});let c=!1;return d.onclick=()=>e({type:c?"pause":"play"}),t.append(p,d,f),n.append(o,t),{root:n,update(m,y,v,C="Player Controls"){n.style.display=y&&v?"":"none",o.textContent=C,c=!!m?.isPlaying,d.innerHTML=c?'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'},destroy(){n.remove()}}}function Kt(e){let n=document.createElement("div");n.className="spotify-section";let o=document.createElement("h3");o.className="spotify-section-title",o.textContent="Library Search";let t=document.createElement("input");t.className="spotify-search-input",t.placeholder="Search your server's music library…";let a=document.createElement("div");a.className="spotify-search-results",n.append(o,t,a);let p=null,d=!0;return t.oninput=()=>{if(p)clearTimeout(p);p=setTimeout(()=>{let c=t.value.trim();if(c.length>=2)e({type:"search",query:c});else a.innerHTML=""},350)},{root:n,setResults:(c)=>{if(a.innerHTML="",!c.length){let m=document.createElement("div");m.className="spotify-empty",m.textContent="No tracks found",a.appendChild(m);return}for(let m of c){let y=document.createElement("div");if(y.className="spotify-search-item",m.albumArtUrl){let N=document.createElement("img");N.className="spotify-search-item-art",N.src=m.albumArtUrl,N.alt=m.album,y.appendChild(N)}let v=document.createElement("div");v.className="spotify-search-item-info";let C=document.createElement("div");C.className="spotify-search-item-name",C.textContent=m.name;let w=document.createElement("div");if(w.className="spotify-search-item-artist",w.textContent=`${m.artist} — ${m.album}`,v.append(C,w),d){let N=document.createElement("div");N.className="spotify-search-item-actions";let T=document.createElement("button");T.className="spotify-search-item-btn",T.title="Play in server Jukebox",T.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',T.onclick=()=>e({type:"play",trackUri:m.uri});let E=document.createElement("button");E.className="spotify-search-item-btn",E.title="Add to server Jukebox queue",E.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>',E.onclick=()=>e({type:"queue",trackUri:m.uri}),N.append(T,E),y.append(v,N)}else y.append(v);a.appendChild(y)}},setAvailable(c){if(n.style.display=c?"":"none",!c)a.innerHTML=""},setPlaybackAvailable(c){d=c,a.innerHTML=""},destroy(){if(p)clearTimeout(p);n.remove()}}}function wt(e){let n=null,o=null,t=null,a=0,p=!1,d=0;function f(w){let N=e.getBoundingClientRect(),T=w.getBoundingClientRect(),E=Math.max(0,e.scrollHeight-e.clientHeight);return Math.min(Math.max(e.scrollTop+(T.top+T.height/2)-(N.top+e.clientHeight/2),0),E)}function c(){if(n!==null)cancelAnimationFrame(n);n=null,o=null}function m(){c(),t=null,a=Date.now()}function y(){c(),t=null}function v(w){if(n=null,o===null||!o.isConnected||!e.isConnected){c();return}let N=Math.min(Math.max(w-d,0),100);d=w;let T=Math.max(0,e.scrollHeight-e.clientHeight),E=f(o),O=E-e.scrollTop;if(Math.abs(O)<0.5){t=E,e.scrollTop=E,c();return}let b=O*(1-Math.exp(-N/85)),q=1800*(N/1000),F=Math.abs(b)>q?Math.sign(b)*q:b,ne=Math.min(Math.max(e.scrollTop+F,0),T);t=ne,e.scrollTop=ne,n=requestAnimationFrame(v)}e.addEventListener("wheel",m,{passive:!0}),e.addEventListener("touchmove",m,{passive:!0}),e.addEventListener("pointerdown",m,{passive:!0});function C(){if(n!==null||o!==null)return;if(t!==null&&Math.abs(e.scrollTop-t)<=1)return;m()}return e.addEventListener("scroll",C,{passive:!0}),{center(w,N){if(p)return;if(!N?.force&&Date.now()-a<=2500)return;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){c(),t=f(w),e.scrollTop=t;return}if(o=w,n===null)d=performance.now(),n=requestAnimationFrame(v)},suspend(w){if(p===w)return!1;if(p=w,p)y();return!0},cancel:y,destroy(){y(),e.removeEventListener("wheel",m),e.removeEventListener("touchmove",m),e.removeEventListener("pointerdown",m),e.removeEventListener("scroll",C)}}}function hn(e){let n=/^(\d+):(\d{2})(?:\.(\d{1,3}))?$/.exec(e);if(!n)return null;let o=Number(n[1]),t=Number(n[2]),a=n[3]?Number(n[3].padEnd(3,"0")):0;if(!Number.isFinite(o)||!Number.isFinite(t)||t>59)return null;return o*60000+t*1000+a}function ct(e){if(!e)return[];let n=[];for(let t of e.split(/\r?\n/)){let a=[...t.matchAll(/\[([^\]]+)\]/g)].map((d)=>hn(d[1])).filter((d)=>d!==null);if(a.length===0)continue;let p=t.replace(/(?:\[[^\]]+\])+/g,"").trim();for(let d of a)n.push({timeMs:d,text:p})}let o=[];for(let t of n.sort((a,p)=>a.timeMs-p.timeMs)){let a=o[o.length-1];if(a?.timeMs===t.timeMs)a.text=[a.text,t.text].filter(Boolean).join(`
`);else o.push({...t})}return o}function Et(e){return e||"♪"}function Zt(e){return!e.includes(`
`)&&e.length>=36}function kt(e){let n=[],o=null,t=-1;function a(){if(!o)return 0;if(!o.isPlaying)return o.progressMs;return Math.min(o.progressMs+Date.now()-o.updatedAt,o.durationMs||1/0)}function p(){if(n.length===0){let v=t!==-1;return t=-1,v}let c=a(),m=-1;for(let v=0;v<n.length;v++){if(n[v].timeMs>c)break;m=v}let y=m!==t;return t=m,y}function d(){let c=n.map((y,v)=>({...y,index:v,displayText:Et(y.text),hasText:Boolean(y.text)}));if(!e||c.length<=e)return c;if(t<0)return c.slice(0,e);let m=Math.max(0,Math.min(t-Math.floor(e/2),c.length-e));return c.slice(m,m+e)}function f(){return n.map((c,m)=>({...c,index:m,displayText:Et(c.text),hasText:Boolean(c.text)}))}return{clear(){n=[],o=null,t=-1},setLyrics(c){n=c,t=-1,p()},setPlayback(c){o=c},refreshActiveLineIndex:p,getActiveLineIndex(){return t},hasLyrics(){return n.length>0},getIndexedLines:f,getSnapshot(){return p(),{activeLineIndex:t,lines:d()}}}}var vn=180;function Qt(e,n,o,t){let a=["spotify-lyrics-line"];if(!o)a.push("spotify-lyrics-line-blank");if(e===n)a.push("spotify-lyrics-line-active");else if(e<n)a.push("spotify-lyrics-line-past");else a.push("spotify-lyrics-line-future");if(n>=0){let p=Math.abs(e-n);if(p>=1){let d=Math.min(p,4);if(a.push(`spotify-lyrics-line-tier-${d}`),t&&d>=2)a.push(`spotify-lyrics-line-blur-${d}`)}}return a.join(" ")}function en(){let e=document.createElement("div");e.className="spotify-section spotify-lyrics-section",e.dataset.transport="false";let n=document.createElement("h3");n.className="spotify-section-title",n.textContent="Lyrics";let o=document.createElement("div");o.className="spotify-lyrics-body",e.append(n,o);let t=null,a=[],p=kt(),d=wt(o),f=null,c=-1,m=!0,y,v;function C(L){return L?.source==="feishin"||L?.source==="jukebox"}function w(){clearTimeout(v),v=void 0,o.classList.remove("spotify-lyrics-loading")}function N(){clearInterval(y),y=void 0}function T(){a.forEach((L)=>{let k=p.getIndexedLines()[L.index];L.el.className=Qt(L.index,c,k?.hasText??!1,m)})}function E(){if(m)e.style.removeProperty("--spotify-lyrics-enter-blur");else e.style.setProperty("--spotify-lyrics-enter-blur","0px")}function O(L,k=!1){c=L,T();let I=a.find((z)=>z.index===c);if(I)d.center(I.textEl,{force:k})}function b(L=!1){if(!a.length)return;if(p.refreshActiveLineIndex()||L)O(p.getActiveLineIndex(),L)}function q(){if(!y&&a.length)y=setInterval(b,200)}function F(){N(),d.cancel(),w(),o.innerHTML="",o.className="spotify-lyrics-body",t=null,a=[],p.clear(),f=null,c=-1,e.dataset.transport="false"}function ne(L,k){if(w(),!L)return;if(N(),d.cancel(),o.innerHTML="",o.className="spotify-lyrics-body spotify-lyrics-loading",t=k?.trackUri??t,a=[],p.setLyrics([]),k&&k.trackUri===t)f={trackUri:k.trackUri,progressMs:k.progressMs,durationMs:k.durationMs,isPlaying:k.isPlaying,updatedAt:Date.now()},p.setPlayback(f);else f=null,p.setPlayback(null);c=-1,v=setTimeout(()=>{if(!o.classList.contains("spotify-lyrics-loading"))return;let I=document.createElement("div");I.className="spotify-lyrics-status spotify-lyrics-status-loading",I.textContent="Loading lyrics...",o.appendChild(I)},vn)}function se(L){let k=ct(L);if(!k.length)return!1;w(),o.className="spotify-lyrics-body spotify-lyrics-has-content spotify-lyrics-synced",p.setLyrics(k);let I=p.getSnapshot();if(c=I.activeLineIndex,a=I.lines.map((z,Z)=>{let W=document.createElement("div"),G=document.createElement("div");if(W.className=Qt(z.index,c,z.hasText,m),W.classList.add("spotify-lyrics-line-enter"),W.style.setProperty("--spotify-lyrics-enter-delay",`${Math.min(Z*28,280)}ms`),G.className="spotify-lyrics-line-text",!z.hasText)G.classList.add("spotify-lyrics-line-symbol");if(Zt(z.text))G.classList.add("spotify-lyrics-line-text-long");return G.textContent=Et(z.text),W.appendChild(G),o.appendChild(W),{index:z.index,el:W,textEl:G}}),b(),f?.isPlaying)q();return!0}function V(L){w(),o.className="spotify-lyrics-body spotify-lyrics-has-content";let k=document.createElement("div");k.className="spotify-lyrics-text spotify-lyrics-text-enter",k.textContent=L,o.appendChild(k)}function j(L,k,I,z){if(N(),d.cancel(),w(),t=L,o.innerHTML="",a=[],c=-1,z)o.className="spotify-lyrics-body",o.textContent="♪ Instrumental";else if(!se(I||""))if(k)V(k);else o.className="spotify-lyrics-body",o.textContent="No lyrics available"}function Y(L){let k=String(C(L)),I=e.dataset.transport!==k;if(e.dataset.transport=k,!L||L.trackUri!==t){f=null,p.setPlayback(null),N();return}if(f={trackUri:L.trackUri,progressMs:L.progressMs,durationMs:L.durationMs,isPlaying:L.isPlaying,updatedAt:Date.now()},p.setPlayback(f),b(),L.isPlaying)q();else N();if(I&&a.length)requestAnimationFrame(()=>b(!0))}return{root:e,update:j,updatePlayback:Y,setLoading:ne,setAutoScrollSuspended(L){if(d.suspend(L)&&!L&&a.length)O(c,!0)},setBlurEnabled(L){if(m===L)return;m=L,E(),T()},clear:F,destroy(){N(),d.destroy(),w(),e.remove()}}}function Lt(e,n){let o=!1;function t(E){if(o===E)return;o=E,n.onInteractChange?.(E)}function a(E){if(n.stopPropagation)E.stopPropagation()}function p(){return Number.parseInt(e.value,10)}let d=(E)=>{a(E),t(!0)},f=(E)=>{a(E)},c=(E)=>{a(E),t(!1)},m=(E)=>{a(E),t(!0)},y=(E)=>{a(E)},v=(E)=>{a(E),t(!1)},C=(E)=>{a(E)},w=(E)=>{a(E),t(!0),n.onPreview?.(p())},N=(E)=>{a(E);let O=p();n.onPreview?.(O),n.onCommit(O),t(!1)},T=()=>{t(!1)};return e.addEventListener("pointerdown",d),e.addEventListener("pointermove",f),e.addEventListener("pointerup",c),e.addEventListener("touchstart",m,{passive:!0}),e.addEventListener("touchmove",y,{passive:!0}),e.addEventListener("touchend",v,{passive:!0}),e.addEventListener("click",C),e.addEventListener("input",w),e.addEventListener("change",N),e.addEventListener("blur",T),e.addEventListener("pointercancel",T),e.addEventListener("lostpointercapture",T),()=>{e.removeEventListener("pointerdown",d),e.removeEventListener("pointermove",f),e.removeEventListener("pointerup",c),e.removeEventListener("touchstart",m),e.removeEventListener("touchmove",y),e.removeEventListener("touchend",v),e.removeEventListener("click",C),e.removeEventListener("input",w),e.removeEventListener("change",N),e.removeEventListener("blur",T),e.removeEventListener("pointercancel",T),e.removeEventListener("lostpointercapture",T)}}function Ct(e,n){let o=!1,t=null,a=0;function p(b){if(o===b)return;o=b,n.onInteractChange?.(b)}function d(b){if(n.stopPropagation)b.stopPropagation()}function f(b){let q=n.getMaxValue();if(!Number.isFinite(q)||q<=0)return null;let F=e.getBoundingClientRect();if(F.width<=0)return null;let ne=Math.max(0,Math.min(1,(b-F.left)/F.width));return Math.round(ne*q)}function c(b){let q=f(b);if(q===null)return null;return a=q,n.onPreview(q),q}function m(b){if(t!==null&&e.hasPointerCapture(t))e.releasePointerCapture(t);if(t=null,b)n.onCommit(a);p(!1)}let y=(b)=>{if(d(b),b.button!==0)return;if(c(b.clientX)===null)return;t=b.pointerId,p(!0);try{e.setPointerCapture(b.pointerId)}catch{}},v=(b)=>{if(d(b),b.pointerId!==t)return;c(b.clientX)},C=(b)=>{if(d(b),b.pointerId!==t)return;c(b.clientX),m(!0)},w=(b)=>{if(d(b),b.pointerId!==t)return;m(!1)},N=(b)=>{d(b),b.preventDefault()},T=(b)=>{d(b)},E=(b)=>{d(b)},O=(b)=>{d(b)};return e.addEventListener("pointerdown",y),e.addEventListener("pointermove",v),e.addEventListener("pointerup",C),e.addEventListener("pointercancel",w),e.addEventListener("click",N),e.addEventListener("touchstart",T,{passive:!0}),e.addEventListener("touchmove",E,{passive:!0}),e.addEventListener("touchend",O,{passive:!0}),()=>{e.removeEventListener("pointerdown",y),e.removeEventListener("pointermove",v),e.removeEventListener("pointerup",C),e.removeEventListener("pointercancel",w),e.removeEventListener("click",N),e.removeEventListener("touchstart",T),e.removeEventListener("touchmove",E),e.removeEventListener("touchend",O)}}var bn='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',tn='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',xn='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',wn='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',En='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',kn='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',Ln='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',Cn='<svg viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>',nn="♪";function pt(e){let n=Math.floor(e/1000),o=Math.floor(n/60),t=n%60;return`${o}:${t.toString().padStart(2,"0")}`}var on=280,Mn=336,ue=8;function Tt(e){return e==="modern"?Mn:on}function Sn(e){if(!e)return[];return e.split(/\r?\n/).map((n)=>n.trim()).filter(Boolean).slice(0,5)}function rn(e,n,o){let t=document.createElement("div");t.className="spotify-mini-player",t.dataset.style="default",t.style.setProperty("--spotify-mini-player-width",`${on}px`);let a=Ge("spotify-mini-art"),p=document.createElement("div");p.className="spotify-mini-info";let d=document.createElement("div");d.className="spotify-mini-track";let f=document.createElement("div");f.className="spotify-mini-artist";let c=document.createElement("div");c.className="spotify-mini-album",p.appendChild(d),p.appendChild(f),p.appendChild(c);let m=document.createElement("button");m.className="spotify-mini-header-btn",m.innerHTML=kn,m.title="Open full player";let y=document.createElement("button");y.className="spotify-mini-header-btn",y.innerHTML=Ln,y.title="Collapse";let v=document.createElement("div");v.className="spotify-mini-header-btns",v.appendChild(m),v.appendChild(y);let C=document.createElement("div");C.className="spotify-mini-progress-row";let w=document.createElement("span");w.className="spotify-mini-time";let N=document.createElement("div");N.className="spotify-mini-progress-bar";let T=document.createElement("div");T.className="spotify-mini-progress-fill",N.appendChild(T);let E=document.createElement("span");E.className="spotify-mini-time",C.appendChild(w),C.appendChild(N),C.appendChild(E);let O=document.createElement("div");O.className="spotify-mini-controls";function b(r,h=""){let P=document.createElement("button");return P.className=`spotify-mini-btn ${h}`.trim(),P.innerHTML=r,P}let q=b(bn),F=b(tn,"spotify-mini-btn-main"),ne=b(wn);O.appendChild(q),O.appendChild(F),O.appendChild(ne);let se=document.createElement("div");se.className="spotify-mini-volume-row";let V=document.createElement("span");V.className="spotify-mini-volume-icon",V.innerHTML=En;let j=document.createElement("input");j.type="range",j.className="spotify-mini-volume-slider",j.min="0",j.max="100",j.value="50",se.appendChild(V),se.appendChild(j);let Y=document.createElement("div");Y.className="spotify-mini-device-row";let L=document.createElement("span");L.className="spotify-mini-device-icon",L.innerHTML=Cn;let k=document.createElement("span");k.className="spotify-mini-device-name";let I=document.createElement("button");I.className="spotify-mini-device-toggle",I.textContent="Switch",Y.appendChild(L),Y.appendChild(k),Y.appendChild(I);let z=document.createElement("div");z.className="spotify-mini-device-list";let Z=document.createElement("div");Z.className="spotify-mini-empty",Z.textContent="No active playback";let W=document.createElement("div");W.className="spotify-mini-header",W.appendChild(a.el),W.appendChild(p),W.appendChild(v),t.appendChild(W),t.appendChild(C);let G=document.createElement("div");G.className="spotify-mini-lyrics-section";let A=document.createElement("div");A.className="spotify-mini-lyrics-header",A.textContent="Lyrics";let ee=document.createElement("div");ee.className="spotify-mini-lyrics-body";let g=document.createElement("div");g.className="spotify-mini-lyrics-status";let x=Array.from({length:5},()=>{let r=document.createElement("div");return r.className="spotify-mini-lyric-line",ee.appendChild(r),r});ee.appendChild(g),G.appendChild(A),G.appendChild(ee),t.appendChild(G),t.appendChild(O),t.appendChild(se),t.appendChild(Y),t.appendChild(z),t.appendChild(Z);let R=!1,M=0,_=!1,ie=0,fe="default",de=null,We=!1,ce=0,ze=0,ae=!1,he=null,Ie=null,me=[],we=[],B=!1,Q=!1,J=-1,H=!1,ve=!1,be=!1,Se=null,K=null,De=null,Ee=!1,xe=!1;function ke(r,h=!1){g.className=h?"spotify-mini-lyrics-status spotify-mini-lyrics-status-loading":"spotify-mini-lyrics-status",g.textContent=r,g.style.display="";for(let P of x)P.style.display="none",P.textContent="",P.className="spotify-mini-lyric-line"}function qe(){g.style.display="none";for(let r of x)r.style.display=""}function Ae(){if(!ve||H)return;ve=!1,$e(!0)}function Ze(){if(be)return;let r=Se,h=K,P=De;if(Se=null,K=null,De=null,r)tt(r.state,r.connected);if(h)ye(h);if(P!==null)pe(P);Ae()}function Ve(){if(!ae)return ce;return Math.min(ce+Math.max(0,Date.now()-ze),M||1/0)}function Qe(){if(me.length===0)return[];let h=[];if(J<0)for(let P=0;P<Math.min(5,me.length);P++){let D=me[P];h.push({text:D.text||nn,index:P})}else{let P=Math.max(0,Math.min(J-2,me.length-5));for(let D=0;D<5&&P+D<me.length;D++){let He=P+D,nt=me[He];h.push({text:nt.text||nn,index:He})}}while(h.length<5)h.push({text:" ",index:-1-h.length});return h}function it(){if(Q){ke("Loading lyrics...",!0);return}if(B){ke("♪ Instrumental");return}if(me.length>0){qe();let r=Qe();x.forEach((h,P)=>{let D=r[P]??{text:" ",index:-1-P},He=J<0?D.index:Math.abs(D.index-J);if(h.className="spotify-mini-lyric-line",D.index===J)h.classList.add("spotify-mini-lyric-line-active");else if(He===1)h.classList.add("spotify-mini-lyric-line-near");else if(He===2)h.classList.add("spotify-mini-lyric-line-mid");else h.classList.add("spotify-mini-lyric-line-far");h.textContent=D.text});return}if(we.length>0){qe(),x.forEach((r,h)=>{r.className="spotify-mini-lyric-line spotify-mini-lyric-line-plain",r.textContent=we[h]??" "});return}ke("No lyrics available")}function $e(r=!1){if(H){ve=!0;return}if(fe!=="modern"||me.length===0||!de||de.trackUri!==Ie){if(r&&fe==="modern")it();return}let h=Ve(),P=-1;for(let D=0;D<me.length;D++){if(me[D].timeMs>h)break;P=D}if(r||P!==J)J=P,it()}function X(r=!1){let h=fe==="modern"&&We&&Boolean(de);if(G.style.display=h?"":"none",!h)return;if(H){ve=!0;return}if($e(!0),r&&_)Le()}function Xe(){if(be||!_||!ae||!M){he=null;return}if(Ee){he=requestAnimationFrame(Xe);return}let r=Date.now()-ze,h=Math.min(ce+r,M),P=h/M*100;T.style.width=`${P}%`,w.textContent=pt(h),$e(),he=requestAnimationFrame(Xe)}function Ue(){if(he!==null)return;he=requestAnimationFrame(Xe)}function _e(){if(he!==null)cancelAnimationFrame(he),he=null}function Pe(){return de?.source==="feishin"||de?.source==="jukebox"}q.addEventListener("click",(r)=>{if(r.stopPropagation(),!Pe())return;e({type:"previous"})}),ne.addEventListener("click",(r)=>{if(r.stopPropagation(),!Pe())return;e({type:"next"})}),F.addEventListener("click",(r)=>{if(r.stopPropagation(),!Pe())return;e({type:R?"pause":"play"})}),m.addEventListener("click",(r)=>{r.stopPropagation(),Te(),n()}),y.addEventListener("click",(r)=>{r.stopPropagation(),Te()});let le=Ct(N,{getMaxValue:()=>M,onInteractChange(r){Ee=r},onPreview(r){let h=M>0?r/M*100:0;T.style.width=`${h}%`,w.textContent=pt(r)},onCommit(r){if(de)de={...de,progressMs:r};if(ce=r,ze=Date.now(),$e(!0),e({type:"seek",positionMs:r}),_&&ae)Ue()}}),Fe=new Set,Re=Lt(j,{onInteractChange(r){xe=r},onPreview(r){for(let h of Fe)h(r)},onCommit(r){e({type:"set_volume",percent:r})}}),te=!1,re=null;I.addEventListener("click",(r)=>{if(r.stopPropagation(),te)z.style.display="none",te=!1;else e({type:"get_devices"}),z.innerHTML='<div class="spotify-mini-device-loading">Loading devices…</div>',z.style.display="flex",te=!0}),t.addEventListener("pointerdown",(r)=>r.stopPropagation());function et(r){if(!t.contains(r.target))Te()}function Le(){let{x:r,y:h,w:P,h:D}=o(),{innerWidth:He,innerHeight:nt}=window,Oe=Tt(fe),Ce=r+P/2-Oe/2;Ce=Math.max(ue,Math.min(Ce,He-Oe-ue)),t.style.left=`${Ce}px`,t.style.top="0px",t.style.visibility="hidden",t.style.transform="scale(1)",t.style.display="flex";let Me=t.offsetHeight;ie=Me,t.style.visibility="",t.style.transform="",t.style.display="";let je,Be=!1;if(h-Me-ue>=ue)je=h-Me-ue;else je=h+D+ue,Be=!0;je=Math.max(ue,Math.min(je,nt-Me-ue)),t.style.left=`${Ce}px`,t.style.top=`${je}px`;let st=r+P/2-Ce,St=Be?-ue:Me+ue;t.style.transformOrigin=`${st}px ${St}px`}function Ne(){if(!_||!ie)return;let{x:r,y:h,w:P,h:D}=o(),{innerWidth:He,innerHeight:nt}=window,Oe=Tt(fe),Ce=r+P/2-Oe/2;Ce=Math.max(ue,Math.min(Ce,He-Oe-ue));let Me,je=!1;if(h-ie-ue>=ue)Me=h-ie-ue;else Me=h+D+ue,je=!0;Me=Math.max(ue,Math.min(Me,nt-ie-ue)),t.style.left=`${Ce}px`,t.style.top=`${Me}px`;let Be=r+P/2-Ce,st=je?-ue:ie+ue;t.style.transformOrigin=`${Be}px ${st}px`}function rt(){if(!document.body.contains(t))document.body.appendChild(t);if(Le(),t.classList.remove("open","closing"),t.offsetHeight,t.classList.add("open"),_=!0,ae)Ue();setTimeout(()=>document.addEventListener("click",et),0)}function Te(){if(!_)return;_=!1,document.removeEventListener("click",et),_e(),Le(),t.classList.remove("open"),t.classList.add("closing");let r=()=>{t.classList.remove("closing"),t.removeEventListener("transitionend",r)};t.addEventListener("transitionend",r),setTimeout(r,250)}function tt(r,h){if(de=r,We=h,be){Se={state:r,connected:h};return}if(!h||!r){Ee=!1,xe=!1,a.setUrl(null),W.style.display="none",C.style.display="none",G.style.display="none",O.style.display="none",se.style.display="none",Y.style.display="none",z.style.display="none",te=!1,Z.style.display="",Z.textContent=!h?"Connect to Subsonic in Settings":"No active playback",M=0,T.style.width="0%",w.textContent=pt(0),E.textContent=pt(0),_e();return}W.style.display="",C.style.display="";let P=Pe();if(O.style.display=P?"flex":"none",O.hidden=!P,q.disabled=!P,F.disabled=!P,ne.disabled=!P,se.hidden=!0,se.style.display="none",Z.style.display="none",r.deviceName)k.textContent=r.deviceName,Y.style.display="",re=r.deviceId??null;else Y.style.display="none";if(d.textContent=r.trackName,f.textContent=r.artistName,c.textContent=r.albumName,M=r.durationMs,a.setUrl(Ye(r.albumArtUrl,r.trackUri)),R=r.isPlaying,ae=r.isPlaying,F.innerHTML=R?xn:tn,!Ee){ce=r.progressMs,ze=Date.now();let D=r.durationMs>0?r.progressMs/r.durationMs*100:0;T.style.width=`${D}%`,w.textContent=pt(r.progressMs)}if(E.textContent=pt(r.durationMs),r.volume!==null&&!xe)j.value=String(r.volume);if(_&&R)Ue();else _e();X()}function Je(r,h,P,D){Ie=r,me=ct(P),we=Sn(h),B=D,Q=!1,J=-1,X(!0)}function u(r){if(Q=r,r)Ie=de?.trackUri??null,me=[],we=[],B=!1,J=-1;X(!0)}function U(r){if(fe=r,t.dataset.style=r,t.style.setProperty("--spotify-mini-player-width",`${Tt(r)}px`),X(!0),_)Le()}function ye(r){if(be){K=r;return}if(z.innerHTML="",r.length===0){z.innerHTML='<div class="spotify-mini-device-loading">No devices found</div>';return}for(let h of r){let P=document.createElement("div");if(P.className=`spotify-mini-device-item${h.isActive?" active":""}`,P.innerHTML=`<span class="spotify-mini-device-item-name">${h.name}</span><span class="spotify-mini-device-item-type">${h.type}</span>`,!h.isActive)P.addEventListener("click",(D)=>{D.stopPropagation(),e({type:"transfer_playback",deviceId:h.id}),z.style.display="none",te=!1});z.appendChild(P)}}function pe(r){if(be){De=r;return}j.value=String(r)}return{root:t,update:tt,updateLyrics:Je,setLyricsLoading:u,setLyricsUpdateSuspended(r){if(H=r,!r)Ae()},setUiSuspended(r){if(be=r,H=r,r){_e();return}if(Ze(),_&&ae)Ue()},setStyle:U,setDevices:ye,setVolume:pe,onVolumeChange(r){Fe.add(r)},toggle(){if(_)Te();else rt()},hide:Te,isOpen:()=>_,reposition:Ne,destroy(){Te(),_e(),le(),Re(),Fe.clear(),t.remove()}}}var Pn='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',sn='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',Nn='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',Tn='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',zn='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',In='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',An='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',zt='<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',Un=4000;function Mt(e){let n=Math.floor(e/1000),o=Math.floor(n/60),t=n%60;return`${o}:${t.toString().padStart(2,"0")}`}function _n(e){if(!e)return[];return e.split(/\r?\n/).map((n)=>n.trim()).filter(Boolean)}function mt(e){e.addEventListener("pointerdown",(n)=>n.stopPropagation()),e.addEventListener("pointermove",(n)=>n.stopPropagation()),e.addEventListener("pointerup",(n)=>n.stopPropagation()),e.addEventListener("touchstart",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("touchmove",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("touchend",(n)=>n.stopPropagation(),{passive:!0}),e.addEventListener("click",(n)=>n.stopPropagation())}function It(e){let n=document.createElement("div");n.className=`${e} spotify-modern-widget-marquee`,n.dataset.marqueePhase="idle";let o=document.createElement("div");o.className=`${e}-content spotify-modern-widget-marquee-content`,n.appendChild(o);let t=null;function a(){if(t)clearTimeout(t),t=null;n.dataset.marqueePhase="idle",o.classList.remove("spotify-modern-widget-marquee-animate")}function p(f){if(n.dataset.marqueePhase="scrolling",o.classList.remove("spotify-modern-widget-marquee-animate"),f)o.offsetWidth;o.classList.add("spotify-modern-widget-marquee-animate")}function d(f){if(t)clearTimeout(t),t=null;n.dataset.marqueePhase="rest",o.classList.remove("spotify-modern-widget-marquee-animate"),t=setTimeout(()=>{t=null,p(f)},Un)}return o.addEventListener("animationend",(f)=>{if(f.animationName!=="spotify-modern-marquee"||n.dataset.marqueePhase!=="scrolling")return;d(!0)}),{root:n,setText(f){o.textContent=f,n.setAttribute("aria-label",f)},refresh(f,c=!1){if(!f){n.dataset.overflow="false",a(),n.style.removeProperty("--spotify-modern-marquee-distance"),n.style.removeProperty("--spotify-modern-marquee-duration");return}let m=Math.ceil(o.scrollWidth-n.clientWidth);if(m<=6){n.dataset.overflow="false",a(),n.style.removeProperty("--spotify-modern-marquee-distance"),n.style.removeProperty("--spotify-modern-marquee-duration");return}n.dataset.overflow="true",n.style.setProperty("--spotify-modern-marquee-distance",`${m}px`),n.style.setProperty("--spotify-modern-marquee-duration",`${Math.max(8,Math.min(20,8+m/18))}s`);let y=t!==null,v=n.dataset.marqueePhase==="scrolling";if(c||!y&&!v)d(c)}}}function an(e,n,o){let t=document.createElement("div");t.className="spotify-modern-widget-player",t.dataset.expanded="false",t.dataset.transport="false";let a=document.createElement("div");a.className="spotify-modern-widget-compact";let p=Ge("spotify-modern-widget-compact-art"),d=document.createElement("div");d.className="spotify-modern-widget-compact-fallback",d.innerHTML=zt;let f=document.createElement("div");f.className="spotify-modern-widget-compact-overlay";let c=document.createElement("div");c.className="spotify-modern-widget-compact-status";let m=document.createElement("div");m.className="spotify-modern-widget-compact-progress",f.appendChild(c),a.appendChild(p.el),a.appendChild(d),a.appendChild(f),a.appendChild(m);let y=document.createElement("div");y.className="spotify-modern-widget-expanded";let v=document.createElement("div");v.className="spotify-modern-widget-header";let C=document.createElement("div");C.className="spotify-modern-widget-eyebrow",C.textContent="Now Playing";let w=document.createElement("div");w.className="spotify-modern-widget-header-buttons";let N=document.createElement("button");N.className="spotify-modern-widget-icon-btn",N.innerHTML=In,N.title="Open full player";let T=document.createElement("button");T.className="spotify-modern-widget-icon-btn",T.innerHTML=An,T.title="Collapse",mt(N),mt(T),N.addEventListener("click",()=>n()),T.addEventListener("click",()=>o()),w.appendChild(N),w.appendChild(T),v.appendChild(C),v.appendChild(w);let E=document.createElement("div");E.className="spotify-modern-widget-hero";let O=Ge("spotify-modern-widget-art");O.el.title="Collapse";let b=document.createElement("div");b.className="spotify-modern-widget-art-fallback",b.innerHTML=zt,b.title="Collapse",mt(O.el),mt(b),O.el.addEventListener("click",()=>o()),b.addEventListener("click",()=>o());let q=document.createElement("div");q.className="spotify-modern-widget-meta";let F=It("spotify-modern-widget-track"),ne=It("spotify-modern-widget-artist"),se=It("spotify-modern-widget-album");q.appendChild(F.root),q.appendChild(ne.root),q.appendChild(se.root),E.appendChild(O.el),E.appendChild(b),E.appendChild(q);let V=document.createElement("div");V.className="spotify-modern-widget-progress-row";let j=document.createElement("span");j.className="spotify-modern-widget-time";let Y=document.createElement("div");Y.className="spotify-modern-widget-progress-bar";let L=document.createElement("div");L.className="spotify-modern-widget-progress-fill",Y.appendChild(L);let k=document.createElement("span");k.className="spotify-modern-widget-time",V.appendChild(j),V.appendChild(Y),V.appendChild(k);let I=document.createElement("div");I.className="spotify-modern-widget-lyrics";let z=document.createElement("div");z.className="spotify-modern-widget-section-label",z.textContent="Lyrics";let Z=document.createElement("div");Z.className="spotify-modern-widget-lyrics-body";let W=document.createElement("div");W.className="spotify-modern-widget-lyrics-track",Z.appendChild(W),I.appendChild(z),I.appendChild(Z);let G=document.createElement("div");G.className="spotify-modern-widget-controls";let A=document.createElement("button");A.className="spotify-modern-widget-btn",A.innerHTML=Pn;let ee=document.createElement("button");ee.className="spotify-modern-widget-btn spotify-modern-widget-btn-main",ee.innerHTML=sn;let g=document.createElement("button");g.className="spotify-modern-widget-btn",g.innerHTML=Tn,G.appendChild(A),G.appendChild(ee),G.appendChild(g);let x=document.createElement("div");x.className="spotify-modern-widget-volume-row";let R=document.createElement("span");R.className="spotify-modern-widget-volume-icon",R.innerHTML=zn;let M=document.createElement("input");M.type="range",M.min="0",M.max="100",M.value="50",M.className="spotify-modern-widget-volume-slider",x.appendChild(R),x.appendChild(M);let _=document.createElement("div");_.className="spotify-modern-widget-empty";let ie=document.createElement("div");ie.className="spotify-modern-widget-empty-icon",ie.innerHTML=zt;let fe=document.createElement("div");fe.className="spotify-modern-widget-empty-title",fe.textContent="No music playing.";let de=document.createElement("div");de.className="spotify-modern-widget-empty-subtitle",de.textContent="Your speakers are enjoying a brief moment of mindfulness.",_.appendChild(ie),_.appendChild(fe),_.appendChild(de),y.appendChild(v),y.appendChild(E),y.appendChild(V),y.appendChild(I),y.appendChild(G),y.appendChild(x),y.appendChild(_),t.appendChild(a),t.appendChild(y),[Y,A,ee,g,M].forEach((u)=>mt(u)),mt(Z);let We=!1,ce=null,ze=!1,ae=0,he=0,Ie=0,me=!1,we=null,B=null,Q=kt(),J=[],H=!1,ve=!1,be="",Se=[],K=wt(Z),De="",Ee=null,xe=null,ke=!1,qe=!1,Ae=new ResizeObserver(()=>{Ve(!1)});Ae.observe(q),Ae.observe(t);let Ze=new ResizeObserver(()=>{if(!ze)return;Pe(!0)});Ze.observe(Z);function Ve(u){requestAnimationFrame(()=>{F.refresh(ze,u),ne.refresh(ze,u),se.refresh(ze,u)})}function Qe(u){if(Ee)clearTimeout(Ee);if(xe)clearTimeout(xe);Ve(u),Ee=setTimeout(()=>Ve(u),180),xe=setTimeout(()=>Ve(u),460)}function it(u){p.setUrl(u),d.style.display=u?"none":"flex"}function $e(u){O.setUrl(u),b.style.display=u?"none":"flex"}function X(){if(!me)return he;return Math.min(he+Math.max(0,Date.now()-Ie),ae||1/0)}function Xe(u,U){m.style.setProperty("--spotify-modern-widget-compact-progress",`${Math.max(0,Math.min(100,u))}%`),m.style.opacity=U?"1":"0"}function Ue(){K.cancel(),W.innerHTML="",Z.scrollTop=0,Se=[]}function _e(){Ue(),Se=Q.getIndexedLines().map((U,ye)=>{let pe=document.createElement("div");return pe.className="spotify-modern-widget-lyric-line spotify-modern-widget-lyric-line-enter",pe.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(ye*22,110)}ms`),pe.textContent=U.displayText,W.appendChild(pe),pe})}function Pe(u=!1){if(!Q.hasLyrics())return;let U=Q.getActiveLineIndex(),ye=U>=0?Se[U]:Se[0];if(ye)K.center(ye,{force:u})}function le(u=!0){let U=Q.getActiveLineIndex();if(Q.getIndexedLines().forEach((pe,r)=>{let h=Se[r];if(!h)return;if(h.className="spotify-modern-widget-lyric-line",pe.index===U)h.classList.add("active");else if(U>=0){let P=Math.abs(pe.index-U);if(P===1)h.classList.add("near");else if(P===2)h.classList.add("mid");else h.classList.add("far")}else h.classList.add("far")}),!u)return;Pe()}function Fe(){if(Ue(),!We||!ce){be="";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status",U.textContent=We?"Start playback to see lyrics":"Connect Subsonic to see lyrics",W.appendChild(U);return}if(ve){be="loading";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status spotify-modern-widget-lyrics-status-loading",U.textContent="Loading lyrics...",W.appendChild(U);return}if(H){be="instrumental";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-status",U.textContent="♪ Instrumental",W.appendChild(U);return}if(Q.hasLyrics()&&ce.trackUri===B){be=Q.getIndexedLines().map((ye)=>`${ye.index}:${ye.text}`).join("|"),_e(),le(!1);return}if(J.length>0){let U=J.join("|"),ye=U!==be;be=U,J.forEach((pe,r)=>{let h=document.createElement("div");if(h.className="spotify-modern-widget-lyric-line plain",ye)h.classList.add("spotify-modern-widget-lyric-line-enter"),h.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(r*20,100)}ms`);h.textContent=pe,W.appendChild(h)});return}be="empty";let u=document.createElement("div");u.className="spotify-modern-widget-lyrics-status",u.textContent="No lyrics available",W.appendChild(u)}function Re(u=!1){if(!ce||ce.trackUri!==B||!Q.hasLyrics()){if(u)Fe();return}if(Q.setPlayback({trackUri:ce.trackUri,progressMs:X(),durationMs:ae,isPlaying:me,updatedAt:Date.now()}),u){Fe();return}if(Q.refreshActiveLineIndex())le(!0)}function te(){if(!ce||!We||!me||!ae){we=null;return}if(ke){we=requestAnimationFrame(te);return}let u=X(),U=ae>0?u/ae*100:0;L.style.width=`${U}%`,Xe(U,!0),j.textContent=Mt(u),Re(),we=requestAnimationFrame(te)}function re(){if(we!==null)return;we=requestAnimationFrame(te)}function et(){if(we!==null)cancelAnimationFrame(we),we=null}function Le(){return ce?.source==="feishin"||ce?.source==="jukebox"}A.addEventListener("click",()=>{if(Le())e({type:"previous"})}),g.addEventListener("click",()=>{if(Le())e({type:"next"})}),ee.addEventListener("click",()=>{if(Le())e({type:ce?.isPlaying?"pause":"play"})});let Ne=Ct(Y,{getMaxValue:()=>ae,onInteractChange(u){ke=u},onPreview(u){let U=ae>0?u/ae*100:0;L.style.width=`${U}%`,Xe(U,ae>0),j.textContent=Mt(u)},onCommit(u){if(ce)ce={...ce,progressMs:u};if(he=u,Ie=Date.now(),Re(!0),e({type:"seek",positionMs:u}),me)re()},stopPropagation:!0}),rt=Lt(M,{onInteractChange(u){qe=u},onCommit(u){e({type:"set_volume",percent:u})},stopPropagation:!0});function Te(u,U){if(ce=u,We=U,t.dataset.empty=!u?"true":"false",!U||!u){ke=!1,qe=!1,C.textContent=U?"Standby":"Connect Subsonic",c.textContent=U?"No playback":"Connect Subsonic",_.style.display="grid",E.style.display="none",V.style.display="none",I.style.display="none",G.style.display="none",x.style.display="none",Xe(0,!1),it(null),$e(null),Q.setPlayback(null),De="",et(),Fe();return}C.textContent="Now Playing";let ye=Ye(u.albumArtUrl,u.trackUri);it(ye),$e(ye),c.textContent=u.isPlaying?"Playing":"Paused";let pe=`${u.trackName}|${u.artistName}|${u.albumName}`,r=pe!==De;De=pe,F.setText(u.trackName),ne.setText(u.artistName),se.setText(u.albumName),E.style.display="grid",V.style.display="grid",I.style.display="grid",_.style.display="none",ae=u.durationMs,me=u.isPlaying;let h=Le(),P=t.dataset.transport!==String(h);if(t.dataset.transport=String(h),G.style.display=h?"flex":"none",G.hidden=!h,A.disabled=!h,ee.disabled=!h,g.disabled=!h,x.hidden=!0,x.style.display="none",Q.setPlayback({trackUri:u.trackUri,progressMs:ke?he:u.progressMs,durationMs:u.durationMs,isPlaying:u.isPlaying,updatedAt:ke?Ie:Date.now()}),ee.innerHTML=u.isPlaying?Nn:sn,!qe)M.value=String(u.volume??Number(M.value));if(!ke){he=u.progressMs,Ie=Date.now();let D=u.durationMs>0?u.progressMs/u.durationMs*100:0;L.style.width=`${D}%`,Xe(D,u.durationMs>0),j.textContent=Mt(u.progressMs)}if(k.textContent=Mt(u.durationMs),Q.hasLyrics()&&u.trackUri===B)if(Se.length===0)Fe();else Re();else if(W.childElementCount===0)Fe();if(P&&Q.hasLyrics()&&u.trackUri===B)requestAnimationFrame(()=>requestAnimationFrame(()=>le(!0)));if(Qe(r),u.isPlaying)re();else et()}function tt(u,U,ye,pe){B=u;let r=ct(ye);Q.setLyrics(r),J=_n(U),H=pe,ve=!1,Re(!0)}function Je(u){if(ve=u,u)B=ce?.trackUri??null,Q.clear(),J=[],H=!1;Fe()}return{root:t,update:Te,updateLyrics:tt,setLyricsLoading:Je,setLyricsBlur(u){if(u)I.style.removeProperty("--spotify-lyrics-enter-blur");else I.style.setProperty("--spotify-lyrics-enter-blur","0px")},setAutoScrollSuspended(u){if(K.suspend(u)&&!u&&Q.hasLyrics())le(!0)},setCollapsedSize(u){t.style.setProperty("--spotify-modern-widget-collapsed-size",`${u}px`)},setExpanded(u){if(ze=u,t.dataset.expanded=String(u),Qe(!0),u)requestAnimationFrame(()=>Pe(!0))},isExpanded(){return ze},destroy(){if(et(),K.destroy(),Ne(),rt(),Ee)clearTimeout(Ee);if(xe)clearTimeout(xe);Ae.disconnect(),Ze.disconnect(),p.destroy(),O.destroy(),t.remove()}}}var At="right",Rn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',Hn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';function On(e){try{return new Date(e).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return""}}function ln(e,n){let o=new Map,t=new Map,a=new Map,p=null,d=null,f=null,c=null,m=null,y=null,v=null,C=null,w=null,N=null;function T(g){return o.get(g)?.get(t.get(g)??0)??null}function E(g){return(o.get(g)?.size??0)>0}function O(g){let x=a.get(g);if(x)x.style.display=T(g)?"":"none"}function b(g){if(!E(g))return;let x=a.get(g);if(!x||!x.isConnected){let R=e.dom.findMessageElement(g);if(!R)return;let M=e.dom.inject(R,`<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${Rn}</button>`,"beforeend");M.classList.add("spotify-song-badge-wrap"),M.dataset.corner=At,M.addEventListener("click",(_)=>{_.stopPropagation(),_.preventDefault(),I(g,M)}),a.set(g,M),x=M}O(g)}function q(){for(let{messageId:g}of e.dom.listMessageElements())if(E(g))b(g)}function F(){if(d)return;d=document.createElement("div"),d.className="spotify-song-pop";let g=document.createElement("div");g.className="spotify-song-pop-header",g.textContent="Playing when generated";let x=document.createElement("div");x.className="spotify-song-pop-body",f=Ge("spotify-song-pop-art"),f.el.style.display="";let R=document.createElement("div");R.className="spotify-song-pop-info",c=document.createElement("div"),c.className="spotify-song-pop-track",m=document.createElement("div"),m.className="spotify-song-pop-artist",y=document.createElement("div"),y.className="spotify-song-pop-album",v=document.createElement("div"),v.className="spotify-song-pop-when",R.append(c,m,y,v),x.append(f.el,R);let M=document.createElement("div");M.className="spotify-song-pop-actions",C=document.createElement("button"),C.type="button",C.className="spotify-song-pop-btn spotify-song-pop-btn-primary",C.innerHTML=`${Hn}<span>Play</span>`,C.addEventListener("click",(_)=>{_.stopPropagation();let ie=w?T(w):null;if(ie?.trackUri)n({type:"play",trackUri:ie.trackUri});k()}),M.appendChild(C),d.append(g,x,M),d.addEventListener("click",(_)=>_.stopPropagation()),document.body.appendChild(d)}function ne(g){if(F(),!g){if(f?.setUrl(null),c)c.textContent="No track playing";if(m)m.textContent="";if(y)y.textContent="Nothing was playing when this version was written.";if(v)v.textContent="";if(C)C.style.display="none";return}if(f?.setUrl(Ye(g.albumArtUrl,g.trackUri)),c)c.textContent=g.trackName;if(m)m.textContent=g.artistName;if(y)y.textContent=g.albumName;if(v)v.textContent=On(g.capturedAt);if(C)C.style.display=""}function se(g){if(!d)return;let x=g.getBoundingClientRect(),R=d.offsetWidth||280,M=d.offsetHeight||200,_=8,ie=x.top-M-8,fe="bottom";if(ie<_)ie=x.bottom+8,fe="top";let de=At==="right"?x.right-R:x.left;de=Math.max(_,Math.min(de,window.innerWidth-R-_)),ie=Math.max(_,Math.min(ie,window.innerHeight-M-_)),d.style.left=`${de}px`,d.style.top=`${ie}px`,d.style.transformOrigin=`${fe} ${At}`}function V(g){let x=g.target;if(!(x instanceof Node))return;if(d?.contains(x)||N?.contains(x))return;k()}function j(){k()}function Y(g){if(g.key==="Escape")k()}function L(g,x){ne(T(g)),w=g,N=x,d.classList.add("open"),se(x),setTimeout(()=>{document.addEventListener("click",V,!0),window.addEventListener("scroll",j,!0),window.addEventListener("resize",j,!0),document.addEventListener("keydown",Y,!0)},0)}function k(){if(!d||!w)return;d.classList.remove("open"),w=null,N=null,document.removeEventListener("click",V,!0),window.removeEventListener("scroll",j,!0),window.removeEventListener("resize",j,!0),document.removeEventListener("keydown",Y,!0)}function I(g,x){if(w===g)k();else{if(w)k();L(g,x)}}function z(g,x){if(g!==p)A();p=g;let R=new Set(x.map((M)=>M.messageId));for(let M of[...o.keys()])if(!R.has(M))G(M);for(let M of x){let _=new Map;for(let[ie,fe]of Object.entries(M.bySwipe))_.set(Number(ie),fe);o.set(M.messageId,_),t.set(M.messageId,M.activeSwipe),b(M.messageId)}q()}function Z(g,x,R,M){if(p&&g!==p)return;p=g;let _=o.get(x)??new Map;if(_.set(R,M),o.set(x,_),t.set(x,R),b(x),w===x)ne(T(x))}function W(g,x){if(t.set(g,x),O(g),w===g){let R=T(g);if(R)ne(R);else k()}}function G(g){if(w===g)k();o.delete(g),t.delete(g);let x=a.get(g);if(x){try{e.dom.uninject(x)}catch{}a.delete(g)}}function A(){k();for(let g of a.values())try{e.dom.uninject(g)}catch{}a.clear(),o.clear(),t.clear(),p=null}function ee(){A(),f?.destroy(),d?.remove(),d=null}return{setChatSongs:z,setMessageSong:Z,decorate:b,decorateMounted:q,setActiveSwipe:W,removeMessage:G,reset:A,destroy:ee}}var Dn={width:320,height:196},qn={width:348,height:520};var dn={width:300,height:420};function cn({desktopPopout:e,hasPlayback:n,viewportHeight:o,viewportWidth:t}){let a=n?qn:Dn;if(e)return{...a};if(!n)return{width:Math.max(280,Math.min(a.width,t-24)),height:a.height};return{width:Math.max(dn.width,Math.min(a.width,t-24)),height:Math.max(dn.height,Math.min(a.height,o-24))}}var pn='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',ut=12,mn="subsonic-controls-widget-prefs";function un(e){let n=[],o="__TAURI_INTERNALS__"in window&&new URLSearchParams(window.location.search).has("desktopWidgetExtension");n.push(e.dom.addStyle(Yt));let t=(i)=>e.sendToBackend(i),a=null,p=0,d=null,f=new Map,c=48,m=new Map;function y(i){if(/^(data|blob):/i.test(i))return Promise.resolve(i);return new Promise((l)=>{let s=crypto.randomUUID(),S=setTimeout(()=>{m.delete(s),l(null)},15000);m.set(s,{resolve:l,timer:S}),e.sendToBackend({type:"__cors_proxy_request",requestId:s,url:i,options:{method:"GET",mediaType:"image"}})})}function v(i,l){let s=m.get(i);if(!s)return;m.delete(i),clearTimeout(s.timer);let S=l?.headers?.["content-type"]||l?.headers?.["Content-Type"]||"image/jpeg";s.resolve(l?.status&&l.status>=200&&l.status<300&&l.encoding==="base64"&&l.body?`data:${S};base64,${l.body}`:null)}function C(){if(d)clearTimeout(d);d=null}function w(){C(),p+=1,t({type:"album_colors",colors:null})}function N(i,l){f.delete(i),f.set(i,l);while(f.size>c){let s=f.keys().next().value;if(!s)break;f.delete(s)}}function T(i=1800){C(),d=setTimeout(()=>{d=null,w()},i)}function E(i){return new Promise((l)=>{let s=new Image;s.onload=()=>{try{let S=document.createElement("canvas"),oe=32;S.width=32,S.height=32;let ge=S.getContext("2d");if(!ge)return l(null);ge.drawImage(s,0,0,32,32);let Ke=ge.getImageData(0,0,32,32).data,at=0,lt=0,_t=0.5,Rt=-1,Ht=0,Ot=0,Dt=0,bt=0;for(let ft=0;ft<Ke.length;ft+=4){let Wt=Ke[ft],Vt=Ke[ft+1],$t=Ke[ft+2];Ht+=Wt,Ot+=Vt,Dt+=$t,bt+=1;let yt=Wt/255,dt=Vt/255,gt=$t/255,ot=Math.max(yt,dt,gt),ht=Math.min(yt,dt,gt),Pt=(ot+ht)/2,xt=0,Nt=0;if(ot!==ht){let vt=ot-ht;if(Nt=Pt>0.5?vt/(2-ot-ht):vt/(ot+ht),ot===yt)xt=((dt-gt)/vt+(dt<gt?6:0))/6;else if(ot===dt)xt=((gt-yt)/vt+2)/6;else xt=((yt-dt)/vt+4)/6}let jt=Nt*(1-Math.abs(Pt-0.5)*1.6);if(jt>Rt)Rt=jt,at=xt,lt=Nt,_t=Pt}let qt=Math.round(Ht/bt),Ft=Math.round(Ot/bt),Bt=Math.round(Dt/bt),gn=0.299*qt+0.587*Ft+0.114*Bt;l({dominant:{r:qt,g:Ft,b:Bt},dominantHsl:{h:Math.round(at*360),s:Math.round(lt*100),l:Math.round(_t*100)},isLight:gn>152})}catch{l(null)}},s.onerror=()=>l(null),y(i).then((S)=>{if(S)s.src=S;else l(null)})})}let O="none",b=Gt(t);e.ui.mount("settings_extensions").appendChild(b.root),n.push(()=>b.destroy());let F=e.ui.registerDrawerTab({id:"subsonic",title:"Subsonic Controls",shortName:"Subsonic",description:"Browse a Subsonic-compatible music server and control its optional Jukebox.",keywords:["subsonic","opensubsonic","music","jukebox","lyrics"],headerTitle:"Subsonic",iconSvg:pn});n.push(()=>F.destroy()),F.root.classList.add("spotify-tab-root");let ne=document.createElement("div");ne.className="spotify-panel",F.root.appendChild(ne);function se(){let i=F.root.getBoundingClientRect().top,l=F.root.parentElement?.getBoundingClientRect().bottom??window.innerHeight,s=window.visualViewport?.height??window.innerHeight,S=Math.min(l,s);F.root.style.setProperty("--spotify-tab-height",`${Math.max(240,S-i-2)}px`)}se();let V=new ResizeObserver(se);V.observe(F.root),window.addEventListener("resize",se),n.push(()=>{V.disconnect(),window.removeEventListener("resize",se)});let j=Xt(),Y=Jt(t),L=Kt(t),k=en();ne.append(j.root,Y.root,L.root,k.root),n.push(()=>j.destroy(),()=>Y.destroy(),()=>L.destroy(),()=>k.destroy());let I=!1,z=null,Z=null,W=!1,G="",A="",ee=!1,g="",x="",R=!1,M=1000,_=null,ie={small:36,medium:48,large:64},fe={small:112,medium:128,large:144},de=24,We=128,ce=112,ze=192;function ae(i){return i==="modern"?fe:ie}function he(i){return i==="modern"?{min:ce,max:ze}:{min:de,max:We}}function Ie(i,l){let{min:s,max:S}=he(l);return Math.max(s,Math.min(i,S))}function me(i){return i==="small"||i==="medium"||i==="large"||i==="custom"}function we(i,l){let s=ae(l);if(i===s.small)return"small";if(i===s.large)return"large";return i===s.medium?"medium":"custom"}let B=48,Q="circle",J="medium",H="default",ve=!0,be,Se=null;try{let i=JSON.parse(localStorage.getItem(mn)||"null");if(i?.miniPlayerStyle==="modern")H="modern";if(i?.lyricsBlur===!1)ve=!1;if(typeof i?.size==="number")B=Ie(i.size,H);if(i?.shape==="squircle")Q="squircle";if(J=me(i?.sizeMode)?i.sizeMode:we(B,H),J!=="custom")B=ae(H)[J];if(typeof i?.x==="number"&&typeof i.y==="number")be={x:i.x,y:i.y};if(i)Se={size:B,shape:Q,sizeMode:J,miniPlayerStyle:H,lyricsBlur:ve,...be}}catch{}let K,De=null,Ee=!1;function xe(){let i=K.getPosition(),l={size:B,shape:Q,sizeMode:J,miniPlayerStyle:H,lyricsBlur:ve,x:i.x,y:i.y};Ee=!0,localStorage.setItem(mn,JSON.stringify(l)),t({type:"set_widget_preferences",preferences:l})}let ke=null,qe=null,Ae=null;function Ze(){let{min:i,max:l}=he(H);if(ke)ke.textContent=H==="modern"?"Collapsed Modern Player Size (px)":"Custom Widget Size (px)";if(qe)qe.textContent=H==="modern"?"Controls the compact size of the modern player before it expands.":"Controls the floating widget size.";if(Ae)Ae.min=String(i),Ae.max=String(l),Ae.placeholder=H==="modern"?"e.g. 128":"e.g. 56",Ae.value=J==="custom"?String(B):""}let Ve=b.root.querySelector(".spotify-settings-card-body");if(Ve){let i=document.createElement("div");i.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let l=document.createElement("label");l.className="spotify-settings-label",ke=document.createElement("span"),qe=document.createElement("div"),qe.style.cssText="font-size:0.8em;opacity:0.6;margin-top:2px";let s=document.createElement("div");s.className="spotify-settings-row";let S=document.createElement("input");S.className="spotify-input",S.type="number",S.style.width="80px",Ae=S;let oe=document.createElement("button");oe.className="spotify-btn spotify-btn-primary",oe.textContent="Apply",oe.style.cssText="font-size:0.85em;padding:4px 12px",oe.addEventListener("click",()=>{let ge=Number.parseInt(S.value,10),{min:Ke,max:at}=he(H);if(Number.isNaN(ge)||ge<Ke||ge>at)return;J="custom",pe(ge)}),s.append(S,oe),l.append(ke,s,qe),Ve.append(i,l)}Ze();let Qe=null;function it(){if(Qe)Qe.checked=ve}function $e(){k.setBlurEnabled(ve),te.setLyricsBlur(ve),it()}if(Ve){let i=document.createElement("div");i.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let l=document.createElement("label");l.className="spotify-settings-check";let s=document.createElement("input");s.type="checkbox",s.checked=ve,Qe=s;let S=document.createElement("span");S.textContent="Lyrics blur",l.append(s,S);let oe=document.createElement("div");oe.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",oe.textContent="Depth-blurs receding lyric lines and fades new lines in through a blur. Turn off for crisp text.";let ge=document.createElement("div");ge.append(l,oe),s.addEventListener("change",()=>{ve=s.checked,$e(),xe()}),Ve.append(i,ge)}let X=document.createElement("div");X.className="spotify-float-widget";function Xe(){X.classList.remove("spotify-float-widget-mounted"),requestAnimationFrame(()=>requestAnimationFrame(()=>X.classList.add("spotify-float-widget-mounted")))}let Ue=document.createElement("div");Ue.className="spotify-float-widget-legacy";let _e=document.createElement("div");_e.className="spotify-float-widget-icon",_e.innerHTML=pn;let Pe=Ge("spotify-float-widget-art");Pe.el.style.display="none",Ue.append(_e,Pe.el),X.appendChild(Ue);let le=!1,Fe=420,Re=null,te=an(t,()=>F.activate(),()=>tt(!1));X.appendChild(te.root);let re=rn(t,()=>F.activate(),()=>{let i=K.root.getBoundingClientRect();return{x:i.left,y:i.top,w:i.width,h:i.height}});re.setStyle("default");function et(){return cn({desktopPopout:o,hasPlayback:Boolean(z),viewportHeight:window.innerHeight,viewportWidth:window.innerWidth})}function Le(i=le){if(H==="modern")return i?et():{width:B,height:B};return{width:B,height:B}}function Ne(i=Le()){let l=K.getPosition(),s=Math.max(ut,window.innerWidth-i.width-ut),S=Math.max(ut,window.innerHeight-i.height-ut),oe=Math.max(ut,Math.min(l.x,s)),ge=Math.max(ut,Math.min(l.y,S));if(oe!==l.x||ge!==l.y)K.moveTo(oe,ge)}function rt(i,l=!1){if(Re)clearTimeout(Re);let s=()=>{Re=null,K.setSize(i.width,i.height)};if(l)Re=setTimeout(s,Fe);else s()}function Te({delaySizeRequest:i=!1}={}){let l=Le(),s=H==="modern"&&le?"pan-y":"none";if(K.root.style.touchAction=s,K.root.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)",X.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1)",X.style.touchAction=s,te.setCollapsedSize(B),H==="modern")X.classList.add("spotify-float-widget-modern-mode"),Ue.style.display="none",te.root.style.display="block",K.root.style.width=`${l.width}px`,K.root.style.height=`${l.height}px`,X.style.width=`${l.width}px`,X.style.height=`${l.height}px`,X.style.borderRadius=le?"30px":`${Math.max(18,Math.round(B*0.28))}px`,rt(l,i);else{X.classList.remove("spotify-float-widget-modern-mode"),Ue.style.display="flex",te.root.style.display="none";let S=Q==="circle"?"50%":"22%";K.root.style.width=`${B}px`,K.root.style.height=`${B}px`,X.style.width=`${B}px`,X.style.height=`${B}px`,X.style.borderRadius=S;let oe=Math.round(B*0.5),ge=_e.querySelector("svg");if(ge)ge.style.width=`${oe}px`,ge.style.height=`${oe}px`;rt(l)}}function tt(i){let l=le;le=i&&H==="modern",re.hide(),Ne(Le(le)),te.setExpanded(le),Te({delaySizeRequest:l&&!le}),requestAnimationFrame(()=>Ne(Le()))}function Je(){if(K.root.style.display=I?"":"none",!I)re.hide(),le=!1,te.setExpanded(!1);re.update(z,I),te.update(z,I),u(z)}function u(i){let l=Ye(i?.albumArtUrl??null,i?.trackUri);_e.style.display=l?"none":"flex",Pe.el.style.display=l?"":"none",Pe.setUrl(l)}function U(i=be){if(K=e.ui.createFloatWidget({width:B,height:B,tooltip:"Subsonic",chromeless:!0}),K.root.appendChild(X),Xe(),K.onDragEnd((l)=>{De=l,Ne(),xe()}),Te(),Je(),i)K.moveTo(i.x,i.y)}function ye(){pe(B)}function pe(i){re.hide(),le=!1,te.setExpanded(!1);let l=K.getPosition();De=l,K.destroy(),B=Ie(i,H),Ze(),U(l),Ne(),xe()}function r(i){let l=i.miniPlayerStyle==="modern"?"modern":"default",s=me(i.sizeMode)?i.sizeMode:we(i.size,l);H=l,ve=i.lyricsBlur!==!1,Q=i.shape==="squircle"?"squircle":"circle",J=s,B=s==="custom"?Ie(i.size,l):ae(l)[s],re.setStyle(l),re.hide(),le=!1,te.setExpanded(!1);let S=typeof i.x==="number"&&typeof i.y==="number"?{x:i.x,y:i.y}:K.getPosition();De=S,K.destroy(),Ze(),U(S),Ne(),$e()}let h=0;async function P(i,l){let s=[{key:"small",label:"Small",active:J==="small"},{key:"medium",label:"Medium",active:J==="medium"},{key:"large",label:"Large",active:J==="large"},{key:"custom",label:"Custom…",active:J==="custom"}];if(H!=="modern")s.push({key:"shape-divider",label:"",type:"divider"},{key:"circle",label:"Circle",active:Q==="circle"},{key:"squircle",label:"Squircle",active:Q==="squircle"});s.push({key:"style-divider",label:"",type:"divider"},{key:"mini-default",label:"Default Mini Player",active:H==="default"},{key:"mini-modern",label:"Modern Lyrics Mini Player",active:H==="modern"}),h+=1,re.setUiSuspended(!0),te.setAutoScrollSuspended(!0),k.setAutoScrollSuspended(!0);let S;try{({selectedKey:S}=await e.ui.showContextMenu({position:{x:i,y:l},items:s}))}finally{if(h=Math.max(0,h-1),h===0)re.setUiSuspended(!1),te.setAutoScrollSuspended(!1),k.setAutoScrollSuspended(!1)}if(!S)return;if(S==="small"||S==="medium"||S==="large")J=S,pe(ae(H)[S]);else if(S==="custom")e.events.emit("open-settings",{view:"extensions"});else if(S==="circle"||S==="squircle")Q=S,xe(),Te();else if(S==="mini-default"||S==="mini-modern"){if(H=S==="mini-modern"?"modern":"default",B=J==="custom"?Ie(B,H):ae(H)[J],re.setStyle(H),H!=="modern")le=!1,te.setExpanded(!1);re.hide(),xe(),Ze(),Te(),Ne()}}let D=!1,He={x:0,y:0},nt=5;X.addEventListener("pointerdown",(i)=>{if(D=!1,He={x:i.clientX,y:i.clientY},!re.isOpen())return;let l=null,s=()=>{if(D&&l===null)l=requestAnimationFrame(()=>{re.reposition(),l=null})},S=()=>{if(document.removeEventListener("pointermove",s),l!==null)cancelAnimationFrame(l)};document.addEventListener("pointermove",s),document.addEventListener("pointerup",S,{once:!0})}),X.addEventListener("pointermove",(i)=>{if(D)return;let l=Math.abs(i.clientX-He.x),s=Math.abs(i.clientY-He.y);if(l>nt||s>nt)D=!0}),X.addEventListener("pointerup",()=>{requestAnimationFrame(()=>Ne())}),X.addEventListener("click",(i)=>{if(D){i.stopPropagation(),D=!1;return}if(i.stopPropagation(),H==="modern"){if(!le)tt(!0);return}re.toggle()}),X.addEventListener("contextmenu",(i)=>{i.preventDefault(),i.stopPropagation(),P(i.clientX,i.clientY)});let Oe=null,Ce=!1,Me={x:0,y:0};X.addEventListener("touchstart",(i)=>{Ce=!1;let l=i.touches[0];Me={x:l.clientX,y:l.clientY},Oe=setTimeout(()=>{Ce=!0,navigator.vibrate?.(50),P(l.clientX,l.clientY)},500)}),X.addEventListener("touchmove",(i)=>{if(!Oe)return;let l=i.touches[0];if(Math.abs(l.clientX-Me.x)>10||Math.abs(l.clientY-Me.y)>10)clearTimeout(Oe),Oe=null}),X.addEventListener("touchend",(i)=>{if(Oe)clearTimeout(Oe),Oe=null;if(Ce){Ce=!1;return}if(H==="modern"&&le){D=!1;return}if(!D){if(i.cancelable)i.preventDefault();if(H==="modern"){if(!le)tt(!0)}else re.toggle()}D=!1}),U(),Ne(),$e();let je=()=>{if(H==="modern"&&le){Te(),requestAnimationFrame(()=>Ne(Le()));return}Ne()};window.addEventListener("resize",je),n.push(()=>window.removeEventListener("resize",je)),n.push(()=>{if(Re)clearTimeout(Re);De=K.getPosition(),xe(),Pe.destroy(),re.destroy(),te.destroy(),K.destroy()});let Be=ln(e,t);n.push(()=>Be.destroy());let st=(i)=>{if(i)t({type:"get_chat_songs",chatId:i})};st(e.getActiveChat().chatId),n.push(e.events.on("CHAT_SWITCHED",(i)=>{Be.reset(),st(i.chatId||null)})),n.push(e.events.on("CHARACTER_MESSAGE_RENDERED",(i)=>{let l=i.messageId;if(l)Be.decorate(l)})),n.push(e.events.on("MESSAGE_SWIPED",(i)=>{let l=i.message;if(l?.id)Be.setActiveSwipe(l.id,l.swipe_id||0)})),n.push(e.events.on("MESSAGE_DELETED",(i)=>{let l=i.messageId;if(l)Be.removeMessage(l)}));let St=e.onBackendMessage((i)=>{let l=i;if(l.type==="__cors_proxy_response"&&l.requestId){v(l.requestId,l.error?void 0:l.result);return}let s=i;switch(s.type){case"config":if(G&&G!==s.serverUrl)f.clear();O=s.remoteControl,I=s.connected,W=s.remoteControl==="jukebox",G=s.serverUrl,A=s.username,ee=s.hasPassword,g=s.feishinUrl,x=s.feishinUsername,R=s.hasFeishinPassword,M=s.playbackPositionOffsetMs,_=s.jukeboxUnavailableReason,b.update(s.connected,s.serverUrl,s.username,s.hasPassword,s.remoteControl,s.feishinUrl,s.feishinUsername,s.hasFeishinPassword,s.playbackPositionOffsetMs,s.jukeboxUnavailableReason),L.setAvailable(!0),L.setPlaybackAvailable(s.remoteControl==="jukebox"),Y.update(z,I,s.remoteControl!=="none",s.remoteControl==="feishin"?"Feishin Controls":"Jukebox Controls"),Je();break;case"widget_preferences":if(s.preferences&&!Ee)r(s.preferences);else if(!s.preferences&&!Ee&&Se)t({type:"set_widget_preferences",preferences:Se});else if(!s.preferences&&!Ee)xe();break;case"state":if(I=s.connected,z=s.playbackState,j.update(z,I),Y.update(z,I,O!=="none",O==="feishin"?"Feishin Controls":"Jukebox Controls"),k.updatePlayback(z),z?.trackUri&&z.trackUri!==Z)Z=z.trackUri,k.setLoading(!0,z),re.setLyricsLoading(!0),te.setLyricsLoading(!0),t({type:"get_lyrics"});else if(!z)Z=null,k.clear(),re.updateLyrics(null,null,null,!1),te.updateLyrics(null,null,null,!1);Je();let S=Ye(z?.albumArtUrl??null,z?.trackUri),oe=z?.albumArtKey||S;if(S!==a)if(a=S,S){C();let Ke=oe&&s.albumPalette?.artworkKey===oe?s.albumPalette.colors:f.get(oe||"");if(oe&&Ke)N(oe,Ke),t({type:"album_colors",colors:Ke,artworkKey:oe});else{let at=++p;E(S).then((lt)=>{if(at!==p||S!==a)return;if(lt){if(oe)N(oe,lt);t({type:"album_colors",colors:lt,artworkKey:oe})}else if(!I)w()})}}else if(I)T();else w();break;case"connected":I=!0,Je(),t({type:"get_config"}),t({type:"get_state"});break;case"disconnected":I=!1,z=null,Z=null,W=!1,L.setAvailable(!0),L.setPlaybackAvailable(O==="jukebox"),a=null,f.clear(),w(),j.update(null,!1),Y.update(null,!1,!1),k.clear(),re.updateLyrics(null,null,null,!1),te.updateLyrics(null,null,null,!1),Je();break;case"search_results":L.setResults(s.results);break;case"chat_songs":Be.setChatSongs(s.chatId,s.entries);break;case"message_song":Be.setMessageSong(s.chatId,s.messageId,s.swipeId,s.snapshot);break;case"lyrics":if(!Z||s.trackUri===Z)k.update(s.trackUri,s.plainLyrics,s.syncedLyrics,s.instrumental),k.updatePlayback(z),re.updateLyrics(s.trackUri,s.plainLyrics,s.syncedLyrics,s.instrumental),te.updateLyrics(s.trackUri,s.plainLyrics,s.syncedLyrics,s.instrumental);break;case"error":if(s.operation==="connect"||s.authenticationFailure)b.setError(s.message);console.warn("[Subsonic Controls]",s.message);break}});n.push(St);let Ut=(i)=>{if(i.detail?.extensionId!==e.manifest.identifier)return;t({type:"get_config"}),t({type:"get_state"})};window.addEventListener("spindle:desktop-widget-returned",Ut),n.push(()=>window.removeEventListener("spindle:desktop-widget-returned",Ut)),e.permissions.getGranted().then((i)=>{let l=["cors_proxy","ui_panels","app_manipulation","generation","chat_mutation"].filter((s)=>!i.includes(s));if(l.length)e.permissions.request(l,{reason:"Subsonic Controls needs CORS access for your server, a panel and album-art theme support, plus Generation and Chat Mutation to remember the song playing for each assistant reply."})});let yn=e.events.on("SPINDLE_PERMISSION_CHANGED",(i)=>{let l=i;if(l.extensionId!==e.manifest.identifier||l.permission!=="cors_proxy")return;if(l.granted){t({type:"get_config"}),t({type:"get_state"});return}I=!1,z=null,Z=null,W=!1,a=null,f.clear(),w(),b.update(!1,"","",!1,"none","","",!1,M,null),j.update(null,!1),Y.update(null,!1,!1),k.clear(),Je()});return n.push(yn),n.push(()=>{C(),p+=1;for(let[i,l]of m)clearTimeout(l.timer),l.resolve(null),m.delete(i)}),t({type:"get_config"}),t({type:"get_state"}),t({type:"get_widget_preferences"}),()=>{for(let i of n)i()}}function Fn(e,n={}){let o={...n},t={componentId:`desktop-widget-detached-${crypto.randomUUID()}`,element:e instanceof HTMLElement?e:document.createElement("div"),update(a){o={...o,...a}},destroy(){},getValue(){if("checked"in o)return o.checked;return o.value},focus(){},blur(){}};return new Proxy(t,{get(a,p,d){if(p==="then")return;if(Reflect.has(a,p))return Reflect.get(a,p,d);return()=>{return}}})}function fn(e){let n=new Set,o=!1,t=()=>{let f=document.createElement("div");return n.add(f),f},a=(f)=>f instanceof Element&&[...n].some((c)=>c===f||c.contains(f)),p=new Proxy(e.components,{get(f,c,m){let y=Reflect.get(f,c,m);if(typeof y!=="function"||!String(c).startsWith("mount"))return y;return(v,C)=>{if(!o||a(v))return Fn(v,C);return Reflect.apply(y,f,[v,C])}}}),d=new Proxy(e.ui,{get(f,c,m){if(c==="mount")return()=>t();if(c==="createFloatWidget"){let y=Reflect.get(f,c,m);return(...v)=>(o=!0,Reflect.apply(y,f,v))}if(c==="registerDrawerTab")return(y)=>({root:t(),tabId:y.id||"desktop-widget-detached",setTitle(){},setShortName(){},setBadge(){},activate(){},destroy(){},onActivate(){return()=>{}}});return Reflect.get(f,c,m)}});return new Proxy(e,{get(f,c,m){if(c==="components")return p;if(c==="ui")return d;return Reflect.get(f,c,m)}})}function Pi(e,n){return un(fn(e))}export{Pi as setupWidget};
