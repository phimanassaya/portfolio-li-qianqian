# Changelog

All notable changes to this project will be documented in this file.

---

## v0.8.0

### Added

- Hidden `/admin` page (not linked from navigation) for replacing the live profile image and resume PDF via Supabase Storage — no database table, no user accounts. Gated by a password compared against `VITE_ADMIN_PASSWORD`, unlocked for the browser session only (`sessionStorage`).
- `src/lib/supabase.ts`: Supabase client, no-ops gracefully (`isSupabaseConfigured === false`) when env vars are absent so the template keeps working with the bundled local assets for clients who don't use this feature.
- `src/services/storage.service.ts`: thin storage layer over a single `assets` bucket (`profile/profile.jpg`, `resume/resume.pdf`), each upload overwrites the previous file (`upsert`). Structured to add further asset types (cover image, certificates, etc.) later without touching the upload/URL logic.
- `Home.tsx` now resolves the profile image and resume link through the storage service, falling back to the original bundled `src/assets/profile/profile.jpg` / `public/resume.pdf` when Supabase isn't configured or the image fails to load.
- New env vars (see `.env.example`): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSWORD`.
- Note: the `assets` bucket and its storage policies still need to be created in Supabase before uploads will work — pending separate approval.

---

## v0.7.2

### Changed

- Navbar responsive system replaced with an explicit, named-breakpoint architecture: added `laptop` (1200px) and `desktop` (1440px) screens in `tailwind.config.cjs` alongside the default `lg` (1024px), giving the nav four clear tiers (Tablet <1024 / Small Laptop 1024–1199 / Laptop 1200–1439 / Desktop ≥1440) instead of a single ad hoc `lg:` compaction step.
- Each tier's spacing is driven only by the priority order requested — gap first, then horizontal padding, then font-size as a last resort — and letter-spacing is no longer touched at all, keeping the nav's typographic identity fully intact everywhere.
- Thai and English now follow fully independent rule ladders (`NAV_ITEM_UNIVERSAL` vs. `NAV_ITEM_ENGLISH` in `Sidebar.tsx`, keyed off a `data-lang` attribute) inside the same shared `NavLink` markup — no duplicated JSX or CSS, no separate nav component. Thai reaches its full/original spacing again at the Laptop tier and stays there; English only needs the 1px font reduction at the Small Laptop tier, confirmed empirically to be the minimum necessary (removing it reproduces a real overflow at exactly 1024px).
- Known, deliberate limitation: because the header is capped at `max-w-6xl`, the nav's available width plateaus at ~722px for any viewport ≥ ~1150px — it never actually gains more room at "desktop" than at "laptop". English's six full labels at truly original spacing need ~779px, so restoring English to byte-identical original padding/gap at the Desktop tier would reintroduce a clipped Contact button. English's Desktop tier therefore reuses its (already comfortable) Laptop-tier spacing rather than the literal original values; Thai, which never approaches that ceiling, does restore to fully original spacing at Desktop. This was verified with headless-browser `scrollWidth`/`clientWidth` measurements at 13 widths from 1024–1920px in both languages — zero overflow anywhere.

---

## v0.7.1

### Fixed

- Navbar: English nav labels (notably "06 CONTACT") could be clipped/hidden off-screen on laptop-width viewports (~1024–1150px). Root cause was twofold: (1) the header's `sm:px-10 → lg:px-16` container padding jump briefly shrinks the available row width right at the `lg` breakpoint, and (2) the nav row's spacing (`px-4` padding, `gap-2`, `tracking-[0.16em]`) was fixed regardless of viewport or label length, so it relied entirely on `overflow-x-auto` (with a hidden scrollbar) to silently absorb any deficit — the last item scrolled out of view with no visual cue that more content existed.
- The same root cause also clipped the Thai nav ("06 ติดต่อ") in that same narrow band; it was just less visible since Thai labels sit closer to the fit boundary.
- Fix: added a `lg:` tier of tightened (but still comfortable) padding/gap/tracking to `Sidebar.tsx`'s nav items, plus an additional `data-[lang=en]:` compaction step for English specifically, since its labels are intrinsically wider and need more space reclaimed. Verified with headless-browser measurements (`scrollWidth` vs `clientWidth`) at 1024–1920px in both languages — zero overflow anywhere. Mobile/tablet behavior and Thai's appearance below `lg` are unchanged.

---

## v0.7.0

### Changed

- UI refinement pass on top of the v0.6.0 navy/gold theme to match the resume more closely — no functionality, content, or routing changes, visual polish only
- Hero rebuilt: name is now on its own full-width row (previously squeezed into a 2-column layout, which caused the 20-character surname to wrap into an unreadable multi-line mess at larger sizes) so it can run significantly larger (`text-4xl` up to `lg:text-7xl`) without ever breaking awkwardly; verified overflow-free at 375/768/1440px
- Hero role subtitle changed from bordered badge pills to an elegant plain-text gold line (small dot separators, letter-spaced uppercase), matching resume subtitle styling
- Profile placeholder's gold circular frame thickened (`border-4` → `border-[10px]`) and the background skyline illustration enlarged and given a subtle moon/sun accent
- `Card`: radius increased (20px → 24px), padding increased (32px → 32/40px), border softened (`border-border` → `border-border/70`), resting shadow lightened further
- `SectionTitle`: icon circle enlarged (44px → 56px) and divider widened (64px → 80px) — reconfirmed as the single consistent header pattern (navy circle, gold icon, large navy heading, thin gold divider) on every section across every page
- `Skills` page redesigned from a flat badge list into three premium cards (Business / Technical / Office), each with its own title, gold divider, and clean bulleted skill list, under one combined "Skills" section header — matching the resume's compact skills layout
- `Experience`: work-experience cards gained a divider between the role header and responsibilities, larger gaps, and a pill-styled timeframe; timeline dots enlarged
- `Projects`: cards now bleed their preview image to the card edges for a "large image" magazine-card feel, larger title, more spacing, and a divider before the action buttons — intended as the site's visual highlight
- `Contact`: more breathing room (`py-16/20` → `py-20/24`, `space-y-20` → `space-y-24`), icon badges enlarged to match the new `SectionTitle` circle size
- `Footer`: slightly more vertical padding and gap for consistency with the rest of the spacing rhythm
- Confirmed no animation beyond Fade, Slide Up, and the Card hover lift exists anywhere in the codebase (grepped for stray `scale`/`x`-axis/spring usage — none found)
- Re-verified every page at 375px / 768px / 1440px with a headless browser (`document.documentElement.scrollWidth` vs `clientWidth`) — zero horizontal overflow anywhere, zero console errors
- `DESIGN_SYSTEM.md` updated to document the refined spacing, card, section-title, and Skills-page rules

---

## v0.6.0

### Changed

- Full visual re-theme to match the resume's navy/gold corporate identity, superseding the v0.5.0 blue theme — no business content, text, routes, or data changed, only UI/UX
- Color tokens replaced with the resume palette: primary navy `#082B63`, accent gold `#D8A12C`, background `#F8F9FC`, card `#FFFFFF`, heading `#10254D`, border `#E6E8EC`, text `#444444` (`tailwind.config.cjs`, `src/styles/index.css`)
- Added Poppins (700/800) for all headings alongside the existing Inter body font, loaded in `index.css` and applied globally via the base `h1`–`h6` rule
- `Button`/`LinkButton`: primary is now navy-with-white-text hovering to gold; secondary is white-with-gold-border-and-navy-text hovering to a solid gold fill
- `Card`: padding increased to 32px, hover changed from a scale to a `translateY(-6px)` lift with a deeper shadow (300ms)
- `Badge`: redesigned as a gold-bordered white pill that fills gold on hover; now also used for Business Skills / Office Productivity card titles for a consistent badge language
- `SectionTitle`: rebuilt with a navy-circle/gold-icon marker, a large bold navy title, and a thin gold divider line; added an optional `icon` prop (per-section Lucide icons applied across every page) and a `dark` variant for use on navy backgrounds
- `Navbar`: now scroll-aware — transparent at the top of the page, transitioning to a solid navy bar with a lifted shadow and white text once scrolled; nav links get an animated gold underline on hover/active; menu reordered to Home, About, Experience, Projects, Skills, Contact
- `LanguageSwitcher`: adapts its colors to the navbar's scrolled state; active language pill is now navy
- `Footer`: full navy background, centered layout, gold icon-circle social links
- Home hero rebuilt: name split into two large stacked lines, profile placeholder now sits in a gold circular frame with a subtle low-opacity skyline illustration behind it, and the primary actions are now Download Resume (primary) + a new Contact Me button (secondary, links to `/contact`) — GitHub/Email links retained below
- `Contact` page rebuilt as a single dark-navy panel (all other pages stay on the light theme) with white cards and navy-circle/gold-icon badges for Email, Phone, and GitHub
- `Projects` overview cards gained a gold top border and a GitHub button alongside the existing "View Details" action
- Project detail pages (`ApartmentPro`, `ExecutiveSalesDashboard`) and all remaining pages (`About`, `Skills`, `Experience`) restyled to the same tokens/components, with gold left-border accents on Experience cards and gold timeline dots
- `DESIGN_SYSTEM.md` rewritten to document the navy/gold system end to end

---

## v0.5.0

### Changed

- Site-wide visual redesign to match the Resume's design language (colors, typography, buttons, cards, navigation, and animation — no business content, text, routing, or data changes)
- Color tokens updated to the Resume palette: primary `#1E40AF`, secondary accent `#3B82F6`, background `#F8FAFC`, border `#E5E7EB`, primary text `#111827`, secondary text `#6B7280` (`tailwind.config.cjs`, `src/styles/index.css`)
- `Card` component: 32px radius reduced to `20px`, heavy shadow (`0 24px 80px`) replaced with a subtle soft shadow (`0 12px 32px`), hover effect changed from a spring `y` translate to a flat `scale(1.02)`
- `Button` component's style primitives (`buttonBaseStyles`, `buttonVariantStyles`, `buttonSizeStyles`) extracted and exported so every button-like element on the site shares one definition; `primary` and `secondary` variants realigned to the Resume spec (secondary is now a white background with a blue border and blue text, replacing the old neutral-gray outline style)
- New `LinkButton` component (reuses the `Button` style primitives for `<a>`/route links) replaces hand-rolled button `className` strings that were duplicated across `Home.tsx`, `Contact.tsx`, `ApartmentPro.tsx`, and `ExecutiveSalesDashboard.tsx` — every primary/secondary action (View Projects, Download Resume, GitHub, Email, Phone, Live Demo) now renders identically
- Animations trimmed to three site-wide patterns only — fade in, slide up, and card hover scale — removing the side-slide (`x`) entrance used on hero image panels and the header's slide-down entrance (now fade-only)
- `Navbar` gains a subtle soft shadow to read as a distinct surface, consistent with the Card/corporate style
- `Footer` social icon hover color changed from neutral gray to the primary brand color for consistency
- `DESIGN_SYSTEM.md` rewritten to document the new tokens, the shared `Button`/`LinkButton` primitives, and the reduced animation set

---

## v0.4.1

### Fixed

- Post-Phase-10 site-wide review pass: layout consistency, responsive design, typography/spacing/animations, navigation links, Live Demo/GitHub buttons, and screenshot galleries checked across every page (no new pages, features, or redesign)
- `brand-300` and `brand-800` were used throughout the site (focus-visible rings and primary-button hover states, per DESIGN_SYSTEM.md) but were never defined in `tailwind.config.cjs` — added both shades so focus rings and primary-button hover darkening render as designed on every page
- "View Details" buttons on the Home Featured Projects cards and the Projects overview page were inert `<button>` elements with no click handler — wired both up to navigate to the correct project detail route (`/projects/apartmentpro`, `/projects/executive-sales-dashboard`)

### Removed

- Dead `subtitle` prop and its unused render branch in `SectionTitle` (never passed by any page; removing it left the component's actual, always-rendered output unchanged)

---

## v0.4.0

### Added

- Phase 10: real project content for ApartmentPro and Executive Sales Dashboard detail pages (no redesign, no new pages)
- ApartmentPro Gallery now shows 4 real screenshots (Properties, Rental Units, Leases, Invoices) imported from `src/assets/screenshots/apartmentpro/`, replacing the placeholder gradient tiles
- Executive Sales Dashboard Gallery now shows 4 real screenshots (Overview, Chart, Company, KPI) imported from `src/assets/screenshots/executive-sales-dashboard/`, replacing the placeholder gradient tiles
- Live Demo button on both project detail pages, linking to the real deployed Vercel URLs (`apartment-pro-v2.vercel.app`, `executive-sales-dashboard-bic.vercel.app`)
- GitHub button on both project detail pages, linking to the real project repositories (`ApartmentPro-V2`, `Executive-Sales-Dashboard`), independent of the existing profile-level GitHub link in the Navbar/Footer/Contact

### Changed

- Gallery `alt` text (English and Thai) updated from generic placeholder wording to descriptive labels matching the real screenshots
- Screenshot asset filenames normalized (removed stray `.png.jpg` double extension and a filename space) before import

---

## v0.3.0

### Added

- Phase 9: site-wide polish pass across all existing pages (no new pages, features, or redesign)
- Per-page SEO document titles via a new `useDocumentTitle` hook, wired into every page
- Favicon (inline SVG monogram), improved meta description, and Open Graph tags in index.html
- `sr-only` page-level `<h1>` on About, Projects, Skills, Experience, and Contact for correct heading hierarchy (Home and the project detail pages already had one)
- `html lang` attribute now syncs automatically with the active i18n language

### Fixed

- Missing focus-visible states on Navbar links, LanguageSwitcher buttons, and Footer social icon links
- LanguageSwitcher buttons now have `aria-label` and `aria-pressed` for the active language
- English translations were missing the entire `footer` namespace, leaving the footer blank for English (default-language) visitors — added
- Replaced remaining fake placeholder contact links (`hello@premiumcorp.example`, generic `github.com`, `href="#"`) in Home.tsx and Footer.tsx with the real email and GitHub links established in Phase 8
- Removed the Footer's LinkedIn icon (no real LinkedIn profile provided)

### Changed

- Standardized card headline typography to `text-2xl` across Skills, ApartmentPro, and Executive Sales Dashboard (previously `text-xl`, inconsistent with About/Home/Projects/Experience)

### Removed

- Unused legacy components `SectionHeading`, `SectionPill`, and `SectionBadge` (no longer referenced after earlier phase rebuilds)

---

## v0.2.0

### Added

- Phase 8: Contact page rebuilt with Contact Information, Email, GitHub, and Contact CTA sections, using real information only
- Email: phimanassaya@gmail.com, shown with a `mailto:` link
- GitHub: github.com/phimanassaya, linked to https://github.com/phimanassaya
- Contact CTA with a "Send an Email" action

### Changed

- Contact.tsx rebuilt to use the shared Card and SectionTitle components instead of the legacy SectionHeading component and the placeholder contact form
- Replaced placeholder/fabricated contact details (fake email, fake location) in i18n.ts with real data
- Phase 8 (Contact) roadmap: Email and GitHub checked off; Contact Form and LinkedIn left unchecked (LinkedIn intentionally omitted — not provided)

---

## v0.1.9

### Added

- Phase 7: Experience page rebuilt with Work Experience, Education, Certifications, and Timeline sections, using real information only
- Work Experience: Reception role at Jewelry and Jade Company (Chinese Tour Groups), April 2024 – Present
- Education: Higher Vocational Certificate (Diploma), Tourism Management, Chonburi Vocational College, graduated 2013, GPA 3.53
- Certifications: HSK Level 3 (Chinese), shown as a Badge
- Timeline: connected timeline of 2013 graduation, April 2024 start of current role, and current development work
- Phase 7 (Experience) marked complete in the roadmap

### Changed

- Experience.tsx rebuilt to use the shared Card, Badge, and SectionTitle components instead of the legacy SectionHeading component
- Replaced placeholder/fabricated experience.roles content in i18n.ts with real data

---

## v0.1.8

### Changed

- Phase 6: revised Skills content to reflect real skills
  - Technical Skills: removed React Router, TanStack Query, Zustand
  - Business Skills: replaced list with ERP Support, System Support, Business Process, Dashboard Design, Data Management, Documentation, Problem Solving
  - Languages: updated proficiency labels (English: Basic, Chinese: HSK Level 3)
- No layout or component changes — Skills page design unchanged

---

## v0.1.7

### Added

- Phase 6: Skills page rebuilt with Technical Skills, Business Skills, Office & Productivity, Languages, and Learning Journey sections
- Technical Skills shown as reusable Badge pills inside a Card (React, TypeScript, JavaScript, Vite, Tailwind CSS, Supabase, React Router, TanStack Query, Zustand, Git, GitHub, VS Code)
- Business Skills and Office & Productivity sections with reusable information Cards
- Languages section with Card per language and proficiency level (Thai, English, Chinese)
- Learning Journey shown as a connected timeline of Cards
- Phase 6 (Skills) marked complete in the roadmap

### Changed

- Skills.tsx rebuilt to use the shared Card, Badge, and SectionTitle components instead of the legacy SectionHeading/SectionPill components

---

## v0.1.6

### Added

- Phase 5.3: Executive Sales Dashboard Detail page (`/projects/executive-sales-dashboard`) with Hero, Business Problem, Solution, Key Features, Tech Stack, My Role, Gallery, Business Impact, and Future Improvements sections
- Key Features section with 8 reusable feature Cards (Dashboard Overview, KPI Monitoring, Sales Analytics, Product Analysis, Customer Reports, Company Reports, Excel Import, Interactive Charts)
- Business Impact section with 4 reusable outcome Cards (Faster Reporting, Better KPI Visibility, Improved Decision Making, Data-Driven Management)
- Tech Stack, My Role, and Future Improvements sections using Badge pills inside Card containers
- Responsive placeholder screenshot gallery (1/2/4-column grid)
- Phase 5 (Projects) marked complete in the roadmap — Executive Sales Dashboard's Dashboard and Reports items checked off

---

## v0.1.5

### Added

- Phase 5.2: ApartmentPro Detail page (`/projects/apartmentpro`) with Hero, Business Problem, Solution, Key Features, Tech Stack, My Role, Gallery, and Future Improvements sections
- Key Features section with 8 reusable feature Cards (Tenant Management, Room Management, Meter Recording, Monthly Billing, Invoice Management, Payment Tracking, QR Payment, Dashboard)
- Tech Stack, My Role, and Future Improvements sections using Badge pills inside Card containers
- Responsive placeholder screenshot gallery (1/2/4-column grid)
- ApartmentPro roadmap items (Features, Screenshots, Tech Stack) marked complete

---

## v0.1.4

### Added

- Phase 5.1: Projects Overview page with cards for ApartmentPro and Executive Sales Dashboard
- Each project card includes title, short description, tech stack badges, placeholder image, and a View Details button
- Phase 5 (Projects) started in the roadmap — Overview complete for both projects

### Changed

- Rebuilt Projects.tsx to use the shared Card, Button, Badge, and SectionTitle components instead of the legacy SectionCard component

### Removed

- Unused legacy `SectionCard` component (no longer referenced after the Projects page rebuild)

---

## v0.1.3

### Added

- Phase 4: About page rebuilt with About Me, Career Goal, and Professional Summary sections
- About Me section introducing Phimanassaya Jirathanarungpailin and her ERP Support / Business Process / System Support focus
- Career Goal section with long-term goals (ERP Support, Business Process Improvement, Digital Transformation, Continuous Learning) shown as reusable Badge pills
- Professional Summary section with six reusable information Cards (Business Process Analysis, ERP Support, Dashboard & Reporting, Documentation, Team Collaboration, Problem Solving)
- Phase 4 (About) marked complete in the roadmap

---

## v0.1.2

### Changed

- Phase 3 Final Polish: fixed broken `aria-labelledby` references on Home sections by wiring real heading ids through `SectionTitle`
- Corrected heading hierarchy on Home (Featured Projects card titles now `h3` under the section `h2`)
- Aligned card headline and compact-detail typography with DESIGN_SYSTEM.md (`text-2xl` headlines, `leading-6` card body text)
- Normalized Home section animation delays to the 0.1s–0.2s range from DESIGN_SYSTEM.md
- Added distinguishing `aria-label`s to repeated "View Details" buttons on Featured Projects cards
- Phase 3 (Home) marked complete in the roadmap

---

## v0.1.1

### Added

- About Preview section on Home
- Home roadmap progress updated

---

## v0.1.0

### Added

- Project initialization
- React + Vite
- TypeScript
- Tailwind CSS
- React Router
- react-i18next
- Vercel configuration

---

## Upcoming

- Design System
- Hero Section
- Projects
- Skills
- Responsive UI
