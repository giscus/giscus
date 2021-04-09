import { Reactions } from '../reactions';

export interface IUser {
  avatarUrl: string;
  login: string;
  url: string;
}

export type IReactionGroups = {
  [key in keyof Reactions]: {
    count: number;
    viewerHasReacted: boolean;
  };
};

interface IBaseComment {
  id: string;
  author: IUser;
  createdAt: string;
  url: string;
  authorAssociation: string;
  lastEditedAt: string;
  bodyHTML: string;
  reactions: IReactionGroups;
}

export interface IReply extends IBaseComment {
  replyToId: string;
}

export interface IComment extends IBaseComment {
  upvoteCount: number;
  viewerHasUpvoted: boolean;
  replyCount: number;
  replies: IReply[];
}

export interface IGiscussion {
  viewer: IUser;
  totalCount: number;
  comments: IComment[];
}
