import { GComment } from '../../lib/models/github';

const ADD_DISCUSSION_COMMENT_QUERY = `
  mutation($body: String!, $discussionId: ID!) {
    addDiscussionComment(input: {body: $body, discussionId: $discussionId}) {
      comment {
        id
        upvoteCount
        viewerHasUpvoted
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
  return fetch('/api/graphql', {
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
