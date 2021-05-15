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
  id: string;
  author: IUser;
  viewerDidAuthor: boolean;
  createdAt: string;
  url: string;
  authorAssociation: string;
  lastEditedAt: string | null;
  deletedAt: string | null;
  isMinimized: boolean;
  bodyHTML: string;
  reactions: IReactionGroups;
}

export interface IReply extends IBaseComment {
  replyToId: string;
}

export interface IComment extends IBaseComment {
  upvoteCount: number;
  viewerHasUpvoted: boolean;
  viewerCanUpvote: boolean;
  replyCount: number;
  replies: IReply[];
}

export interface IGiscussion {
  viewer: IUser;
  discussion: {
    id: string;
    locked: boolean;
    totalCommentCount: number;
    totalReplyCount: number;
    pageInfo: {
      startCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
    };
    repository: {
      nameWithOwner: string;
    };
    comments: IComment[];
  };
}

export interface ICategory {
  id: string;
  name: string;
  emoji: string;
}

export interface ICategories {
  repositoryId: string;
  categories: ICategory[];
}
