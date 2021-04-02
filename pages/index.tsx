import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Giscussions from '../components/Giscussions';
import { AuthContext } from '../lib/context';
import { getToken } from '../services/giscussions/token';

export default function Home() {
  const route = useRouter();
  const session = route.query.session as string;
  const [token, setToken] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (session) {
      getToken(session).then(setToken);
    }
  }, [session]);

  useEffect(() => {
    setOrigin((route.query.origin as string) || location.href || '');
  }, [origin, route.query.origin]);

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl mx-auto my-4">
        <AuthContext.Provider value={{ token, origin }}>
          <Giscussions
            repositoryOwner="laymonage"
            repositoryName="discussions-playground"
            discussionNumber="4"
          />
        </AuthContext.Provider>
      </main>
    </>
  );
}
