if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}

import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeContext } from '../lib/context';
import { useTheme } from '../lib/hooks';

export default function App({ Component, pageProps }: AppProps) {
  const { resolvedTheme, setTheme } = useTheme(pageProps.theme);

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
