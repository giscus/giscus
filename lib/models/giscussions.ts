export interface ITokenRequest {
  session: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IGiscussionsRequest {
  repositoryOwner: string;
  repositoryName: string;
  discussionNumber: string;
}
