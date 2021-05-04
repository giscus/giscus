import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Widget from '../components/Widget';

export default function Home() {
  const router = useRouter();

  const repo = router.query.repo as string;
  const term = router.query.term as string;
  const theme = router.query.theme as string;

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
        <base target="_top" />
      </Head>

      <main className="w-full mx-auto" data-theme={theme}>
        <Widget repo={repo} term={term} />
      </main>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.contentWindow.min.js"
        integrity="sha512-qw2bX9KUhi7HLuUloyRsvxRlWJvj0u0JWVegc5tf7qsw47T0pwXZIk1Kyc0utTH3NlrpHtLa4HYTVUyHBr9Ufg=="
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
