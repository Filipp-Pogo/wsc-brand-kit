# WSC & Tier 1 Performance — Brand Kit Design Ideas

## Design Challenge
Two brands. One performance identity. The Brand Kit itself must embody the dual-brand architecture:
- Tier 1: sharp, industrial, dark, performance-driven (Oswald, charcoal #1a1d21, 0rem radius)
- WSC: warm, welcoming, community-forward (Inter, parchment #e8e0d3, 0.125rem radius)
Both united by: brand blue #3b82f6, tight negative letter-spacing, Inter body copy, sharp corners

---

<response>
<probability>0.07</probability>
<text>

## Idea A: "The Split Standard" — Architectural Duality

**Design Movement:** Swiss International Typographic Style meets Sports Performance Brutalism

**Core Principles:**
1. Literal visual split — left column Tier 1 dark, right column WSC warm, blue divider line between them
2. Oswald uppercase for all section headers, Inter for body — no mixing within a single brand context
3. Zero decorative elements — every visual element serves a functional purpose
4. Information density balanced by deliberate whitespace — not sparse, not crowded

**Color Philosophy:**
The app itself uses the "Split" concept from Signage Concept 4. The sidebar navigation is charcoal (#1a1d21) with white text — Tier 1's domain. Content areas shift between dark and warm depending on which brand section is active. Blue (#3b82f6) is the only "alive" color — used exclusively for interactive elements, active states, and copy triggers.

**Layout Paradigm:**
Fixed left sidebar (dark charcoal, Tier 1 identity) with section navigation. Main content area uses a two-column asymmetric grid — 60/40 split. Section headers span full width with a blue underline. Content blocks alternate between dark and warm backgrounds to signal brand context.

**Signature Elements:**
1. A vertical blue line running the full height of the sidebar — the "divider" motif from Concept 4
2. Section-level brand badges (small "T1" or "WSC" pill tags) on every content block
3. Oswald uppercase section labels with extreme letter-spacing (0.2em) as visual anchors

**Interaction Philosophy:**
Copy-to-clipboard on all color swatches, hex codes, and typography specimens. Hover reveals usage context. Active nav item gets a blue left border. Smooth section transitions with a horizontal slide.

**Animation:**
- Sidebar nav items: blue left border slides in on hover (200ms ease)
- Color swatches: scale(1.03) on hover, clipboard icon fades in
- Section entry: content blocks stagger-fade in from bottom (40px offset, 300ms, 60ms stagger)
- Logo download buttons: subtle lift shadow on hover

**Typography System:**
- Nav labels: Oswald 600, uppercase, 0.15em letter-spacing, 13px
- Section headings: Oswald 700, uppercase, -0.02em letter-spacing, 48px
- Sub-headings: Inter 600, 20px
- Body: Inter 400, 15px, 1.6 line-height
- Color codes: Inter 500 monospace-style, 13px

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B: "The Performance Codex" — Editorial Sports Reference

**Design Movement:** High-Performance Sports Brand Editorial (think Nike Brand Standards, not a typical style guide)

**Core Principles:**
1. The Brand Kit IS the brand — every pixel of the UI demonstrates the guidelines it documents
2. Dark-first with warm accent zones — the app lives in Tier 1's world but has WSC warmth in specific sections
3. Large typographic statements as section dividers — Oswald at 120px+ as visual architecture
4. Horizontal scrolling sections for logo variants and color palettes — magazine-like browsing

**Color Philosophy:**
Primary surface: #1a1d21 (Tier 1 charcoal). The app is dark by default because Tier 1 is the performance brand. WSC sections introduce the warm parchment (#e8e0d3) as a "temperature shift" — the user literally feels the brand difference. Blue (#3b82f6) pulses as the connective tissue.

**Layout Paradigm:**
Top navigation bar (fixed, dark) with brand logos on left. Full-width sections that stack vertically. Each major section has a "hero" — a large typographic statement (Oswald 700, 96px+) followed by the content. Logo and color sections use horizontal scroll carousels. Voice sections use a two-column editorial layout.

**Signature Elements:**
1. Giant Oswald letterforms as section backgrounds (opacity 0.04) — "THE STANDARD" behind the voice section
2. Blue horizontal rule with exact pixel measurements annotated — like a design spec sheet
3. Color swatch cards that flip on hover to reveal CMYK/RGB/HSL values

**Interaction Philosophy:**
The app should feel like using a premium sports brand's internal design system. Everything is downloadable. Color values copy on click with a satisfying micro-animation. Logo downloads are prominent. Voice guidelines have expandable "example" drawers.

**Animation:**
- Section entry: Oswald hero text slides up from 20px below (400ms cubic-bezier)
- Color card flip: CSS 3D transform on hover (600ms)
- Nav: blue underline slides between active items
- Logo cards: border-color transitions to blue on hover

**Typography System:**
- Hero labels: Oswald 700, uppercase, 96-120px, -0.02em
- Section headings: Oswald 700, 48px, uppercase
- Card titles: Inter 600, 16px
- Body: Inter 400, 15px
- Code/values: Inter 500, 13px, monospace

</text>
</response>

<response>
<probability>0.05</probability>
<text>

## Idea C: "The Dual Standard" — Sidebar-Driven Reference Tool

**Design Movement:** Premium Internal Tool Design — the intersection of Notion's clarity and a sports brand's intensity

**Core Principles:**
1. Persistent left sidebar with brand-aware section grouping (WSC sections vs Tier 1 sections clearly delineated)
2. Content area uses the brand's own design language — Tier 1 sections are dark, WSC sections are warm
3. Interactive specimens throughout — live typography previews, interactive color palettes, copyable voice examples
4. Every section has a "Quick Reference" card at the top — the most important rule in 2 lines

**Color Philosophy:**
Sidebar: deep navy (#0d1b2a) — the "bridge" color that connects both brands. Content area background shifts based on active section. Blue (#3b82f6) is the only interactive color. The overall app feels like Concept 3 (Navy Premium) from the signage guide — elevated, institutional, both brands unified.

**Layout Paradigm:**
Fixed 280px sidebar (navy). Content area is a single-column reading experience with max-width 860px, centered. Each section opens with a "brand signal" — a full-width banner using that section's brand colors. Content flows in cards with clear hierarchy.

**Signature Elements:**
1. Sidebar section dividers labeled "TIER 1 PERFORMANCE" and "WOODINVILLE SPORTS CLUB" in tiny uppercase Inter
2. "Brand Signal" banners at section tops — mini versions of the signage concepts
3. Interactive voice tone sliders showing formality/energy/technical depth per context

**Interaction Philosophy:**
Reference-first. The user comes here to look something up quickly. Keyboard-navigable. Search bar at top of sidebar. Every color, font, and tagline is one click to copy. Expandable "Do / Do Not" tables throughout.

**Animation:**
- Sidebar active state: blue left border (3px) with background fill transition (150ms)
- Section banners: subtle parallax on scroll
- Copy buttons: checkmark swap animation (300ms)
- Cards: shadow deepens on hover

**Typography System:**
- Sidebar labels: Inter 500, 13px, uppercase, 0.1em letter-spacing
- Section headings: Oswald 700, 40px, uppercase (Tier 1 sections) / Inter 300, 48px (WSC sections)
- Body: Inter 400, 15px
- Code values: Inter 500, 13px

</text>
</response>

---

## Selected Approach: **Idea B — "The Performance Codex"**

This approach makes the Brand Kit itself a demonstration of the brand. Dark-first with warm accent zones. Large Oswald typographic statements. The app IS the brand — every pixel proves the guidelines it documents.

Key decisions:
- Dark charcoal (#1a1d21) primary surface — Tier 1's world
- WSC sections shift to warm parchment (#e8e0d3) — temperature change signals brand shift
- Blue (#3b82f6) as the only interactive/alive color
- Oswald 700 for all section headers, Inter for body
- 0rem corner radius throughout (brand-critical)
- Top navigation with both logos
- Full-width stacking sections with large typographic anchors
- Horizontal scroll for logo variants
- Color swatches with hover-to-reveal all values + click-to-copy
