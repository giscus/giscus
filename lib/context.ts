import { createContext } from 'react';
import { CommentOrder, InputPosition } from './types/giscus';
import { Theme } from './variables';

interface IAuthContext {
  token: string;
  origin: string;
  getLoginUrl: (origin: string) => string;
  onSignOut: () => void;
}

export function getLoginUrl(origin: string) {
  return `/api/oauth/authorize?redirect_uri=${encodeURIComponent(origin)}`;
}

export const AuthContext = createContext<IAuthContext>({
  token: '',
  origin: '',
  getLoginUrl,
  onSignOut() {
    return;
  },
});

interface IThemeContext {
  theme: Theme;
  setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'preferred_color_scheme',
});

interface IConfigContext {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  term: string;
  description: string;
  backLink: string;
  number: number;
  strict: boolean;
  reactionsEnabled: boolean;
  emitMetadata: boolean;
  inputPosition: InputPosition;
  defaultCommentOrder: CommentOrder;
}

export const ConfigContext = createContext<IConfigContext>({
  repo: '',
  repoId: '',
  category: '',
  categoryId: '',
  term: '',
  description: '',
  backLink: '',
  number: 0,
  strict: false,
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  defaultCommentOrder: 'oldest',
});
