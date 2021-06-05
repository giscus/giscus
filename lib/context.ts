import { createContext } from 'react';

interface IAuthContext {
  token: string;
  origin: string;
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  origin: '',
});

export function getLoginUrl(origin: string) {
  return `/api/oauth/authorize?redirect_uri=${encodeURIComponent(origin)}`;
}

interface IThemeContext {
  theme: string;
  setTheme?: (theme: string) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: '',
});
