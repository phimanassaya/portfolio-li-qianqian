import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { client } from '../data/client';

const links = [
  { label: 'nav.home', to: '/' },
  { label: 'nav.about', to: '/about' },
  { label: 'nav.projects', to: '/projects' },
  { label: 'nav.experience', to: '/experience' },
  { label: 'nav.skills', to: '/skills' },
  { label: 'nav.contact', to: '/contact' }
];

// Three explicit tiers (config: tailwind.config.cjs `laptop`/`desktop` screens) carry the nav from
// its tightest state up toward the original design, using only gap -> padding -> font-size, in that
// order, per the priority the header must stay within. Letter-spacing is never touched.
//
// Each step a tier changes is stated explicitly rather than left to fall through, because a smaller
// tier's `data-[lang=en]` rule outranks a plain rule from a bigger tier on specificity alone — the
// only reliable way to move a value is to restate it, never to assume it "resets" on its own.
//
// English has no explicit desktop-only rule: the header's own `max-w-6xl` cap means the nav never
// actually gets more room past the laptop tier (available width plateaus around 722px regardless of
// viewport), so English's laptop spacing already IS its desktop spacing — restating the fully
// original padding/gap at desktop would just reintroduce the clipped Contact button this whole
// system exists to prevent. Thai never approaches that ceiling, so it restores to the original
// values untouched.
const NAV_ITEM_UNIVERSAL = 'lg:gap-1 lg:px-2.5 laptop:gap-2 laptop:px-3.5 desktop:gap-2 desktop:px-4';

const NAV_ITEM_ENGLISH =
  'lg:data-[lang=en]:gap-0.5 lg:data-[lang=en]:px-1.5 lg:data-[lang=en]:text-[11px] laptop:data-[lang=en]:gap-1.5 laptop:data-[lang=en]:px-3 laptop:data-[lang=en]:text-xs';

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { t, i18n } = useTranslation();

  return (
    <>
      {links.map((link, index) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          onClick={onNavigate}
          data-lang={i18n.language}
          className={({ isActive }) =>
            `flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${NAV_ITEM_UNIVERSAL} ${NAV_ITEM_ENGLISH} ${
              isActive
                ? 'bg-gradient-to-r from-primary-600 via-primary to-primary-300 text-background'
                : 'bg-surface text-body hover:text-heading'
            }`
          }
        >
          <span className="font-heading text-[11px] tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          {t(link.label)}
        </NavLink>
      ))}
    </>
  );
}

function Sidebar() {
  const { t } = useTranslation();
  const brandLabel = `${client.personal.firstName} ${client.personal.lastName.charAt(0)}.`;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-6 py-4 sm:px-10 lg:px-16">
        <NavLink
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 via-primary to-primary-300 font-heading text-lg font-bold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={brandLabel}
        >
          {client.personal.firstName.charAt(0)}.
        </NavLink>

        <nav
          className="scrollbar-hide order-3 flex w-full flex-nowrap gap-2 overflow-x-auto pt-1 sm:order-none sm:w-auto sm:flex-1 sm:pt-0 lg:gap-1 laptop:gap-2 desktop:gap-2"
          aria-label={brandLabel}
        >
          <NavLinks />
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
