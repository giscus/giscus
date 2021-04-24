import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Widget from '../components/Widget';

export default function Home() {
  const router = useRouter();
  const repo = router.query.repo as string;
  const term = router.query.term as string;

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {repo && term ? (
        <Widget repo={repo} term={term} />
      ) : (
        'Please provide repo and term query parameters.'
      )}
    </>
  );
}
