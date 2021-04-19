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
  return association === 'NONE' ? '' : association.toLowerCase().replace('_', ' ');
}

export function adaptBodyHTML(bodyHTML: string) {
  return bodyHTML.replace(
    '<a data-pjax="true" class="commit-tease-sha" href="',
    '<a data-pjax="true" class="commit-tease-sha" href="https://github.com',
  );
}

export function adaptReply(reply: GReply): IReply {
  const {
    reactionGroups,
    replyTo: { id: replyToId },
    authorAssociation: association,
    bodyHTML: body,
    ...rest
  } = reply;

  const authorAssociation = adaptAuthorAssociation(association);
  const reactions = adaptReactionGroups(reactionGroups);
  const bodyHTML = adaptBodyHTML(body);

  return { ...rest, bodyHTML, authorAssociation, reactions, replyToId };
}

export function adaptComment(comment: GComment): IComment {
  const {
    replies: repliesData,
    reactionGroups,
    authorAssociation: association,
    bodyHTML: body,
    ...rest
  } = comment;
  const { totalCount: replyCount, nodes: replyNodes } = repliesData;

  const authorAssociation = adaptAuthorAssociation(association);
  const reactions = adaptReactionGroups(reactionGroups);
  const bodyHTML = adaptBodyHTML(body);
  const replies = replyNodes.map(adaptReply);

  return { ...rest, bodyHTML, authorAssociation, replyCount, reactions, replies };
}

export function adaptDiscussion({
  viewer,
  discussion,
}: {
  viewer: GUser;
  discussion: GRepositoryDiscussion | null;
}): IGiscussion {
  if (!discussion) return { viewer, discussion: null };

  const {
    id,
    repository,
    comments: { pageInfo, totalCount, ...commentsData },
  } = discussion;

  const totalCountWithReplies = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    commentsData.nodes.length,
  );

  const comments = commentsData.nodes.map(adaptComment);

  return {
    viewer,
    discussion: {
      id,
      totalCount,
      totalCountWithReplies,
      pageInfo,
      repository,
      comments,
    },
  };
}
