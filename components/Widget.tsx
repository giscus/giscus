import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext, getLoginUrl } from '../lib/context';
import { useIsMounted } from '../lib/hooks';
import { createDiscussion } from '../services/giscus/createDiscussion';
import { getToken } from '../services/giscus/token';

interface IWidgetProps {
  repo: string;
  term?: string;
  number?: number;
  repoId: string;
  categoryId: string;
  description?: string;
  reactionsEnabled?: boolean;
}

function getSession(router: NextRouter) {
  const session = router.query.session as string;
  if (session) {
    const query = { ...router.query };
    delete query.session;
    const url = { pathname: router.pathname, query };
    const options = { scroll: false, shallow: true };
    router.replace(url, undefined, options);
  }
  return session || '';
}

export default function Widget({
  repo,
  term,
  number,
  repoId,
  categoryId,
  description,
  reactionsEnabled = true,
}: IWidgetProps) {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [token, setToken] = useState('');
  const [isFetchingToken, setIsFetchingToken] = useState(false);

  const session = getSession(router);
  const origin = (router.query.origin as string) || (isMounted ? location.href : '');

  const handleDiscussionCreateRequest = async () =>
    createDiscussion(repo, {
      repositoryId: repoId,
      categoryId,
      title: term,
      body: `# ${term}\n\n${description || ''}\n\n${origin}`,
    });

  const handleError = useCallback(
    (message: string) => {
      window.parent.postMessage({ giscus: { error: message } }, origin);
    },
    [origin],
  );

  if (!isFetchingToken && session && !token) {
    setIsFetchingToken(true);
    getToken(session)
      .then((token) => {
        setToken(token);
        setIsFetchingToken(false);
      })
      .catch((err) => handleError(err?.message));
  }

  const ready =
    router.isReady && (!session || token) && !isFetchingToken && repo && (term || number);

  return ready ? (
    <AuthContext.Provider value={{ token, origin, getLoginUrl }}>
      <Giscus
        repo={repo}
        term={term}
        number={number}
        reactionsEnabled={reactionsEnabled}
        onDiscussionCreateRequest={handleDiscussionCreateRequest}
        onError={handleError}
      />
    </AuthContext.Provider>
  ) : null;
}
