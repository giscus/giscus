import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Giscussions from '../components/Giscussions';
import { AuthContext } from '../lib/context';
import { getToken } from '../services/giscussions/token';

const GISCUSSIONS_SESSION_KEY = 'giscussions-session';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [origin, setOrigin] = useState('');

  const querySession = router.query.giscussions as string;

  let savedSession: string;
  try {
    savedSession = JSON.parse(localStorage.getItem(GISCUSSIONS_SESSION_KEY));
  } catch (err) {
    savedSession = '';
  }

  const session = querySession || savedSession;

  if (session) getToken(session).then(setToken);

  if (querySession) {
    localStorage.setItem(GISCUSSIONS_SESSION_KEY, JSON.stringify(querySession));
    router.replace(router.pathname, undefined, { scroll: false, shallow: true });
  }

  useEffect(() => {
    setOrigin((router.query.origin as string) || location.href || '');
  }, [origin, router.query.origin]);

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-3xl p-2 mx-auto">
        {!session || token ? (
          <AuthContext.Provider value={{ token, origin }}>
            <Giscussions repo="laymonage/discussions-playground" term="GraphQL" />
          </AuthContext.Provider>
        ) : null}
      </main>
    </>
  );
}
