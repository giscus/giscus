import { NextApiRequest, NextApiResponse } from "next";
import { IError } from "../../../lib/types/adapter";
import { DiscussionQuery } from "../../../lib/types/common";
import { getAppAccessToken } from "../../../services/github/getAppAccessToken";
import { getDiscussionCommentsCount } from "../../../services/github/getDiscussionCommentsCount";

export default async function get(req: NextApiRequest, res: NextApiResponse<number | IError>) {
  const params: DiscussionQuery = {
    repo: req.query.repo as string,
    term: req.query.term as string,
    number: +req.query.number,
    category: req.query.category as string
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

  if ('message' in response) {
    if (response.message.includes('Bad credentials')) {
      res.status(403).json({ error: response.message });
      return;
    }
    res.status(500).json({ error: response.message });
    return;
  }

  if ('errors' in response) {
    const error = response.errors[0];
    if (error?.message?.includes('API rate limit exceeded')) {
      let message = `API rate limit exceeded for ${params.repo}`;
      if (!userToken) {
        message += '. Sign in to increase the rate limit';
      }
      res.status(429).json({ error: message });
      return;
    }

    console.error(response);
    const message = response.errors.map?.(({ message }) => message).join('. ') || 'Unknown error';
    res.status(500).json({ error: message });
    return;
  }

  const { data } = response;
  if (!data) {
    console.error(response);
    res.status(500).json({ error: 'Unable to fetch discussion' });
    return;
  }

  const discussion = 'search' in data ? data.search.nodes[0] ?? null : data.repository.discussion;

  if (!discussion) {
    res.status(404).json({ error: 'Discussion not found' });
    return;
  }


  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=3600, stale-if-error=86400');
  res.status(200).json(discussion.comments.totalCount);
}
