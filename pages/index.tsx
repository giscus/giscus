import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Widget from '../components/Widget';

export default function Home() {
  const router = useRouter();
  const theme = (router.query.theme as string) || 'light';

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen color-bg-canvas" data-theme={theme}>
        <div className="w-full max-w-3xl p-2 mx-auto">
          <Widget repo="laymonage/discussions-playground" term="GraphQL" />
        </div>
      </main>
    </>
  );
}
