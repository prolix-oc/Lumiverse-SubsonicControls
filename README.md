# Lumiverse Subsonic Controls

A Lumiverse extension for Subsonic and OpenSubsonic-compatible servers such as Navidrome, Airsonic, Gonic, and other implementations that support the common REST API.

## What this first version supports

- Secure per-user connection settings: server URL and username in user storage, password in the Lumiverse secure enclave.
- Subsonic `ping`, `search3`, `getNowPlaying`, cover-art, and lyrics endpoints.
- OpenSubsonic `getLyricsBySongId` with a fallback to classic `getLyrics`.
- Optional server-side Jukebox play, pause, previous, next, play-from-search, and queue actions.
- The recommended Subsonic token authentication scheme (`t=md5(password + salt)`) with a fresh salt per request.

## Important protocol behavior

The Subsonic protocol does not provide a universal remote-control API for playback happening in another client. Its portable now-playing endpoint reports active users, while playback controls are available through the optional server-side Jukebox endpoint. Leave **Enable server-side Jukebox controls** unchecked to use the extension strictly for library browsing, now-playing, and lyrics.

## Development

```sh
bun run build
```

The extension expects a server URL such as `https://music.example.com` or `https://music.example.com/rest`; it will add `/rest` when necessary.
