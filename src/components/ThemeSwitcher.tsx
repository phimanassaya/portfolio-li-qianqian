import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { THEMES, useTheme } from '../theme/ThemeContext';

function ThemeSwitcher() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-badge border border-border bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-body transition-colors duration-300 hover:text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span aria-hidden="true">🎨</span>
        <span>{t('theme.label')}</span>
        <span aria-hidden="true" className="text-[9px]">
          ▼
        </span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={t('theme.label')}
          className="absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-card border border-border bg-surface shadow-lift"
        >
          {THEMES.map((option) => {
            const isActive = option.id === theme;
            return (
              <button
                key={option.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(option.id);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-200 ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-body hover:bg-primary/5 hover:text-heading'
                }`}
              >
                <span aria-hidden="true" className="w-3 shrink-0">
                  {isActive ? '✓' : ''}
                </span>
                {t(`theme.names.${option.id}`)}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default ThemeSwitcher;
