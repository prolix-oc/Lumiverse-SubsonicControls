export interface ModernWidgetExpandedSizeOptions {
  desktopPopout: boolean;
  hasPlayback: boolean;
  viewportHeight: number;
  viewportWidth: number;
}

const VIEWPORT_PADDING = 24;
const EMPTY_SIZE = { width: 320, height: 196 } as const;
const PLAYBACK_SIZE = { width: 348, height: 520 } as const;
const EMPTY_MIN_WIDTH = 280;
const PLAYBACK_MIN_SIZE = { width: 300, height: 420 } as const;

/**
 * The page constrains the player to its viewport. A desktop pop-out cannot use
 * its own viewport as that constraint because the native window is currently
 * the compact widget's size and grows in response to the value returned here.
 */
export function getModernWidgetExpandedSize({
  desktopPopout,
  hasPlayback,
  viewportHeight,
  viewportWidth,
}: ModernWidgetExpandedSizeOptions): { width: number; height: number } {
  const preferred = hasPlayback ? PLAYBACK_SIZE : EMPTY_SIZE;
  if (desktopPopout) return { ...preferred };

  if (!hasPlayback) {
    return {
      width: Math.max(EMPTY_MIN_WIDTH, Math.min(preferred.width, viewportWidth - VIEWPORT_PADDING)),
      height: preferred.height,
    };
  }

  return {
    width: Math.max(PLAYBACK_MIN_SIZE.width, Math.min(preferred.width, viewportWidth - VIEWPORT_PADDING)),
    height: Math.max(PLAYBACK_MIN_SIZE.height, Math.min(preferred.height, viewportHeight - VIEWPORT_PADDING)),
  };
}
