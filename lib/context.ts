import { createContext } from 'react';

export const AuthContext = createContext({
  token: '',
  origin: '',
});

export function getLoginUrl(origin: string) {
  return `/api/oauth/authorize?redirect_uri=${encodeURIComponent(origin)}`;
}

export const ThemeContext = createContext<{
  theme: string;
  setTheme?: (theme: string) => void;
}>({
  theme: '',
});
