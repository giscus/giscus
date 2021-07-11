import { useCallback, useContext, useEffect, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext, ConfigContext, getLoginUrl } from '../lib/context';
import { emitData } from '../lib/messages';
import { IErrorMessage } from '../lib/types/giscus';
import { createDiscussion } from '../services/giscus/createDiscussion';
import { getToken } from '../services/giscus/token';

interface IWidgetProps {
  origin: string;
  session: string;
  repoId: string;
  categoryId: string;
  description: string;
}

export default function Widget({ origin, session, repoId, categoryId, description }: IWidgetProps) {
  const [token, setToken] = useState('');
  const { repo, term, number } = useContext(ConfigContext);

  const handleDiscussionCreateRequest = async () =>
    createDiscussion(repo, {
      repositoryId: repoId,
      categoryId,
      title: term,
      body: `# ${term}\n\n${description || ''}\n\n${origin}`,
    });

  const handleError = useCallback(
    (message: string) => {
      emitData<IErrorMessage>({ error: message }, origin);
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
      <Giscus onDiscussionCreateRequest={handleDiscussionCreateRequest} onError={handleError} />
    </AuthContext.Provider>
  ) : null;
}
