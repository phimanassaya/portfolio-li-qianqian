import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeName = 'classic' | 'neon' | 'editorial' | 'candy' | 'luxury-noir';

export interface ThemeOption {
  id: ThemeName;
}

export const THEMES: ThemeOption[] = [
  { id: 'classic' },
  { id: 'neon' },
  { id: 'editorial' },
  { id: 'candy' },
  { id: 'luxury-noir' }
];

const STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME: ThemeName = 'classic';

function isThemeName(value: string | null): value is ThemeName {
  return value !== null && THEMES.some((theme) => theme.id === value);
}

function getStoredTheme(): ThemeName {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isThemeName(stored) ? stored : DEFAULT_THEME;
}

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(getStoredTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
