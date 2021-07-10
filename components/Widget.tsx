import { useCallback, useEffect, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext, ConfigContext, getLoginUrl } from '../lib/context';
import { emitData } from '../lib/messages';
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

  const handleDiscussionCreateRequest = async () =>
    createDiscussion(repo, {
      repositoryId: repoId,
      categoryId,
      title: term,
      body: `# ${term}\n\n${description || ''}\n\n${origin}`,
    });

  const handleError = useCallback(
    (message: string) => {
      emitData({ error: message }, origin);
    },
    [origin],
  );

  useEffect(() => {
    if (session && !token) {
      getToken(session)
        .then(setToken)
        .catch((err) => handleError(err?.message));
    }
  }, [handleError, session, token]);

  const ready = (!session || token) && repo && (term || number);

  return ready ? (
    <AuthContext.Provider value={{ token, origin, getLoginUrl }}>
      <ConfigContext.Provider value={{ repo, term, number, category, reactionsEnabled }}>
        <Giscus onDiscussionCreateRequest={handleDiscussionCreateRequest} onError={handleError} />
      </ConfigContext.Provider>
    </AuthContext.Provider>
  ) : null;
}
