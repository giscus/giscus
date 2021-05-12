if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}

import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../lib/context';
import { getTheme } from '../lib/utils';

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState(router.query.theme as string);

  useEffect(() => {
    setTheme(router.query.theme as string);
  }, [router]);

  return (
    <ThemeContext.Provider value={{ theme: getTheme(theme), setTheme }}>
      <Head>
        <link rel="stylesheet" crossOrigin="anonymous" href={`/themes/${getTheme(theme)}.css`} />
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
