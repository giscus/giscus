const TOGGLE_UPVOTE_QUERY = (mode: 'Add' | 'Remove') => `
  mutation($upvoteInput: ${mode}UpvoteInput!) {
    toggleUpvote: ${mode.toLowerCase()}Upvote(input: $upvoteInput) {
      subject {
        upvoteCount
      }
    }
  }`;

export interface ToggleUpvoteBody {
  upvoteInput: { subjectId: string };
}

export interface ToggleUpvoteResponse {
  data: {
    toggleUpvote: {
      subject: {
        upvoteCount: number;
      };
    };
  };
}

export async function toggleUpvote(
  params: ToggleUpvoteBody,
  token: string,
  viewerHasUpvoted: boolean,
): Promise<ToggleUpvoteResponse> {
  return fetch('/api/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: TOGGLE_UPVOTE_QUERY(viewerHasUpvoted ? 'Remove' : 'Add'),
      variables: params,
    }),
  }).then((r) => r.json());
}
