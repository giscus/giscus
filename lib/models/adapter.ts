import { Reactions } from '../reactions';

export interface IUser {
  avatarUrl: string;
  login: string;
  url: string;
}

export type IReactionGroups = {
  [key in keyof typeof Reactions]: {
    count: number;
    viewerHasReacted: boolean;
  };
};

interface IBaseComment {
  author: IUser;
  createdAt: string;
  authorAssociation: string;
  includesCreatedEdit: boolean;
  bodyHTML: string;
  reactions: IReactionGroups;
}

export type IReply = IBaseComment;

export interface IComment extends IBaseComment {
  replyCount: number;
  replies: IReply[];
}

export interface IGiscussion {
  viewer: IUser;
  totalCount: number;
  comments: IComment[];
}
