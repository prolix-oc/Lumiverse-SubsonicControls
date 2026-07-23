export type FrontendToBackend =
  | { type: "get_state" }
  | { type: "get_config" }
  | { type: "connect"; integration: IntegrationType; serverUrl: string; username: string; password: string; enableJukebox: boolean }
  | { type: "disconnect" }
  | { type: "feishin_state"; connected: boolean; playbackState: PlaybackState | null }
  | { type: "play"; trackUri?: string }
  | { type: "pause" }
  | { type: "next" }
  | { type: "previous" }
  | { type: "search"; query: string }
  | { type: "queue"; trackUri: string }
  | { type: "get_chat_songs"; chatId: string }
  | { type: "get_lyrics" }
  | { type: "album_colors"; colors: AlbumColors | null };

export type BackendToFrontend =
  | { type: "state"; playbackState: PlaybackState | null; connected: boolean }
  | { type: "config"; integration: IntegrationType; serverUrl: string; username: string; hasPassword: boolean; enableJukebox: boolean; jukeboxUnavailableReason: string | null; connected: boolean }
  | { type: "search_results"; results: SearchResult[] }
  | { type: "chat_songs"; chatId: string; entries: MessageSongEntry[] }
  | { type: "message_song"; chatId: string; messageId: string; swipeId: number; snapshot: SongSnapshot }
  | { type: "connected" }
  | { type: "disconnected" }
  | { type: "lyrics"; trackUri: string; plainLyrics: string | null; syncedLyrics: string | null; instrumental: boolean }
  | { type: "error"; message: string };

export interface PlaybackState {
  isPlaying: boolean;
  trackName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string | null;
  progressMs: number;
  durationMs: number;
  trackUri: string;
  /** Whether the server supplied a real playback position (OpenSubsonic playbackReport). */
  positionKnown?: boolean;
  source: "jukebox" | "now_playing" | "feishin";
  // Kept optional because the shared Spotify player components can render
  // these capabilities when an integration provides them. Subsonic's
  // Jukebox API does not currently expose either value.
  deviceId?: string | null;
  deviceName?: string | null;
  volume?: number | null;
}

export interface DeviceInfo {
  id: string;
  name: string;
  type: string;
  isActive: boolean;
  volume: number | null;
}

export type MiniPlayerStyle = "default" | "modern";

export interface WidgetPrefs {
  size: number;
  shape: "circle" | "squircle";
  sizeMode: "small" | "medium" | "large" | "custom";
  miniPlayerStyle: MiniPlayerStyle;
  x?: number;
  y?: number;
}

export interface SearchResult {
  name: string;
  artist: string;
  album: string;
  albumArtUrl: string | null;
  uri: string;
  durationMs: number;
}

/** A track frozen at the instant an assistant-message swipe began. */
export interface SongSnapshot {
  trackName: string;
  artistName: string;
  albumName: string;
  albumArtUrl: string | null;
  trackUri: string;
  isPlaying: boolean;
  capturedAt: number;
}

export interface MessageSongEntry {
  messageId: string;
  activeSwipe: number;
  bySwipe: Record<number, SongSnapshot>;
}

export interface AlbumColors {
  dominant: { r: number; g: number; b: number };
  dominantHsl: { h: number; s: number; l: number };
  isLight: boolean;
}

export interface SubsonicConfig {
  integration: IntegrationType;
  serverUrl: string;
  username: string;
  password: string;
  enableJukebox: boolean;
}

export type IntegrationType = "subsonic" | "feishin";
