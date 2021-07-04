if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}

import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeContext } from '../lib/context';
import { getTheme } from '../lib/utils';

const meta = {
  title: 'giscus',
  description: 'A comments widget built on GitHub Discussions.',
  image:
    'https://opengraph.githubassets.com/5500584364ff6fde70d120e51f28f33ffe97d8f4661517bba2ab9515d0765857/laymonage/giscus',
};

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('');
  const [, rerender] = useState({});

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => rerender({});
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const resolvedTheme = getTheme(theme);
  const themeUrl = resolvedTheme === 'custom' ? theme : `/themes/${resolvedTheme}.css`;

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="preconnect" href="https://avatars3.githubusercontent.com" />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@laymonage" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="stylesheet" crossOrigin="anonymous" href={themeUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
