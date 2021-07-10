import { IReactionGroups, IComment } from './adapter';

export interface ITokenRequest {
  session: string;
}

export interface ITokenResponse {
  token: string;
}

export interface IRepoConfig {
  origins?: string[];
  originsRegex?: string[];
}

export interface IDiscussionData {
  id: string;
  url: string;
  locked: boolean;
  repository: {
    nameWithOwner: string;
  };
  reactionCount: number;
  totalCommentCount: number;
  totalReplyCount: number;
  reactions: IReactionGroups;
  frontComments: IComment[];
  backComments: IComment[];
}
