import 'preact/devtools';
import 'tailwindcss/tailwind.css';
import '../styles/themes/_base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../lib/context';

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

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState((router.query.theme as string) || 'light');
  useTheme(theme)();

  useEffect(() => {
    setTheme((router.query.theme as string) || 'light');
  }, [router]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
