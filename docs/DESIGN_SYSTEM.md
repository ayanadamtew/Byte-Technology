# BYTE TECHNOLOGY — DESIGN SYSTEM SPECIFICATION (`docs/DESIGN_SYSTEM.md`)

## Overview & Design Philosophy: "Modular Systems Architecture"

The **Byte Technology Design System** translates the strategic direction in `docs/DESIGN_DIRECTION.md` and the official modular **"B"** logo (`/public/assets/aistudio/byte_logo_2939abed.jpeg`) into an engineered, reusable token and component architecture.

To ensure the platform feels custom, authoritative, and bespoke—never like a default component-library template—every token and primitive follows three core laws:
1. **Logo-Derived Chromatic Discipline:** Surfaces and accents are extracted directly from the official Byte Technology logo: **Warm Alabaster (`#F2F2EE`)**, **Crisp Ivory (`#FAF9F6`)**, **Byte Navy Obsidian (`#1A2130`)**, **Byte Orange (`#FA8112`)**, and **Warm Amber (`#FDA63A`)**.
2. **Exposed `1px` Structural Geometry:** Instead of heavy drop-shadows or nested floating cards, sections and modules are structured by crisp `1px` architectural hairlines (`#DFDFD9` on light canvases; `rgba(255, 255, 255, 0.09)` on dark canvases) with optional coordinate crosshair markers (`+`) at structural intersections.
3. **Editorial & Technical Restraint:** Clean, natural editorial numbering (`01.`, `02.`) and unboxed typographic metadata replace generic pill badges or synthetic clutter.

---

## 1. Typography Scale & Font Families

Following the **2+1 Font Rule**, Byte Technology pairs a geometric display typeface with a highly legible humanist-geometric body typeface and a precision monospace font for tabular numerals and index labels:

| Role | Font Family | CSS Variable / Tailwind Class | Weights Used | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Display & Headlines** | `Plus Jakarta Sans` | `var(--font-display)` / `font-display` | `600` (SemiBold), `700` (Bold) | Hero statements, section headers, card titles, architectural callouts. |
| **Body & UI Prose** | `DM Sans` | `var(--font-sans)` / `font-sans` | `400` (Regular), `500` (Medium) | Long-form executive prose, form controls, navigation links, descriptions. |
| **Technical Index & Tabular Data** | `JetBrains Mono` | `var(--font-mono)` / `font-mono` | `400` (Regular), `500` (Medium) | Service index numbers (`01`–`07`), coordinate labels, tabular metrics (`tabular-nums`). |

### Type Scale Specification

| Token / Level | Size (Fluid / Rem) | Line Height | Letter Spacing | Weight | Usage & Constraints |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`display-xl` (Hero H1)** | `clamp(2.375rem, 4.2vw, 3.75rem)` (`38px`–`60px`) | `1.08` | `-0.03em` | `700` | Single `H1` per page; `text-wrap: balance`; max `18ch–22ch` per line. |
| **`heading-lg` (Section H2)** | `clamp(1.75rem, 2.8vw, 2.625rem)` (`28px`–`42px`) | `1.14` | `-0.025em` | `700` | Primary section headings; `text-wrap: balance`. |
| **`heading-md` (Pillar / Feature H3)** | `clamp(1.25rem, 1.8vw, 1.625rem)` (`20px`–`26px`) | `1.24` | `-0.015em` | `600` | Service module titles, scenario headings. |
| **`heading-sm` (Sub-module H4)** | `1.125rem` (`18px`) | `1.35` | `-0.01em` | `600` | Deliverables group titles, process step titles. |
| **`body-lg` (Executive Lead)** | `1.125rem` (`18px`) | `1.65` | `0em` | `400` | Hero lead copy and section introductions (`max-w-[65ch]`). |
| **`body-base` (Standard Prose)** | `1rem` (`16px`) | `1.65` | `0em` | `400` | Standard service descriptions and narrative copy (`max-w-[68ch]`). |
| **`body-sm` (UI & Secondary)** | `0.875rem` (`14px`) | `1.55` | `0em` | `400` / `500` | Form labels, secondary card notes, footer links. |
| **`kicker-index` (Editorial Index)** | `0.75rem` (`12px`) | `1.4` | `0.06em` | `500` | Unboxed section index labels (e.g., `01 · Core Capabilities`). |

*Optical Dark-Mode Rule:* When rendering light text (`#F2F2EE`) on Byte Navy Obsidian (`#1A2130`), apply `+0.005em` letter-spacing and antialiased font smoothing (`-webkit-font-smoothing: antialiased`) to preserve crisp legibility.

---

## 2. Color Tokens & Semantic Mapping

Color distribution follows strict **60-30-10 architectural discipline**:
- **60% Primary Canvas:** Warm Alabaster (`#F2F2EE`) on light sections; Byte Navy Obsidian (`#1A2130`) on dark sections.
- **30% Structural Surfaces & Typography:** Crisp Ivory (`#FAF9F6`), Elevated Midnight (`#232C3F`), Hairlines (`#DFDFD9`), and Ink hierarchy.
- **10% High-Intent Brand Accents:** Byte Orange (`#FA8112`) and Warm Amber (`#FDA63A`) reserved strictly for primary CTAs, active schematic nodes, and interactive focus states.

### Core Brand & Surface Tokens (`src/styles/tokens.ts` & `src/index.css`)

| Semantic Token | CSS Custom Property | Hex / RGBA Value | WCAG Contrast & Role |
| :--- | :--- | :--- | :--- |
| **Canvas Light** | `--byte-bg-canvas` | `#F2F2EE` | Primary light background; matches official logo canvas (`13.8:1` vs Navy Ink). |
| **Surface Light Elevated** | `--byte-bg-surface` | `#FAF9F6` | Bento cards, form containers, and structural modules on light sections. |
| **Surface Light Pure** | `--byte-bg-pure` | `#FFFFFF` | Active/hover card elevation and input field backgrounds. |
| **Surface Light Subtle** | `--byte-bg-subtle` | `#E7E6E0` | Segmented control tracks and subtle dividers. |
| **Canvas Dark** | `--byte-dark-canvas` | `#1A2130` | Extracted from logo's left pillar; Mission, ERP, and Footer dark sections. |
| **Canvas Dark Deep** | `--byte-dark-deep` | `#111622` | Deep architectural recess inside dark sections. |
| **Surface Dark Elevated** | `--byte-dark-surface` | `#232C3F` | Interactive cards and schematic containers inside dark sections. |
| **Ink Primary (Light)** | `--byte-ink-primary` | `#1A2130` | Primary headlines and body text on light canvases (`13.8:1` AAA). |
| **Ink Secondary (Light)** | `--byte-ink-secondary` | `#4A5365` | Supporting body prose on light canvases (`6.8:1` AA). |
| **Ink Muted (Light)** | `--byte-ink-muted` | `#687285` | Quiet captions, index numbers, and placeholders (`4.6:1` AA). |
| **Ink Primary (Dark)** | `--byte-dark-ink-primary` | `#F2F2EE` | Primary headlines and text on dark canvases (`13.8:1` AAA). |
| **Ink Secondary (Dark)** | `--byte-dark-ink-secondary` | `#B0B8C8` | Supporting prose on dark canvases (`7.9:1` AAA). |
| **Accent Primary** | `--byte-accent-orange` | `#FA8112` | Official logo center square byte orange; primary CTAs and active nodes. |
| **Accent Primary Hover** | `--byte-accent-orange-hover` | `#E06D05` | Deepened tactile hover state for primary orange buttons. |
| **Accent Secondary** | `--byte-accent-amber` | `#FDA63A` | Official logo right curved quadrant amber; schematic highlights & flows. |
| **Border Hairline Light** | `--byte-border-light` | `#DFDFD9` | `1px` exposed structural grid lines on light sections. |
| **Border Hairline Dark** | `--byte-border-dark` | `rgba(242, 242, 238, 0.11)` | `1px` exposed structural grid lines on dark sections. |
| **Semantic Success** | `--byte-status-success` | `#15803D` | Form validation confirmation and operational readiness cues. |
| **Semantic Warning** | `--byte-status-warning` | `#B45309` | Advisory notices. |
| **Semantic Danger** | `--byte-status-danger` | `#B91C1C` | Form input validation errors (`4.5:1+` contrast). |

---

## 3. Spacing System

All spatial rhythm is governed by an **8px (`0.5rem`) structural baseline** with `4px` micro-adjustments for typography and icon alignment:

| Token | Value (`px` / `rem`) | Tailwind Utility | Architectural Application |
| :--- | :--- | :--- | :--- |
| **`space-1`** | `4px` / `0.25rem` | `gap-1`, `p-1` | Inline icon-to-label micro-offset. |
| **`space-2`** | `8px` / `0.5rem` | `gap-2`, `p-2` | Tight metadata separator spacing; input label-to-field gap. |
| **`space-3`** | `12px` / `0.75rem` | `gap-3`, `p-3` | Compact button vertical padding; list item rhythm. |
| **`space-4`** | `16px` / `1rem` | `gap-4`, `p-4` | Minimum mobile container padding; standard form field spacing. |
| **`space-6`** | `24px` / `1.5rem` | `gap-6`, `p-6` | Standard Bento grid gap; compact card internal padding. |
| **`space-8`** | `32px` / `2rem` | `gap-8`, `p-8` | Standard desktop card internal padding (`p-8`); split-column gap. |
| **`space-12`** | `48px` / `3rem` | `py-12`, `gap-12` | Section header-to-content vertical margin; mobile section padding. |
| **`space-16`** | `64px` / `4rem` | `py-16`, `gap-16` | Tablet section vertical padding; major architectural block separation. |
| **`space-24`** | `96px` / `6rem` | `py-24` | Standard desktop section vertical rhythm (`96px` top/bottom). |
| **`space-32`** | `128px` / `8rem` | `py-32` | High-impact hero and dark mission mandate vertical breathing room. |

*Spatial Invariant:* Container outer padding must always be greater than or equal to the internal gap between child modules (`padding_outer >= gap_inner`).

---

## 4. Grid and Layout Rules

1. **Viewport & Container Bounds:**
   - **Desktop Baseline:** `1440px` viewport width.
   - **Max Structural Container:** `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
   - **Readable Prose Measure:** `60ch–68ch` (`max-w-2xl`) for all narrative paragraphs.
2. **12-Column Architectural Grid:**
   - **Hero Split Ratio:** `7 columns` (Strategic Messaging & CTAs) + `5 columns` (Interactive System Blueprint Schematic).
   - **Bento Capability Matrix:** Asymmetric 12-column grid where foundational enterprise services (`03 Custom Software & ERP Systems` and `07 AI & Business Automation`) span `8 columns` or `6 columns`, paired with `4-column` or `6-column` focused modules—preventing monotonous 3x3 card repetition.
3. **Exposed Blueprint Hairlines & Crosshairs:**
   - Primary sections are bounded by `1px solid var(--byte-border-light)` (or `--byte-border-dark`) horizontal and vertical rules.
   - Structural corners can display subtle `9px × 9px` geometric crosshair markers (`+`) in `#9BA3B4` to reinforce the engineering blueprint motif without visual clutter.

---

## 5. Buttons (`src/components/ui/button.tsx`)

Buttons use crisp architectural geometry (`rounded-md` / `6px` radius), decisive tactile feedback, and clear typographic labels. Horizontal padding is always at least `2×` vertical padding.

| Variant | Surface & Ink | Hover / Active State | Focus & Accessibility | Primary Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **`primary` (Brand Accent)** | Bg: `#FA8112` (Byte Orange)<br>Text: `#111622` (Deep Ink, `font-semibold` — `7.6:1` AAA contrast) | Bg: `#E06D05`<br>Subtle `-1px` Y translation | `focus-visible:ring-2 ring-[#FA8112] ring-offset-2` | Primary conversion CTAs (`Start a Project Conversation`). |
| **`navy` (Institutional)** | Bg: `#1A2130` (Byte Navy)<br>Text: `#F2F2EE` (Alabaster) | Bg: `#FA8112` with `#111622` text transition | `focus-visible:ring-2 ring-[#1A2130] ring-offset-2` | Global header CTA (`Request Consultation`) & light-section anchors. |
| **`outline` (Architectural)** | Bg: Transparent<br>Border: `1px solid #1A2130` (Light) or `rgba(242,242,238,0.24)` (Dark) | Bg: `#1A2130`/`5%` (Light) or `rgba(242,242,238,0.08)` (Dark) | `focus-visible:ring-2` | Secondary exploratory CTAs (`Explore Our 7 Capabilities`). |
| **`ghost` / `link` (Contextual)** | Transparent; text `#1A2130` or `#FA8112` with directional arrow `→` | Arrow translates `+3px` right (`group-hover:translate-x-1`) | `focus-visible:underline` | Inside service Bento modules (`Inquire About Web Development →`). |

### Button Sizes
- **`sm`:** `h-9 px-4 py-2 text-xs`
- **`default`:** `h-11 px-6 py-2.5 text-sm` (44px touch-compliant height)
- **`lg`:** `h-12 px-7 py-3 text-base` (48px hero action height)

---

## 6. Navigation Specification

- **Sticky Architectural Header:**
  - Height: `68px` (`h-[68px]`).
  - Surface: Warm Alabaster Glass `bg-[#F2F2EE]/90 backdrop-blur-md` with a bottom `1px` structural hairline `border-b border-[#DFDFD9]`.
  - Brand Lockup: Official Byte Technology modular "B" mark (`/public/assets/aistudio/byte_logo_2939abed.jpeg`, `h-8 w-auto`) + `Byte Technology` in `font-display font-bold tracking-tight text-[#1A2130]`.
  - Navigation Links: Clean unboxed typography (`text-sm font-medium text-[#4A5365] hover:text-[#1A2130]`). Active page indicated by a crisp `2px` bottom bar in Byte Orange (`#FA8112`), never a filled pill capsule.
  - Right Action: `Request Consultation` button (`navy` variant) + accessible mobile menu toggle (`min-h-[44px] min-w-[44px]`).

---

## 7. Cards & Modular Containers (`src/components/ui/card.tsx`)

To honor the **Single-Elevation Depth** and **No Cards-Within-Cards** rules:
- **Radius:** `rounded-lg` (`8px`) for standalone cards, or `rounded-none` when flush inside an exposed `1px` architectural grid matrix.
- **Light Surface Card (`variant="light"`):**
  - Background: `#FAF9F6` (Crisp Ivory), shifting to `#FFFFFF` on interactive hover.
  - Border: `1px solid #DFDFD9`, shifting to `#FA8112`/60% on interactive hover.
  - Internal Padding: `p-6 sm:p-8`.
- **Dark Surface Card (`variant="dark"`):**
  - Background: `#232C3F` (Elevated Midnight Slate) on `#1A2130` canvas.
  - Border: `1px solid rgba(242, 242, 238, 0.11)`, shifting to `rgba(253, 166, 58, 0.5)` on hover.
- **Internal Card Hierarchy:**
  1. Quiet unboxed top row: Monospace index number (`01`) + subtle category text (`Digital Products`) separated by `·`.
  2. Architectural Schematic / Diagram slot (SVG wireframe or system flow).
  3. `H3` Title in `Plus Jakarta Sans` (`font-semibold text-xl`).
  4. Concise prose description (`text-sm text-[#4A5365]` or `#B0B8C8`).
  5. Clean typographic deliverables list + bottom contextual action link.

---

## 8. Forms & Consultation Intake Controls (`src/components/ui/input.tsx`, `textarea.tsx`, `label.tsx`)

Designed for the B2B **Project Consultation Brief Builder**:
- **Input & Textarea Geometry:**
  - Height: `h-11` (`44px`) for text inputs; `min-h-[120px]` for project context textareas.
  - Surface: `#FFFFFF` (Light mode) or `#141A26` (Dark mode).
  - Border: `1px solid #C8C8C0` (Light) / `rgba(242, 242, 238, 0.18)` (Dark).
  - Focus State: `border-[#FA8112] ring-2 ring-[#FA8112]/20 outline-none`.
  - Error State: `border-[#B91C1C] ring-2 ring-[#B91C1C]/15` with accessible `role="alert"` message underneath.
- **Interactive Service Capability Selector (Functional Toggle Buttons):**
  - In the consultation form, the 7 official services are presented as interactive, keyboard-accessible toggle buttons (`role="checkbox"` or `<button type="button" aria-pressed={selected}>`) with index numbers `01`–`07`, allowing executives to select multiple capabilities with tactile Byte Orange (`#FA8112`) active border and check indicator.

---

## 9. Metadata, Index Labels & Zero-Pill Discipline (`src/components/ui/section-kicker.tsx`)

In strict alignment with modern editorial craft and our anti-slop rules:
- **No Static Pill Enclosures:** Informational metadata (service indices, locations, capability categories, delivery phases) is **never** wrapped in rounded pill capsules (`rounded-full`) or colored chip boxes.
- **Editorial Index Kicker (`<SectionKicker />`):**
  - Renders clean, unboxed typographic metadata using `font-mono text-xs tracking-wider` for the index (`01`) paired with natural title-case prose (`Full-Spectrum Capabilities`) separated by a middle dot (`·`) and a crisp `16px` horizontal architectural rule in Byte Orange (`#FA8112`).
- **Interactive Segmented Controls:**
  - Only functional filter/scenario switchers (such as the 4 Organizational Need Scenario Tabs on the Homepage) use button containers (`rounded-md bg-[#E7E6E0] p-1` with `#FFFFFF` active tab surface).

---

## 10. Responsive Breakpoints

| Breakpoint Token | Min-Width | Target Device Class | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **`base` (Mobile)** | `0px` (`375px–639px`) | Executive smartphones | Single-column flow; `px-4` (`16px`) outer margins; horizontal SVG schematics automatically stack vertically; sticky bottom/top consultation access. |
| **`sm` (Large Mobile / Phablet)** | `640px` | Large phones / small tablets | `px-6` (`24px`) margins; 2-column capability deliverable lists. |
| **`md` (Tablet)** | `768px` | iPads & tablets | 6-column or 2-column Bento grid; expanded navigation bar. |
| **`lg` (Desktop)** | `1024px` | Standard laptops | Full 12-column architectural grid; 7/5 split hero layout; desktop sticky navigation. |
| **`xl` (Wide Desktop)** | `1280px` | Executive monitors (`1440px+`) | Locked `1280px` max-width container centered with exposed outer structural margins. |

---

## 11. Shadows and Borders

- **Hairline-First Depth:** Primary structural separation is achieved via `1px solid` borders (`#DFDFD9` on light, `rgba(242,242,238,0.11)` on dark) and surface luminance stepping (`#F2F2EE` → `#FAF9F6` → `#FFFFFF`), **not** heavy blurred drop shadows.
- **Restrained Elevation Tokens:**
  - `--byte-shadow-subtle`: `0 1px 2px 0 rgba(26, 33, 48, 0.04)` (for active segmented tabs and form inputs).
  - `--byte-shadow-elevated`: `0 12px 32px -8px rgba(26, 33, 48, 0.08), 0 2px 6px -1px rgba(26, 33, 48, 0.04)` (used sparingly on hovered interactive Bento modules or the sticky mobile drawer).
- **Banned Border Patterns:** Never use thick left accent borders (`border-l-4`) or glowing neon box-shadows.

---

## 12. Animation & Motion Principles

- **Signature Easing Curve:** `--byte-ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (high-damping architectural precision).
- **Duration Scale:**
  - Micro-interactions (hover border, button background, arrow shift): `180ms`.
  - Module/Tab transitions (switching organizational scenarios): `280ms`.
  - Viewport entrance reveals: `450ms` (`translateY(12px)` → `0`, `opacity: 0` → `1`).
- **Functional Schematic Motion:**
  - Inside SVG system diagrams, subtle stroke-dashoffset or node highlight transitions in `#FA8112` and `#FDA63A` illustrate how data moves across Web, Mobile, ERP, Cloud, and AI layers when the user hovers or selects a layer.
- **Reduced Motion Compliance:**
  - `@media (prefers-reduced-motion: reduce)` disables all transforms and continuous SVG animations immediately, preserving instant state changes.
