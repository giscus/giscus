import { useRouter } from 'next/dist/client/router';
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

  if (session)
    getToken(session)
      .then(setToken)
      .catch(() => {
        localStorage.removeItem(GISCUSSIONS_SESSION_KEY);
        router.reload();
      });

  if (querySession) {
    const query = { ...router.query };
    delete query.giscussions;

    localStorage.setItem(GISCUSSIONS_SESSION_KEY, JSON.stringify(querySession));
    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      {
        scroll: false,
        shallow: true,
      },
    );
  }

  const ready = (!session || token) && repo && term;

  const theme = (router.query.theme as string) || 'light';

  return ready ? (
    <AuthContext.Provider value={{ token, origin }}>
      <Giscussions repo={repo} term={term} theme={theme} />
    </AuthContext.Provider>
  ) : null;
}
