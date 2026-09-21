import type { SpindleFrontendContext } from "lumiverse-spindle-types";
import { setup } from "./frontend";
import { createDesktopWidgetContext } from "./widget-context";

interface WidgetTarget {
  index: number;
  title: string;
  width: number;
  height: number;
  chromeless: boolean;
}

export function setupWidget(
  context: SpindleFrontendContext,
  _target: WidgetTarget,
) {
  return setup(createDesktopWidgetContext(context));
}
