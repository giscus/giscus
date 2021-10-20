import type { NextApiRequest, NextApiResponse } from 'next';
import { getDiscussion, GetDiscussionResponse } from '../../../services/github/getDiscussion';
import { adaptDiscussion } from '../../../lib/adapter';
import { IError, IGiscussion } from '../../../lib/types/adapter';
import { createDiscussion } from '../../../services/github/createDiscussion';
import { GRepositoryDiscussion } from '../../../lib/types/github';
import { getAppAccessToken } from '../../../services/github/getAppAccessToken';
import { addCorsHeaders } from '../../../lib/cors';
import { handleGithubDiscussionResponse } from '../../../services/github/errors';

async function get(req: NextApiRequest, res: NextApiResponse<IGiscussion | IError>) {
  const params = {
    repo: req.query.repo as string,
    term: req.query.term as string,
    number: +req.query.number,
    category: req.query.category as string,
    first: +req.query.first,
    last: +req.query.last,
    after: req.query.after as string,
    before: req.query.before as string,
  };
  if (!params.last && !params.first) {
    params.first = 20;
  }

  const userToken = req.headers.authorization?.split('Bearer ')[1];
  let token = userToken;
  if (!token) {
    try {
      token = await getAppAccessToken(params.repo);
    } catch (error) {
      res.status(403).json({ error: error.message });
      return;
    }
  }

  const response = await getDiscussion(params, token);
  const handledResponse = handleGithubDiscussionResponse<GetDiscussionResponse['data']>(
    response,
    params.repo,
    userToken,
  );

  if ('error' in handledResponse) {
    return res.status(handledResponse.status).json({ error: handledResponse.error });
  }

  const { viewer } = handledResponse;

  let discussion: GRepositoryDiscussion;
  if ('search' in handledResponse) {
    const { search } = handledResponse;
    const { discussionCount, nodes } = search;
    discussion = discussionCount > 0 ? nodes[0] : null;
  } else {
    discussion = handledResponse.repository.discussion;
  }

  if (!discussion) {
    res.status(404).json({ error: 'Discussion not found' });
    return;
  }

  const adapted = adaptDiscussion({ viewer, discussion });
  res.status(200).json(adapted);
}

async function post(req: NextApiRequest, res: NextApiResponse<{ id: string } | IError>) {
  const { repo, input } = req.body;

  let token: string;
  try {
    token = await getAppAccessToken(repo);
  } catch (error) {
    res.status(403).json({ error: error.message });
    return;
  }

  const response = await createDiscussion(token, { input });
  const id = response?.data?.createDiscussion?.discussion?.id;

  if (!id) {
    res.status(400).json({ error: 'Unable to create discussion with request body.' });
    return;
  }

  res.status(200).json({ id });
}

export default async function DiscussionsApi(req: NextApiRequest, res: NextApiResponse) {
  addCorsHeaders(req, res);
  if (req.method === 'POST') {
    await post(req, res);
    return;
  }
  await get(req, res);
}
