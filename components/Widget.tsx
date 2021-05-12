import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import Giscussions from '../components/Giscussions';
import { AuthContext } from '../lib/context';
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

export default function Widget({ repo, term, repoId, categoryId, description }: IWidgetProps) {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [origin, setOrigin] = useState('');
  const [isFetchingToken, setIsFetchingToken] = useState(false);

  useEffect(() => {
    setOrigin((router.query.origin as string) || location.href || '');
  }, [origin, router.query.origin]);

  const handleError = useCallback(() => {
    localStorage.removeItem(GISCUSSIONS_SESSION_KEY);
    router.reload();
  }, [router]);

  const querySession = router.query.session as string;

  let savedSession: string;
  try {
    savedSession = JSON.parse(localStorage.getItem(GISCUSSIONS_SESSION_KEY));
  } catch (err) {
    savedSession = '';
  }

  const session = querySession || savedSession;

  if (!isFetchingToken && session && !token) {
    setIsFetchingToken(true);
    getToken(session)
      .then((token) => {
        setToken(token);
        setIsFetchingToken(false);
      })
      .catch(handleError);
  }

  if (querySession) {
    const query = { ...router.query };
    delete query.session;

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
