import { useLocation } from 'react-router-dom';

type Mood = 'home' | 'projects' | 'about' | 'default';

interface MoodConfig {
  heroGlowOpacity: number;
  heroGlowSize: string;
  veinPrimary: string;
  veinSecondary: string;
  fogOpacity: number;
  metalOpacity: number;
  secondarySpotlightA: string;
  secondarySpotlightB: string;
  vignetteInner: string;
  vignetteOuter: string;
  showRays: boolean;
}

// Route-driven "mood" — same layered system everywhere (so every page still
// reads as one brand), but the light, fog, and vein tuning shifts per route:
// Home reads dramatic, Projects reads clean/polished, About reads soft/warm.
const moodConfig: Record<Mood, MoodConfig> = {
  home: {
    heroGlowOpacity: 0.22,
    heroGlowSize: '58rem',
    veinPrimary: 'rgba(230, 199, 139, 0.4)',
    veinSecondary: 'rgba(212, 175, 55, 0.3)',
    fogOpacity: 0.07,
    metalOpacity: 0.05,
    secondarySpotlightA: 'rgba(212, 175, 55, 0.14)',
    secondarySpotlightB: 'rgba(122, 36, 54, 0.16)',
    vignetteInner: 'transparent 42%',
    vignetteOuter: 'rgba(0, 0, 0, 0.68) 100%',
    showRays: true
  },
  projects: {
    heroGlowOpacity: 0.12,
    heroGlowSize: '44rem',
    veinPrimary: 'rgba(198, 195, 188, 0.28)',
    veinSecondary: 'rgba(160, 160, 170, 0.2)',
    fogOpacity: 0.035,
    metalOpacity: 0.08,
    secondarySpotlightA: 'rgba(200, 197, 190, 0.1)',
    secondarySpotlightB: 'rgba(212, 175, 55, 0.08)',
    vignetteInner: 'transparent 48%',
    vignetteOuter: 'rgba(0, 0, 0, 0.6) 100%',
    showRays: false
  },
  about: {
    heroGlowOpacity: 0.16,
    heroGlowSize: '50rem',
    veinPrimary: 'rgba(230, 199, 139, 0.26)',
    veinSecondary: 'rgba(212, 175, 55, 0.18)',
    fogOpacity: 0.08,
    metalOpacity: 0.03,
    secondarySpotlightA: 'rgba(230, 199, 139, 0.16)',
    secondarySpotlightB: 'rgba(122, 36, 54, 0.12)',
    vignetteInner: 'transparent 55%',
    vignetteOuter: 'rgba(10, 6, 4, 0.5) 100%',
    showRays: false
  },
  default: {
    heroGlowOpacity: 0.18,
    heroGlowSize: '50rem',
    veinPrimary: 'rgba(230, 199, 139, 0.34)',
    veinSecondary: 'rgba(212, 175, 55, 0.24)',
    fogOpacity: 0.06,
    metalOpacity: 0.05,
    secondarySpotlightA: 'rgba(212, 175, 55, 0.12)',
    secondarySpotlightB: 'rgba(122, 36, 54, 0.14)',
    vignetteInner: 'transparent 45%',
    vignetteOuter: 'rgba(0, 0, 0, 0.62) 100%',
    showRays: false
  }
};

function getMood(pathname: string): Mood {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/about')) return 'about';
  return 'default';
}

interface Ember {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
}

const embers: Ember[] = [
  { top: '4%', left: '22%', size: 2.5, duration: 18, delay: 0 },
  { top: '7%', left: '68%', size: 3, duration: 22, delay: 2 },
  { top: '11%', left: '42%', size: 2, duration: 20, delay: 4 },
  { top: '9%', left: '85%', size: 2, duration: 24, delay: 1 },
  { top: '15%', left: '10%', size: 2.5, duration: 19, delay: 3 },
  { top: '42%', left: '78%', size: 2, duration: 21, delay: 5 },
  { top: '46%', left: '58%', size: 2.5, duration: 23, delay: 2.5 },
  { top: '50%', left: '15%', size: 2, duration: 20, delay: 0.5 },
  { top: '73%', left: '30%', size: 2, duration: 22, delay: 4.5 },
  { top: '77%', left: '65%', size: 2.5, duration: 19, delay: 1.5 },
  { top: '80%', left: '88%', size: 2, duration: 24, delay: 3.5 }
];

/**
 * Purely decorative, cross-page background atmosphere for the Luxury Noir
 * theme. Renders once behind all page content via Layout — no interactive
 * or semantic content, no influence on typography/spacing/layout.
 *
 * The layer stack (stone wash, brushed metal, veining, spotlights, drifting
 * glows, reflections, satin, grain, ornament, hairlines, embers, vignette)
 * stays identical on every route so the brand reads as one system; only the
 * tuning shifts per route via `moodConfig` — Home dramatic, Projects clean,
 * About soft/intimate. The last ~15% of every page is deliberately the
 * darkest, regardless of route, so the footer always recedes to near-black.
 */
function LuxuryAtmosphere() {
  const { pathname } = useLocation();
  const mood = moodConfig[getMood(pathname)];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Base stone/marble wash, richer near the top, fading to near-black by the footer. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 55% at 50% -4%, rgba(180, 140, 60, 0.15), transparent 62%),
            radial-gradient(ellipse 70% 45% at 18% 4%, rgba(140, 106, 29, 0.1), transparent 60%),
            radial-gradient(ellipse 60% 40% at 88% 24%, rgba(90, 58, 30, 0.08), transparent 65%),
            radial-gradient(ellipse 65% 50% at 28% 58%, rgba(58, 42, 26, 0.26), transparent 70%),
            radial-gradient(ellipse 70% 55% at 78% 86%, rgba(15, 11, 9, 0.45), transparent 70%),
            linear-gradient(180deg, #100D08 0%, #0B0B0B 14%, #110D08 30%, #0D0A07 52%, #0A0806 74%, #060504 92%, #040403 100%)
          `,
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Universal footer darkening — the last stretch of every page recedes to black. */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(180deg, transparent 82%, rgba(0, 0, 0, 0.8) 100%)' }}
      />

      {/* Brushed-metal grain, tuned per route (Projects reads more polished/steel). */}
      <div
        className="absolute inset-0"
        style={{
          opacity: mood.metalOpacity,
          backgroundImage:
            'repeating-linear-gradient(115deg, rgba(230, 199, 139, 0.5) 0px, transparent 1.5px, transparent 5px)'
        }}
      />

      {/* Marble/onyx veining, tuned per route. */}
      <div
        className="absolute inset-0"
        style={{
          opacity: mood.fogOpacity,
          backgroundImage: `
            linear-gradient(96deg, transparent 30%, ${mood.veinPrimary} 42%, transparent 46%, transparent 62%, rgba(183, 175, 160, 0.22) 68%, transparent 74%),
            linear-gradient(-72deg, transparent 55%, ${mood.veinSecondary} 63%, transparent 69%)
          `
        }}
      />

      {/* Hero glow, strongest on Home. */}
      <div
        className="absolute left-1/2 top-[-6%] -translate-x-1/2 rounded-full bg-primary blur-[130px]"
        style={{
          height: mood.heroGlowSize,
          width: mood.heroGlowSize,
          opacity: mood.heroGlowOpacity,
          animation: 'spotlightPulse 18s ease-in-out infinite'
        }}
      />

      {/* Golden light rays — Home only, dramatic overhead lighting. */}
      {mood.showRays ? (
        <div
          className="absolute inset-x-0 top-0 h-[60rem]"
          style={{
            opacity: 0.5,
            animation: 'spotlightPulse 24s ease-in-out infinite',
            backgroundImage:
              'conic-gradient(from 205deg at 50% -8%, transparent 0deg, rgba(245, 230, 179, 0.09) 5deg, transparent 10deg, transparent 42deg, rgba(212, 175, 55, 0.07) 47deg, transparent 52deg, transparent 108deg, rgba(245, 230, 179, 0.06) 113deg, transparent 118deg, transparent 360deg)'
          }}
        />
      ) : null}

      {/* Two secondary spotlights, tuned per route. */}
      <div
        className="absolute left-[62%] top-[42%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          backgroundImage: `radial-gradient(circle, ${mood.secondarySpotlightA}, transparent 70%)`,
          animation: 'spotlightPulse 22s ease-in-out infinite',
          animationDelay: '-6s'
        }}
      />
      <div
        className="absolute left-[35%] top-[74%] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          backgroundImage: `radial-gradient(circle, ${mood.secondarySpotlightB}, transparent 70%)`,
          animation: 'spotlightPulse 20s ease-in-out infinite',
          animationDelay: '-11s'
        }}
      />

      {/* Slow drifting ambient depth blobs, supplementary to the spotlights. */}
      <div
        className="absolute -left-24 top-[10%] h-96 w-96 rounded-full bg-primary/8 blur-[100px]"
        style={{ animation: 'atmosphereDrift 34s ease-in-out infinite' }}
      />
      <div
        className="absolute -right-20 top-[56%] h-[26rem] w-[26rem] rounded-full bg-accent/10 blur-[110px]"
        style={{ animation: 'atmosphereDrift 42s ease-in-out infinite', animationDelay: '-9s' }}
      />

      {/* Polished-metal reflection streaks — soft, feathered, slowly sweeping. */}
      <div
        className="absolute -inset-x-1/4 top-[2%] h-72 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(100deg, transparent 20%, rgba(245, 230, 179, 0.7) 50%, transparent 80%)',
          animation: 'metalSheen 46s ease-in-out infinite'
        }}
      />
      <div
        className="absolute -inset-x-1/4 top-[62%] h-64 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(100deg, transparent 20%, rgba(212, 175, 55, 0.6) 50%, transparent 80%)',
          animation: 'metalSheen 58s ease-in-out infinite',
          animationDelay: '-20s'
        }}
      />

      {/* Satin sheen — one broad, soft, off-centre highlight. */}
      <div
        className="absolute left-[70%] top-[20%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.05] blur-[140px]"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(245, 239, 224, 0.8), transparent 70%)' }}
      />

      {/* Fine stone-grain noise texture. */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Faint ornamental pinstripe — almost disappears into the background. */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(60deg, rgba(212, 175, 55, 0.8) 0px, transparent 1px, transparent 34px)'
        }}
      />

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/10 to-transparent" />
      <div className="absolute left-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/5 to-transparent lg:block" />
      <div className="absolute right-[8%] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/5 to-transparent lg:block" />

      {embers.map((ember, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-primary-300"
          style={{
            top: ember.top,
            left: ember.left,
            width: ember.size,
            height: ember.size,
            boxShadow: '0 0 6px 1px rgba(230, 199, 139, 0.5)',
            animation: `emberFloat ${ember.duration}s ease-in-out ${ember.delay}s infinite`
          }}
        />
      ))}

      {/* Cinematic vignette, tuned per route. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 85% 75% at 50% 32%, ${mood.vignetteInner}, ${mood.vignetteOuter})`
        }}
      />
    </div>
  );
}

export default LuxuryAtmosphere;
