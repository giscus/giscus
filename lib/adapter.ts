import { IComment, IGiscussion, IReactionGroups } from './models/adapter';
import { GComment, GReactionGroup, GRepository, GUser } from './models/github';

function adaptReactionGroups(reactionGroups: GReactionGroup[]): IReactionGroups {
  return reactionGroups.reduce((acc, group) => {
    acc[group.content] = {
      count: group.users.totalCount,
      viewerHasReacted: group.viewerHasReacted,
    };
    return acc;
  }, {}) as IReactionGroups;
}

function adaptComments(comments: GComment[]): IComment[] {
  return comments.map((comment) => {
    const { replies: repliesData, reactionGroups, ...rest } = comment;
    const { totalCount: replyCount, nodes: replyNodes } = repliesData;

    const reactions = adaptReactionGroups(reactionGroups);

    const replies = replyNodes.map((reply) => {
      const { reactionGroups, ...rest } = reply;
      const reactions = adaptReactionGroups(reactionGroups);
      return { ...rest, reactions };
    });

    return { ...rest, replyCount, reactions, replies };
  });
}

export function adaptDiscussions({
  viewer,
  repository,
}: {
  viewer: GUser;
  repository: GRepository;
}): IGiscussion {
  const { discussion } = repository;
  const { comments: commentsData } = discussion;

  const totalCount = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    commentsData.totalCount,
  );

  const comments = adaptComments(commentsData.nodes);

  return {
    viewer,
    totalCount,
    comments,
  };
}
