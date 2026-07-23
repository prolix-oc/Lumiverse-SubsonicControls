import type { RemoteControl } from "../types";

export interface SettingsUI {
  root: HTMLElement;
  update(connected: boolean, serverUrl: string, username: string, hasPassword: boolean, remoteControl: RemoteControl, feishinUrl: string, feishinUsername: string, hasFeishinPassword: boolean, jukeboxUnavailableReason: string | null): void;
  setConnecting(): void;
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
  const feishinNote = document.createElement("div"); feishinNote.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px"; feishinNote.textContent = "Connects directly to Feishin's desktop Remote server; library search and lyrics still use the Subsonic server above."; feishinFields.append(feishinNote); body.append(feishinFields);
  const actions = document.createElement("div"); actions.className = "spotify-settings-row";
  const button = document.createElement("button"); button.className = "spotify-btn spotify-btn-primary"; actions.append(button); body.append(actions); root.append(header, body);
  let isConnected = false;
  function syncControllerFields() {
    const isFeishin = controller.value === "feishin";
    feishinFields.style.display = isFeishin ? "" : "none";
    jukeboxNote.style.display = controller.value === "jukebox" ? "" : "none";
    jukeboxUnavailable.style.display = controller.value === "jukebox" && jukeboxUnavailable.textContent ? "" : "none";
  }
  controller.onchange = syncControllerFields;
  function update(connected: boolean, url: string, user: string, hasPassword: boolean, remoteControl: RemoteControl, remoteUrl: string, remoteUser: string, hasRemotePassword: boolean, unavailable: string | null) {
    isConnected = connected; if (url) serverUrl.value = url; if (user) username.value = user; if (remoteUrl) feishinUrl.value = remoteUrl; if (remoteUser) feishinUsername.value = remoteUser;
    controller.value = remoteControl; jukeboxUnavailable.textContent = unavailable || ""; syncControllerFields();
    for (const input of [serverUrl, username, password, controller, feishinUrl, feishinUsername, feishinPassword]) input.disabled = connected;
    password.value = ""; feishinPassword.value = "";
    password.placeholder = hasPassword ? "Saved securely (re-enter to change)" : "Subsonic password";
    feishinPassword.placeholder = hasRemotePassword ? "Saved securely (re-enter to change)" : "Optional Remote password";
    button.textContent = connected ? "Disconnect" : "Connect"; button.className = connected ? "spotify-btn spotify-btn-danger" : "spotify-btn spotify-btn-primary"; button.disabled = false;
    status.innerHTML = connected ? '<span class="spotify-status-dot connected"></span>Connected' : '<span class="spotify-status-dot disconnected"></span>Not connected';
  }
  button.onclick = () => {
    if (isConnected) return void sendToBackend({ type: "disconnect" });
    const remoteControl = controller.value as RemoteControl;
    if (!serverUrl.value.trim() || !username.value.trim() || !password.value || (remoteControl === "feishin" && !feishinUrl.value.trim())) {
      status.innerHTML = '<span class="spotify-status-dot disconnected"></span><span style="color:#e74c3c">Enter the Subsonic server credentials and, when selected, a Feishin Remote URL.</span>'; return;
    }
    button.disabled = true; button.textContent = "Connecting…";
    sendToBackend({ type: "connect", serverUrl: serverUrl.value.trim(), username: username.value.trim(), password: password.value, remoteControl, feishinUrl: feishinUrl.value.trim(), feishinUsername: feishinUsername.value.trim(), feishinPassword: feishinPassword.value });
  };
  update(false, "", "", false, "none", "", "", false, null);
  return { root, update, setConnecting() { button.disabled = true; button.textContent = "Connecting…"; }, destroy() { root.remove(); } };
}
