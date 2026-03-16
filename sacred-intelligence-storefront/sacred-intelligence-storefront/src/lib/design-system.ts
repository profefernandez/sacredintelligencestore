/**
 * Design System Tokens — Sacred Intelligence Storefront
 *
 * Single source of truth for all visual constants.
 * Every component imports from this file. NO hardcoded hex values elsewhere.
 *
 * Accessibility: All text colors meet WCAG AAA contrast ratios (7:1+).
 * Gold decorative (#c9a84c) is ONLY for borders/icons — use accentGoldText for text.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const brand = {
  gold: "#c9a84c",
  deepPurple: "#1a0a2e",
  darkPurple: "#2d1854",
} as const;

const light = {
  // Backgrounds
  bgPrimary: "#f5f0e8",       // cream
  bgSecondary: "#faf7f2",     // warm white

  // Text
  textPrimary: "#1a0a2e",     // deep purple — 16.4:1 on cream
  textBody: "#4a3d5c",        // purple-gray — 8.8:1 on cream

  // Accent — gold
  accentGoldText: "#614f1d",        // dark bronze — 7.0:1, AAA safe for text
  accentGoldDecorative: "#c9a84c",  // brand gold — borders/icons ONLY, NOT text

  // CTA
  ctaPrimaryBg: "#2d1854",
  ctaPrimaryText: "#f0edf5",
  ctaSecondaryBorder: "#2d1854",
  ctaSecondaryText: "#2d1854",

  // Structural
  shelfLine: "#d6c9a8",       // subtle gold-tinted rule
  divider: "#e0d8c8",         // light cream divider
  border: "#d4cbb8",          // card/input borders
} as const;

const dark = {
  // Backgrounds
  bgPrimary: "#0d0b12",
  bgSecondary: "#121018",
  bgTertiary: "#1a0f2e",

  // Text
  textPrimary: "#f0edf5",     // 16.9:1 on dark bg
  textBody: "#b8a8d6",        // 9.0:1 on dark bg

  // Accent
  accentGold: "#c9a84c",      // 8.6:1 — safe on dark backgrounds
  purpleAccent: "#c4a6e8",    // 9.3:1

  // CTA
  ctaPrimaryBg: "#c9a84c",
  ctaPrimaryText: "#0d0b12",
  ctaSecondaryBorder: "#c9a84c",
  ctaSecondaryText: "#c9a84c",

  // Structural
  shelfLine: "#2a1f3d",
  divider: "#1f1730",
  border: "#2a1f3d",
} as const;

export const colors = {
  brand,
  light,
  dark,
} as const;

/**
 * Returns alternating section background colors for visual rhythm.
 */
export function getSectionBg(
  index: number,
  mode: "light" | "dark" = "light"
): string {
  if (mode === "dark") {
    const bgs = [dark.bgPrimary, dark.bgSecondary, dark.bgTertiary];
    return bgs[index % bgs.length];
  }
  const bgs = [light.bgPrimary, light.bgSecondary];
  return bgs[index % bgs.length];
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

export const typography = {
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(3rem, 5vw, 4.5rem)",
    fontWeight: "700",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  },
  h2: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2rem, 3.5vw, 3rem)",
    fontWeight: "600",
    lineHeight: "1.15",
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
    fontWeight: "600",
    lineHeight: "1.2",
    letterSpacing: "0",
  },
  h4: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
    fontWeight: "600",
    lineHeight: "1.25",
    letterSpacing: "0",
  },
  label: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "0.875rem",
    fontWeight: "700",
    lineHeight: "1.4",
    letterSpacing: "0.25em",
    textTransform: "uppercase" as const,
  },
  body: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "1.05rem",
    fontWeight: "400",
    lineHeight: "1.7",
    letterSpacing: "0",
  },
  bodyLg: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "1.15rem",
    fontWeight: "400",
    lineHeight: "1.7",
    letterSpacing: "0",
  },
  price: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "1.1rem",
    fontWeight: "700",
    lineHeight: "1.4",
    letterSpacing: "0",
  },
  cta: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "1rem",
    fontWeight: "700",
    lineHeight: "1.4",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing
// ---------------------------------------------------------------------------

export const spacing = {
  section: {
    paddingY: "clamp(4rem, 8vw, 7rem)",
    paddingX: "clamp(1.5rem, 5vw, 4rem)",
  },
  maxContentWidth: "80rem",
  maxTextWidth: "50rem",
  touchTarget: "48px",
  touchGap: "8px",
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const radius = {
  sm: "4px",
  md: "8px",
  lg: "12px",
} as const;

// ---------------------------------------------------------------------------
// Animation (Framer Motion presets)
// ---------------------------------------------------------------------------

export const animation = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  slideLeft: {
    initial: { opacity: 0, x: -32 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  slideRight: {
    initial: { opacity: 0, x: 32 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.1 } },
    },
    item: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  viewport: { once: true, margin: "-60px" as const },
} as const;

// ---------------------------------------------------------------------------
// Focus
// ---------------------------------------------------------------------------

export const focus = {
  outline: `3px solid ${brand.gold}`,
  outlineOffset: "3px",
} as const;
