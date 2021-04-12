import { GReply } from '../../lib/models/github';

const ADD_DISCUSSION_REPLY_QUERY = `
  mutation($body: String!, $discussionId: ID!, $replyToId: ID!) {
    addDiscussionReply: addDiscussionComment(input: {body: $body, discussionId: $discussionId, replyToId: $replyToId}) {
      reply: comment {
        id
        upvoteCount
        viewerHasUpvoted
        author {
          avatarUrl
          login
          url
        }
        createdAt
        url
        authorAssociation
        lastEditedAt
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
  return fetch('/api/graphql', {
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
