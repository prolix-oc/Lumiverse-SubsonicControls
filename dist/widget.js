var Jt=`
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
  position: relative;
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
  padding-top: var(--spotify-lyrics-leading-space, 16px);
  padding-bottom: var(--spotify-lyrics-trailing-space, 16px);
  overflow-anchor: none;
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
  /* Reserve room before wrapping for the active text's 1.065 scale. */
  width: calc(93% - 12px);
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
  transition: color var(--spotify-lyric-release-ms, 180ms) ease;
}

.spotify-modern-widget-lyric-text {
  transform: scale(0.985);
  transform-origin: center center;
  transition: transform var(--spotify-lyric-release-ms, 180ms) cubic-bezier(0.25, 0.7, 0.5, 1);
}

.spotify-modern-widget-lyric-line-enter {
  animation: spotify-lyrics-line-in 360ms cubic-bezier(0.18, 0.9, 0.22, 1) both;
  animation-delay: var(--spotify-modern-lyric-enter-delay, 0ms);
}

.spotify-modern-widget-lyric-line.active {
  color: #fff;
  transition: color var(--spotify-lyric-highlight-ms, 140ms) ease;
}

.spotify-modern-widget-lyric-line.active .spotify-modern-widget-lyric-text {
  transform: scale(1.065);
  text-shadow: 0 0 16px rgba(255, 255, 255, 0.12);
  transition: transform var(--spotify-lyric-arrival-ms, 380ms) cubic-bezier(0.34, 1.18, 0.5, 1);
}

.spotify-modern-widget-lyric-line.near {
  color: rgba(255, 255, 255, 0.64);
}

.spotify-modern-widget-lyric-line.mid {
  color: rgba(255, 255, 255, 0.38);
}

.spotify-modern-widget-lyric-line.past.near {
  color: rgba(255, 255, 255, 0.46);
}

.spotify-modern-widget-lyric-line.past.mid {
  color: rgba(255, 255, 255, 0.28);
}

.spotify-modern-widget-lyric-line.far,
.spotify-modern-widget-lyric-line.plain {
  color: rgba(255, 255, 255, 0.24);
}

.spotify-modern-widget-lyric-line.plain {
  color: rgba(255, 255, 255, 0.52);
}

/* A blurred text shadow gives distant rows depth without a filtered layer.
   WebKit can show the edges of that layer while its parent is transformed. */
.spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.mid .spotify-modern-widget-lyric-text,
.spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.far .spotify-modern-widget-lyric-text {
  -webkit-text-fill-color: transparent;
}

.spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.mid .spotify-modern-widget-lyric-text {
  text-shadow: 0 0 0.6px currentColor;
}

.spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.far .spotify-modern-widget-lyric-text {
  text-shadow: 0 0 1.2px currentColor;
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
  position: relative;
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
  padding-top: var(--spotify-lyrics-leading-space, 28px);
  padding-bottom: var(--spotify-lyrics-trailing-space, 112px);
  overflow-anchor: none;
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
  padding-bottom: var(--spotify-lyrics-trailing-space, 36px);
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
  gap: 5px;
}

/* Both lyric views center these fixed anchors. Inner rows carry the trailing
   wave and their text carries the scale, so neither can move the scroll goal. */
.spotify-lyric-line-anchor {
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
}

/* The arriving line gains emphasis promptly and settles gently; the sung line
   releases it sooner. Depth blur remains a static per-tier value. */
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
    opacity var(--spotify-lyric-release-ms, 190ms) cubic-bezier(0.25, 0.7, 0.5, 1),
    color var(--spotify-lyric-release-ms, 190ms) ease,
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
  transform: scale(0.97);
  transform-origin: center center;
  transition: transform var(--spotify-lyric-release-ms, 190ms) cubic-bezier(0.25, 0.7, 0.5, 1);
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
    opacity var(--spotify-lyric-highlight-ms, 140ms) ease-out,
    color var(--spotify-lyric-highlight-ms, 140ms) ease-out,
    background 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

/* Scale is separate from the row's translation and the fixed layout anchor. */
.spotify-lyrics-line-active .spotify-lyrics-line-text {
  transform: scale(1.14);
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.14);
  transition: transform var(--spotify-lyric-arrival-ms, 380ms) cubic-bezier(0.34, 1.18, 0.5, 1);
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

.spotify-lyrics-line-past.spotify-lyrics-line-tier-1 {
  --spotify-lyrics-line-opacity: 0.5;
}

.spotify-lyrics-line-future.spotify-lyrics-line-tier-1 {
  --spotify-lyrics-line-opacity: 0.78;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-2 {
  --spotify-lyrics-line-opacity: 0.34;
}

.spotify-lyrics-line-future.spotify-lyrics-line-tier-2 {
  --spotify-lyrics-line-opacity: 0.56;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-3 {
  --spotify-lyrics-line-opacity: 0.24;
}

.spotify-lyrics-line-future.spotify-lyrics-line-tier-3 {
  --spotify-lyrics-line-opacity: 0.38;
}

.spotify-lyrics-line-past.spotify-lyrics-line-tier-4 {
  --spotify-lyrics-line-opacity: 0.16;
}

.spotify-lyrics-line-future.spotify-lyrics-line-tier-4 {
  --spotify-lyrics-line-opacity: 0.24;
}

/* Keep the active and adjacent lines sharp. Paint distant text as a soft
   shadow so scaling it does not create a WebKit filter layer. */
.spotify-lyrics-line-blur-2 .spotify-lyrics-line-text,
.spotify-lyrics-line-blur-3 .spotify-lyrics-line-text,
.spotify-lyrics-line-blur-4 .spotify-lyrics-line-text {
  -webkit-text-fill-color: transparent;
}

.spotify-lyrics-line-blur-2 .spotify-lyrics-line-text {
  text-shadow: 0 0 0.8px currentColor;
}

.spotify-lyrics-line-blur-3 .spotify-lyrics-line-text {
  text-shadow: 0 0 1.5px currentColor;
}

.spotify-lyrics-line-blur-4 .spotify-lyrics-line-text {
  text-shadow: 0 0 2.2px currentColor;
}

@media (forced-colors: active), (prefers-contrast: more) {
  .spotify-lyrics-line-blur-2 .spotify-lyrics-line-text,
  .spotify-lyrics-line-blur-3 .spotify-lyrics-line-text,
  .spotify-lyrics-line-blur-4 .spotify-lyrics-line-text,
  .spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.mid .spotify-modern-widget-lyric-text,
  .spotify-modern-widget-lyrics[data-blur="true"] .spotify-modern-widget-lyric-line.far .spotify-modern-widget-lyric-text {
    -webkit-text-fill-color: currentColor;
    text-shadow: none;
  }
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

.spotify-lyrics-return-live {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  max-width: calc(100% - 24px);
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid var(--lumiverse-border, rgba(255, 255, 255, 0.18));
  background: var(--lumiverse-bg-elevated, #242733);
  color: var(--lumiverse-text, #fff);
  font: inherit;
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
}

.spotify-lyrics-return-live[hidden] {
  display: none !important;
}

.spotify-lyrics-return-live:focus-visible,
.spotify-lyrics-body:focus-visible,
.spotify-modern-widget-lyrics-body:focus-visible {
  outline: 2px solid var(--lumiverse-text-muted, #c6c8d2);
  outline-offset: -2px;
}

.spotify-lyric-gap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 1em;
  vertical-align: middle;
  opacity: 0.45;
  transition: opacity 100ms linear;
}

.spotify-lyric-gap-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.35;
  transform: scale(0.8);
}

.spotify-lyrics-body[data-playing="true"],
.spotify-modern-widget-lyrics-body[data-playing="true"] {
  --spotify-lyric-gap-play-state: running;
}

.spotify-lyrics-line-active .spotify-lyric-gap,
.spotify-modern-widget-lyric-line.active .spotify-lyric-gap {
  opacity: var(--spotify-lyric-gap-opacity, 1);
}

.spotify-lyrics-line-active .spotify-lyric-gap-dot,
.spotify-modern-widget-lyric-line.active .spotify-lyric-gap-dot {
  animation: spotify-lyric-breathe 1800ms ease-in-out infinite;
  animation-delay: calc(var(--spotify-lyric-dot-index) * 140ms);
  animation-play-state: var(--spotify-lyric-gap-play-state, paused);
}

@keyframes spotify-lyric-breathe {
  0%, 100% { opacity: 0.35; transform: scale(0.8) translateY(0); }
  50% { opacity: 1; transform: scale(1.08) translateY(-1.5px); }
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

/* Fade and lift new rows without a filter animation. Even blur(0) keeps a
   filtered backing layer after a forwards-filled animation has settled. */
@keyframes spotify-lyrics-line-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: var(--spotify-lyrics-line-opacity);
    transform: translateY(0);
  }
}

@keyframes spotify-lyrics-text-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .spotify-lyrics-line,
  .spotify-lyrics-line .spotify-lyrics-line-text,
  .spotify-modern-widget-lyric-line,
  .spotify-modern-widget-lyric-text,
  .spotify-lyric-gap,
  .spotify-lyric-gap-dot,
  .spotify-lyrics-text,
  .spotify-modern-widget-lyrics-status-loading,
  .spotify-lyrics-status-loading {
    animation: none !important;
    transition: none !important;
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

`;function Zt(e){let i=document.createElement("section");i.className="spotify-settings-card";let s=document.createElement("header");s.className="spotify-settings-card-header";let t=document.createElement("h3");t.textContent="Subsonic Controls";let o=document.createElement("span");o.className="spotify-status",s.append(t,o);let a=document.createElement("div");a.className="spotify-settings-card-body";let d=(C,j,f)=>{let x=document.createElement("label");x.className="spotify-settings-label";let I=document.createTextNode(C);x.append(I);let T=document.createElement("input");return T.className="spotify-input",T.type=j,T.placeholder=f,x.append(T),a.append(x),T},y=d("Subsonic server URL","url","https://music.example.com (or …/rest)"),u=d("Subsonic username","text","Subsonic username"),c=d("Subsonic password","password","Subsonic password"),l=d("Playback position offset (ms)","number","1000");l.min="-10000",l.max="10000",l.step="100";let h=document.createElement("div");h.style.cssText="font-size:0.8em;opacity:0.65;margin-top:-6px",h.textContent="Adds time to the server's reported playback position for synchronized lyrics. Default: 1000 ms; use a negative value if lyrics run ahead.",a.append(h);let E=document.createElement("label");E.className="spotify-settings-label",E.append("Playback controls");let L=document.createElement("select");L.className="spotify-input";for(let[C,j]of[["none","Now playing only"],["jukebox","Server-side Jukebox"],["feishin","Feishin Desktop Remote"]]){let f=document.createElement("option");f.value=C,f.textContent=j,L.append(f)}E.append(L),a.append(E);let P=document.createElement("div");P.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",P.textContent="Jukebox controls affect the server-side player.",a.append(P);let S=document.createElement("div");S.style.cssText="display:none;font-size:0.8em;color:#e74c3c;margin-top:4px",a.append(S);let b=document.createElement("div");b.style.display="none";let R=(C,j,f)=>{let x=document.createElement("label");x.className="spotify-settings-label",x.append(C);let I=document.createElement("input");return I.className="spotify-input",I.type=j,I.placeholder=f,x.append(I),b.append(x),I},v=R("Feishin Remote URL","url","http://192.168.1.20:4333"),B=R("Feishin username","text","Optional Remote username"),_=R("Feishin password","password","Optional Remote password"),ie=document.createElement("div");ie.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",ie.textContent="Feishin Remote requires WebSocket transport; its HTTP server only serves the Remote page and credentials. Library search and lyrics still use the Subsonic server above.",b.append(ie),a.append(b);let ne=document.createElement("div");ne.className="spotify-settings-row";let A=document.createElement("button");A.className="spotify-btn spotify-btn-primary",ne.append(A),a.append(ne),i.append(s,a);let F=!1,V=!1,Y=!1,J=!1,G=!1,H=[y,u,c,l,L,v,B,_];for(let C of H)C.addEventListener("input",()=>{Y=!0});function q(C,j,f=!1){o.replaceChildren();let x=document.createElement("span");x.className=`spotify-status-dot ${j?"connected":"disconnected"}`;let I=document.createElement("span");if(I.textContent=C,f)I.style.color="#e74c3c";o.append(x,I)}function k(){let C=L.value==="feishin";b.style.display=C?"":"none",P.style.display=L.value==="jukebox"?"":"none",S.style.display=L.value==="jukebox"&&S.textContent?"":"none"}L.onchange=()=>{Y=!0,k()};function U(C,j,f,x,I,T,z,ee,ge,me){if(F=C,J=x,G=ee,C||!V&&!Y)y.value=j,u.value=f,v.value=T,B.value=z,l.value=String(ge),L.value=I;if(S.textContent=me||"",k(),V&&!C)return;for(let Ge of[y,u,c,L,v,B,_])Ge.disabled=C;if(C)V=!1,Y=!1,c.value="",_.value="";c.placeholder=x?"Saved securely (re-enter to change)":"Subsonic password",_.placeholder=ee?"Saved securely (re-enter to change)":"Optional Remote password",A.textContent=C?"Disconnect":"Connect",A.className=C?"spotify-btn spotify-btn-danger":"spotify-btn spotify-btn-primary",A.disabled=!1,q(C?"Connected":"Not connected",C)}return A.onclick=()=>{if(F)return void e({type:"disconnect"});let C=L.value;if(!y.value.trim()||!u.value.trim()||!c.value&&!J||C==="feishin"&&!v.value.trim()){q("Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.",!1,!0);return}V=!0,A.disabled=!0,A.textContent="Connecting…",e({type:"connect",serverUrl:y.value.trim(),username:u.value.trim(),password:c.value,remoteControl:C,feishinUrl:v.value.trim(),feishinUsername:B.value.trim(),feishinPassword:_.value,playbackPositionOffsetMs:Number(l.value)})},l.onchange=()=>{let C=Number(l.value);if(!Number.isFinite(C))return;if(l.value=String(Math.max(-1e4,Math.min(1e4,Math.round(C)))),F)e({type:"set_playback_position_offset",playbackPositionOffsetMs:Number(l.value)})},U(!1,"","",!1,"none","","",!1,1000,null),{root:i,update:U,setConnecting(){V=!0,A.disabled=!0,A.textContent="Connecting…"},setError(C){F=!1,V=!1,A.disabled=!1,A.textContent="Connect",A.className="spotify-btn spotify-btn-primary";for(let j of[y,u,c,L,v,B,_])j.disabled=!1;c.placeholder=J?"Saved securely (re-enter to change)":"Subsonic password",_.placeholder=G?"Saved securely (re-enter to change)":"Optional Remote password",q(C,!1,!0)},destroy(){i.remove()}}}function je(e,i){if(!e)return null;if(!i)return e;if(/^(data|blob):/i.test(e))return e;try{let s=new URL(e);return s.searchParams.set("track",i),s.toString()}catch{let s=e.includes("?")?"&":"?";return`${e}${s}track=${encodeURIComponent(i)}`}}function Ye(e){let i=document.createElement("div");i.className=`${e} spotify-crossfade-art`,i.style.display="none";let s=document.createElement("img"),t=document.createElement("img");s.className="spotify-crossfade-img",t.className="spotify-crossfade-img",s.alt="",t.alt="",s.loading="eager",t.loading="eager",s.decoding="async",t.decoding="async",s.style.visibility="hidden",t.style.visibility="hidden",s.style.opacity="1",t.style.opacity="0",i.appendChild(s),i.appendChild(t);let o=null,a=s,d=t,y=!1;function u(h){h.onload=null,h.onerror=null,h.removeAttribute("src"),h.style.visibility="hidden"}function c(){i.style.display="none",a.style.opacity="1",d.style.opacity="0"}function l(h){if(h===o)return;if(o=h,!h){u(a),u(d),y=!1,c();return}if(!y){if(i.style.display="",a.onload=()=>{y=!0,a.style.visibility="visible"},a.onerror=()=>{o=null,u(a),c()},a.src=h,a.complete&&a.naturalWidth>0)y=!0,a.style.visibility="visible";return}if(i.style.display="",d.onload=()=>{d.style.visibility="visible",d.style.opacity="1",a.style.opacity="0";let E=a;a=d,d=E},d.onerror=()=>{o=null,u(d),d.style.opacity="0"},d.src=h,d.complete&&d.naturalWidth>0){d.style.visibility="visible",d.style.opacity="1",a.style.opacity="0";let E=a;a=d,d=E}}return{el:i,setUrl:l,destroy(){i.remove()}}}function Qt(){let e=document.createElement("div");e.className="spotify-section";let i=document.createElement("h3");i.className="spotify-section-title",i.textContent="Now Playing";let s=document.createElement("div");s.className="spotify-now-playing";let t=Ye("spotify-album-art"),o=document.createElement("div");o.className="spotify-track-info";let a=document.createElement("div");a.className="spotify-track-name";let d=document.createElement("div");d.className="spotify-track-artist";let y=document.createElement("div");y.className="spotify-track-album";let u=document.createElement("div");u.className="spotify-track-device",o.append(a,d,y,u),s.append(t.el,o);let c=document.createElement("div");return c.className="spotify-empty",e.append(i,s,c),{root:e,update(l,h){if(!h){s.style.display="none",c.style.display="",c.textContent="Connect a music source to get started",t.setUrl(null);return}if(!l){s.style.display="none",c.style.display="",c.textContent="No active playback reported",t.setUrl(null);return}s.style.display="flex",c.style.display="none",a.textContent=l.trackName,d.textContent=l.artistName,y.textContent=l.albumName,u.textContent=l.source==="jukebox"?"Server Jukebox":l.source==="feishin"?"Feishin Desktop":l.deviceName?`Playing on ${l.deviceName}`:"Server now playing",t.setUrl(je(l.albumArtUrl,l.trackUri))},destroy(){t.destroy(),e.remove()}}}function ei(e){let i=document.createElement("div");i.className="spotify-section";let s=document.createElement("h3");s.className="spotify-section-title",s.textContent="Player Controls";let t=document.createElement("div");t.className="spotify-controls";let o=(c,l="")=>{let h=document.createElement("button");return h.className=`spotify-ctrl-btn ${l}`,h.innerHTML=c,h},a=o('<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>'),d=o('<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',"spotify-ctrl-btn-main"),y=o('<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>');a.onclick=()=>e({type:"previous"}),y.onclick=()=>e({type:"next"});let u=!1;return d.onclick=()=>e({type:u?"pause":"play"}),t.append(a,d,y),i.append(s,t),{root:i,update(c,l,h,E="Player Controls"){i.style.display=l&&h?"":"none",s.textContent=E,u=!!c?.isPlaying,d.innerHTML=u?'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>'},destroy(){i.remove()}}}function ti(e){let i=document.createElement("div");i.className="spotify-section";let s=document.createElement("h3");s.className="spotify-section-title",s.textContent="Library Search";let t=document.createElement("input");t.className="spotify-search-input",t.placeholder="Search your server's music library…";let o=document.createElement("div");o.className="spotify-search-results",i.append(s,t,o);let a=null,d=!0;return t.oninput=()=>{if(a)clearTimeout(a);a=setTimeout(()=>{let u=t.value.trim();if(u.length>=2)e({type:"search",query:u});else o.innerHTML=""},350)},{root:i,setResults:(u)=>{if(o.innerHTML="",!u.length){let c=document.createElement("div");c.className="spotify-empty",c.textContent="No tracks found",o.appendChild(c);return}for(let c of u){let l=document.createElement("div");if(l.className="spotify-search-item",c.albumArtUrl){let P=document.createElement("img");P.className="spotify-search-item-art",P.src=c.albumArtUrl,P.alt=c.album,l.appendChild(P)}let h=document.createElement("div");h.className="spotify-search-item-info";let E=document.createElement("div");E.className="spotify-search-item-name",E.textContent=c.name;let L=document.createElement("div");if(L.className="spotify-search-item-artist",L.textContent=`${c.artist} — ${c.album}`,h.append(E,L),d){let P=document.createElement("div");P.className="spotify-search-item-actions";let S=document.createElement("button");S.className="spotify-search-item-btn",S.title="Play in server Jukebox",S.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',S.onclick=()=>e({type:"play",trackUri:c.uri});let b=document.createElement("button");b.className="spotify-search-item-btn",b.title="Add to server Jukebox queue",b.innerHTML='<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z"/></svg>',b.onclick=()=>e({type:"queue",trackUri:c.uri}),P.append(S,b),l.append(h,P)}else l.append(h);o.appendChild(l)}},setAvailable(u){if(i.style.display=u?"":"none",!u)o.innerHTML=""},setPlaybackAvailable(u){d=u,o.innerHTML=""},destroy(){if(a)clearTimeout(a);i.remove()}}}function ii(e,i){let s=null,t=null,o=null,a=!1,d=!1,y=0,u=null,c=85,{clientHeight:l,scrollHeight:h}=e,E=window.matchMedia("(prefers-reduced-motion: reduce)");function L(){l=e.clientHeight,h=e.scrollHeight}function P(A){let F=e.getBoundingClientRect(),V=A.getBoundingClientRect(),Y=Math.max(0,e.scrollHeight-e.clientHeight);return Math.min(Math.max(e.scrollTop+(V.top+V.height/2)-(F.top+e.clientHeight/2),0),Y)}function S(){if(s!==null)cancelAnimationFrame(s);s=null,t=null,u=null}function b(){if(S(),o=null,!a)a=!0,i?.(!0)}function R(){S(),o=e.scrollTop,L()}function v(A){if(["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(A.key))b()}function B(){if(!E.matches||!t)return;let A=P(t);S(),o=A,e.scrollTop=A}function _(){S(),o=e.scrollTop,L()}function ie(A){if(s=null,t===null||!t.isConnected||!e.isConnected){S();return}let F=Math.min(Math.max(A-y,0),100);y=A;let V=Math.max(0,e.scrollHeight-e.clientHeight),Y=P(t);if(u===null||o===null||Math.abs(e.scrollTop-o)>1)u=e.scrollTop;let J=Y-u;if(Math.abs(J)<0.5){o=Y,e.scrollTop=Y,S();return}let G=J*(1-Math.exp(-F/c)),H=1800*(F/1000),q=Math.abs(G)>H?Math.sign(G)*H:G,k=Math.min(Math.max(u+q,0),V);u=k,o=k,e.scrollTop=k,s=requestAnimationFrame(ie)}e.addEventListener("wheel",b,{passive:!0}),e.addEventListener("touchmove",b,{passive:!0}),e.addEventListener("pointerdown",R,{passive:!0}),e.addEventListener("keydown",v),E.addEventListener?.("change",B);function ne(){let A=l!==e.clientHeight||h!==e.scrollHeight;if(L(),s!==null||t!==null)return;if(A){o=e.scrollTop;return}if(o!==null&&Math.abs(e.scrollTop-o)<=1)return;b()}return e.addEventListener("scroll",ne,{passive:!0}),{center(A,F){if(d||a)return!1;if(L(),E.matches)return S(),o=P(A),e.scrollTop=o,!1;if(t=A,c=Math.max(1,F?.timeConstantMs??85),s===null)y=performance.now(),s=requestAnimationFrame(ie);return!0},suspend(A){if(d===A)return!1;if(d=A,d)_();return!0},cancel:_,resume(){if(!a)return;a=!1,i?.(!1)},isBrowsing:()=>a,destroy(){_(),e.removeEventListener("wheel",b),e.removeEventListener("touchmove",b),e.removeEventListener("pointerdown",R),e.removeEventListener("keydown",v),e.removeEventListener("scroll",ne),E.removeEventListener?.("change",B)}}}function kt(e,i){let s=document.createElement("button");s.type="button",s.className="spotify-lyrics-return-live",s.textContent="Return to live lyrics",s.hidden=!0,e.tabIndex=0,e.setAttribute("aria-label","Lyrics");let t=[],o=null,a=ii(e,(l)=>{s.hidden=!l||t.length===0});function d(){if(o=null,!t.length||!e.isConnected||e.clientHeight===0)return;let l=t[0].offsetHeight,h=t[t.length-1].offsetHeight;e.style.setProperty("--spotify-lyrics-leading-space",`${Math.max(0,(e.clientHeight-l)/2)}px`),e.style.setProperty("--spotify-lyrics-trailing-space",`${Math.max(0,(e.clientHeight-h)/2)}px`),i()}function y(){if(o===null)o=requestAnimationFrame(d)}let u=new ResizeObserver(y);function c(l){if(a.cancel(),t=l,a.resume(),s.hidden=!0,e.dataset.synced=String(l.length>0),u.disconnect(),o!==null)cancelAnimationFrame(o);if(o=null,l.length){if(u.observe(e),u.observe(l[0]),l.length>1)u.observe(l[l.length-1]);y()}else e.style.removeProperty("--spotify-lyrics-leading-space"),e.style.removeProperty("--spotify-lyrics-trailing-space")}return s.addEventListener("click",()=>{a.resume(),i(),e.focus({preventScroll:!0})}),{autoScroll:a,returnButton:s,setLines:c,reset:()=>c([]),destroy(){if(o!==null)cancelAnimationFrame(o);u.disconnect(),a.destroy(),s.remove()}}}function ni(e=1/0){let i=Math.min(360,Math.max(80,e*0.65));return{durationMs:i,staggerMs:i/15,arrivalMs:i+20,releaseMs:Math.min(190,i*0.55),highlightMs:Math.min(140,i*0.4),scrollTimeConstantMs:Math.max(25,i/4.235294117647059)}}function Mt(e){let i=new Map,s=window.matchMedia("(prefers-reduced-motion: reduce)"),t=ni();function o(c){return t=ni(c),e.style.setProperty("--spotify-lyric-arrival-ms",`${t.arrivalMs}ms`),e.style.setProperty("--spotify-lyric-release-ms",`${t.releaseMs}ms`),e.style.setProperty("--spotify-lyric-highlight-ms",`${t.highlightMs}ms`),t}function a(){i.forEach((c)=>c.cancel()),i.clear()}function d(c){if(["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "].includes(c.key))a()}function y(c){let l=getComputedStyle(c).transform;if(l==="none")return 0;return l.slice(l.indexOf("(")+1,-1).split(",").map(Number)[l.startsWith("matrix3d")?13:5]||0}function u(c,l,h){if(s.matches||l<0||h!==l+1){a();return}let E=e.getBoundingClientRect();if(!e.isConnected||e.clientHeight===0){a();return}let L=c.flatMap((P)=>{let S=Math.abs(P.index-h);if(S>4)return[];let b=P.anchorEl.getBoundingClientRect();if(b.bottom<E.top||b.top>E.bottom)return[];return[{line:P,distance:S,height:b.height,offset:i.has(P.el)?y(P.el):0}]});a(),L.forEach(({line:P,distance:S,height:b,offset:R})=>{if(S===0&&Math.abs(R)<0.1)return;let v=S===0?0:Math.min(8,b*0.18+S*0.7),B=P.index<h?v*0.65:v,_=P.el.animate(S===0?[{transform:`translateY(${R}px)`},{transform:"translateY(0)"}]:[{transform:`translateY(${R}px)`,offset:0,easing:"cubic-bezier(0.22, 1, 0.36, 1)"},{transform:`translateY(${B}px)`,offset:0.25,easing:"cubic-bezier(0.25, 0.7, 0.5, 1)"},{transform:"translateY(0)",offset:1}],{duration:S===0?Math.min(180,t.durationMs):t.durationMs,delay:Math.min(S,3)*t.staggerMs,easing:S===0?"ease-out":"linear",fill:"backwards"});i.set(P.el,_),_.onfinish=()=>{if(i.get(P.el)===_)i.delete(P.el)}})}return e.addEventListener("wheel",a,{passive:!0}),e.addEventListener("touchmove",a,{passive:!0}),e.addEventListener("pointerdown",a,{passive:!0}),e.addEventListener("keydown",d),s.addEventListener("change",a),{play:u,setCadence:o,cancel:a,destroy(){a(),e.removeEventListener("wheel",a),e.removeEventListener("touchmove",a),e.removeEventListener("pointerdown",a),e.removeEventListener("keydown",d),s.removeEventListener("change",a)}}}function Ct(){let e=document.createElement("span");e.className="spotify-lyric-gap",e.setAttribute("role","img"),e.setAttribute("aria-label","Instrumental break");for(let i=0;i<3;i++){let s=document.createElement("span");s.className="spotify-lyric-gap-dot",s.style.setProperty("--spotify-lyric-dot-index",String(i)),s.setAttribute("aria-hidden","true"),e.appendChild(s)}return e}function ct(e,i,s){if(!s){e.style.removeProperty("--spotify-lyric-gap-opacity");return}e.style.setProperty("--spotify-lyric-gap-opacity",String(Math.min(1,Math.max(0,i/350))))}function nt(e=()=>performance.now()){let i=null,s=0,t=0,o=0,a=0,d=new Set;function y(){if(!i)return 0;let u=i.isPlaying?Math.max(0,e()-t):0,c=s+u+o*(1-Math.exp(-u/1800));return Math.min(Math.max(0,c),i.durationMs||1/0)}return{update(u,c){if(u===i&&!c?.seek)return;let l=y(),h=Math.min(Math.max(0,u?.progressMs||0),u?.durationMs||1/0),E=h-l;if(o=0,!i||!u||u.trackUri!==i.trackUri||c?.seek||Math.abs(E)>1000)s=h,a++;else if(!i.isPlaying&&!u.isPlaying){if(s=u.progressMs===i.progressMs?l:h,s!==l)a++}else if(s=l,u.isPlaying)o=E;i=u,t=e(),d.forEach((L)=>L())},getProgressMs:y,getTrackUri:()=>i?.trackUri??null,getDurationMs:()=>i?.durationMs??0,isPlaying:()=>i?.isPlaying??!1,getRevision:()=>a,subscribe(u){return d.add(u),()=>{d.delete(u)}}}}var Li="♪";function ki(e){let i=/^(\d+):(\d{2})(?:\.(\d{1,3}))?$/.exec(e);if(!i)return null;let s=Number(i[1]),t=Number(i[2]),o=i[3]?Number(i[3].padEnd(3,"0")):0;if(!Number.isFinite(s)||!Number.isFinite(t)||t>59)return null;return s*60000+t*1000+o}function pt(e){if(!e)return[];let i=[];for(let t of e.split(/\r?\n/)){let o=[...t.matchAll(/\[([^\]]+)\]/g)].map((d)=>ki(d[1])).filter((d)=>d!==null);if(o.length===0)continue;let a=t.replace(/(?:\[[^\]]+\])+/g,"").trim();for(let d of o)i.push({timeMs:d,text:a})}let s=[];for(let t of i.sort((o,a)=>o.timeMs-a.timeMs)){let o=s[s.length-1];if(o?.timeMs===t.timeMs)o.text=[o.text,t.text].filter(Boolean).join(`
`);else s.push({...t})}return s}function At(e){return e||Li}function oi(e){return!e.includes(`
`)&&e.length>=36}function St(e,i=nt()){let s=[],t=[],o=-1;function a(){if(s.length===0){let P=o!==-1;return o=-1,P}let c=i.getProgressMs(),l=0,h=s.length;while(l<h){let P=l+h>>>1;if(s[P].timeMs<=c)l=P+1;else h=P}let E=l-1,L=E!==o;return o=E,L}function d(){if(!e||t.length<=e)return t;if(o<0)return t.slice(0,e);let c=Math.max(0,Math.min(o-Math.floor(e/2),t.length-e));return t.slice(c,c+e)}function y(){return t}function u(){let c=s[o+1]?.timeMs??(i.getDurationMs()||1/0);return Math.max(0,c-i.getProgressMs())}return{clear(){s=[],t=[],o=-1},setLyrics(c){s=c,t=s.map((l,h)=>({...l,index:h,displayText:At(l.text),hasText:Boolean(l.text)})),o=-1,a()},setPlayback(c,l){i.update(c,l)},refreshActiveLineIndex:a,getActiveLineIndex(){return o},hasLyrics(){return s.length>0},getIndexedLines:y,getTimeUntilNextLineMs:u,getActiveLine:()=>t[o],getSnapshot(){return a(),{activeLineIndex:o,lines:d()}}}}var Mi=180;function ri(e,i,s,t){let o=["spotify-lyrics-line"];if(!s)o.push("spotify-lyrics-line-blank");if(e===i)o.push("spotify-lyrics-line-active");else if(e<i)o.push("spotify-lyrics-line-past");else o.push("spotify-lyrics-line-future");if(i>=0){let a=Math.abs(e-i);if(a>=1){let d=Math.min(a,4);if(o.push(`spotify-lyrics-line-tier-${d}`),t&&d>=2)o.push(`spotify-lyrics-line-blur-${d}`)}}return o.join(" ")}function si(e=nt()){let i=document.createElement("div");i.className="spotify-section spotify-lyrics-section",i.dataset.transport="false";let s=document.createElement("h3");s.className="spotify-section-title",s.textContent="Lyrics";let t=document.createElement("div");t.className="spotify-lyrics-body",i.append(s,t);let o=null,a=[],d=St(void 0,e),y=kt(t,()=>_(!0));i.appendChild(y.returnButton);let u=y.autoScroll,c=Mt(t),l=-1,h=e.getRevision(),E=!0,L=null,P;function S(k){return k?.source==="feishin"||k?.source==="jukebox"}function b(){clearTimeout(P),P=void 0,t.classList.remove("spotify-lyrics-loading")}function R(){if(L!==null)cancelAnimationFrame(L);L=null}function v(){a.forEach((k)=>{k.el.className=ri(k.index,l,k.hasText,E)})}function B(k,U=!1){let C=l,j=h!==e.getRevision();if(h=e.getRevision(),j)u.resume();l=k;let f=c.setCadence(d.getTimeUntilNextLineMs());v();let x=a[l>=0?l:0];if(x&&u.center(x.anchorEl,{timeConstantMs:f.scrollTimeConstantMs})&&!j&&!U&&e.isPlaying()&&C!==l)c.play(a,C,l);else if(j||U||C!==l)c.cancel()}function _(k=!1){if(!a.length)return;if(d.refreshActiveLineIndex()||k||h!==e.getRevision())B(d.getActiveLineIndex(),k);ct(t,d.getTimeUntilNextLineMs(),d.getActiveLine()?.hasText===!1)}function ie(){if(L===null&&a.length)L=requestAnimationFrame(ne)}function ne(){if(L=null,_(),e.isPlaying())ie()}function A(){let k=e.getTrackUri()===o&&o!==null;if(t.dataset.playing=String(k&&e.isPlaying()),!k){R(),c.cancel();return}if(_(),e.isPlaying())ie();else R()}function F(){R(),u.cancel(),c.cancel(),b(),y.reset(),ct(t,0,!1),t.innerHTML="",t.className="spotify-lyrics-body",o=null,a=[],d.clear(),l=-1,t.dataset.playing="false",i.dataset.transport="false"}function V(k,U){if(b(),!k)return;if(R(),u.cancel(),c.cancel(),y.reset(),t.innerHTML="",t.className="spotify-lyrics-body spotify-lyrics-loading",o=U?.trackUri??o,a=[],d.setLyrics([]),U&&U.trackUri===o)e.update(U);l=-1,P=setTimeout(()=>{if(!t.classList.contains("spotify-lyrics-loading"))return;let C=document.createElement("div");C.className="spotify-lyrics-status spotify-lyrics-status-loading",C.textContent="Loading lyrics...",t.appendChild(C)},Mi)}function Y(k){let U=pt(k);if(!U.length)return!1;b(),t.className="spotify-lyrics-body spotify-lyrics-has-content spotify-lyrics-synced",d.setLyrics(U);let C=d.getSnapshot();l=C.activeLineIndex,h=e.getRevision(),a=C.lines.map((f,x)=>{let I=document.createElement("div");I.className="spotify-lyric-line-anchor";let T=document.createElement("div"),z=document.createElement("div");if(T.className=ri(f.index,l,f.hasText,E),T.classList.add("spotify-lyrics-line-enter"),T.style.setProperty("--spotify-lyrics-enter-delay",`${Math.min(x*28,280)}ms`),z.className="spotify-lyrics-line-text",!f.hasText)z.classList.add("spotify-lyrics-line-symbol");if(oi(f.text))z.classList.add("spotify-lyrics-line-text-long");if(f.hasText)z.textContent=At(f.text);else z.appendChild(Ct());return T.appendChild(z),I.appendChild(T),t.appendChild(I),{index:f.index,hasText:f.hasText,anchorEl:I,el:T}}),y.setLines(a.map((f)=>f.anchorEl));let j=a[l>=0?l:0];if(j)u.center(j.anchorEl);return A(),!0}function J(k){b(),t.className="spotify-lyrics-body spotify-lyrics-has-content";let U=document.createElement("div");U.className="spotify-lyrics-text spotify-lyrics-text-enter",U.textContent=k,t.appendChild(U)}function G(k,U,C,j){if(R(),u.cancel(),c.cancel(),b(),y.reset(),o=k,t.innerHTML="",a=[],d.clear(),l=-1,j)t.className="spotify-lyrics-body",t.textContent="♪ Instrumental";else if(!Y(C||""))if(U)J(U);else t.className="spotify-lyrics-body",t.textContent="No lyrics available"}function H(k){let U=String(S(k)),C=i.dataset.transport!==U;if(i.dataset.transport=U,e.update(k),A(),C&&a.length)requestAnimationFrame(()=>_(!0))}let q=e.subscribe(A);return{root:i,update:G,updatePlayback:H,setLoading:V,setAutoScrollSuspended(k){if(k)c.cancel();if(u.suspend(k)&&!k&&a.length)B(l,!0)},setBlurEnabled(k){if(E===k)return;E=k,v()},clear:F,destroy(){q(),R(),y.destroy(),c.destroy(),b(),i.remove()}}}function Pt(e,i){let s=!1;function t(b){if(s===b)return;s=b,i.onInteractChange?.(b)}function o(b){if(i.stopPropagation)b.stopPropagation()}function a(){return Number.parseInt(e.value,10)}let d=(b)=>{o(b),t(!0)},y=(b)=>{o(b)},u=(b)=>{o(b),t(!1)},c=(b)=>{o(b),t(!0)},l=(b)=>{o(b)},h=(b)=>{o(b),t(!1)},E=(b)=>{o(b)},L=(b)=>{o(b),t(!0),i.onPreview?.(a())},P=(b)=>{o(b);let R=a();i.onPreview?.(R),i.onCommit(R),t(!1)},S=()=>{t(!1)};return e.addEventListener("pointerdown",d),e.addEventListener("pointermove",y),e.addEventListener("pointerup",u),e.addEventListener("touchstart",c,{passive:!0}),e.addEventListener("touchmove",l,{passive:!0}),e.addEventListener("touchend",h,{passive:!0}),e.addEventListener("click",E),e.addEventListener("input",L),e.addEventListener("change",P),e.addEventListener("blur",S),e.addEventListener("pointercancel",S),e.addEventListener("lostpointercapture",S),()=>{e.removeEventListener("pointerdown",d),e.removeEventListener("pointermove",y),e.removeEventListener("pointerup",u),e.removeEventListener("touchstart",c),e.removeEventListener("touchmove",l),e.removeEventListener("touchend",h),e.removeEventListener("click",E),e.removeEventListener("input",L),e.removeEventListener("change",P),e.removeEventListener("blur",S),e.removeEventListener("pointercancel",S),e.removeEventListener("lostpointercapture",S)}}function Tt(e,i){let s=!1,t=null,o=0;function a(v){if(s===v)return;s=v,i.onInteractChange?.(v)}function d(v){if(i.stopPropagation)v.stopPropagation()}function y(v){let B=i.getMaxValue();if(!Number.isFinite(B)||B<=0)return null;let _=e.getBoundingClientRect();if(_.width<=0)return null;let ie=Math.max(0,Math.min(1,(v-_.left)/_.width));return Math.round(ie*B)}function u(v){let B=y(v);if(B===null)return null;return o=B,i.onPreview(B),B}function c(v){if(t!==null&&e.hasPointerCapture(t))e.releasePointerCapture(t);if(t=null,v)i.onCommit(o);a(!1)}let l=(v)=>{if(d(v),v.button!==0)return;if(u(v.clientX)===null)return;t=v.pointerId,a(!0);try{e.setPointerCapture(v.pointerId)}catch{}},h=(v)=>{if(d(v),v.pointerId!==t)return;u(v.clientX)},E=(v)=>{if(d(v),v.pointerId!==t)return;u(v.clientX),c(!0)},L=(v)=>{if(d(v),v.pointerId!==t)return;c(!1)},P=(v)=>{d(v),v.preventDefault()},S=(v)=>{d(v)},b=(v)=>{d(v)},R=(v)=>{d(v)};return e.addEventListener("pointerdown",l),e.addEventListener("pointermove",h),e.addEventListener("pointerup",E),e.addEventListener("pointercancel",L),e.addEventListener("click",P),e.addEventListener("touchstart",S,{passive:!0}),e.addEventListener("touchmove",b,{passive:!0}),e.addEventListener("touchend",R,{passive:!0}),()=>{e.removeEventListener("pointerdown",l),e.removeEventListener("pointermove",h),e.removeEventListener("pointerup",E),e.removeEventListener("pointercancel",L),e.removeEventListener("click",P),e.removeEventListener("touchstart",S),e.removeEventListener("touchmove",b),e.removeEventListener("touchend",R)}}var Ci='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',ai='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',Si='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',Pi='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',Ti='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',Ni='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',zi='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',Ii='<svg viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/></svg>',li="♪";function mt(e){let i=Math.floor(e/1000),s=Math.floor(i/60),t=i%60;return`${s}:${t.toString().padStart(2,"0")}`}var di=280,Ai=336,ye=8;function Ut(e){return e==="modern"?Ai:di}function Ui(e){if(!e)return[];return e.split(/\r?\n/).map((i)=>i.trim()).filter(Boolean).slice(0,5)}function ci(e,i,s){let t=document.createElement("div");t.className="spotify-mini-player",t.dataset.style="default",t.style.setProperty("--spotify-mini-player-width",`${di}px`);let o=Ye("spotify-mini-art"),a=document.createElement("div");a.className="spotify-mini-info";let d=document.createElement("div");d.className="spotify-mini-track";let y=document.createElement("div");y.className="spotify-mini-artist";let u=document.createElement("div");u.className="spotify-mini-album",a.appendChild(d),a.appendChild(y),a.appendChild(u);let c=document.createElement("button");c.className="spotify-mini-header-btn",c.innerHTML=Ni,c.title="Open full player";let l=document.createElement("button");l.className="spotify-mini-header-btn",l.innerHTML=zi,l.title="Collapse";let h=document.createElement("div");h.className="spotify-mini-header-btns",h.appendChild(c),h.appendChild(l);let E=document.createElement("div");E.className="spotify-mini-progress-row";let L=document.createElement("span");L.className="spotify-mini-time";let P=document.createElement("div");P.className="spotify-mini-progress-bar";let S=document.createElement("div");S.className="spotify-mini-progress-fill",P.appendChild(S);let b=document.createElement("span");b.className="spotify-mini-time",E.appendChild(L),E.appendChild(P),E.appendChild(b);let R=document.createElement("div");R.className="spotify-mini-controls";function v(n,w=""){let M=document.createElement("button");return M.className=`spotify-mini-btn ${w}`.trim(),M.innerHTML=n,M}let B=v(Ci),_=v(ai,"spotify-mini-btn-main"),ie=v(Pi);R.appendChild(B),R.appendChild(_),R.appendChild(ie);let ne=document.createElement("div");ne.className="spotify-mini-volume-row";let A=document.createElement("span");A.className="spotify-mini-volume-icon",A.innerHTML=Ti;let F=document.createElement("input");F.type="range",F.className="spotify-mini-volume-slider",F.min="0",F.max="100",F.value="50",ne.appendChild(A),ne.appendChild(F);let V=document.createElement("div");V.className="spotify-mini-device-row";let Y=document.createElement("span");Y.className="spotify-mini-device-icon",Y.innerHTML=Ii;let J=document.createElement("span");J.className="spotify-mini-device-name";let G=document.createElement("button");G.className="spotify-mini-device-toggle",G.textContent="Switch",V.appendChild(Y),V.appendChild(J),V.appendChild(G);let H=document.createElement("div");H.className="spotify-mini-device-list";let q=document.createElement("div");q.className="spotify-mini-empty",q.textContent="No active playback";let k=document.createElement("div");k.className="spotify-mini-header",k.appendChild(o.el),k.appendChild(a),k.appendChild(h),t.appendChild(k),t.appendChild(E);let U=document.createElement("div");U.className="spotify-mini-lyrics-section";let C=document.createElement("div");C.className="spotify-mini-lyrics-header",C.textContent="Lyrics";let j=document.createElement("div");j.className="spotify-mini-lyrics-body";let f=document.createElement("div");f.className="spotify-mini-lyrics-status";let x=Array.from({length:5},()=>{let n=document.createElement("div");return n.className="spotify-mini-lyric-line",j.appendChild(n),n});j.appendChild(f),U.appendChild(C),U.appendChild(j),t.appendChild(U),t.appendChild(R),t.appendChild(ne),t.appendChild(V),t.appendChild(H),t.appendChild(q);let I=!1,T=0,z=!1,ee=0,ge="default",me=null,Ge=!1,Ne=0,ce=0,ke=!1,pe=null,Me=null,ae=[],oe=[],Ae=!1,X=!1,ue=-1,te=!1,O=!1,fe=!1,Fe=null,Se=null,K=null,he=!1,Ue=!1;function xe(n,w=!1){f.className=w?"spotify-mini-lyrics-status spotify-mini-lyrics-status-loading":"spotify-mini-lyrics-status",f.textContent=n,f.style.display="";for(let M of x)M.style.display="none",M.textContent="",M.className="spotify-mini-lyric-line"}function ze(){f.style.display="none";for(let n of x)n.style.display=""}function Ce(){if(!O||te)return;O=!1,et(!0)}function Re(){if(fe)return;let n=Fe,w=Se,M=K;if(Fe=null,Se=null,K=null,n)Je(n.state,n.connected);if(w)it(w);if(M!==null)g(M);Ce()}function Xe(){if(!ke)return Ne;return Math.min(Ne+Math.max(0,Date.now()-ce),T||1/0)}function qe(){if(ae.length===0)return[];let w=[];if(ue<0)for(let M=0;M<Math.min(5,ae.length);M++){let D=ae[M];w.push({text:D.text||li,index:M})}else{let M=Math.max(0,Math.min(ue-2,ae.length-5));for(let D=0;D<5&&M+D<ae.length;D++){let W=M+D,Le=ae[W];w.push({text:Le.text||li,index:W})}}while(w.length<5)w.push({text:" ",index:-1-w.length});return w}function Qe(){if(X){xe("Loading lyrics...",!0);return}if(Ae){xe("♪ Instrumental");return}if(ae.length>0){ze();let n=qe();x.forEach((w,M)=>{let D=n[M]??{text:" ",index:-1-M},W=ue<0?D.index:Math.abs(D.index-ue);if(w.className="spotify-mini-lyric-line",D.index===ue)w.classList.add("spotify-mini-lyric-line-active");else if(W===1)w.classList.add("spotify-mini-lyric-line-near");else if(W===2)w.classList.add("spotify-mini-lyric-line-mid");else w.classList.add("spotify-mini-lyric-line-far");w.textContent=D.text});return}if(oe.length>0){ze(),x.forEach((n,w)=>{n.className="spotify-mini-lyric-line spotify-mini-lyric-line-plain",n.textContent=oe[w]??" "});return}xe("No lyrics available")}function et(n=!1){if(te){O=!0;return}if(ge!=="modern"||ae.length===0||!me||me.trackUri!==Me){if(n&&ge==="modern")Qe();return}let w=Xe(),M=-1;for(let D=0;D<ae.length;D++){if(ae[D].timeMs>w)break;M=D}if(n||M!==ue)ue=M,Qe()}function Be(n=!1){let w=ge==="modern"&&Ge&&Boolean(me);if(U.style.display=w?"":"none",!w)return;if(te){O=!0;return}if(et(!0),n&&z)tt()}function Z(){if(fe||!z||!ke||!T){pe=null;return}if(he){pe=requestAnimationFrame(Z);return}let n=Date.now()-ce,w=Math.min(Ne+n,T),M=w/T*100;S.style.width=`${M}%`,L.textContent=mt(w),et(),pe=requestAnimationFrame(Z)}function We(){if(pe!==null)return;pe=requestAnimationFrame(Z)}function Pe(){if(pe!==null)cancelAnimationFrame(pe),pe=null}function _e(){return me?.source==="feishin"||me?.source==="jukebox"}B.addEventListener("click",(n)=>{if(n.stopPropagation(),!_e())return;e({type:"previous"})}),ie.addEventListener("click",(n)=>{if(n.stopPropagation(),!_e())return;e({type:"next"})}),_.addEventListener("click",(n)=>{if(n.stopPropagation(),!_e())return;e({type:I?"pause":"play"})}),c.addEventListener("click",(n)=>{n.stopPropagation(),$e(),i()}),l.addEventListener("click",(n)=>{n.stopPropagation(),$e()});let He=Tt(P,{getMaxValue:()=>T,onInteractChange(n){he=n},onPreview(n){let w=T>0?n/T*100:0;S.style.width=`${w}%`,L.textContent=mt(n)},onCommit(n){if(me)me={...me,progressMs:n};if(Ne=n,ce=Date.now(),et(!0),e({type:"seek",positionMs:n}),z&&ke)We()}}),le=new Set,Ke=Pt(F,{onInteractChange(n){Ue=n},onPreview(n){for(let w of le)w(n)},onCommit(n){e({type:"set_volume",percent:n})}}),be=!1,de=null;G.addEventListener("click",(n)=>{if(n.stopPropagation(),be)H.style.display="none",be=!1;else e({type:"get_devices"}),H.innerHTML='<div class="spotify-mini-device-loading">Loading devices…</div>',H.style.display="flex",be=!0}),t.addEventListener("pointerdown",(n)=>n.stopPropagation());function re(n){if(!t.contains(n.target))$e()}function tt(){let{x:n,y:w,w:M,h:D}=s(),{innerWidth:W,innerHeight:Le}=window,Ie=Ut(ge),Q=n+M/2-Ie/2;Q=Math.max(ye,Math.min(Q,W-Ie-ye)),t.style.left=`${Q}px`,t.style.top="0px",t.style.visibility="hidden",t.style.transform="scale(1)",t.style.display="flex";let ve=t.offsetHeight;ee=ve,t.style.visibility="",t.style.transform="",t.style.display="";let De,rt=!1;if(w-ve-ye>=ye)De=w-ve-ye;else De=w+D+ye,rt=!0;De=Math.max(ye,Math.min(De,Le-ve-ye)),t.style.left=`${Q}px`,t.style.top=`${De}px`;let Ve=n+M/2-Q,xt=rt?-ye:ve+ye;t.style.transformOrigin=`${Ve}px ${xt}px`}function Oe(){if(!z||!ee)return;let{x:n,y:w,w:M,h:D}=s(),{innerWidth:W,innerHeight:Le}=window,Ie=Ut(ge),Q=n+M/2-Ie/2;Q=Math.max(ye,Math.min(Q,W-Ie-ye));let ve,De=!1;if(w-ee-ye>=ye)ve=w-ee-ye;else ve=w+D+ye,De=!0;ve=Math.max(ye,Math.min(ve,Le-ee-ye)),t.style.left=`${Q}px`,t.style.top=`${ve}px`;let rt=n+M/2-Q,Ve=De?-ye:ee+ye;t.style.transformOrigin=`${rt}px ${Ve}px`}function we(){if(!document.body.contains(t))document.body.appendChild(t);if(tt(),t.classList.remove("open","closing"),t.offsetHeight,t.classList.add("open"),z=!0,ke)We();setTimeout(()=>document.addEventListener("click",re),0)}function $e(){if(!z)return;z=!1,document.removeEventListener("click",re),Pe(),tt(),t.classList.remove("open"),t.classList.add("closing");let n=()=>{t.classList.remove("closing"),t.removeEventListener("transitionend",n)};t.addEventListener("transitionend",n),setTimeout(n,250)}function Je(n,w){if(me=n,Ge=w,fe){Fe={state:n,connected:w};return}if(!w||!n){he=!1,Ue=!1,o.setUrl(null),k.style.display="none",E.style.display="none",U.style.display="none",R.style.display="none",ne.style.display="none",V.style.display="none",H.style.display="none",be=!1,q.style.display="",q.textContent=!w?"Connect to Subsonic in Settings":"No active playback",T=0,S.style.width="0%",L.textContent=mt(0),b.textContent=mt(0),Pe();return}k.style.display="",E.style.display="";let M=_e();if(R.style.display=M?"flex":"none",R.hidden=!M,B.disabled=!M,_.disabled=!M,ie.disabled=!M,ne.hidden=!0,ne.style.display="none",q.style.display="none",n.deviceName)J.textContent=n.deviceName,V.style.display="",de=n.deviceId??null;else V.style.display="none";if(d.textContent=n.trackName,y.textContent=n.artistName,u.textContent=n.albumName,T=n.durationMs,o.setUrl(je(n.albumArtUrl,n.trackUri)),I=n.isPlaying,ke=n.isPlaying,_.innerHTML=I?Si:ai,!he){Ne=n.progressMs,ce=Date.now();let D=n.durationMs>0?n.progressMs/n.durationMs*100:0;S.style.width=`${D}%`,L.textContent=mt(n.progressMs)}if(b.textContent=mt(n.durationMs),n.volume!==null&&!Ue)F.value=String(n.volume);if(z&&I)We();else Pe();Be()}function ot(n,w,M,D){Me=n,ae=pt(M),oe=Ui(w),Ae=D,X=!1,ue=-1,Be(!0)}function Ze(n){if(X=n,n)Me=me?.trackUri??null,ae=[],oe=[],Ae=!1,ue=-1;Be(!0)}function ft(n){if(ge=n,t.dataset.style=n,t.style.setProperty("--spotify-mini-player-width",`${Ut(n)}px`),Be(!0),z)tt()}function it(n){if(fe){Se=n;return}if(H.innerHTML="",n.length===0){H.innerHTML='<div class="spotify-mini-device-loading">No devices found</div>';return}for(let w of n){let M=document.createElement("div");if(M.className=`spotify-mini-device-item${w.isActive?" active":""}`,M.innerHTML=`<span class="spotify-mini-device-item-name">${w.name}</span><span class="spotify-mini-device-item-type">${w.type}</span>`,!w.isActive)M.addEventListener("click",(D)=>{D.stopPropagation(),e({type:"transfer_playback",deviceId:w.id}),H.style.display="none",be=!1});H.appendChild(M)}}function g(n){if(fe){K=n;return}F.value=String(n)}return{root:t,update:Je,updateLyrics:ot,setLyricsLoading:Ze,setLyricsUpdateSuspended(n){if(te=n,!n)Ce()},setUiSuspended(n){if(fe=n,te=n,n){Pe();return}if(Re(),z&&ke)We()},setStyle:ft,setDevices:it,setVolume:g,onVolumeChange(n){le.add(n)},toggle(){if(z)$e();else we()},hide:$e,isOpen:()=>z,reposition:Oe,destroy(){$e(),Pe(),He(),Ke(),le.clear(),t.remove()}}}var Ri='<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',pi='<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',_i='<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>',Hi='<svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',Oi='<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>',Di='<svg viewBox="0 0 24 24"><path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',Fi='<svg viewBox="0 0 24 24"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',Rt='<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',qi=4000;function Nt(e){let i=Math.floor(e/1000),s=Math.floor(i/60),t=i%60;return`${s}:${t.toString().padStart(2,"0")}`}function Bi(e){if(!e)return[];return e.split(/\r?\n/).map((i)=>i.trim()).filter(Boolean)}function at(e){e.addEventListener("pointerdown",(i)=>i.stopPropagation()),e.addEventListener("pointermove",(i)=>i.stopPropagation()),e.addEventListener("pointerup",(i)=>i.stopPropagation()),e.addEventListener("touchstart",(i)=>i.stopPropagation(),{passive:!0}),e.addEventListener("touchmove",(i)=>i.stopPropagation(),{passive:!0}),e.addEventListener("touchend",(i)=>i.stopPropagation(),{passive:!0}),e.addEventListener("click",(i)=>i.stopPropagation())}function _t(e){let i=document.createElement("div");i.className=`${e} spotify-modern-widget-marquee`,i.dataset.marqueePhase="idle";let s=document.createElement("div");s.className=`${e}-content spotify-modern-widget-marquee-content`,i.appendChild(s);let t=null;function o(){if(t)clearTimeout(t),t=null;i.dataset.marqueePhase="idle",s.classList.remove("spotify-modern-widget-marquee-animate")}function a(y){if(i.dataset.marqueePhase="scrolling",s.classList.remove("spotify-modern-widget-marquee-animate"),y)s.offsetWidth;s.classList.add("spotify-modern-widget-marquee-animate")}function d(y){if(t)clearTimeout(t),t=null;i.dataset.marqueePhase="rest",s.classList.remove("spotify-modern-widget-marquee-animate"),t=setTimeout(()=>{t=null,a(y)},qi)}return s.addEventListener("animationend",(y)=>{if(y.animationName!=="spotify-modern-marquee"||i.dataset.marqueePhase!=="scrolling")return;d(!0)}),{root:i,setText(y){s.textContent=y,i.setAttribute("aria-label",y)},refresh(y,u=!1){if(!y){i.dataset.overflow="false",o(),i.style.removeProperty("--spotify-modern-marquee-distance"),i.style.removeProperty("--spotify-modern-marquee-duration");return}let c=Math.ceil(s.scrollWidth-i.clientWidth);if(c<=6){i.dataset.overflow="false",o(),i.style.removeProperty("--spotify-modern-marquee-distance"),i.style.removeProperty("--spotify-modern-marquee-duration");return}i.dataset.overflow="true",i.style.setProperty("--spotify-modern-marquee-distance",`${c}px`),i.style.setProperty("--spotify-modern-marquee-duration",`${Math.max(8,Math.min(20,8+c/18))}s`);let l=t!==null,h=i.dataset.marqueePhase==="scrolling";if(u||!l&&!h)d(u)}}}function mi(e,i,s,t=nt()){let o=document.createElement("div");o.className="spotify-modern-widget-player",o.dataset.expanded="false",o.dataset.transport="false";let a=document.createElement("div");a.className="spotify-modern-widget-compact";let d=Ye("spotify-modern-widget-compact-art"),y=document.createElement("div");y.className="spotify-modern-widget-compact-fallback",y.innerHTML=Rt;let u=document.createElement("div");u.className="spotify-modern-widget-compact-overlay";let c=document.createElement("div");c.className="spotify-modern-widget-compact-status";let l=document.createElement("div");l.className="spotify-modern-widget-compact-progress",u.appendChild(c),a.appendChild(d.el),a.appendChild(y),a.appendChild(u),a.appendChild(l);let h=document.createElement("div");h.className="spotify-modern-widget-expanded";let E=document.createElement("div");E.className="spotify-modern-widget-header";let L=document.createElement("div");L.className="spotify-modern-widget-eyebrow",L.textContent="Now Playing";let P=document.createElement("div");P.className="spotify-modern-widget-header-buttons";let S=document.createElement("button");S.className="spotify-modern-widget-icon-btn",S.innerHTML=Di,S.title="Open full player";let b=document.createElement("button");b.className="spotify-modern-widget-icon-btn",b.innerHTML=Fi,b.title="Collapse",at(S),at(b),S.addEventListener("click",()=>i()),b.addEventListener("click",()=>s()),P.appendChild(S),P.appendChild(b),E.appendChild(L),E.appendChild(P);let R=document.createElement("div");R.className="spotify-modern-widget-hero";let v=Ye("spotify-modern-widget-art");v.el.title="Collapse";let B=document.createElement("div");B.className="spotify-modern-widget-art-fallback",B.innerHTML=Rt,B.title="Collapse",at(v.el),at(B),v.el.addEventListener("click",()=>s()),B.addEventListener("click",()=>s());let _=document.createElement("div");_.className="spotify-modern-widget-meta";let ie=_t("spotify-modern-widget-track"),ne=_t("spotify-modern-widget-artist"),A=_t("spotify-modern-widget-album");_.appendChild(ie.root),_.appendChild(ne.root),_.appendChild(A.root),R.appendChild(v.el),R.appendChild(B),R.appendChild(_);let F=document.createElement("div");F.className="spotify-modern-widget-progress-row";let V=document.createElement("span");V.className="spotify-modern-widget-time";let Y=document.createElement("div");Y.className="spotify-modern-widget-progress-bar";let J=document.createElement("div");J.className="spotify-modern-widget-progress-fill",Y.appendChild(J);let G=document.createElement("span");G.className="spotify-modern-widget-time",F.appendChild(V),F.appendChild(Y),F.appendChild(G);let H=document.createElement("div");H.className="spotify-modern-widget-lyrics",H.dataset.blur="true";let q=document.createElement("div");q.className="spotify-modern-widget-section-label",q.textContent="Lyrics";let k=document.createElement("div");k.className="spotify-modern-widget-lyrics-body";let U=document.createElement("div");U.className="spotify-modern-widget-lyrics-track",k.appendChild(U),H.appendChild(q),H.appendChild(k);let C=document.createElement("div");C.className="spotify-modern-widget-controls";let j=document.createElement("button");j.className="spotify-modern-widget-btn",j.innerHTML=Ri;let f=document.createElement("button");f.className="spotify-modern-widget-btn spotify-modern-widget-btn-main",f.innerHTML=pi;let x=document.createElement("button");x.className="spotify-modern-widget-btn",x.innerHTML=Hi,C.appendChild(j),C.appendChild(f),C.appendChild(x);let I=document.createElement("div");I.className="spotify-modern-widget-volume-row";let T=document.createElement("span");T.className="spotify-modern-widget-volume-icon",T.innerHTML=Oi;let z=document.createElement("input");z.type="range",z.min="0",z.max="100",z.value="50",z.className="spotify-modern-widget-volume-slider",I.appendChild(T),I.appendChild(z);let ee=document.createElement("div");ee.className="spotify-modern-widget-empty";let ge=document.createElement("div");ge.className="spotify-modern-widget-empty-icon",ge.innerHTML=Rt;let me=document.createElement("div");me.className="spotify-modern-widget-empty-title",me.textContent="No music playing.";let Ge=document.createElement("div");Ge.className="spotify-modern-widget-empty-subtitle",Ge.textContent="Your speakers are enjoying a brief moment of mindfulness.",ee.appendChild(ge),ee.appendChild(me),ee.appendChild(Ge),h.appendChild(E),h.appendChild(R),h.appendChild(F),h.appendChild(H),h.appendChild(C),h.appendChild(I),h.appendChild(ee),o.appendChild(a),o.appendChild(h),[Y,j,f,x,z].forEach((g)=>at(g)),at(k);let Ne=!1,ce=null,ke=!1,pe=0,Me=null,ae=null,oe=St(void 0,t),Ae=[],X=!1,ue=!1,te="",O=[],fe=-1,Fe=t.getRevision(),Se=kt(k,()=>He());H.appendChild(Se.returnButton),at(Se.returnButton);let K=Se.autoScroll,he=Mt(k),Ue="",xe=null,ze=null,Ce=!1,Re=!1,Xe=new ResizeObserver(()=>{qe(!1)});Xe.observe(_),Xe.observe(o);function qe(g){requestAnimationFrame(()=>{ie.refresh(ke,g),ne.refresh(ke,g),A.refresh(ke,g)})}function Qe(g){if(xe)clearTimeout(xe);if(ze)clearTimeout(ze);qe(g),xe=setTimeout(()=>qe(g),180),ze=setTimeout(()=>qe(g),460)}function et(g){d.setUrl(g),y.style.display=g?"none":"flex"}function Be(g){v.setUrl(g),B.style.display=g?"none":"flex"}function Z(){return t.getProgressMs()}function We(g,n){l.style.setProperty("--spotify-modern-widget-compact-progress",`${Math.max(0,Math.min(100,g))}%`),l.style.opacity=n?"1":"0"}function Pe(){K.cancel(),he.cancel(),Se.reset(),ct(k,0,!1),U.innerHTML="",k.scrollTop=0,O=[],fe=-1}function _e(){Pe(),O=oe.getIndexedLines().map((n,w)=>{let M=document.createElement("div");M.className="spotify-lyric-line-anchor";let D=document.createElement("div");D.className="spotify-modern-widget-lyric-line spotify-modern-widget-lyric-line-enter",D.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(w*22,110)}ms`);let W=document.createElement("div");if(W.className="spotify-modern-widget-lyric-text",n.hasText)W.textContent=n.displayText;else D.classList.add("blank"),W.appendChild(Ct());return D.appendChild(W),M.appendChild(D),U.appendChild(M),{index:n.index,anchorEl:M,el:D}}),Se.setLines(O.map((n)=>n.anchorEl))}function He(){if(!ke||!oe.hasLyrics())return!1;let g=oe.getActiveLineIndex(),n=g>=0?O[g]:O[0],w=he.setCadence(oe.getTimeUntilNextLineMs());return n?K.center(n.anchorEl,{timeConstantMs:w.scrollTimeConstantMs}):!1}function le(g=!0){let n=oe.getActiveLineIndex(),w=fe,M=Fe!==t.getRevision();if(Fe=t.getRevision(),M)K.resume();if(fe=n,he.setCadence(oe.getTimeUntilNextLineMs()),oe.getIndexedLines().forEach((Le,Ie)=>{let Q=O[Ie]?.el;if(!Q)return;if(Q.className="spotify-modern-widget-lyric-line",!Le.hasText)Q.classList.add("blank");if(Le.index===n)Q.classList.add("active");else if(n>=0){Q.classList.add(Le.index<n?"past":"future");let ve=Math.abs(Le.index-n);if(ve===1)Q.classList.add("near");else if(ve===2)Q.classList.add("mid");else Q.classList.add("far")}else Q.classList.add("far")}),!g)return;if(He()&&!M&&t.isPlaying()&&w!==n)he.play(O,w,n);else if(M||w!==n)he.cancel()}function Ke(){if(Pe(),!Ne||!ce){te="";let n=document.createElement("div");n.className="spotify-modern-widget-lyrics-status",n.textContent=Ne?"Start playback to see lyrics":"Connect Subsonic to see lyrics",U.appendChild(n);return}if(ue){te="loading";let n=document.createElement("div");n.className="spotify-modern-widget-lyrics-status spotify-modern-widget-lyrics-status-loading",n.textContent="Loading lyrics...",U.appendChild(n);return}if(X){te="instrumental";let n=document.createElement("div");n.className="spotify-modern-widget-lyrics-status",n.textContent="♪ Instrumental",U.appendChild(n);return}if(oe.hasLyrics()&&ce.trackUri===ae){te=oe.getIndexedLines().map((w)=>`${w.index}:${w.text}`).join("|"),_e(),le(!1),He(),de();return}if(Ae.length>0){let n=Ae.join("|"),w=n!==te;te=n,Ae.forEach((M,D)=>{let W=document.createElement("div");if(W.className="spotify-modern-widget-lyric-line plain",w)W.classList.add("spotify-modern-widget-lyric-line-enter"),W.style.setProperty("--spotify-modern-lyric-enter-delay",`${Math.min(D*20,100)}ms`);W.textContent=M,U.appendChild(W)});return}te="empty";let g=document.createElement("div");g.className="spotify-modern-widget-lyrics-status",g.textContent="No lyrics available",U.appendChild(g)}function be(g=!1){if(!ce||ce.trackUri!==ae||!oe.hasLyrics()){if(g)Ke();return}if(oe.refreshActiveLineIndex(),g){Ke();return}if(fe!==oe.getActiveLineIndex()||Fe!==t.getRevision())le(!0);ct(k,oe.getTimeUntilNextLineMs(),oe.getActiveLine()?.hasText===!1)}function de(){let g=ce?.trackUri===t.getTrackUri();if(k.dataset.playing=String(g&&t.isPlaying()),!g||!Ne){Oe(),he.cancel();return}if(!Ce)be();if(t.isPlaying())tt();else Oe()}function re(){if(!ce||!Ne||!t.isPlaying()){Me=null;return}if(Ce){Me=requestAnimationFrame(re);return}let g=Z(),n=pe>0?g/pe*100:0;J.style.width=`${n}%`,We(n,pe>0),V.textContent=Nt(g),be(),Me=requestAnimationFrame(re)}function tt(){if(Me!==null)return;Me=requestAnimationFrame(re)}function Oe(){if(Me!==null)cancelAnimationFrame(Me),Me=null}function we(){return ce?.source==="feishin"||ce?.source==="jukebox"}j.addEventListener("click",()=>{if(we())e({type:"previous"})}),x.addEventListener("click",()=>{if(we())e({type:"next"})}),f.addEventListener("click",()=>{if(we())e({type:ce?.isPlaying?"pause":"play"})});let $e=Tt(Y,{getMaxValue:()=>pe,onInteractChange(g){Ce=g},onPreview(g){let n=pe>0?g/pe*100:0;J.style.width=`${n}%`,We(n,pe>0),V.textContent=Nt(g)},onCommit(g){if(ce)ce={...ce,progressMs:g};if(t.update(ce,{seek:!0}),be(),e({type:"seek",positionMs:g}),t.isPlaying())tt()},stopPropagation:!0}),Je=Pt(z,{onInteractChange(g){Re=g},onCommit(g){e({type:"set_volume",percent:g})},stopPropagation:!0});function ot(g,n){if(ce?.trackUri!==g?.trackUri)Ce=!1;if(ce=g,Ne=n,o.dataset.empty=!g?"true":"false",!n||!g){Ce=!1,Re=!1,L.textContent=n?"Standby":"Connect Subsonic",c.textContent=n?"No playback":"Connect Subsonic",ee.style.display="grid",R.style.display="none",F.style.display="none",H.style.display="none",C.style.display="none",I.style.display="none",We(0,!1),et(null),Be(null),t.update(null),k.dataset.playing="false",Ue="",Oe(),Ke();return}L.textContent="Now Playing";let w=je(g.albumArtUrl,g.trackUri);et(w),Be(w),c.textContent=g.isPlaying?"Playing":"Paused";let M=`${g.trackName}|${g.artistName}|${g.albumName}`,D=M!==Ue;Ue=M,ie.setText(g.trackName),ne.setText(g.artistName),A.setText(g.albumName),R.style.display="grid",F.style.display="grid",H.style.display="grid",ee.style.display="none",pe=g.durationMs;let W=we(),Le=o.dataset.transport!==String(W);if(o.dataset.transport=String(W),C.style.display=W?"flex":"none",C.hidden=!W,j.disabled=!W,f.disabled=!W,x.disabled=!W,I.hidden=!0,I.style.display="none",t.update(g),f.innerHTML=g.isPlaying?_i:pi,!Re)z.value=String(g.volume??Number(z.value));if(!Ce){let Ie=Z(),Q=g.durationMs>0?Ie/g.durationMs*100:0;J.style.width=`${Q}%`,We(Q,g.durationMs>0),V.textContent=Nt(Ie)}if(G.textContent=Nt(g.durationMs),oe.hasLyrics()&&g.trackUri===ae)if(O.length===0)Ke();else be();else if(U.childElementCount===0)Ke();if(Le&&oe.hasLyrics()&&g.trackUri===ae)requestAnimationFrame(()=>requestAnimationFrame(()=>le(!0)));Qe(D),de()}function Ze(g,n,w,M){ae=g;let D=pt(w);oe.setLyrics(D),Ae=Bi(n),X=M,ue=!1,be(!0)}function ft(g){if(ue=g,g)ae=ce?.trackUri??null,oe.clear(),Ae=[],X=!1;Ke()}let it=t.subscribe(de);return{root:o,update:ot,updateLyrics:Ze,setLyricsLoading:ft,setLyricsBlur(g){H.dataset.blur=String(g)},setAutoScrollSuspended(g){if(g)he.cancel();if(K.suspend(g)&&!g&&oe.hasLyrics())le(!0)},setCollapsedSize(g){o.style.setProperty("--spotify-modern-widget-collapsed-size",`${g}px`)},setExpanded(g){if(ke=g,!g)K.cancel(),he.cancel();if(o.dataset.expanded=String(g),Qe(!0),g)requestAnimationFrame(()=>He())},isExpanded(){return ke},destroy(){if(it(),Oe(),Se.destroy(),he.destroy(),$e(),Je(),xe)clearTimeout(xe);if(ze)clearTimeout(ze);Xe.disconnect(),d.destroy(),v.destroy(),o.remove()}}}var Ht="right",Wi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',$i='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';function Vi(e){try{return new Date(e).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return""}}function ui(e,i){let s=new Map,t=new Map,o=new Map,a=null,d=null,y=null,u=null,c=null,l=null,h=null,E=null,L=null,P=null;function S(f){return s.get(f)?.get(t.get(f)??0)??null}function b(f){return(s.get(f)?.size??0)>0}function R(f){let x=o.get(f);if(x)x.style.display=S(f)?"":"none"}function v(f){if(!b(f))return;let x=o.get(f);if(!x||!x.isConnected){let I=e.dom.findMessageElement(f);if(!I)return;let T=e.dom.inject(I,`<button type="button" class="spotify-song-badge" aria-label="Song that was playing" title="Song that was playing">${Wi}</button>`,"beforeend");T.classList.add("spotify-song-badge-wrap"),T.dataset.corner=Ht,T.addEventListener("click",(z)=>{z.stopPropagation(),z.preventDefault(),G(f,T)}),o.set(f,T),x=T}R(f)}function B(){for(let{messageId:f}of e.dom.listMessageElements())if(b(f))v(f)}function _(){if(d)return;d=document.createElement("div"),d.className="spotify-song-pop";let f=document.createElement("div");f.className="spotify-song-pop-header",f.textContent="Playing when generated";let x=document.createElement("div");x.className="spotify-song-pop-body",y=Ye("spotify-song-pop-art"),y.el.style.display="";let I=document.createElement("div");I.className="spotify-song-pop-info",u=document.createElement("div"),u.className="spotify-song-pop-track",c=document.createElement("div"),c.className="spotify-song-pop-artist",l=document.createElement("div"),l.className="spotify-song-pop-album",h=document.createElement("div"),h.className="spotify-song-pop-when",I.append(u,c,l,h),x.append(y.el,I);let T=document.createElement("div");T.className="spotify-song-pop-actions",E=document.createElement("button"),E.type="button",E.className="spotify-song-pop-btn spotify-song-pop-btn-primary",E.innerHTML=`${$i}<span>Play</span>`,E.addEventListener("click",(z)=>{z.stopPropagation();let ee=L?S(L):null;if(ee?.trackUri)i({type:"play",trackUri:ee.trackUri});J()}),T.appendChild(E),d.append(f,x,T),d.addEventListener("click",(z)=>z.stopPropagation()),document.body.appendChild(d)}function ie(f){if(_(),!f){if(y?.setUrl(null),u)u.textContent="No track playing";if(c)c.textContent="";if(l)l.textContent="Nothing was playing when this version was written.";if(h)h.textContent="";if(E)E.style.display="none";return}if(y?.setUrl(je(f.albumArtUrl,f.trackUri)),u)u.textContent=f.trackName;if(c)c.textContent=f.artistName;if(l)l.textContent=f.albumName;if(h)h.textContent=Vi(f.capturedAt);if(E)E.style.display=""}function ne(f){if(!d)return;let x=f.getBoundingClientRect(),I=d.offsetWidth||280,T=d.offsetHeight||200,z=8,ee=x.top-T-8,ge="bottom";if(ee<z)ee=x.bottom+8,ge="top";let me=Ht==="right"?x.right-I:x.left;me=Math.max(z,Math.min(me,window.innerWidth-I-z)),ee=Math.max(z,Math.min(ee,window.innerHeight-T-z)),d.style.left=`${me}px`,d.style.top=`${ee}px`,d.style.transformOrigin=`${ge} ${Ht}`}function A(f){let x=f.target;if(!(x instanceof Node))return;if(d?.contains(x)||P?.contains(x))return;J()}function F(){J()}function V(f){if(f.key==="Escape")J()}function Y(f,x){ie(S(f)),L=f,P=x,d.classList.add("open"),ne(x),setTimeout(()=>{document.addEventListener("click",A,!0),window.addEventListener("scroll",F,!0),window.addEventListener("resize",F,!0),document.addEventListener("keydown",V,!0)},0)}function J(){if(!d||!L)return;d.classList.remove("open"),L=null,P=null,document.removeEventListener("click",A,!0),window.removeEventListener("scroll",F,!0),window.removeEventListener("resize",F,!0),document.removeEventListener("keydown",V,!0)}function G(f,x){if(L===f)J();else{if(L)J();Y(f,x)}}function H(f,x){if(f!==a)C();a=f;let I=new Set(x.map((T)=>T.messageId));for(let T of[...s.keys()])if(!I.has(T))U(T);for(let T of x){let z=new Map;for(let[ee,ge]of Object.entries(T.bySwipe))z.set(Number(ee),ge);s.set(T.messageId,z),t.set(T.messageId,T.activeSwipe),v(T.messageId)}B()}function q(f,x,I,T){if(a&&f!==a)return;a=f;let z=s.get(x)??new Map;if(z.set(I,T),s.set(x,z),t.set(x,I),v(x),L===x)ie(S(x))}function k(f,x){if(t.set(f,x),R(f),L===f){let I=S(f);if(I)ie(I);else J()}}function U(f){if(L===f)J();s.delete(f),t.delete(f);let x=o.get(f);if(x){try{e.dom.uninject(x)}catch{}o.delete(f)}}function C(){J();for(let f of o.values())try{e.dom.uninject(f)}catch{}o.clear(),s.clear(),t.clear(),a=null}function j(){C(),y?.destroy(),d?.remove(),d=null}return{setChatSongs:H,setMessageSong:q,decorate:v,decorateMounted:B,setActiveSwipe:k,removeMessage:U,reset:C,destroy:j}}var ji={width:320,height:196},Yi={width:348,height:520};var fi={width:300,height:420};function yi({desktopPopout:e,hasPlayback:i,viewportHeight:s,viewportWidth:t}){let o=i?Yi:ji;if(e)return{...o};if(!i)return{width:Math.max(280,Math.min(o.width,t-24)),height:o.height};return{width:Math.max(fi.width,Math.min(o.width,t-24)),height:Math.max(fi.height,Math.min(o.height,s-24))}}var gi='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',ut=12,hi="subsonic-controls-widget-prefs";function vi(e){let i=[],s="__TAURI_INTERNALS__"in window&&new URLSearchParams(window.location.search).has("desktopWidgetExtension");i.push(e.dom.addStyle(Jt));let t=(r)=>e.sendToBackend(r),o=null,a=0,d=null,y=new Map,u=48,c=new Map;function l(r){if(/^(data|blob):/i.test(r))return Promise.resolve(r);return new Promise((p)=>{let m=crypto.randomUUID(),N=setTimeout(()=>{c.delete(m),p(null)},15000);c.set(m,{resolve:p,timer:N}),e.sendToBackend({type:"__cors_proxy_request",requestId:m,url:r,options:{method:"GET",mediaType:"image"}})})}function h(r,p){let m=c.get(r);if(!m)return;c.delete(r),clearTimeout(m.timer);let N=p?.headers?.["content-type"]||p?.headers?.["Content-Type"]||"image/jpeg";m.resolve(p?.status&&p.status>=200&&p.status<300&&p.encoding==="base64"&&p.body?`data:${N};base64,${p.body}`:null)}function E(){if(d)clearTimeout(d);d=null}function L(){E(),a+=1,t({type:"album_colors",colors:null})}function P(r,p){y.delete(r),y.set(r,p);while(y.size>u){let m=y.keys().next().value;if(!m)break;y.delete(m)}}function S(r=1800){E(),d=setTimeout(()=>{d=null,L()},r)}function b(r){return new Promise((p)=>{let m=new Image;m.onload=()=>{try{let N=document.createElement("canvas"),se=32;N.width=32,N.height=32;let Ee=N.getContext("2d");if(!Ee)return p(null);Ee.drawImage(m,0,0,32,32);let Te=Ee.getImageData(0,0,32,32).data,wt=0,lt=0,Dt=0.5,Ft=-1,qt=0,Bt=0,Wt=0,Et=0;for(let yt=0;yt<Te.length;yt+=4){let Yt=Te[yt],Gt=Te[yt+1],Xt=Te[yt+2];qt+=Yt,Bt+=Gt,Wt+=Xt,Et+=1;let gt=Yt/255,dt=Gt/255,ht=Xt/255,st=Math.max(gt,dt,ht),vt=Math.min(gt,dt,ht),zt=(st+vt)/2,Lt=0,It=0;if(st!==vt){let bt=st-vt;if(It=zt>0.5?bt/(2-st-vt):bt/(st+vt),st===gt)Lt=((dt-ht)/bt+(dt<ht?6:0))/6;else if(st===dt)Lt=((ht-gt)/bt+2)/6;else Lt=((gt-dt)/bt+4)/6}let Kt=It*(1-Math.abs(zt-0.5)*1.6);if(Kt>Ft)Ft=Kt,wt=Lt,lt=It,Dt=zt}let $t=Math.round(qt/Et),Vt=Math.round(Bt/Et),jt=Math.round(Wt/Et),Ei=0.299*$t+0.587*Vt+0.114*jt;p({dominant:{r:$t,g:Vt,b:jt},dominantHsl:{h:Math.round(wt*360),s:Math.round(lt*100),l:Math.round(Dt*100)},isLight:Ei>152})}catch{p(null)}},m.onerror=()=>p(null),l(r).then((N)=>{if(N)m.src=N;else p(null)})})}let R="none",v=Zt(t);e.ui.mount("settings_extensions").appendChild(v.root),i.push(()=>v.destroy());let _=e.ui.registerDrawerTab({id:"subsonic",title:"Subsonic Controls",shortName:"Subsonic",description:"Browse a Subsonic-compatible music server and control its optional Jukebox.",keywords:["subsonic","opensubsonic","music","jukebox","lyrics"],headerTitle:"Subsonic",iconSvg:gi});i.push(()=>_.destroy()),_.root.classList.add("spotify-tab-root");let ie=document.createElement("div");ie.className="spotify-panel",_.root.appendChild(ie);function ne(){let r=_.root.getBoundingClientRect().top,p=_.root.parentElement?.getBoundingClientRect().bottom??window.innerHeight,m=window.visualViewport?.height??window.innerHeight,N=Math.min(p,m);_.root.style.setProperty("--spotify-tab-height",`${Math.max(240,N-r-2)}px`)}ne();let A=new ResizeObserver(ne);A.observe(_.root),window.addEventListener("resize",ne),i.push(()=>{A.disconnect(),window.removeEventListener("resize",ne)});let F=Qt(),V=ei(t),Y=ti(t),J=nt(),G=si(J);ie.append(F.root,V.root,Y.root,G.root),i.push(()=>F.destroy(),()=>V.destroy(),()=>Y.destroy(),()=>G.destroy());let H=!1,q=null,k=null,U=!1,C="",j="",f=!1,x="",I="",T=!1,z=1000,ee=null,ge={small:36,medium:48,large:64},me={small:112,medium:128,large:144},Ge=24,Ne=256,ce=96,ke=256;function pe(r){return r==="modern"?me:ge}function Me(r){return r==="modern"?{min:ce,max:ke}:{min:Ge,max:Ne}}function ae(r,p){let{min:m,max:N}=Me(p);return Math.max(m,Math.min(r,N))}function oe(r){return r==="small"||r==="medium"||r==="large"||r==="custom"}function Ae(r,p){let m=pe(p);if(r===m.small)return"small";if(r===m.large)return"large";return r===m.medium?"medium":"custom"}let X=48,ue="circle",te="medium",O="default",fe=!0,Fe,Se=null;try{let r=JSON.parse(localStorage.getItem(hi)||"null");if(r?.miniPlayerStyle==="modern")O="modern";if(r?.lyricsBlur===!1)fe=!1;if(typeof r?.size==="number")X=ae(r.size,O);if(r?.shape==="squircle")ue="squircle";if(te=oe(r?.sizeMode)?r.sizeMode:Ae(X,O),te!=="custom")X=pe(O)[te];if(typeof r?.x==="number"&&typeof r.y==="number")Fe={x:r.x,y:r.y};if(r)Se={size:X,shape:ue,sizeMode:te,miniPlayerStyle:O,lyricsBlur:fe,...Fe}}catch{}let K,he=null,Ue=!1;function xe(){let r=K.getPosition(),p={size:X,shape:ue,sizeMode:te,miniPlayerStyle:O,lyricsBlur:fe,x:r.x,y:r.y};Ue=!0,localStorage.setItem(hi,JSON.stringify(p)),t({type:"set_widget_preferences",preferences:p})}let ze=null,Ce=null,Re=null;function Xe(){let{min:r,max:p}=Me(O);if(ze)ze.textContent=O==="modern"?"Collapsed Modern Player Size (px)":"Custom Widget Size (px)";if(Ce)Ce.textContent=O==="modern"?`Controls the compact size of the modern player before it expands (${r}–${p}px).`:`Controls the floating widget size (${r}–${p}px).`;if(Re)Re.min=String(r),Re.max=String(p),Re.placeholder=O==="modern"?"e.g. 128":"e.g. 56",Re.value=te==="custom"?String(X):""}let qe=v.root.querySelector(".spotify-settings-card-body");if(qe){let r=document.createElement("div");r.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let p=document.createElement("label");p.className="spotify-settings-label",ze=document.createElement("span"),Ce=document.createElement("div"),Ce.style.cssText="font-size:0.8em;opacity:0.6;margin-top:2px";let m=document.createElement("div");m.className="spotify-settings-row";let N=document.createElement("input");N.className="spotify-input",N.type="number",N.step="1",N.style.width="80px",Re=N;let se=document.createElement("button");se.type="button",se.className="spotify-btn spotify-btn-primary",se.textContent="Apply",se.style.cssText="font-size:0.85em;padding:4px 12px";let Ee=()=>{let Te=N.valueAsNumber;if(!Number.isFinite(Te))return;te="custom",n(ae(Math.round(Te),O))};se.addEventListener("click",Ee),N.addEventListener("keydown",(Te)=>{if(Te.key!=="Enter")return;Te.preventDefault(),Ee()}),m.append(N,se),p.append(ze,m,Ce),qe.append(r,p)}Xe();let Qe=null;function et(){if(Qe)Qe.checked=fe}function Be(){G.setBlurEnabled(fe),de.setLyricsBlur(fe),et()}if(qe){let r=document.createElement("div");r.style.cssText="height:1px;background:var(--lumiverse-border);margin:4px 0";let p=document.createElement("label");p.className="spotify-settings-check";let m=document.createElement("input");m.type="checkbox",m.checked=fe,Qe=m;let N=document.createElement("span");N.textContent="Lyrics blur",p.append(m,N);let se=document.createElement("div");se.style.cssText="font-size:0.8em;opacity:0.65;margin-top:4px",se.textContent="Softens distant synced lyrics. Turn off for crisp text.";let Ee=document.createElement("div");Ee.append(p,se),m.addEventListener("change",()=>{fe=m.checked,Be(),xe()}),qe.append(r,Ee)}let Z=document.createElement("div");Z.className="spotify-float-widget";function We(){Z.classList.remove("spotify-float-widget-mounted"),requestAnimationFrame(()=>requestAnimationFrame(()=>Z.classList.add("spotify-float-widget-mounted")))}let Pe=document.createElement("div");Pe.className="spotify-float-widget-legacy";let _e=document.createElement("div");_e.className="spotify-float-widget-icon",_e.innerHTML=gi;let He=Ye("spotify-float-widget-art");He.el.style.display="none",Pe.append(_e,He.el),Z.appendChild(Pe);let le=!1,Ke=420,be=null,de=mi(t,()=>_.activate(),()=>ot(!1),J);Z.appendChild(de.root);let re=ci(t,()=>_.activate(),()=>{let r=K.root.getBoundingClientRect();return{x:r.left,y:r.top,w:r.width,h:r.height}});re.setStyle("default");function tt(){return yi({desktopPopout:s,hasPlayback:Boolean(q),viewportHeight:window.innerHeight,viewportWidth:window.innerWidth})}function Oe(r=le){if(O==="modern")return r?tt():{width:X,height:X};return{width:X,height:X}}function we(r=Oe()){let p=K.getPosition(),m=Math.max(ut,window.innerWidth-r.width-ut),N=Math.max(ut,window.innerHeight-r.height-ut),se=Math.max(ut,Math.min(p.x,m)),Ee=Math.max(ut,Math.min(p.y,N));if(se!==p.x||Ee!==p.y)K.moveTo(se,Ee)}function $e(r,p=!1){if(be)clearTimeout(be);let m=()=>{be=null,K.setSize(r.width,r.height)};if(p)be=setTimeout(m,Ke);else m()}function Je({delaySizeRequest:r=!1}={}){let p=Oe(),m=O==="modern"&&le?"pan-y":"none";if(K.root.style.touchAction=m,K.root.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)",Z.style.transition="width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1), border-radius 420ms cubic-bezier(0.22, 1, 0.36, 1)",Z.style.touchAction=m,de.setCollapsedSize(X),O==="modern")Z.classList.add("spotify-float-widget-modern-mode"),Pe.style.display="none",de.root.style.display="block",K.root.style.width=`${p.width}px`,K.root.style.height=`${p.height}px`,Z.style.width=`${p.width}px`,Z.style.height=`${p.height}px`,Z.style.borderRadius=le?"30px":`${Math.max(18,Math.round(X*0.28))}px`,$e(p,r);else{Z.classList.remove("spotify-float-widget-modern-mode"),Pe.style.display="flex",de.root.style.display="none";let N=ue==="circle"?"50%":"22%";K.root.style.width=`${X}px`,K.root.style.height=`${X}px`,Z.style.width=`${X}px`,Z.style.height=`${X}px`,Z.style.borderRadius=N;let se=Math.round(X*0.5),Ee=_e.querySelector("svg");if(Ee)Ee.style.width=`${se}px`,Ee.style.height=`${se}px`;$e(p)}}function ot(r){let p=le;le=r&&O==="modern",re.hide(),we(Oe(le)),de.setExpanded(le),Je({delaySizeRequest:p&&!le}),requestAnimationFrame(()=>we(Oe()))}function Ze(){if(K.root.style.display=H?"":"none",!H)re.hide(),le=!1,de.setExpanded(!1);re.update(q,H),de.update(q,H),ft(q)}function ft(r){let p=je(r?.albumArtUrl??null,r?.trackUri);_e.style.display=p?"none":"flex",He.el.style.display=p?"":"none",He.setUrl(p)}function it(r=Fe){if(K=e.ui.createFloatWidget({width:X,height:X,tooltip:"Subsonic",chromeless:!0}),K.root.appendChild(Z),We(),K.onDragEnd((p)=>{he=p,we(),xe()}),Je(),Ze(),r)K.moveTo(r.x,r.y)}function g(){n(X)}function n(r){re.hide(),le=!1,de.setExpanded(!1);let p=K.getPosition();he=p,K.destroy(),X=ae(r,O),Xe(),it(p),we(),xe()}function w(r){let p=r.miniPlayerStyle==="modern"?"modern":"default",m=oe(r.sizeMode)?r.sizeMode:Ae(r.size,p);O=p,fe=r.lyricsBlur!==!1,ue=r.shape==="squircle"?"squircle":"circle",te=m,X=m==="custom"?ae(r.size,p):pe(p)[m],re.setStyle(p),re.hide(),le=!1,de.setExpanded(!1);let N=typeof r.x==="number"&&typeof r.y==="number"?{x:r.x,y:r.y}:K.getPosition();he=N,K.destroy(),Xe(),it(N),we(),Be()}let M=0;async function D(r,p){let m=[{key:"small",label:"Small",active:te==="small"},{key:"medium",label:"Medium",active:te==="medium"},{key:"large",label:"Large",active:te==="large"},{key:"custom",label:"Custom…",active:te==="custom"}];if(O!=="modern")m.push({key:"shape-divider",label:"",type:"divider"},{key:"circle",label:"Circle",active:ue==="circle"},{key:"squircle",label:"Squircle",active:ue==="squircle"});m.push({key:"style-divider",label:"",type:"divider"},{key:"mini-default",label:"Default Mini Player",active:O==="default"},{key:"mini-modern",label:"Modern Lyrics Mini Player",active:O==="modern"}),M+=1,re.setUiSuspended(!0),de.setAutoScrollSuspended(!0),G.setAutoScrollSuspended(!0);let N;try{({selectedKey:N}=await e.ui.showContextMenu({position:{x:r,y:p},items:m}))}finally{if(M=Math.max(0,M-1),M===0)re.setUiSuspended(!1),de.setAutoScrollSuspended(!1),G.setAutoScrollSuspended(!1)}if(!N)return;if(N==="small"||N==="medium"||N==="large")te=N,n(pe(O)[N]);else if(N==="custom")e.events.emit("open-settings",{view:"extensions"});else if(N==="circle"||N==="squircle")ue=N,xe(),Je();else if(N==="mini-default"||N==="mini-modern"){if(O=N==="mini-modern"?"modern":"default",X=te==="custom"?ae(X,O):pe(O)[te],re.setStyle(O),O!=="modern")le=!1,de.setExpanded(!1);re.hide(),xe(),Xe(),Je(),we()}}let W=!1,Le={x:0,y:0},Ie=5;Z.addEventListener("pointerdown",(r)=>{if(W=!1,Le={x:r.clientX,y:r.clientY},!re.isOpen())return;let p=null,m=()=>{if(W&&p===null)p=requestAnimationFrame(()=>{re.reposition(),p=null})},N=()=>{if(document.removeEventListener("pointermove",m),p!==null)cancelAnimationFrame(p)};document.addEventListener("pointermove",m),document.addEventListener("pointerup",N,{once:!0})}),Z.addEventListener("pointermove",(r)=>{if(W)return;let p=Math.abs(r.clientX-Le.x),m=Math.abs(r.clientY-Le.y);if(p>Ie||m>Ie)W=!0}),Z.addEventListener("pointerup",()=>{requestAnimationFrame(()=>we())}),Z.addEventListener("click",(r)=>{if(W){r.stopPropagation(),W=!1;return}if(r.stopPropagation(),O==="modern"){if(!le)ot(!0);return}re.toggle()}),Z.addEventListener("contextmenu",(r)=>{r.preventDefault(),r.stopPropagation(),D(r.clientX,r.clientY)});let Q=null,ve=!1,De={x:0,y:0};Z.addEventListener("touchstart",(r)=>{ve=!1;let p=r.touches[0];De={x:p.clientX,y:p.clientY},Q=setTimeout(()=>{ve=!0,navigator.vibrate?.(50),D(p.clientX,p.clientY)},500)}),Z.addEventListener("touchmove",(r)=>{if(!Q)return;let p=r.touches[0];if(Math.abs(p.clientX-De.x)>10||Math.abs(p.clientY-De.y)>10)clearTimeout(Q),Q=null}),Z.addEventListener("touchend",(r)=>{if(Q)clearTimeout(Q),Q=null;if(ve){ve=!1;return}if(O==="modern"&&le){W=!1;return}if(!W){if(r.cancelable)r.preventDefault();if(O==="modern"){if(!le)ot(!0)}else re.toggle()}W=!1}),it(),we(),Be();let rt=()=>{if(O==="modern"&&le){Je(),requestAnimationFrame(()=>we(Oe()));return}we()};window.addEventListener("resize",rt),i.push(()=>window.removeEventListener("resize",rt)),i.push(()=>{if(be)clearTimeout(be);he=K.getPosition(),xe(),He.destroy(),re.destroy(),de.destroy(),K.destroy()});let Ve=ui(e,t);i.push(()=>Ve.destroy());let xt=(r)=>{if(r)t({type:"get_chat_songs",chatId:r})};xt(e.getActiveChat().chatId),i.push(e.events.on("CHAT_SWITCHED",(r)=>{Ve.reset(),xt(r.chatId||null)})),i.push(e.events.on("CHARACTER_MESSAGE_RENDERED",(r)=>{let p=r.messageId;if(p)Ve.decorate(p)})),i.push(e.events.on("MESSAGE_SWIPED",(r)=>{let p=r.message;if(p?.id)Ve.setActiveSwipe(p.id,p.swipe_id||0)})),i.push(e.events.on("MESSAGE_DELETED",(r)=>{let p=r.messageId;if(p)Ve.removeMessage(p)}));let xi=e.onBackendMessage((r)=>{let p=r;if(p.type==="__cors_proxy_response"&&p.requestId){h(p.requestId,p.error?void 0:p.result);return}let m=r;switch(m.type){case"config":if(C&&C!==m.serverUrl)y.clear();R=m.remoteControl,H=m.connected,U=m.remoteControl==="jukebox",C=m.serverUrl,j=m.username,f=m.hasPassword,x=m.feishinUrl,I=m.feishinUsername,T=m.hasFeishinPassword,z=m.playbackPositionOffsetMs,ee=m.jukeboxUnavailableReason,v.update(m.connected,m.serverUrl,m.username,m.hasPassword,m.remoteControl,m.feishinUrl,m.feishinUsername,m.hasFeishinPassword,m.playbackPositionOffsetMs,m.jukeboxUnavailableReason),Y.setAvailable(!0),Y.setPlaybackAvailable(m.remoteControl==="jukebox"),V.update(q,H,m.remoteControl!=="none",m.remoteControl==="feishin"?"Feishin Controls":"Jukebox Controls"),Ze();break;case"widget_preferences":if(m.preferences&&!Ue)w(m.preferences);else if(!m.preferences&&!Ue&&Se)t({type:"set_widget_preferences",preferences:Se});else if(!m.preferences&&!Ue)xe();break;case"state":if(H=m.connected,q=m.playbackState,F.update(q,H),V.update(q,H,R!=="none",R==="feishin"?"Feishin Controls":"Jukebox Controls"),G.updatePlayback(q),q?.trackUri&&q.trackUri!==k)k=q.trackUri,G.setLoading(!0,q),re.setLyricsLoading(!0),de.setLyricsLoading(!0),t({type:"get_lyrics"});else if(!q)k=null,G.clear(),re.updateLyrics(null,null,null,!1),de.updateLyrics(null,null,null,!1);Ze();let N=je(q?.albumArtUrl??null,q?.trackUri),se=q?.albumArtKey||N;if(N!==o)if(o=N,N){E();let Te=se&&m.albumPalette?.artworkKey===se?m.albumPalette.colors:y.get(se||"");if(se&&Te)P(se,Te),t({type:"album_colors",colors:Te,artworkKey:se});else{let wt=++a;b(N).then((lt)=>{if(wt!==a||N!==o)return;if(lt){if(se)P(se,lt);t({type:"album_colors",colors:lt,artworkKey:se})}else if(!H)L()})}}else if(H)S();else L();break;case"connected":H=!0,Ze(),t({type:"get_config"}),t({type:"get_state"});break;case"disconnected":H=!1,q=null,k=null,U=!1,Y.setAvailable(!0),Y.setPlaybackAvailable(R==="jukebox"),o=null,y.clear(),L(),F.update(null,!1),V.update(null,!1,!1),G.clear(),re.updateLyrics(null,null,null,!1),de.updateLyrics(null,null,null,!1),Ze();break;case"search_results":Y.setResults(m.results);break;case"chat_songs":Ve.setChatSongs(m.chatId,m.entries);break;case"message_song":Ve.setMessageSong(m.chatId,m.messageId,m.swipeId,m.snapshot);break;case"lyrics":if(!k||m.trackUri===k)G.update(m.trackUri,m.plainLyrics,m.syncedLyrics,m.instrumental),G.updatePlayback(q),re.updateLyrics(m.trackUri,m.plainLyrics,m.syncedLyrics,m.instrumental),de.updateLyrics(m.trackUri,m.plainLyrics,m.syncedLyrics,m.instrumental);break;case"error":if(m.operation==="connect"||m.authenticationFailure)v.setError(m.message);console.warn("[Subsonic Controls]",m.message);break}});i.push(xi);let Ot=(r)=>{if(r.detail?.extensionId!==e.manifest.identifier)return;t({type:"get_config"}),t({type:"get_state"})};window.addEventListener("spindle:desktop-widget-returned",Ot),i.push(()=>window.removeEventListener("spindle:desktop-widget-returned",Ot)),e.permissions.getGranted().then((r)=>{let p=["cors_proxy","ui_panels","app_manipulation","generation","chat_mutation"].filter((m)=>!r.includes(m));if(p.length)e.permissions.request(p,{reason:"Subsonic Controls needs CORS access for your server, a panel and album-art theme support, plus Generation and Chat Mutation to remember the song playing for each assistant reply."})});let wi=e.events.on("SPINDLE_PERMISSION_CHANGED",(r)=>{let p=r;if(p.extensionId!==e.manifest.identifier||p.permission!=="cors_proxy")return;if(p.granted){t({type:"get_config"}),t({type:"get_state"});return}H=!1,q=null,k=null,U=!1,o=null,y.clear(),L(),v.update(!1,"","",!1,"none","","",!1,z,null),F.update(null,!1),V.update(null,!1,!1),G.clear(),Ze()});return i.push(wi),i.push(()=>{E(),a+=1;for(let[r,p]of c)clearTimeout(p.timer),p.resolve(null),c.delete(r)}),t({type:"get_config"}),t({type:"get_state"}),t({type:"get_widget_preferences"}),()=>{for(let r of i)r()}}function Gi(e,i={}){let s={...i},t={componentId:`desktop-widget-detached-${crypto.randomUUID()}`,element:e instanceof HTMLElement?e:document.createElement("div"),update(o){s={...s,...o}},destroy(){},getValue(){if("checked"in s)return s.checked;return s.value},focus(){},blur(){}};return new Proxy(t,{get(o,a,d){if(a==="then")return;if(Reflect.has(o,a))return Reflect.get(o,a,d);return()=>{return}}})}function bi(e){let i=new Set,s=!1,t=()=>{let y=document.createElement("div");return i.add(y),y},o=(y)=>y instanceof Element&&[...i].some((u)=>u===y||u.contains(y)),a=new Proxy(e.components,{get(y,u,c){let l=Reflect.get(y,u,c);if(typeof l!=="function"||!String(u).startsWith("mount"))return l;return(h,E)=>{if(!s||o(h))return Gi(h,E);return Reflect.apply(l,y,[h,E])}}}),d=new Proxy(e.ui,{get(y,u,c){if(u==="mount")return()=>t();if(u==="createFloatWidget"){let l=Reflect.get(y,u,c);return(...h)=>(s=!0,Reflect.apply(l,y,h))}if(u==="registerDrawerTab")return(l)=>({root:t(),tabId:l.id||"desktop-widget-detached",setTitle(){},setShortName(){},setBadge(){},activate(){},destroy(){},onActivate(){return()=>{}}});return Reflect.get(y,u,c)}});return new Proxy(e,{get(y,u,c){if(u==="components")return a;if(u==="ui")return d;return Reflect.get(y,u,c)}})}function Xn(e,i){return vi(bi(e))}export{Xn as setupWidget};
