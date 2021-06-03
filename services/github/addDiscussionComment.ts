import { GComment } from '../../lib/types/github';
import { GITHUB_GRAPHQL_API_URL } from '../config';

const ADD_DISCUSSION_COMMENT_QUERY = `
  mutation($body: String!, $discussionId: ID!) {
    addDiscussionComment(input: {body: $body, discussionId: $discussionId}) {
      comment {
        id
        upvoteCount
        viewerHasUpvoted
        viewerCanUpvote
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
        replies(first: 100) {
          totalCount
          nodes {
            id
            author {
              avatarUrl
              login
              url
            }
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
          }
        }
      }
    }
  }`;

export interface AddDiscussionCommentBody {
  body: string;
  discussionId: string;
}

export interface AddDiscussionCommentResponse {
  data: {
    addDiscussionComment: {
      comment: GComment;
    };
  };
}

export async function addDiscussionComment(
  params: AddDiscussionCommentBody,
  token: string,
): Promise<AddDiscussionCommentResponse> {
  return fetch(GITHUB_GRAPHQL_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: ADD_DISCUSSION_COMMENT_QUERY,
      variables: params,
    }),
  }).then((r) => r.json());
}
