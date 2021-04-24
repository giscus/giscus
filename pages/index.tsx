import Head from 'next/head';
import Widget from '../components/Widget';

export default function Home() {
  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl p-2 mx-auto">
        <Widget repo="laymonage/discussions-playground" term="GraphQL" />
      </main>
    </>
  );
}
