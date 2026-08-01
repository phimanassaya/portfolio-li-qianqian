module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        laptop: '1200px',
        desktop: '1440px'
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['var(--font-heading)', 'ui-serif', 'Georgia', 'serif'],
        button: ['var(--font-button)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        btn: 'var(--radius-btn)',
        card: 'var(--radius-card)',
        badge: 'var(--radius-badge)'
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        glow: 'var(--shadow-glow)',
        'glow-accent': 'var(--shadow-glow-accent)'
      },
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        heading: 'var(--color-heading)',
        body: 'var(--color-body)',
        secondary: 'var(--color-secondary)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          100: 'var(--color-primary-100)',
          300: 'var(--color-primary-300)',
          600: 'var(--color-primary-600)',
          800: 'var(--color-primary-800)'
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          300: 'var(--color-accent-300)',
          600: 'var(--color-accent-600)'
        },
        success: 'var(--color-success)',
        error: 'var(--color-error)'
      }
    }
  },
  plugins: []
};
