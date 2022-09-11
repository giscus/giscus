if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}

import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeContext } from '../lib/context';
import { useTheme } from '../lib/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AvailableLanguage, getDir } from '../lib/i18n';
import { Theme } from '../lib/variables';

export default function App({ Component, pageProps }: AppProps) {
  const { resolvedTheme, setTheme } = useTheme((pageProps as { theme: Theme }).theme);
  const { locale } = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute('dir', getDir(locale as AvailableLanguage));
  }, [locale]);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
