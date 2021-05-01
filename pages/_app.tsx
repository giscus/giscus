import 'preact/devtools';
import '../styles/themes/_base.css';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';

function useTheme(theme: string) {
  const themes = {
    dark: () => {
      import('../styles/themes/dark.css');
      import('github-syntax-dark/lib/github-dark.css');
    },
    dark_dimmed: () => {
      import('../styles/themes/dark_dimmed.css');
      import('github-syntax-dark/lib/github-dark.css');
    },
    light: () => {
      import('../styles/themes/light.css');
      import('github-syntax-light/lib/github-light.css');
    },
  };

  return themes[theme] || themes['light'];
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = (router.query.theme as string) || 'light';
  useTheme(theme)();

  return <Component {...pageProps} />;
}

export default MyApp;
