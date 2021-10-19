import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { ContextType, useContext, useEffect, useState } from 'react';
import Widget from '../components/Widget';
import I18nProvider from 'next-translate/I18nProvider';
import loadNamespaces from 'next-translate/loadNamespaces';
import { assertOrigin } from '../lib/config';
import { ConfigContext, ThemeContext } from '../lib/context';
import { decodeState } from '../lib/oauth/state';
import { ISetConfigMessage } from '../lib/types/giscus';
import { getOriginHost } from '../lib/utils';
import { env, Theme } from '../lib/variables';
import { getAppAccessToken } from '../services/github/getAppAccessToken';
import { getRepoConfig } from '../services/github/getConfig';
import { I18nDictionary } from 'next-translate';

export async function getServerSideProps({ query, res }: GetServerSidePropsContext) {
  const origin = (query.origin as string) || '';
  const session = (query.session as string) || '';
  const repo = (query.repo as string) || '';
  const term = (query.term as string) || '';
  const category = (query.category as string) || '';
  const number = +query.number || 0;
  const repoId = (query.repoId as string) || '';
  const categoryId = (query.categoryId as string) || '';
  const description = (query.description as string) || '';
  const reactionsEnabled = Boolean(+query.reactionsEnabled);
  const emitMetadata = Boolean(+query.emitMetadata);
  const lang = (query.lang as string) || null;
  const theme = ((query.theme as string) || 'light') as Theme;
  const originHost = getOriginHost(origin);

  const { encryption_password } = env;
  const token = await decodeState(session, encryption_password)
    .catch(() => getAppAccessToken(repo))
    .catch(() => '');

  const repoConfig = await getRepoConfig(repo, token);

  if (!assertOrigin(originHost, repoConfig)) {
    res.setHeader('Content-Security-Policy', `frame-ancestors 'self';`);
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  } else {
    let origins = repoConfig.origins || [];
    if (origins.indexOf(originHost) === -1) {
      origins = [...origins, originHost];
    }
    const originsStr = origins.join(' ');

    res.setHeader('Content-Security-Policy', `frame-ancestors 'self' ${originsStr};`);
  }

  const { __lang, __namespaces } = await loadNamespaces({
    locale: lang,
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    pathname: '/widget',
    pages: {
      '*': ['common'],
    },
    async loadLocaleFrom(language, namespace) {
      return import(`../locales/${language}/${namespace}.json`).then((m) => m.default);
    },
  });

  return {
    props: {
      origin,
      session,
      repo,
      term,
      category,
      number,
      repoId,
      categoryId,
      description,
      reactionsEnabled,
      emitMetadata,
      theme,
      originHost,
      lang: __lang,
      namespaces: __namespaces as Record<string, I18nDictionary>,
    },
  };
}

export default function WidgetPage({
  origin,
  session,
  repo,
  term,
  number,
  category,
  repoId,
  categoryId,
  description,
  reactionsEnabled,
  emitMetadata,
  theme,
  originHost,
  lang,
  namespaces,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const resolvedOrigin = origin || (typeof location === 'undefined' ? '' : location.href);
  const { theme: resolvedTheme, setTheme } = useContext(ThemeContext);
  const [config, setConfig] = useState<ContextType<typeof ConfigContext>>({
    repo,
    term,
    number,
    category,
    reactionsEnabled,
    emitMetadata,
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== originHost) return;
      if (typeof event.data !== 'object' || !event.data.giscus) return;

      const giscusData = event.data.giscus;

      if ('setConfig' in giscusData) {
        const { setConfig: newConfig } = giscusData as ISetConfigMessage;

        if ('theme' in newConfig) {
          setTheme(newConfig.theme);
          delete newConfig.theme;
        }

        setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [originHost, setTheme]);

  useEffect(() => setTheme(theme), [setTheme, theme]);

  return (
    <>
      <Head>
        <base target="_top" />
      </Head>

      <main className="w-full mx-auto" data-theme={resolvedTheme}>
        <ConfigContext.Provider value={config}>
          <I18nProvider lang={lang} namespaces={namespaces}>
            <Widget
              origin={resolvedOrigin}
              session={session}
              repoId={repoId}
              categoryId={categoryId}
              description={description}
            />
          </I18nProvider>
        </ConfigContext.Provider>
      </main>

      <Script
        src="/js/iframeResizer.contentWindow.min.js"
        integrity="sha256-rbC2imHDJIBYUIXvf+XiYY+2cXmiSlctlHgI+rrezQo="
        crossOrigin="anonymous"
      />
    </>
  );
}
