import { GReply } from '../../lib/types/github';
import { GITHUB_GRAPHQL_API_URL } from '../config';

const ADD_DISCUSSION_REPLY_QUERY = `
  mutation($body: String!, $discussionId: ID!, $replyToId: ID!) {
    addDiscussionReply: addDiscussionComment(input: {body: $body, discussionId: $discussionId, replyToId: $replyToId}) {
      reply: comment {
        id
        author {
          avatarUrl
          login
          url
        }
        viewerDidAuthor
        createdAt
        url
        authorAssociation
        lastEditedAt
        deletedAt
        isMinimized
        bodyHTML
        reactionGroups {
          content
          users {
            totalCount
          }
          viewerHasReacted
        }
        replyTo {
          id
        }
      }
    }
  }`;

export interface AddDiscussionReplyBody {
  body: string;
  discussionId: string;
}

export interface AddDiscussionReplyResponse {
  data: {
    addDiscussionReply: {
      reply: GReply;
    };
  };
}

export async function addDiscussionReply(
  params: AddDiscussionReplyBody,
  token: string,
): Promise<AddDiscussionReplyResponse> {
  return fetch(GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADD_DISCUSSION_REPLY_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
