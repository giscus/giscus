import { NextApiRequest, NextApiResponse } from 'next';
import { IError } from '../../../lib/types/adapter';
import { DiscussionQuery } from '../../../lib/types/common';
import { handleGithubDiscussionResponse } from '../../../services/github/errors';
import { getAppAccessToken } from '../../../services/github/getAppAccessToken';
import {
  getDiscussionCommentsCount,
  GetDiscussionCommentsCountResponse,
} from '../../../services/github/getDiscussionCommentsCount';

export default async function getCommentsCount(
  req: NextApiRequest,
  res: NextApiResponse<number | IError>,
) {
  if (!process.env.ENABLE_ADDITIONAL_PAGES) {
    return res.status(404).end();
  }

  const params: DiscussionQuery = {
    repo: req.query.repo as string,
    term: req.query.term as string,
    number: +req.query.number,
    category: req.query.category as string,
  };

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

  const response = await getDiscussionCommentsCount(params, token);

  const handledResponse = handleGithubDiscussionResponse<
    GetDiscussionCommentsCountResponse['data']
  >(response, params.repo, userToken);

  if ('error' in handledResponse) {
    return res.status(handledResponse.status).json({ error: handledResponse.error });
  }

  const discussion =
    'search' in handledResponse
      ? handledResponse.search.nodes[0] ?? null
      : handledResponse.repository.discussion;

  if (!discussion) {
    res.status(404).json({ error: 'Discussion not found' });
    return;
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=3600, stale-if-error=86400',
  );
  res.status(200).json(discussion.comments.totalCount);
}
