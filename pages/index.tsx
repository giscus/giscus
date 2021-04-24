import Head from 'next/head';
import Widget from '../components/Widget';

export default function Home() {
  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Widget repo="laymonage/discussions-playground" term="GraphQL" />
    </>
  );
}
