import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Giscussions from '../components/Giscussions';

export default function Home() {
  const route = useRouter();
  const session = route.query.session as string;

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl mx-auto my-4">
        <Giscussions
          repositoryOwner="laymonage"
          repositoryName="discussions-playground"
          discussionNumber="4"
          session={session}
        />
      </main>
    </>
  );
}
