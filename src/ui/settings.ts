export interface SettingsUI {
  root: HTMLElement;
  update(connected: boolean, serverUrl: string, username: string, hasPassword: boolean, enableJukebox: boolean): void;
  setConnecting(): void;
  destroy(): void;
}

export function createSettingsUI(sendToBackend: (message: unknown) => void): SettingsUI {
  const root = document.createElement("section");
  root.className = "subsonic-settings-card";
  const header = document.createElement("header");
  header.className = "subsonic-settings-card-header";
  const title = document.createElement("h3");
  title.textContent = "Subsonic Controls";
  const status = document.createElement("span");
  status.className = "subsonic-status";
  header.append(title, status);

  const body = document.createElement("div");
  body.className = "subsonic-settings-card-body";
  const makeField = (label: string, type: string, placeholder: string) => {
    const wrapper = document.createElement("label");
    wrapper.className = "subsonic-settings-label";
    wrapper.textContent = label;
    const input = document.createElement("input");
    input.className = "subsonic-input";
    input.type = type;
    input.placeholder = placeholder;
    wrapper.appendChild(input);
    body.appendChild(wrapper);
    return input;
  };
  const serverUrl = makeField("Server URL", "url", "https://music.example.com (or …/rest)");
  const username = makeField("Username", "text", "Subsonic username");
  const password = makeField("Password", "password", "Subsonic password");

  const jukeboxLabel = document.createElement("label");
  jukeboxLabel.className = "subsonic-settings-label";
  const jukebox = document.createElement("input");
  jukebox.type = "checkbox";
  jukebox.style.marginRight = "8px";
  jukeboxLabel.append(jukebox, "Enable server-side Jukebox controls");
  const note = document.createElement("div");
  note.style.cssText = "font-size:0.8em;opacity:0.65;margin-top:4px";
  note.textContent = "Search, now-playing and lyrics work with compatible servers. Play, pause, skip and queue require the optional Jukebox endpoint and affect that server-side player.";
  jukeboxLabel.appendChild(note);
  body.appendChild(jukeboxLabel);

  const actions = document.createElement("div");
  actions.className = "subsonic-settings-row";
  const button = document.createElement("button");
  button.className = "subsonic-btn subsonic-btn-primary";
  actions.appendChild(button);
  body.appendChild(actions);
  root.append(header, body);
  let isConnected = false;

  function update(connected: boolean, url: string, user: string, hasPassword: boolean, enableJukebox: boolean) {
    isConnected = connected;
    if (url) serverUrl.value = url;
    if (user) username.value = user;
    jukebox.checked = enableJukebox;
    for (const input of [serverUrl, username, password, jukebox] as HTMLInputElement[]) input.disabled = connected;
    password.value = "";
    password.placeholder = hasPassword ? "Saved securely (re-enter to change)" : "Subsonic password";
    button.textContent = connected ? "Disconnect" : "Connect";
    button.className = connected ? "subsonic-btn subsonic-btn-danger" : "subsonic-btn subsonic-btn-primary";
    button.disabled = false;
    status.innerHTML = connected ? '<span class="subsonic-status-dot connected"></span>Connected' : '<span class="subsonic-status-dot disconnected"></span>Not connected';
  }

  button.addEventListener("click", () => {
    if (isConnected) { sendToBackend({ type: "disconnect" }); return; }
    const url = serverUrl.value.trim();
    const user = username.value.trim();
    const pass = password.value;
    if (!url || !user || !pass) {
      status.innerHTML = '<span class="subsonic-status-dot disconnected"></span><span style="color:#e74c3c">Server URL, username and password are required</span>';
      return;
    }
    button.disabled = true;
    button.textContent = "Connecting…";
    sendToBackend({ type: "connect", serverUrl: url, username: user, password: pass, enableJukebox: jukebox.checked });
  });

  update(false, "", "", false, false);
  return { root, update, setConnecting() { button.disabled = true; button.textContent = "Connecting…"; }, destroy() { root.remove(); } };
}
