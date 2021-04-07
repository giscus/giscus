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
  id: string;
  author: GRepositoryDiscussionAuthor;
  createdAt: string;
  url: string;
  authorAssociation: string;
  includesCreatedEdit: boolean;
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
    nodes: GComment[];
  };
}
