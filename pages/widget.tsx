import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Widget from '../components/Widget';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const repo = router.query.repo as string;
  const term = router.query.term as string;

  useEffect(() => {
    setIsLoading(!router.isReady);
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full p-2 mx-auto">
        {repo && term ? (
          <Widget repo={repo} term={term} />
        ) : !isLoading ? (
          'Please provide repo and term query parameters.'
        ) : null}
      </main>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"
        integrity="sha512-qw2bX9KUhi7HLuUloyRsvxRlWJvj0u0JWVegc5tf7qsw47T0pwXZIk1Kyc0utTH3NlrpHtLa4HYTVUyHBr9Ufg=="
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
