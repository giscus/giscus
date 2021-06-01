import { NextRouter, useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext } from '../lib/context';
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

  if (!isFetchingToken && session && !token) {
    setIsFetchingToken(true);
    getToken(session).then((token) => {
      setToken(token);
      setIsFetchingToken(false);
    });
  }

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

  const ready = (!session || token) && repo && (term || number);

  return ready ? (
    <AuthContext.Provider value={{ token, origin }}>
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
