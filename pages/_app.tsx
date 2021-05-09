import 'preact/devtools';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../lib/context';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState((router.query.theme as string) || 'light');

  useEffect(() => {
    setTheme((router.query.theme as string) || 'light');
  }, [router]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Head>
        <link rel="stylesheet" crossOrigin="anonymous" href={`/themes/${theme}.css`} />
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
