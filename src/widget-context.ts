import type { SpindleFrontendContext } from "lumiverse-spindle-types";

type ComponentOptions = Record<string, unknown>;

function detachedComponentHandle(target: unknown, initial: ComponentOptions = {}): object {
  let options = { ...initial };
  const base = {
    componentId: `desktop-widget-detached-${crypto.randomUUID()}`,
    element: target instanceof HTMLElement ? target : document.createElement("div"),
    update(patch: ComponentOptions) {
      options = { ...options, ...patch };
    },
    destroy() {},
    getValue() {
      if ("checked" in options) return options.checked;
      return options.value;
    },
    focus() {},
    blur() {},
  };
  return new Proxy(base, {
    get(current, property, receiver) {
      if (property === "then") return undefined;
      if (Reflect.has(current, property)) return Reflect.get(current, property, receiver);
      return () => undefined;
    },
  });
}

/**
 * Keep page-only extension surfaces inert inside a native widget WebView.
 * Floating-widget roots and the APIs they use continue to reach the real host.
 */
export function createDesktopWidgetContext(
  context: SpindleFrontendContext,
): SpindleFrontendContext {
  const detachedRoots = new Set<HTMLElement>();
  let floatingWidgetCreated = false;
  const detachedRoot = () => {
    const root = document.createElement("div");
    detachedRoots.add(root);
    return root;
  };
  const isDetachedTarget = (target: unknown): target is Element =>
    target instanceof Element
    && [...detachedRoots].some((root) => root === target || root.contains(target));

  const components = new Proxy(context.components, {
    get(target, property, receiver) {
      const member = Reflect.get(target, property, receiver);
      if (typeof member !== "function" || !String(property).startsWith("mount")) return member;
      return (mountTarget: unknown, options?: ComponentOptions) => {
        if (!floatingWidgetCreated || isDetachedTarget(mountTarget)) {
          return detachedComponentHandle(mountTarget, options);
        }
        return Reflect.apply(member, target, [mountTarget, options]);
      };
    },
  });

  const ui = new Proxy(context.ui, {
    get(target, property, receiver) {
      if (property === "mount") return () => detachedRoot();
      if (property === "createFloatWidget") {
        const member = Reflect.get(target, property, receiver);
        return (...args: unknown[]) => {
          floatingWidgetCreated = true;
          return Reflect.apply(member, target, args);
        };
      }
      if (property === "registerDrawerTab") {
        return (options: { id?: string }) => ({
          root: detachedRoot(),
          tabId: options.id || "desktop-widget-detached",
          setTitle() {},
          setShortName() {},
          setBadge() {},
          activate() {},
          destroy() {},
          onActivate() { return () => {}; },
        });
      }
      return Reflect.get(target, property, receiver);
    },
  });

  return new Proxy(context, {
    get(target, property, receiver) {
      if (property === "components") return components;
      if (property === "ui") return ui;
      return Reflect.get(target, property, receiver);
    },
  });
}
