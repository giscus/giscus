import { Reactions } from '../reactions';

export interface GUser {
  avatarUrl: string;
  login: string;
  url: string;
}

export type GRepositoryDiscussionAuthor = GUser;

export type GCommentAuthorAssociation =
  | 'COLLABORATOR'
  | 'CONTRIBUTOR'
  | 'FIRST_TIMER'
  | 'FIRST_TIME_CONTRIBUTOR'
  | 'MANNEQUIN'
  | 'MEMBER'
  | 'NONE'
  | 'OWNER';

export interface GReactionGroup {
  content: keyof typeof Reactions;
  users: {
    totalCount: number;
  };
  viewerHasReacted: boolean;
}

interface GBaseComment {
  id: string;
  author: GRepositoryDiscussionAuthor;
  createdAt: string;
  url: string;
  authorAssociation: GCommentAuthorAssociation;
  lastEditedAt: string | null;
  deletedAt: string | null;
  isMinimized: boolean;
  bodyHTML: string;
  reactionGroups: GReactionGroup[];
}

export interface GReply extends GBaseComment {
  replyTo: {
    id: string;
  };
}

export interface GComment extends GBaseComment {
  upvoteCount: number;
  viewerHasUpvoted: boolean;
  replies: {
    totalCount: number;
    nodes: GReply[];
  };
}

export interface GRepositoryDiscussion {
  id: string;
  comments: {
    totalCount: number;
    pageInfo: {
      startCursor: string;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      endCursor: string;
    };
    nodes: GComment[];
  };
}
