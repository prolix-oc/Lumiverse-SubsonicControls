# Lumiverse Subsonic Controls

A Lumiverse extension for Subsonic and OpenSubsonic-compatible servers such as Navidrome, Airsonic, Gonic, and other implementations that support the common REST API. It can also control a running Feishin desktop player through Feishin's Remote WebSocket server.

## What this first version supports

- Secure per-user connection settings: server URL and username in user storage, password in the Lumiverse secure enclave.
- Subsonic `ping`, `search3`, `getNowPlaying`, cover-art, and lyrics endpoints.
- OpenSubsonic `getLyricsBySongId` with a fallback to classic `getLyrics`.
- Optional server-side Jukebox play, pause, previous, next, play-from-search, and queue actions.
- Feishin desktop Remote playback state, artwork, and play/pause/previous/next controls.
- The recommended Subsonic token authentication scheme (`t=md5(password + salt)`) with a fresh salt per request.

## Important protocol behavior

The Subsonic protocol does not provide a universal remote-control API for playback happening in another client. Its portable now-playing endpoint reports active users, while playback controls are available through the optional server-side Jukebox endpoint. Leave **Enable server-side Jukebox controls** unchecked to use the extension strictly for library browsing, now-playing, and lyrics.

## Feishin desktop Remote

Choose **Feishin Desktop Remote** as the connection type, then enter the URL shown by Feishin's **Settings → Window → Remote** section (normally `http://<computer-lan-ip>:4333`). Feishin must be running on the same reachable network; its browser build does not expose the Remote server.

This connection is a direct WebSocket control channel to the desktop app. It supports live now-playing artwork and basic transport controls, but Feishin's Remote API does not provide the Subsonic library-search or lyrics endpoints, so those panels stay unavailable for this connection type. If the Remote server has credentials, enter them when connecting; they are used only for that browser connection and must be re-entered after a Lumiverse page reload.

## Development

```sh
bun run build
```

The extension expects a server URL such as `https://music.example.com` or `https://music.example.com/rest`; it will add `/rest` when necessary.
