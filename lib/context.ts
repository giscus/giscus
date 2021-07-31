import { createContext } from 'react';
import { Theme } from './variables';

interface IAuthContext {
  token: string;
  origin: string;
  getLoginUrl: (origin: string) => string;
}

export function getLoginUrl(origin: string) {
  return `/api/oauth/authorize?redirect_uri=${encodeURIComponent(origin)}`;
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  origin: '',
  getLoginUrl,
});

interface IThemeContext {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
});

interface IConfigContext {
  repo: string;
  term: string;
  number: number;
  category: string;
  reactionsEnabled: boolean;
  emitMetadata: boolean;
}

export const ConfigContext = createContext<IConfigContext>({
  repo: '',
  term: '',
  number: 0,
  category: '',
  reactionsEnabled: true,
  emitMetadata: false,
});
