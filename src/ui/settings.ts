import type { RemoteControl } from "../types";

export interface SettingsUI {
  root: HTMLElement;
  update(connected: boolean, serverUrl: string, username: string, hasPassword: boolean, remoteControl: RemoteControl, feishinUrl: string, feishinUsername: string, hasFeishinPassword: boolean, playbackPositionOffsetMs: number, jukeboxUnavailableReason: string | null): void;
  setConnecting(): void;
  setError(message: string): void;
  destroy(): void;
}

export function createSettingsUI(sendToBackend: (message: unknown) => void): SettingsUI {
  const root = document.createElement("section"); root.className = "spotify-settings-card";
  const header = document.createElement("header"); header.className = "spotify-settings-card-header";
  const title = document.createElement("h3"); title.textContent = "Subsonic Controls";
  const status = document.createElement("span"); status.className = "spotify-status"; header.append(title, status);
  const body = document.createElement("div"); body.className = "spotify-settings-card-body";
  const makeField = (labelText: string, type: string, placeholder: string) => {
    const wrapper = document.createElement("label"); wrapper.className = "spotify-settings-label";
    const label = document.createTextNode(labelText); wrapper.append(label);
    const input = document.createElement("input"); input.className = "spotify-input"; input.type = type; input.placeholder = placeholder; wrapper.append(input); body.append(wrapper);
    return input;
  };

  const serverUrl = makeField("Subsonic server URL", "url", "https://music.example.com (or …/rest)");
  const username = makeField("Subsonic username", "text", "Subsonic username");
  const password = makeField("Subsonic password", "password", "Subsonic password");
  const playbackPositionOffset = makeField("Playback position offset (ms)", "number", "1000");
  playbackPositionOffset.min = "-10000"; playbackPositionOffset.max = "10000"; playbackPositionOffset.step = "100";
  const playbackPositionOffsetNote = document.createElement("div"); playbackPositionOffsetNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:-6px";
  playbackPositionOffsetNote.textContent = "Adds time to the server's reported playback position for synchronized lyrics. Default: 1000 ms; use a negative value if lyrics run ahead."; body.append(playbackPositionOffsetNote);
  const controllerLabel = document.createElement("label"); controllerLabel.className = "spotify-settings-label"; controllerLabel.append("Playback controls");
  const controller = document.createElement("select"); controller.className = "spotify-input";
  for (const [value, label] of [["none", "Now playing only"], ["jukebox", "Server-side Jukebox"], ["feishin", "Feishin Desktop Remote"]]) {
    const option = document.createElement("option"); option.value = value; option.textContent = label; controller.append(option);
  }
  controllerLabel.append(controller); body.append(controllerLabel);
  const jukeboxNote = document.createElement("div"); jukeboxNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px";
  jukeboxNote.textContent = "Jukebox controls affect the server-side player."; body.append(jukeboxNote);
  const jukeboxUnavailable = document.createElement("div"); jukeboxUnavailable.style.cssText = "display:none;font-size:0.8em;color:#e74c3c;margin-top:4px"; body.append(jukeboxUnavailable);
  const feishinFields = document.createElement("div"); feishinFields.style.display = "none";
  const makeFeishinField = (labelText: string, type: string, placeholder: string) => {
    const wrapper = document.createElement("label"); wrapper.className = "spotify-settings-label"; wrapper.append(labelText);
    const input = document.createElement("input"); input.className = "spotify-input"; input.type = type; input.placeholder = placeholder; wrapper.append(input); feishinFields.append(wrapper); return input;
  };
  const feishinUrl = makeFeishinField("Feishin Remote URL", "url", "http://192.168.1.20:4333");
  const feishinUsername = makeFeishinField("Feishin username", "text", "Optional Remote username");
  const feishinPassword = makeFeishinField("Feishin password", "password", "Optional Remote password");
  const feishinNote = document.createElement("div"); feishinNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px"; feishinNote.textContent = "Feishin Remote requires WebSocket transport; its HTTP server only serves the Remote page and credentials. Library search and lyrics still use the Subsonic server above."; feishinFields.append(feishinNote); body.append(feishinFields);
  const actions = document.createElement("div"); actions.className = "spotify-settings-row";
  const button = document.createElement("button"); button.className = "spotify-btn spotify-btn-primary"; actions.append(button); body.append(actions); root.append(header, body);
  let isConnected = false;
  let isConnecting = false;
  let hasUserEdits = false;
  let savedPasswordAvailable = false;
  let savedFeishinPasswordAvailable = false;
  const editableFields = [serverUrl, username, password, playbackPositionOffset, controller, feishinUrl, feishinUsername, feishinPassword];
  for (const input of editableFields) input.addEventListener("input", () => { hasUserEdits = true; });

  function setStatus(label: string, connected: boolean, error = false) {
    status.replaceChildren();
    const dot = document.createElement("span");
    dot.className = `spotify-status-dot ${connected ? "connected" : "disconnected"}`;
    const text = document.createElement("span"); text.textContent = label;
    if (error) text.style.color = "#e74c3c";
    status.append(dot, text);
  }
  function syncControllerFields() {
    const isFeishin = controller.value === "feishin";
    feishinFields.style.display = isFeishin ? "" : "none";
    jukeboxNote.style.display = controller.value === "jukebox" ? "" : "none";
    jukeboxUnavailable.style.display = controller.value === "jukebox" && jukeboxUnavailable.textContent ? "" : "none";
  }
  controller.onchange = () => { hasUserEdits = true; syncControllerFields(); };
  function update(connected: boolean, url: string, user: string, hasPassword: boolean, remoteControl: RemoteControl, remoteUrl: string, remoteUser: string, hasRemotePassword: boolean, positionOffsetMs: number, unavailable: string | null) {
    isConnected = connected;
    savedPasswordAvailable = hasPassword;
    savedFeishinPasswordAvailable = hasRemotePassword;
    // Startup/config refresh messages can arrive while the user is typing or
    // while a connection attempt is in flight. Do not erase that draft.
    if (connected || (!isConnecting && !hasUserEdits)) {
      serverUrl.value = url;
      username.value = user;
      feishinUrl.value = remoteUrl;
      feishinUsername.value = remoteUser;
      playbackPositionOffset.value = String(positionOffsetMs);
      controller.value = remoteControl;
    }
    jukeboxUnavailable.textContent = unavailable || ""; syncControllerFields();
    if (isConnecting && !connected) return;
    for (const input of [serverUrl, username, password, controller, feishinUrl, feishinUsername, feishinPassword]) input.disabled = connected;
    if (connected) {
      isConnecting = false;
      hasUserEdits = false;
      password.value = "";
      feishinPassword.value = "";
    }
    password.placeholder = hasPassword ? "Saved securely (re-enter to change)" : "Subsonic password";
    feishinPassword.placeholder = hasRemotePassword ? "Saved securely (re-enter to change)" : "Optional Remote password";
    button.textContent = connected ? "Disconnect" : "Connect"; button.className = connected ? "spotify-btn spotify-btn-danger" : "spotify-btn spotify-btn-primary"; button.disabled = false;
    setStatus(connected ? "Connected" : "Not connected", connected);
  }
  button.onclick = () => {
    if (isConnected) return void sendToBackend({ type: "disconnect" });
    const remoteControl = controller.value as RemoteControl;
    if (!serverUrl.value.trim() || !username.value.trim() || (!password.value && !savedPasswordAvailable) || (remoteControl === "feishin" && !feishinUrl.value.trim())) {
      setStatus("Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.", false, true); return;
    }
    isConnecting = true; button.disabled = true; button.textContent = "Connecting…";
    sendToBackend({ type: "connect", serverUrl: serverUrl.value.trim(), username: username.value.trim(), password: password.value, remoteControl, feishinUrl: feishinUrl.value.trim(), feishinUsername: feishinUsername.value.trim(), feishinPassword: feishinPassword.value, playbackPositionOffsetMs: Number(playbackPositionOffset.value) });
  };
  playbackPositionOffset.onchange = () => {
    const value = Number(playbackPositionOffset.value);
    if (!Number.isFinite(value)) return;
    playbackPositionOffset.value = String(Math.max(-10_000, Math.min(10_000, Math.round(value))));
    if (isConnected) sendToBackend({ type: "set_playback_position_offset", playbackPositionOffsetMs: Number(playbackPositionOffset.value) });
  };
  update(false, "", "", false, "none", "", "", false, 1000, null);
  return {
    root,
    update,
    setConnecting() { isConnecting = true; button.disabled = true; button.textContent = "Connecting…"; },
    setError(message: string) {
      isConnected = false;
      isConnecting = false;
      button.disabled = false;
      button.textContent = "Connect";
      button.className = "spotify-btn spotify-btn-primary";
      for (const input of [serverUrl, username, password, controller, feishinUrl, feishinUsername, feishinPassword]) input.disabled = false;
      password.placeholder = savedPasswordAvailable ? "Saved securely (re-enter to change)" : "Subsonic password";
      feishinPassword.placeholder = savedFeishinPasswordAvailable ? "Saved securely (re-enter to change)" : "Optional Remote password";
      setStatus(message, false, true);
    },
    destroy() { root.remove(); },
  };
}
