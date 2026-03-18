/**
 * Design System Tokens — Sacred Intelligence Collection Storefront
 *
 * Single source of truth for all visual constants.
 * Every component imports from this file. NO hardcoded hex values elsewhere.
 *
 * Matches: docs/brand-guidelines.md
 *
 * Theme: Dark-only. Three rotating backgrounds.
 * Typography: Playfair Display (serif headings) + Inter (sans body).
 * Accessibility: All text colors meet WCAG AAA (7:1+) against all three backgrounds.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const colors = {
  bg: {
    primary: "#0d0b12",    // deepest dark — hero, anchor sections
    secondary: "#121018",  // slightly lighter
    tertiary: "#1a0f2e",   // purple-tinted dark
  },

  gold: {
    primary: "#c9a84c",    // CTAs, labels, accents, italic emphasis
    light: "#d4b65a",      // gradient end, button gradient
    hover: "#e0c76e",      // hover states
  },

  purple: {
    deep: "#1a0a2e",       // button text on gold backgrounds
    dark: "#2d1854",       // borders, shadows, decorative
    medium: "#6b3fa0",     // decorative accents, geometric bg
    accent: "#c4a6e8",     // subheadings, pillar-specific accents
  },

  text: {
    heading: "#f0edf5",    // 16.89:1 vs primary bg
    body: "#ede4e8",       // 15.71:1 vs primary bg
    muted: "#cec5ca",      // 10.82:1 vs primary bg
    gold: "#c9a84c",       // 8.56:1 vs primary bg
  },

  pillar: {
    sacred: "#c9a84c",     // gold
    selfish: "#9b7ec8",    // light purple
    shared: "#c4a6e8",     // accent purple
  },

  semantic: {
    success: "#4ade80",
  },

  glass: {
    bg: "rgba(13, 11, 18, 0.7)",        // glass card background
    bgHover: "rgba(13, 11, 18, 0.85)",   // glass card hover
    border: "rgba(201, 168, 76, 0.12)",   // subtle gold border
    borderHover: "rgba(201, 168, 76, 0.25)", // gold border on hover
  },

  glow: {
    purple: "rgba(107, 63, 160, 0.15)",   // ambient purple halo
    purpleStrong: "rgba(107, 63, 160, 0.25)", // stronger purple glow
    gold: "rgba(201, 168, 76, 0.2)",      // gold glow for CTAs
    goldStrong: "rgba(201, 168, 76, 0.35)", // stronger gold glow
  },

  // Structural
  border: "#2a1f3d",
  shelfLine: "#c9a84c",
  divider: "#c9a84c",
} as const;

/**
 * Returns alternating section background colors for visual rhythm.
 * Adjacent sections never share the same background.
 */
export function getSectionBg(index: number): string {
  const bgs = [colors.bg.primary, colors.bg.secondary, colors.bg.tertiary];
  return bgs[index % bgs.length];
}

// ---------------------------------------------------------------------------
// Shadows
// ---------------------------------------------------------------------------

export const shadows = {
  card: `0 0 40px ${colors.purple.dark}80, 0 0 0 1px ${colors.gold.primary}15`,
  shelf: "0 8px 32px rgba(0,0,0,0.5)",
  shelfHover: "0 12px 40px rgba(0,0,0,0.6)",
  product: "0 16px 48px rgba(0,0,0,0.5)",
  buttonHover: "0 8px 25px rgba(201, 168, 76, 0.35)",
  glassCard: `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(201, 168, 76, 0.08)`,
  glassCardHover: `0 16px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 168, 76, 0.2), 0 0 30px rgba(107, 63, 160, 0.1)`,
  goldGlow: `0 0 20px rgba(201, 168, 76, 0.3), 0 0 40px rgba(201, 168, 76, 0.15)`,
  purpleAmbient: `0 0 80px rgba(107, 63, 160, 0.15)`,
} as const;

// ---------------------------------------------------------------------------
// Overlays
// ---------------------------------------------------------------------------

export const overlays = {
  goldSubtle: "rgba(201, 168, 76, 0.1)",
} as const;

// ---------------------------------------------------------------------------
// Typography — Tailwind class strings per brand guidelines
// ---------------------------------------------------------------------------

export const typography = {
  h1: "font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight",
  h2: "font-serif text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.15] tracking-tight",
  h3: "font-serif text-lg sm:text-xl lg:text-2xl font-semibold leading-[1.2]",
  h4: "font-serif text-base sm:text-lg lg:text-xl font-semibold leading-[1.25]",
  label: "text-xs font-semibold uppercase tracking-[0.2em]",
  bodyLg: "text-base sm:text-lg leading-relaxed",
  body: "text-sm sm:text-base leading-relaxed",
  bodySm: "text-sm leading-relaxed",
  quote: "font-serif text-base sm:text-lg italic leading-relaxed",
  price: "text-base sm:text-lg font-bold",
  ctaLink: "text-sm sm:text-base font-semibold uppercase tracking-[0.12em]",
} as const;

// ---------------------------------------------------------------------------
// Spacing — Tailwind class strings
// ---------------------------------------------------------------------------

export const spacing = {
  section: "py-10 sm:py-12 lg:py-16",
  sectionCompact: "py-8 sm:py-10 lg:py-12",
  pageX: "px-5 sm:px-8 lg:px-10",
  maxWidth: "max-w-7xl mx-auto",
  maxWidthNarrow: "max-w-4xl mx-auto",
  headingMb: "mb-6",
  bodyMb: "mb-8",
  labelMb: "mb-4",
  touchTarget: "48px",
  touchGap: "8px",
  bottomNav: "72px",
  headerHeight: "72px",
} as const;

// ---------------------------------------------------------------------------
// Border Radius
// ---------------------------------------------------------------------------

export const radius = {
  pill: "9999px",
  card: "8px",
  subtle: "4px",
  none: "0",
} as const;

// ---------------------------------------------------------------------------
// Animation (Framer Motion presets)
// ---------------------------------------------------------------------------

const ease = [0.22, 1, 0.36, 1] as const;

export const animation = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease },
  },
  slideLeft: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease },
  },
  slideRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease },
  },
  scaleLine: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 1, delay: 0.5, ease },
  },
  stagger: {
    container: {
      animate: { transition: { staggerChildren: 0.15 } },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease },
    },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease },
  },
  viewport: { once: true, margin: "-60px" as const },
} as const;

// ---------------------------------------------------------------------------
// Focus
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Gradients
// ---------------------------------------------------------------------------

export const gradients = {
  goldCta: "linear-gradient(135deg, #c9a84c, #d4b65a)",
  goldCtaHover: "linear-gradient(135deg, #d4b65a, #c9a84c)",
  purpleAmbient: "radial-gradient(ellipse at center top, rgba(107, 63, 160, 0.15) 0%, transparent 70%)",
  purpleSpotlight: "radial-gradient(circle at 50% 0%, rgba(107, 63, 160, 0.2) 0%, transparent 60%)",
  darkFade: "linear-gradient(180deg, rgba(13, 11, 18, 0) 0%, rgba(13, 11, 18, 1) 100%)",
  cardShine: "linear-gradient(135deg, rgba(201, 168, 76, 0.05) 0%, transparent 50%, rgba(201, 168, 76, 0.03) 100%)",
  goldLine: "linear-gradient(180deg, rgba(201, 168, 76, 0.1) 0%, #c9a84c 30%, #c9a84c 70%, rgba(201, 168, 76, 0.1) 100%)",
} as const;

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------

export const carousel = {
  cardWidth: "280px",
  cardWidthLg: "320px",
  gap: "16px",
  gapLg: "24px",
  rowPadding: "px-5 sm:px-8 lg:px-10",
} as const;

// ---------------------------------------------------------------------------
// Focus
// ---------------------------------------------------------------------------

export const focus = {
  outline: `2px solid ${colors.gold.primary}`,
  outlineOffset: "3px",
} as const;
