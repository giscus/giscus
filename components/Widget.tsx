import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Giscussions from '../components/Giscussions';
import { AuthContext } from '../lib/context';
import { useIsMounted } from '../lib/hooks';
import { createDiscussion } from '../services/giscussions/createDiscussion';
import { getToken } from '../services/giscussions/token';

const GISCUSSIONS_SESSION_KEY = 'giscussions-session';

interface IWidgetProps {
  repo: string;
  term: string;
  repoId: string;
  categoryId: string;
  description?: string;
}

function getSession(router: NextRouter) {
  let savedSession: string;
  try {
    savedSession = JSON.parse(localStorage.getItem(GISCUSSIONS_SESSION_KEY));
  } catch (err) {
    savedSession = '';
  }

  const querySession = router.query.session as string;
  if (querySession) {
    localStorage.setItem(GISCUSSIONS_SESSION_KEY, JSON.stringify(querySession));
  }

  return querySession || savedSession;
}

export default function Widget({ repo, term, repoId, categoryId, description }: IWidgetProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [token, setToken] = useState('');
  const [isFetchingToken, setIsFetchingToken] = useState(false);

  const session = getSession(router);
  const origin = (router.query.origin as string) || (isMounted ? location.href : '');

  const handleError = useCallback(() => {
    if (localStorage.getItem(GISCUSSIONS_SESSION_KEY) !== null) {
      localStorage.removeItem(GISCUSSIONS_SESSION_KEY);
      router.reload();
    }
  }, [router]);

  if (!isFetchingToken && session && !token) {
    setIsFetchingToken(true);
    getToken(session)
      .then((token) => {
        setToken(token);
        setIsFetchingToken(false);
      })
      .catch(handleError);
  }

  const handleDiscussionCreateRequest = async () =>
    createDiscussion(repo, {
      repositoryId: repoId,
      categoryId,
      title: term,
      body: `# ${term}\n\n${description || ''}\n\n${origin}`,
    });

  const ready = (!session || token) && repo && term;

  return ready ? (
    <AuthContext.Provider value={{ token, origin }}>
      <Giscussions
        repo={repo}
        term={term}
        onError={handleError}
        onDiscussionCreateRequest={handleDiscussionCreateRequest}
      />
    </AuthContext.Provider>
  ) : null;
}
