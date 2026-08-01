# Design System

## Overview
The design system mirrors the resume's visual identity: a premium, corporate, ERP/business-systems aesthetic in navy and gold. Implemented with Tailwind CSS utility classes and reusable React components (`Button`, `LinkButton`, `Card`, `Badge`, `SectionTitle`, `Container`).

## Colors
- `background`: `#F8F9FC` — page background.
- `surface` / white cards: `#FFFFFF`.
- `border`: `#E6E8EC` — neutral border tone for cards, sections, and controls.
- `heading`: `#10254D` — primary heading text (navy).
- `body`: `#444444` — body copy.
- `secondary`: `#6B7280` — meta text (timestamps, GPA, etc.).
- `primary` (navy): `#082B63` — buttons, active/scrolled navbar, Contact/Footer background, section-title icon circles.
- `accent` (gold): `#D8A12C` — dividers, borders, hover fills, timeline dots, icon glyphs.
- `success`: `#10B981`, `error`: `#DC2626` — semantic states (unused in current content).
- The legacy `brand-*` scale is kept as an alias onto `primary`/`accent` so any untouched class still resolves correctly.

## Typography
- Headings: **Poppins**, weight 700–800. Applied globally to `h1`–`h6` in `index.css`, so no per-component class is required; explicit `font-heading` utility available for non-heading elements that need the display face (e.g. the navbar brand).
- Body: **Inter**, weight 400–500, applied via the base `body` font-family.
- Hero name: split at runtime from the translated full name (first name / last name) so it works in both English and Thai, and given its own full-width row above the two-column hero content — not squeezed into the narrower text column next to the profile panel. This is what lets it run large (`text-4xl` up to `lg:text-7xl`) without ever wrapping mid-word within a cramped column; `break-words` is kept as a safety net for exceptionally long names on very narrow screens.
- Hero hierarchy, top to bottom: small gold eyebrow (`text-sm uppercase tracking-[0.36em] text-accent-600`) → huge bold navy name → an elegant gold "role" subtitle line (plain uppercase text separated by small gold dots, *not* badges — `tracking-[0.28em] text-accent-600`) → body description → CTAs.
- Tracking: `tracking-[0.32em]` for uppercase eyebrow/kicker labels (colored `text-accent-600`, not navy); `tracking-tight` for large headline presentation.

## Spacing
- Section spacing is generous throughout: page-level `space-y-20`–`space-y-24`, section wrappers `space-y-10`, grids `gap-8`.
- `px-4 sm:px-6 lg:px-8` for responsive content padding; container width is `max-w-6xl` everywhere.
- Card padding is `p-8 sm:p-10` (32–40px) site-wide.

## Buttons
Two variants only, shared everywhere via `Button` (real `<button>`s) and `LinkButton` (`<a>`/route links) — both consume the same primitives exported from `components/ui/Button.tsx` (`buttonBaseStyles`, `buttonVariantStyles`, `buttonSizeStyles`).
- **Primary**: `bg-primary text-white`, hover `bg-accent text-primary`. Used for Download Resume, View Project, Send an Email, Live Demo.
- **Secondary**: `border border-accent bg-white text-primary`, hover `bg-accent text-white`. Used for Contact Me, GitHub, Email/Phone/GitHub contact links.
- `rounded-full`, `font-semibold`, `gap-2` icon spacing (no manual `mr-2`/`ml-2`), 300ms color transition.

## Cards
- `rounded-[24px]`, `border border-border/70` (softened, not a heavy line), `bg-white`, `p-8 sm:p-10`, `shadow-soft` (a light, low-opacity resting shadow).
- Hover: `translateY(-6px)` with a deeper shadow (`whileHover={{ y: -6, boxShadow: ... }}` via Framer Motion), 300ms ease-out — no scale.
- Feature variants add a colored edge for emphasis: `border-t-4 border-t-accent` (Featured Projects, Projects), `border-l-4 border-l-accent` (Work Experience).
- Projects cards bleed their image to the card's edges (negative margin equal to the card padding) for a "large image" magazine-card feel, with the gold top border staying visible as a thin accent strip above it.

## Badges
- Rounded pill, white background, gold border, navy text; hover inverts to a solid gold fill with white text (`components/ui/Badge.tsx`).
- Used for tag/label chips (career goals, certifications, tech stack, project roles) — but **not** for the Skills page's core skill lists anymore (see below).

## Section Titles
Every section header (`SectionTitle` component) follows one pattern, resume-style, everywhere on the site with no exceptions:
- A navy circle (`h-14 w-14`) containing a gold Lucide icon (`bg-primary` / `text-accent`; pass the `icon` prop per section — defaults to a sparkle if omitted).
- A large, bold navy title (`text-2xl sm:text-3xl`, Poppins via the base heading rule).
- A thin gold divider line beneath (`h-[3px] w-20 bg-accent`).
- On dark backgrounds (Contact page), pass `dark` — the circle inverts to gold-fill/navy-icon, and title/description switch to white.

## Skills Page
Redesigned as three premium "resume-style" cards under one `Skills` section title, not a flat badge list:
- `Business` / `Technical` / `Office` — each a `Card` with its own uppercase title, a small gold divider, and a clean bulleted list (gold dot + text) of skill names.
- Business/Office items keep their full descriptions in the i18n data (untouched), but this trimmed list view only surfaces the name, matching the resume's compact skill format.
- Languages and Learning Journey remain separate sections below, inheriting the same Card/SectionTitle/gold-timeline treatment.

## Navbar
- Fixed, sticky, transparent at the top of the page; on scroll (`scrollY > 24`) it transitions to a solid navy background with a lifted shadow and white text — implemented with a scroll listener in `Navbar.tsx`, 300ms color transition.
- Menu order: Home, About, Experience, Projects, Skills, Contact.
- Links always stay on a single row (mobile-first `flex-nowrap`, tightened `gap`/`text-xs` on small screens, `overflow-x-auto` with a hidden scrollbar as a safety net — see `.scrollbar-hide` in `index.css`).
- Hover/active state: an animated gold underline (`.nav-link-underline` in `index.css`, driven by `:hover` and NavLink's `aria-current="page"`).
- Language switcher adapts its pill/border color to the scrolled state (`LanguageSwitcher` takes a `scrolled` prop); active language pill is `bg-primary text-white`.

## Footer
- Full navy background (`bg-primary`), centered text, minimal — copy line, two icon links (GitHub/Email) as gold-on-white/10 circles that invert to navy-on-gold on hover, and the rights line.

## Contact Page
- The only page with an inverted (dark) treatment, styled to read like the resume's dark sidebar: the whole page content is wrapped in one large navy rounded panel (`rounded-[24px] bg-primary`, generous `py-20 sm:py-24` spacing, `space-y-24` between sections for extra breathing room).
- `SectionTitle` is used with `dark` throughout so titles/descriptions read in white.
- Email/Phone/GitHub are white `Card`s inside the navy panel, each with a navy-circle/gold-icon badge (matching the `SectionTitle` icon circle size) next to a gold-bordered secondary button — visually identical across all three.

## Responsive Rules
- Mobile-first design with stacking on narrow screens; grid layouts (`md:grid-cols-3`, `xl:grid-cols-2`, etc.) unchanged from prior breakpoints.
- Navbar link row is the one place with bespoke mobile sizing (see above) to guarantee a single row down to 320px.
- Hero name sizing was chosen empirically against the actual (unusually long, 20-character) surname: it's given its own full-width row specifically so a two-column layout doesn't artificially narrow it and force ugly multi-line mid-word wraps at large sizes — verified with headless-browser screenshots at 375/768/1440px that nothing overflows or wraps more than the two intentional name lines (with one extra wrap only at the narrowest 375px width, which is unavoidable for a word this long and still fully legible).

## Animations
- Framer Motion only, three patterns, kept subtle and professional:
  - **Fade In**: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}`
  - **Fade Up / Slide Up**: `initial={{ opacity: 0, y: 20-24 }} animate={{ opacity: 1, y: 0 }}` — the default for section and hero reveals.
  - **Hover lift** (Card only): `whileHover={{ y: -6, boxShadow: ... }}`, 300ms.
- Durations sit between 0.5s and 0.8s for entrance animations; no side-slides, springs, or decorative motion.

## Icons
- `lucide-react` throughout. Where an icon stands alone as a UI accent (section titles, footer, contact badges), it sits inside a **navy circle with a gold glyph**. Inline icons within buttons/badges stay a single color matching the surrounding text.
- Consistent sizing: `h-4 w-4` inline, `h-5 w-5` inside icon circles.

## Accessibility Guidelines
- Semantic HTML (`section`, `h1`, `button`), `aria-labelledby` on sections, `aria-label` on icon-only/ambiguous links.
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-accent-300`).
- `rel="noopener noreferrer"` on all external links.
- Text contrast maintained on both light (`heading`/`body` on `background`/white) and dark (white/white-70% on `primary`) surfaces.
