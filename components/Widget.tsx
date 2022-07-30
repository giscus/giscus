import { useCallback, useContext, useEffect, useState } from 'react';
import Giscus from '../components/Giscus';
import { AuthContext, ConfigContext, getLoginUrl } from '../lib/context';
import { emitData } from '../lib/messages';
import { IErrorMessage, IResizeHeightMessage } from '../lib/types/giscus';
import { cleanAnchor } from '../lib/utils';
import { createDiscussion } from '../services/giscus/createDiscussion';
import { getToken } from '../services/giscus/token';

interface IWidgetProps {
  origin: string;
  session: string;
}

export default function Widget({ origin, session }: IWidgetProps) {
  const [token, setToken] = useState('');
  const [createDiscussionPromise, setCreateDiscussionPromise] = useState<Promise<string>>();
  const { repo, repoId, categoryId, description, backLink, term, number } =
    useContext(ConfigContext);

  const handleDiscussionCreateRequest = async () => {
    if (createDiscussionPromise) return createDiscussionPromise;

    const promise = createDiscussion(repo, {
      repositoryId: repoId,
      categoryId,
      title: term,
      body: `# ${term}\n\n${description || ''}\n\n${cleanAnchor(backLink || origin)}`,
    });
    setCreateDiscussionPromise(promise);

    return promise;
  };

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

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      emitData<IResizeHeightMessage>({ resizeHeight: entry.contentRect.height }, origin);
    });

    observer.observe(document.querySelector('body'));
    return () => observer.disconnect();
  }, [origin]);

  const ready = (!session || token) && repo && (term || number);

  return ready ? (
    <AuthContext.Provider value={{ token, origin, getLoginUrl }}>
      <Giscus onDiscussionCreateRequest={handleDiscussionCreateRequest} onError={handleError} />
    </AuthContext.Provider>
  ) : null;
}
