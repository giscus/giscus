import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Giscussions from '../components/Giscussions';
import { AuthContext } from '../lib/context';
import { getToken } from '../services/giscussions/token';

const GISCUSSIONS_SESSION_KEY = 'giscussions-session';

export default function Widget({ repo, term }: { repo: string; term: string }) {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin((router.query.origin as string) || location.href || '');
  }, [origin, router.query.origin]);

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
    router.replace(
      {
        pathname: router.pathname,
        query: { repo, term },
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      },
    );
  }

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session || token ? (
        <AuthContext.Provider value={{ token, origin }}>
          <Giscussions repo={repo} term={term} />
        </AuthContext.Provider>
      ) : null}
    </>
  );
}
