import { IComment, IGiscussion, IReactionGroups, IReply } from './models/adapter';
import { GComment, GReactionGroup, GReply, GRepositoryDiscussion, GUser } from './models/github';

export function adaptReactionGroups(reactionGroups: GReactionGroup[]): IReactionGroups {
  return reactionGroups.reduce((acc, group) => {
    acc[group.content] = {
      count: group.users.totalCount,
      viewerHasReacted: group.viewerHasReacted,
    };
    return acc;
  }, {}) as IReactionGroups;
}

export function adaptReply(reply: GReply): IReply {
  const {
    reactionGroups,
    replyTo: { id: replyToId },
    ...rest
  } = reply;
  const reactions = adaptReactionGroups(reactionGroups);
  return { ...rest, reactions, replyToId };
}

export function adaptComment(comment: GComment): IComment {
  const { replies: repliesData, reactionGroups, ...rest } = comment;
  const { totalCount: replyCount, nodes: replyNodes } = repliesData;

  const reactions = adaptReactionGroups(reactionGroups);
  const replies = replyNodes.map(adaptReply);

  return { ...rest, replyCount, reactions, replies };
}

export function adaptDiscussion({
  viewer,
  discussion,
}: {
  viewer: GUser;
  discussion: GRepositoryDiscussion;
}): IGiscussion {
  const { comments: commentsData } = discussion;

  const totalCount = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    commentsData.totalCount,
  );

  const comments = commentsData.nodes.map(adaptComment);

  return {
    viewer,
    totalCount,
    comments,
  };
}
