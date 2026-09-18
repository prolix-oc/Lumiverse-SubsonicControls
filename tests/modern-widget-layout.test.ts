import { describe, expect, test } from "bun:test";
import { getModernWidgetExpandedSize } from "../src/ui/modern-widget-layout";

describe("Modern Lyrics widget expanded size", () => {
  test("uses the full in-page size from a compact desktop pop-out", () => {
    expect(getModernWidgetExpandedSize({
      desktopPopout: true,
      hasPlayback: true,
      viewportHeight: 112,
      viewportWidth: 160,
    })).toEqual({ width: 348, height: 520 });
  });

  test("uses the same size on a normal desktop page", () => {
    expect(getModernWidgetExpandedSize({
      desktopPopout: false,
      hasPlayback: true,
      viewportHeight: 800,
      viewportWidth: 1200,
    })).toEqual({ width: 348, height: 520 });
  });

  test("retains responsive minimums on a constrained page", () => {
    expect(getModernWidgetExpandedSize({
      desktopPopout: false,
      hasPlayback: true,
      viewportHeight: 400,
      viewportWidth: 280,
    })).toEqual({ width: 300, height: 420 });
  });

  test("uses the intrinsic empty-state size in a pop-out", () => {
    expect(getModernWidgetExpandedSize({
      desktopPopout: true,
      hasPlayback: false,
      viewportHeight: 112,
      viewportWidth: 160,
    })).toEqual({ width: 320, height: 196 });
  });
});
