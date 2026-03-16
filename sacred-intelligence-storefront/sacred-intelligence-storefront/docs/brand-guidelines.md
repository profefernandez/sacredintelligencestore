# Sacred Intelligence™ — Brand Guidelines

> **This document is the single source of truth for all design, voice, and brand decisions.**
> Every component, page, and piece of copy must conform to these rules. No exceptions.

---

## How to Use This Document

This document is organized in three layers:

1. **Layer 1 — Design Rules** → The non-negotiable visual rules. Read this first.
2. **Layer 2 — Implementation** → How to apply the rules in code. For developers.
3. **Layer 3 — Brand Context** → Voice, audience, framework, lexicon. For copywriters and anyone new to the project.

---

# LAYER 1 — DESIGN RULES

---

## 1. Color System

Sacred Intelligence uses two brand color families: **gold** and **purple**. Gold is the voice — it speaks through text, accents, and calls to action. Purple is the atmosphere — it lives in the backgrounds.

### Background Palette

Three background colors. They rotate. **Adjacent sections never share the same background.**

| Name | Hex | Role |
|------|-----|------|
| Primary | `#0d0b12` | Deepest dark — hero, anchor sections |
| Secondary | `#121018` | Slightly lighter |
| Tertiary | `#1a0f2e` | Purple-tinted dark |

**Rule:** Use `getSectionBg(index)` or manually alternate. No two adjacent sections may share the same background color.

### Brand Gold

| Name | Hex | Role |
|------|-----|------|
| Gold Primary | `#c9a84c` | CTAs, labels, accents, italic emphasis |
| Gold Light | `#d4b65a` | Gradient end, button gradient |
| Gold Hover | `#e0c76e` | Hover states |

### Brand Purple

| Name | Hex | Role |
|------|-----|------|
| Deep Purple | `#1a0a2e` | Button text on gold backgrounds |
| Dark Purple | `#2d1854` | Borders, shadows, decorative |
| Medium Purple | `#6b3fa0` | Decorative accents, geometric bg |
| Accent Purple | `#c4a6e8` | Subheadings, pillar-specific accents |

### Text Colors

Every text color must achieve **WCAG AAA (7:1 contrast ratio)** against all three backgrounds. No opacity-based text colors — use solid hex values only.

| Role | Hex | vs Primary | vs Secondary | vs Tertiary |
|------|-----|-----------|-------------|------------|
| Headings | `#f0edf5` | 16.89:1 ✓ | 16.30:1 ✓ | 15.75:1 ✓ |
| Body text | `#ede4e8` | 15.71:1 ✓ | 15.15:1 ✓ | 14.64:1 ✓ |
| Muted / captions | `#cec5ca` | 10.82:1 ✓ | 10.44:1 ✓ | 10.09:1 ✓ |
| Gold accent | `#c9a84c` | 8.56:1 ✓ | 8.26:1 ✓ | 7.98:1 ✓ |

### Pillar Accent Colors

Used for pillar-specific highlights on pillar pages only.

| Pillar | Hex |
|--------|-----|
| Sacred | `#c9a84c` (gold) |
| Self-ish | `#9b7ec8` (light purple) |
| Shared | `#c4a6e8` (accent purple) |

### Semantic Colors

| Role | Hex |
|------|-----|
| Success | `#4ade80` |

---

## 2. Typography

Two fonts. No exceptions.

| Font | Family | Role |
|------|--------|------|
| **Playfair Display** | Serif | Headings, quotes, brand name, gold italic accents |
| **Inter** | Sans-serif | Body text, labels, navigation, UI, buttons |

Both loaded via Google Fonts with `font-display: swap`.

### Type Scale

Base font size: **18px** (mobile) / **20px** (desktop 1024px+). All sizes use `rem` and scale from this base.

| Role | Tailwind Classes | Desktop Size | Usage |
|------|-----------------|-------------|-------|
| **h1** | `font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl` | 60px → 96px | Page-level hero headline. One per page. |
| **h2** | `font-serif text-4xl sm:text-5xl lg:text-6xl` | 45px → 60px | Section headline. One per section. |
| **h3** | `font-serif text-3xl sm:text-4xl lg:text-5xl` | 37.5px → 48px | Sub-section headline. |
| **h4** | `font-serif text-2xl sm:text-3xl` | 30px → 37.5px | Card or item title. |
| **label** | `text-sm font-semibold uppercase tracking-[0.25em]` | 17.5px | Section labels above headings. Always gold. |
| **bodyLg** | `text-lg sm:text-xl lg:text-2xl` | 22.5px → 30px | Hero descriptions, key paragraphs. |
| **body** | `text-lg sm:text-xl` | 22.5px → 25px | Standard body text. |
| **bodySm** | `text-base` | 20px | Captions, footer text, disclaimers, metadata. |
| **quote** | `font-serif text-lg sm:text-xl italic` | 22.5px → 25px | Blockquotes, testimonial text. |
| **ctaLink** | `text-base sm:text-lg font-semibold uppercase tracking-[0.15em]` | 20px → 22.5px | Button text, CTA links. |

**Rule:** All text sizes come from this scale via the design system. No hardcoded `fontSize` overrides in components. Ever. The smallest text on the site is `bodySm` (20px on desktop, 18px on mobile).

---

## 3. Section Composition

**Rule:** Every section uses the `<Section>` component. No manual `<section>` wrappers with custom padding. The only exception is Hero (full-bleed, unique layout).

### Section Anatomy

Every section follows this structure:

```
┌─────────────────────────────────────────┐
│  SECTION LABEL (gold, uppercase, small) │
│                                         │
│  Heading With Gold Accent               │
│                                         │
│  Supporting body text.                  │
│                                         │
│  [ Section Content ]                    │
│  Cards, lists, images, quotes, etc.     │
│                                         │
│  CTA (primary or secondary)             │
└─────────────────────────────────────────┘
```

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | `py-20 sm:py-24 lg:py-28` | Standard section vertical padding |
| Section padding (compact) | `py-16 sm:py-20 lg:py-24` | Short-content sections |
| Page horizontal padding | `px-5 sm:px-8 lg:px-10` | All sections |
| Max width | `max-w-7xl mx-auto` | Standard content width |
| Max width (narrow) | `max-w-4xl mx-auto` | Text-heavy sections |
| Heading margin bottom | `mb-6` | Below all headings |
| Body margin bottom | `mb-8` | Below body text blocks |
| Label margin bottom | `mb-4` | Below section labels |

---

## 4. CTA Hierarchy

Two CTA styles. No other button patterns.

### Primary — `.btn-gold`

- **Appearance:** Gold gradient background, deep purple text, pill shape
- **When to use:** Conversions — book a call, buy, sign up, download
- **Limit:** One per section maximum
- **Specs:** `background: linear-gradient(135deg, #c9a84c, #d4b65a)`, `color: #1a0a2e`, `font-weight: 600`, `padding: 0.875rem 2.25rem`, `border-radius: 9999px`
- **Hover:** Gradient reverses, `translateY(-2px)`, gold box shadow
- **Focus:** 2px solid gold outline, 3px offset

### Secondary — Gold Outline

- **Appearance:** Transparent background, gold border, gold text, pill shape
- **When to use:** Navigation, exploration, "learn more," secondary actions. Can appear alongside primary or alone.
- **Specs:** `border: 1.5px solid #c9a84c`, `color: #c9a84c`, `padding: 0.8rem 2rem`, `border-radius: 9999px`, `font-weight: 600`
- **Hover:** Background fills with gold, text becomes deep purple
- **Focus:** 2px solid gold outline, 3px offset

### Retired Patterns

The following patterns are **not to be used**:
- ~~Gold text + expanding dash~~ → Use secondary button instead
- ~~`.btn-outline` (white border)~~ → Use secondary button instead
- ~~Inline `onMouseEnter`/`onMouseLeave` style changes~~ → Use CSS hover states

---

## 5. Accessibility — WCAG AAA

Non-negotiable. Every page must meet WCAG AAA.

### Contrast

- **7:1 minimum** for all normal text (body, captions, labels)
- **4.5:1 minimum** for large text (18px+ bold or 24px+ regular)
- All text colors in this document have been verified against all three backgrounds

### Focus States

- All interactive elements: `outline: 2px solid #c9a84c; outline-offset: 2-3px` on `:focus-visible`
- Skip-to-content link in root layout
- Gold outline on gold background → use deep purple outline instead

### Keyboard Navigation

- Full keyboard navigation on all interactive elements
- `Escape` closes all overlays and mobile menus
- Carousel navigation via dots with `role="tablist"` and `aria-selected`

### ARIA

- `role="navigation"` and `aria-label` on nav
- `aria-expanded` on mobile menu toggle
- `aria-label` on all sections
- Meaningful `alt` text on all images — describe the content, not the filename

---

## 6. Design Tokens

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| Pill | `9999px` / `rounded-full` | Buttons, CTAs |
| Card | `8px` / `rounded-lg` | Cards, panels, containers |
| Subtle | `4px` / `rounded` | Tags, badges, small elements |
| None | `0` | Images (unless specifically art-directed) |

### Image Treatment

- **Edge fades:** Use gradient overlays to blend images into section backgrounds. Match the gradient color to the section's background color.
- **Hover scale:** `transition-transform duration-700 group-hover:scale-105` for interactive image cards
- **Aspect ratios:** Use consistent ratios per context — `aspect-video` (16:9) for pillar cards, `aspect-[3/4]` for portraits, `aspect-[16/6]` for cinematic/banner images
- **All images** use Next.js `<Image>` component with `sharp`, appropriate `sizes` attribute, and meaningful `alt` text

### Shadows

- **Card shadow:** `0 0 40px ${colors.purple.dark}80, 0 0 0 1px ${colors.gold.primary}15` — purple glow with faint gold border
- **Button hover shadow:** `0 8px 25px rgba(201, 168, 76, 0.35)` — gold glow on primary CTA hover

### Decorative Elements

- **Gold divider:** `<Divider>` component — animated gold gradient horizontal rule, `h-px`, gradient from transparent → gold → transparent
- **Gold accent bar:** 3px wide gold vertical bar used as list markers or card accents
- **Geometric background:** Subtle angled gradient overlay via `.geometric-bg` class in globals.css

---

## 7. Animation

All animations use **Framer Motion** with `whileInView` and `viewport={{ once: true }}` for scroll-triggered reveals.

### Presets

| Preset | Effect | Usage |
|--------|--------|-------|
| `fadeUp` | Opacity 0→1, y: 30→0, 0.8s ease | Default for all content entering viewport |
| `slideLeft` | Opacity 0→1, x: -40→0 | Left-side content in split layouts |
| `slideRight` | Opacity 0→1, x: 40→0 | Right-side content in split layouts |
| `scaleLine` | scaleX 0→1, 1s delay 0.5s | Decorative dividers |
| `stagger` | Children stagger by 0.15s | Card grids, lists |

### Easing

All animations use the same easing curve: `[0.22, 1, 0.36, 1]` — a deceleration curve that feels elegant and intentional.

### Rules

- Never use `useEffect` with scroll listeners for animations — use `whileInView`
- Never animate on page load except in the Hero section
- Keep animation durations between 0.6s and 1.2s
- Stagger delay between 0.1s and 0.2s

---

# LAYER 2 — IMPLEMENTATION

---

## 8. Design System File

`src/lib/design-system.ts` is the single source of truth for all visual constants in code.

**Key exports:**
- `colors.bg` — background palette
- `colors.purple` — brand purples
- `colors.gold` — brand golds
- `colors.text` — heading, body, muted text colors
- `colors.pillar` — pillar-specific accents
- `typography` — Tailwind class strings for every text role
- `spacing` — section padding, page padding, max widths, margins
- `animation` — Framer Motion preset objects
- `getSectionBg(index)` — returns the correct background for alternating sections

**Rule:** No hardcoded hex values anywhere in components. Always import from the design system.

---

## 9. Component Patterns

### `<Section>` — Section Wrapper

Every section (except Hero) wraps in `<Section>`. It provides:
- Background color
- Standard padding
- Fade-up animation on scroll
- ARIA labeling

### `<SectionLabel>` — Small-Caps Label

Gold uppercase label above section headings. Always rendered in the `label` typography role.

### `<GoldAccent>` — Gold Italic Emphasis

The brand signature: gold italic text within headings. **Must be a reusable component**, not copy-pasted inline styles.

Usage: `<h2>Where Psychology Meets <GoldAccent>the Sacred.</GoldAccent></h2>`

### `<Divider>` — Animated Gold Rule

Horizontal gradient rule that animates in via `scaleLine`. Used between content blocks for visual breathing room.

### Buttons

- Primary: Apply `className="btn-gold"` (defined in globals.css)
- Secondary: Apply gold outline styles via component or utility class

---

## 10. Server / Client Component Split

Every page follows this pattern:

- `page.tsx` — **Server component.** Exports metadata via `generatePageMetadata()`. Renders shell.
- `[Name]Content.tsx` — **Client component** (`"use client"`). Contains all UI, animation, and interactivity.

---

## 11. File Organization

```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout (fonts, metadata, skip link)
│   ├── page.tsx          # Homepage
│   ├── globals.css       # Global styles & Tailwind design tokens
│   └── [route]/          # Each route: page.tsx + Content.tsx
├── components/           # Shared components
│   ├── ui/               # Primitives: Section, Divider, SectionLabel, GoldAccent
│   ├── Navigation.tsx    # Fixed header + mobile menu
│   └── ...               # Section components
├── data/                 # Static content data files
└── lib/
    ├── design-system.ts  # SINGLE SOURCE OF TRUTH for visual constants
    └── seo.ts            # SEO metadata helper
```

---

# LAYER 3 — BRAND CONTEXT

---

## 12. Brand Overview

**Sacred Intelligence™** is a transformational framework created by **Rev. Dr. Terrlyn L. Curry Avery (Dr. TLC)** — a licensed psychologist, ordained minister, and self-coined **Pastologist**.

**Definition:** Sacred Intelligence is the ability to tap into your divine internal source to make intelligent choices that manifest your own greatness while helping others to do the same.

**Pastology:** The synergy between clinical psychology and pastoring. Treats psychological pathology through a spiritual lens AND spiritual devotion through a psychological lens. Addresses the whole person — mind, body, and spirit.

**Core principle:** Internal healing must precede external action. Always.

### The Three Pillars

1. **Sacred** — The foundational, vertical connection to a higher power or spiritual essence. Healing religious wounds. "The Divine dwells within you."
2. **Self-ish (Self~ish)** — The bridge. Healthy, necessary preoccupation with your own well-being. Dismantling limiting beliefs, establishing boundaries and accountability.
3. **Shared** — How internal healing translates into the external world: family, community, society. Using your sphere of influence to build the Beloved Community.

**Flow:** Sacred (vertical connection) → Self-ish (bridge/self-work) → Shared (external expression). Sequential. You must first cultivate a loving relationship with the Sacred and yourself before building healthy relationships with others.

### The Labyrinth Metaphor

The central visual and conceptual metaphor. Drawn from Dr. TLC's personal experience walking a physical labyrinth during a silent retreat. Teaching: Walk your own path. Don't be distracted by how others walk theirs. At the center: "You are divinely created and loved unconditionally."

### Connection to Dismantling Racism

Racism is not separate from the coaching/spiritual work — it is the ultimate external manifestation of the framework:
- **Sacred Motive:** Grounding racial justice in love and shared humanity
- **Self-ish Mindset:** Uncovering blindspots, unconscious biases, conditioned thinking
- **Shared Movement:** Internal healing → external community action

---

## 13. Brand Voice & Tone

### Voice Attributes

- **Compassionate** — speaks directly to pain, acknowledges suffering without judgment
- **Challenging** — firmly pushes toward accountability, growth, and personal responsibility
- **Clinically grounded** — weaves psychological rigor ("limiting beliefs," "unconscious bias," "mental load")
- **Spiritually elevated** — with spiritual depth ("divine source," "sacred wisdom," "healing from the inside out")
- **Free of dogma** — no pressure, no judgment, no specific religious imposition

### Brand Energy

A unique combination of **spirituality, power, and peace.**

| Audience | Primary Emotion |
|----------|----------------|
| Overwhelmed women & caregivers | Relief and groundedness — "intentional pause," guilt-free self-care |
| Advocates & leaders | Courage and accountability — moving past guilt, shame, defensiveness |
| The "walking wounded" | Unconditional love and worthiness — combating self-loathing, "church hurt" |

### Writing Guidelines

- Lead with empathy, follow with challenge
- Use Dr. TLC's lexicon naturally (see below) — it's how she speaks
- Never be preachy, never be clinical. The voice lives at the intersection.
- Write as if speaking to one person, not an audience
- Short sentences for impact. Longer sentences for flow. Alternate.

---

## 14. Audience Profiles

### Premium Positioning

Dr. TLC focuses on clients willing to invest $30K+ for transformation. The website is not a service catalog — it is a **curated experience that pre-qualifies.**

### Primary Profiles

1. **The "Walking Wounded"** — Burdened by past traumas, broken trust, paralyzed by limiting beliefs
2. **Victims of Religious Wounding** — "Church hurt," spiritual trauma, struggling with unworthiness
3. **Midlife Women & Caregivers** — Juggling careers, aging parents, hormonal shifts. "Slipped to the bottom of the list."
4. **High-Impact Leaders & Organizations** — Committed to racial equity and inclusive environments
5. **Advocates for Racial Justice** — Moving beyond performative gestures to inside-out transformation

### What Life Looks Like After

- Deep spiritual and psychological healing
- Freedom from limiting beliefs and toxic relationships
- Personal empowerment: boundaries, self-acceptance, accountability
- Leaders gain clarity on their sphere of influence
- "Manifesting greatness" — awaken dormant dreams, live with purpose

---

## 15. Dr. TLC's Lexicon

These are not marketing terms — they are how Dr. TLC speaks. Use them naturally.

| Term | Meaning |
|------|---------|
| **Pastology / Pastologist** | Her coined profession — the synergy of psychology and pastoring |
| **Sacred Intelligence** | The core concept and framework |
| **Manifest Your Greatness** | The ultimate call to action |
| **Divinely created and loved unconditionally** | Foundational mantra |
| **Healing from the inside out** | Constant refrain — internal before external |
| **Sacred, Self-ish, Shared** | The three pillars |
| **Wounded by Religion / Church Hurt** | Spiritual trauma from institutions |
| **The Walking Wounded / Injured Spirit** | People burdened by trauma |
| **Mental Load / Invisible weight of responsibility** | Validating exhaustion |
| **Intentional Pause / Sacred Interruption** | Stepping away from chaos for reflection |
| **Sphere of Influence** | How leaders can dismantle systemic barriers |
| **The Beloved Community** | Ultimate vision (from Dr. Martin Luther King Jr.) |

---

## 16. What This Document Replaces

With the creation of `brand-guidelines.md`, the following are now consolidated here and can be considered secondary references:

- Color and typography decisions previously scattered across `design-system.ts` comments
- Voice and tone guidance previously only in memory files
- Audience profiles previously only in memory files
- Accessibility standards previously implied but not documented

**`design-system.ts` remains the code-level implementation** of the rules defined here. If this document and the code disagree, update the code to match this document.
