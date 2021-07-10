if (process.env.NODE_ENV === 'development') {
  import('preact/debug');
}

import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import '../styles/base.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeContext } from '../lib/context';
import { useTheme } from '../lib/hooks';

const meta = {
  title: 'giscus',
  description: 'A comments widget built on GitHub Discussions.',
  image:
    'https://opengraph.githubassets.com/5500584364ff6fde70d120e51f28f33ffe97d8f4661517bba2ab9515d0765857/laymonage/giscus',
};

export default function App({ Component, pageProps }: AppProps) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme: resolvedTheme, setTheme }}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
