import { IComment, IGiscussion, IReactionGroups, IReply } from './models/adapter';
import {
  GComment,
  GCommentAuthorAssociation,
  GReactionGroup,
  GReply,
  GRepositoryDiscussion,
  GUser,
} from './models/github';

export function adaptReactionGroups(reactionGroups: GReactionGroup[]): IReactionGroups {
  return reactionGroups.reduce((acc, group) => {
    acc[group.content] = {
      count: group.users.totalCount,
      viewerHasReacted: group.viewerHasReacted,
    };
    return acc;
  }, {}) as IReactionGroups;
}

export function adaptAuthorAssociation(association: GCommentAuthorAssociation) {
  return association.toLowerCase().replace('_', ' ');
}

export function adaptReply(reply: GReply): IReply {
  const {
    reactionGroups,
    replyTo: { id: replyToId },
    authorAssociation: association,
    ...rest
  } = reply;
  const authorAssociation = adaptAuthorAssociation(association);
  const reactions = adaptReactionGroups(reactionGroups);
  return { ...rest, authorAssociation, reactions, replyToId };
}

export function adaptComment(comment: GComment): IComment {
  const { replies: repliesData, reactionGroups, authorAssociation: association, ...rest } = comment;
  const { totalCount: replyCount, nodes: replyNodes } = repliesData;

  const authorAssociation = adaptAuthorAssociation(association);
  const reactions = adaptReactionGroups(reactionGroups);
  const replies = replyNodes.map(adaptReply);

  return { ...rest, authorAssociation, replyCount, reactions, replies };
}

export function adaptDiscussion({
  viewer,
  discussion,
}: {
  viewer: GUser;
  discussion: GRepositoryDiscussion;
}): IGiscussion {
  const {
    comments: { pageInfo, totalCount, ...commentsData },
  } = discussion;

  const totalCountWithReplies = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    commentsData.nodes.length,
  );

  const comments = commentsData.nodes.map(adaptComment);

  return {
    viewer,
    totalCount,
    totalCountWithReplies,
    pageInfo,
    comments,
  };
}
