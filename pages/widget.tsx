import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import Widget from '../components/Widget';
import { ThemeContext } from '../lib/context';

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const resolvedOrigin = origin || (typeof location === 'undefined' ? '' : location.href);
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Head>
        <base target="_top" />
      </Head>

      <main className="w-full mx-auto" data-theme={theme}>
        <Widget
          origin={resolvedOrigin}
          session={session}
          repo={repo}
          term={term}
          number={number}
          category={category}
          repoId={repoId}
          categoryId={categoryId}
          description={description}
          reactionsEnabled={reactionsEnabled}
        />
      </main>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"
        integrity="sha512-qw2bX9KUhi7HLuUloyRsvxRlWJvj0u0JWVegc5tf7qsw47T0pwXZIk1Kyc0utTH3NlrpHtLa4HYTVUyHBr9Ufg=="
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
