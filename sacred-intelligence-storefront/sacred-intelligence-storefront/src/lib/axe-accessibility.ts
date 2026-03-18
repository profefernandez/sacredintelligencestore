/**
 * Axe-core accessibility checker — dev mode only.
 * Logs WCAG violations to the browser console with severity and fix suggestions.
 * Call this once in the root layout's client-side effect.
 */
export async function initAccessibilityChecker() {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "development") return;

  const React = await import("react");
  const ReactDOM = await import("react-dom");
  const axe = await import("@axe-core/react");

  axe.default(React.default, ReactDOM.default, 1000, {
    rules: [
      // Enforce AAA contrast (7:1 ratio)
      { id: "color-contrast-enhanced", enabled: true },
    ],
  });
}
