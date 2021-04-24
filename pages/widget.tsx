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
    </>
  );
}
