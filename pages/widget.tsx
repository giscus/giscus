import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import Widget from '../components/Widget';
import { assertOrigin } from '../lib/config';
import { ConfigContext, ThemeContext } from '../lib/context';
import { decodeState } from '../lib/oauth/state';
import { getOriginHost } from '../lib/utils';
import { env } from '../lib/variables';
import { getAppAccessToken } from '../services/github/getAppAccessToken';
import { getRepoConfig } from '../services/github/getConfig';

type ErrorType = 'ORIGIN' | null;

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
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
  const theme = (query.theme as string) || '';
  const originHost = getOriginHost(origin);
  let error: ErrorType = null;

  const { encryption_password } = env;
  const token = await decodeState(session, encryption_password)
    .catch(() => getAppAccessToken(repo))
    .catch(() => '');

  const repoConfig = await getRepoConfig(repo, token);
  if (!assertOrigin(originHost, repoConfig)) {
    error = 'ORIGIN';
  }

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
      theme,
      originHost,
      error,
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
  theme,
  originHost,
  error,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const resolvedOrigin = origin || (typeof location === 'undefined' ? '' : location.href);
  const { theme: resolvedTheme, setTheme } = useContext(ThemeContext);

  useEffect(() => setTheme(theme), [setTheme, theme]);

  return (
    <>
      <Head>
        <base target="_top" />
      </Head>

      <main className="w-full mx-auto" data-theme={resolvedTheme}>
        {error ? (
          <div className="px-4 py-5 text-sm border rounded-md flash-error">
            Origin <code>{originHost}</code> is not allowed by{' '}
            <span className="font-semibold">{repo}</span>. If you own the repository, include{' '}
            <code>{originHost}</code> in the allowed origins list in{' '}
            <code>
              <a href={`https://github.com/${repo}/blob/HEAD/giscus.json`}>giscus.json</a>
            </code>
            .
          </div>
        ) : (
          <ConfigContext.Provider value={{ repo, term, number, category, reactionsEnabled }}>
            <Widget
              origin={resolvedOrigin}
              session={session}
              repoId={repoId}
              categoryId={categoryId}
              description={description}
            />
          </ConfigContext.Provider>
        )}
      </main>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"
        integrity="sha512-qw2bX9KUhi7HLuUloyRsvxRlWJvj0u0JWVegc5tf7qsw47T0pwXZIk1Kyc0utTH3NlrpHtLa4HYTVUyHBr9Ufg=="
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
