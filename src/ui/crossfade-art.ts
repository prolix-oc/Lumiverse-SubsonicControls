/**
 * Creates a crossfading album art container.
 * Two stacked <img> elements alternate — when the URL changes,
 * the new image loads underneath, then opacity is swapped.
 */
export interface CrossfadeArt {
  el: HTMLElement;
  setUrl(url: string | null): void;
  destroy(): void;
}

export function getTrackScopedArtUrl(
  url: string | null,
  trackUri: string | null | undefined
): string | null {
  if (!url) return null;
  if (!trackUri) return url;

  try {
    const scopedUrl = new URL(url);
    scopedUrl.searchParams.set("track", trackUri);
    return scopedUrl.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}track=${encodeURIComponent(trackUri)}`;
  }
}

export function createCrossfadeArt(className: string): CrossfadeArt {
  const el = document.createElement("div");
  el.className = `${className} spotify-crossfade-art`;
  el.style.display = "none";

  const imgA = document.createElement("img");
  const imgB = document.createElement("img");
  imgA.className = "spotify-crossfade-img";
  imgB.className = "spotify-crossfade-img";
  imgA.alt = "";
  imgB.alt = "";
  imgA.loading = "eager";
  imgB.loading = "eager";
  imgA.decoding = "async";
  imgB.decoding = "async";
  imgA.style.visibility = "hidden";
  imgB.style.visibility = "hidden";

  // A starts visible
  imgA.style.opacity = "1";
  imgB.style.opacity = "0";

  el.appendChild(imgA);
  el.appendChild(imgB);

  let currentUrl: string | null = null;
  let activeImg = imgA;
  let inactiveImg = imgB;
  let hasLoadedOnce = false;

  function resetImage(img: HTMLImageElement) {
    img.onload = null;
    img.onerror = null;
    img.removeAttribute("src");
    img.style.visibility = "hidden";
  }

  function hideArt() {
    el.style.display = "none";
    activeImg.style.opacity = "1";
    inactiveImg.style.opacity = "0";
  }

  function setUrl(url: string | null) {
    if (url === currentUrl) return;
    currentUrl = url;

    if (!url) {
      resetImage(activeImg);
      resetImage(inactiveImg);
      hasLoadedOnce = false;
      hideArt();
      return;
    }

    // First load: make the container eligible for loading, but keep the img
    // layer hidden until it has decoded successfully.
    if (!hasLoadedOnce) {
      el.style.display = "";
      activeImg.onload = () => {
        hasLoadedOnce = true;
        activeImg.style.visibility = "visible";
      };
      activeImg.onerror = () => {
        currentUrl = null;
        resetImage(activeImg);
        hideArt();
      };
      activeImg.src = url;
      if (activeImg.complete && activeImg.naturalWidth > 0) {
        hasLoadedOnce = true;
        activeImg.style.visibility = "visible";
      }
      return;
    }

    el.style.display = "";

    // Subsequent loads: crossfade via the inactive layer
    inactiveImg.onload = () => {
      inactiveImg.style.visibility = "visible";
      inactiveImg.style.opacity = "1";
      activeImg.style.opacity = "0";
      const tmp = activeImg;
      activeImg = inactiveImg;
      inactiveImg = tmp;
    };
    inactiveImg.onerror = () => {
      currentUrl = null;
      resetImage(inactiveImg);
      inactiveImg.style.opacity = "0";
    };
    inactiveImg.src = url;

    if (inactiveImg.complete && inactiveImg.naturalWidth > 0) {
      inactiveImg.style.visibility = "visible";
      inactiveImg.style.opacity = "1";
      activeImg.style.opacity = "0";
      const tmp = activeImg;
      activeImg = inactiveImg;
      inactiveImg = tmp;
    }
  }

  return {
    el,
    setUrl,
    destroy() {
      el.remove();
    },
  };
}

