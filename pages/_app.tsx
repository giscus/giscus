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
    'https://opengraph.githubassets.com/4f866d5b634e7cd5422af77f8dbfb6d48dd288b7c5c18326544c1973210320ed/giscus/giscus',
};

export default function App({ Component, pageProps }: AppProps) {
  const { resolvedTheme, setTheme } = useTheme(pageProps.theme);

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
