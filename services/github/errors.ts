import { GError, GMultipleErrors } from '../../lib/types/github';

export function handleGithubDiscussionResponse<Data>(
  response: { data: Data } | GError | GMultipleErrors,
  repo: string,
  userToken?: string,
) {
  if ('message' in response) {
    if (response.message.includes('Bad credentials')) {
      return { status: 403, error: response.message };
    }
    return { status: 500, error: response.message };
  }

  if ('errors' in response) {
    const error = response.errors[0];
    if (error?.message?.includes('API rate limit exceeded')) {
      let message = `API rate limit exceeded for ${repo}`;
      if (!userToken) {
        message += '. Sign in to increase the rate limit';
      }
      return { status: 429, error: message };
    }

    console.error(response);
    const message = response.errors.map?.(({ message }) => message).join('. ') || 'Unknown error';
    return { status: 500, error: message };
  }

  const { data } = response;
  if (!data) {
    console.error(response);
    return { status: 500, error: 'Unable to fetch discussion' };
  }
  return data;
}
