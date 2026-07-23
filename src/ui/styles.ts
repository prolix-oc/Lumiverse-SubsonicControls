export const PANEL_CSS = `
.subsonic-tab-root { min-height: 0; overflow: hidden; }
.subsonic-panel { overflow-y: auto; height: 100%; padding: 12px; color: var(--lumiverse-text, #eee); }
.subsonic-section { margin-bottom: 18px; }
.subsonic-section-title { font-size: 0.85rem; letter-spacing: .05em; text-transform: uppercase; opacity: .7; margin: 0 0 9px; }
.subsonic-settings-card { border: 1px solid var(--lumiverse-border, #3a3a3a); background: var(--lumiverse-bg-elevated, #202020); border-radius: 10px; overflow: hidden; }
.subsonic-settings-card-header { display:flex; justify-content:space-between; align-items:center; padding: 12px 14px; border-bottom: 1px solid var(--lumiverse-border, #3a3a3a); }
.subsonic-settings-card-header h3 { margin:0; font-size:1rem; }
.subsonic-settings-card-body { display:grid; gap: 12px; padding: 14px; }
.subsonic-settings-label { display:grid; gap:6px; font-size:.85rem; }
.subsonic-settings-row { display:flex; gap:8px; align-items:center; }
.subsonic-input { width:100%; box-sizing:border-box; background:var(--lumiverse-bg, #151515); border:1px solid var(--lumiverse-border, #3a3a3a); border-radius:6px; color:inherit; padding:8px; }
.subsonic-input:focus { outline: 2px solid var(--lumiverse-accent, #65b8ff); outline-offset:1px; }
.subsonic-btn, .subsonic-ctrl-btn, .subsonic-search-item-btn { cursor:pointer; border:0; color:inherit; border-radius:6px; }
.subsonic-btn { padding:8px 12px; font-weight:600; }
.subsonic-btn-primary { background:var(--lumiverse-accent, #3182ce); }
.subsonic-btn-danger { background:#b84343; }
.subsonic-status { font-size:.8rem; opacity:.8; }
.subsonic-status-dot { display:inline-block; width:7px; height:7px; border-radius:50%; margin-right:5px; }.subsonic-status-dot.connected{background:#56c271}.subsonic-status-dot.disconnected{background:#a0a0a0}
.subsonic-now-playing { display:flex; gap:12px; padding:10px; border-radius:8px; background:var(--lumiverse-bg-elevated, #202020); }
.subsonic-album-art { width:64px; height:64px; flex:0 0 auto; border-radius:6px; overflow:hidden; background:#333; }.subsonic-cover-art img { width:100%; height:100%; object-fit:cover; }
.subsonic-track-info { min-width:0; display:grid; align-content:center; gap:3px; }.subsonic-track-name { font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.subsonic-track-artist,.subsonic-track-album,.subsonic-track-source { font-size:.85rem; opacity:.7; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.subsonic-empty { padding:16px; text-align:center; opacity:.65; font-size:.9rem; }
.subsonic-controls { display:flex; justify-content:center; gap:10px; }.subsonic-ctrl-btn { display:grid; place-items:center; width:38px; height:38px; background:var(--lumiverse-bg-elevated, #303030); }.subsonic-ctrl-btn svg,.subsonic-search-item-btn svg { width:20px; height:20px; fill:currentColor; }.subsonic-ctrl-btn-main { width:46px; height:46px; border-radius:50%; background:var(--lumiverse-accent, #3182ce); }
.subsonic-search-input { box-sizing:border-box; width:100%; padding:9px; color:inherit; background:var(--lumiverse-bg-elevated, #202020); border:1px solid var(--lumiverse-border, #3a3a3a); border-radius:6px; }.subsonic-search-results { margin-top:8px; display:grid; gap:4px; max-height:380px; overflow-y:auto; }
.subsonic-search-item { display:flex; align-items:center; gap:9px; padding:7px; border-radius:6px; }.subsonic-search-item:hover { background:var(--lumiverse-bg-elevated, #252525); }.subsonic-search-item-art { width:38px; height:38px; object-fit:cover; border-radius:4px; }.subsonic-search-item-info { min-width:0; flex:1; }.subsonic-search-item-name { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.subsonic-search-item-artist { font-size:.8rem; opacity:.7; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.subsonic-search-item-actions { display:flex; gap:4px; }.subsonic-search-item-btn { display:grid; place-items:center; background:transparent; width:32px; height:32px; }.subsonic-search-item-btn:hover { background:var(--lumiverse-border, #444); }
.subsonic-lyrics-body { min-height:42px; max-height:340px; overflow-y:auto; white-space:pre-wrap; padding:10px; border-radius:8px; background:var(--lumiverse-bg-elevated, #202020); font-size:.9rem; line-height:1.55; opacity:.78; }.subsonic-lyrics-text { opacity:1; }.subsonic-lyrics-loading { font-style:italic; }
.subsonic-float-widget { width:264px; height:72px; box-sizing:border-box; display:flex; align-items:center; gap:9px; padding:8px; color:var(--lumiverse-text, #eee); background:color-mix(in srgb, var(--lumiverse-bg-elevated, #202020) 92%, transparent); border:1px solid var(--lumiverse-border, #3a3a3a); border-radius:14px; box-shadow:0 8px 28px rgba(0,0,0,.28); backdrop-filter:blur(14px); cursor:pointer; user-select:none; }
.subsonic-float-widget-artwork { width:54px; height:54px; flex:0 0 auto; position:relative; overflow:hidden; border-radius:10px; background:var(--lumiverse-bg, #151515); }.subsonic-float-widget-art { width:100%; height:100%; object-fit:cover; }.subsonic-float-widget-fallback { width:100%; height:100%; display:grid; place-items:center; color:var(--lumiverse-accent, #65b8ff); }.subsonic-float-widget-fallback svg { width:26px; height:26px; }.subsonic-float-widget-details { min-width:0; flex:1; display:grid; gap:4px; }.subsonic-float-widget-track,.subsonic-float-widget-artist { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }.subsonic-float-widget-track { font-size:.88rem; font-weight:700; }.subsonic-float-widget-artist { font-size:.75rem; opacity:.68; }.subsonic-float-widget-controls { display:flex; flex:0 0 auto; align-items:center; gap:1px; }.subsonic-float-widget-button { width:28px; height:32px; display:grid; place-items:center; padding:0; border:0; border-radius:7px; color:inherit; background:transparent; cursor:pointer; }.subsonic-float-widget-button:hover:not(:disabled) { background:var(--lumiverse-border, #444); }.subsonic-float-widget-button:disabled { cursor:default; opacity:.4; }.subsonic-float-widget-button svg { width:18px; height:18px; }
/* The shared Spotify widgets are reused directly. The remote integrations do
   not expose a mini-player volume or seek endpoint. Transport is gated in
   each player for Jukebox and Feishin states. */
.spotify-mini-volume-row,.spotify-modern-widget-volume-row { display:none !important; }.spotify-mini-progress-bar,.spotify-modern-widget-progress-bar { cursor:default; pointer-events:none; }
`;
