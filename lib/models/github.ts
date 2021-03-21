import { Reactions } from '../reactions';

export interface GUser {
  avatarUrl: string;
  login: string;
  url: string;
}

export type GRepositoryDiscussionAuthor = GUser;

export interface GReactionGroup {
  content: keyof typeof Reactions;
  users: {
    totalCount: number;
  };
  viewerHasReacted: boolean;
}

interface GBaseComment {
  author: GRepositoryDiscussionAuthor;
  createdAt: string;
  authorAssociation: string;
  includesCreatedEdit: boolean;
  bodyHTML: string;
  reactionGroups: GReactionGroup[];
}

export type GReply = GBaseComment;

export interface GComment extends GBaseComment {
  replies: {
    totalCount: number;
    nodes: GReply[];
  };
}

export interface GRepositoryDiscussion {
  comments: {
    totalCount: number;
    nodes: GComment[];
  };
}

export interface GRepository {
  discussion: GRepositoryDiscussion;
}
