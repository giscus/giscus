import { useCallback, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext, ConfigContext, getLoginUrl } from '../lib/context';
import { createDiscussion } from '../services/giscus/createDiscussion';
import { getToken } from '../services/giscus/token';

interface IWidgetProps {
  origin: string;
  session: string;
  repo: string;
  term: string;
  number: number;
  category: string;
  repoId: string;
  categoryId: string;
  description: string;
  reactionsEnabled: boolean;
}

export default function Widget({
  origin,
  session,
  repo,
  term,
  number,
  category,
  repoId,
  categoryId,
  description,
  reactionsEnabled,
}: IWidgetProps) {
  const [token, setToken] = useState('');
  const [isFetchingToken, setIsFetchingToken] = useState(false);

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

  const ready = (!session || token) && !isFetchingToken && repo && (term || number);

  return ready ? (
    <AuthContext.Provider value={{ token, origin, getLoginUrl }}>
      <ConfigContext.Provider value={{ repo, term, number, category, reactionsEnabled }}>
        <Giscus onDiscussionCreateRequest={handleDiscussionCreateRequest} onError={handleError} />
      </ConfigContext.Provider>
    </AuthContext.Provider>
  ) : null;
}
