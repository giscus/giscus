import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import Widget from '../components/Widget';
import { ThemeContext } from '../lib/context';
import { useIsMounted } from '../lib/hooks';

export default function WidgetPage() {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { theme } = useContext(ThemeContext);
  const [session, setSession] = useState('');

  const origin = (router.query.origin as string) || (isMounted ? location.href : '');

  useEffect(() => {
    if (router.query.session && !session) {
      const { session: querySession, ...query } = router.query;
      setSession(querySession as string);

      const url = { pathname: router.pathname, query };
      const options = { scroll: false, shallow: true };

      router.replace(url, undefined, options);
    }
  }, [router, session]);

  if (!router.isReady || (router.query.session && !session)) return null;

  const repo = router.query.repo as string;
  const term = router.query.term as string;
  const category = router.query.category as string;
  const number = +router.query.number;
  const repoId = router.query.repoId as string;
  const categoryId = router.query.categoryId as string;
  const description = router.query.description as string;
  const reactionsEnabled = Boolean(+router.query.reactionsEnabled);

  return (
    <>
      <Head>
        <base target="_top" />
      </Head>

      <main className="w-full mx-auto" data-theme={theme}>
        <Widget
          origin={origin}
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
