import { MouseEvent as ReactMouseEvent } from 'react';
import { IComment, IGiscussion, IReactionGroups, IReply } from './types/adapter';
import {
  GComment,
  GCommentAuthorAssociation,
  GReactionGroup,
  GReply,
  GRepositoryDiscussion,
  GUser,
} from './types/github';
import { clipboardCopy } from './utils';

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
  discussion: GRepositoryDiscussion | null;
}): IGiscussion {
  if (!discussion) return { viewer, discussion: null };

  const {
    id,
    repository,
    comments: { pageInfo, totalCount: totalCommentCount, ...commentsData },
  } = discussion;

  const totalReplyCount = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    0,
  );

  const comments = commentsData.nodes.map(adaptComment);

  return {
    viewer,
    discussion: {
      id,
      totalCommentCount,
      totalReplyCount,
      pageInfo,
      repository,
      comments,
    },
  };
}

export function toggleEmail(event: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
  const element = event.target as Element;
  const toggle = element.closest<HTMLAnchorElement>('.email-hidden-toggle a');
  if (toggle && event.currentTarget.contains(toggle)) {
    event.preventDefault();
    const container = element.closest('div');
    const content = container.querySelector('.email-hidden-reply');
    content.classList.toggle('expanded');
  }
}

export function handleClipboardCopy(event: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
  const element = event.target as Element;
  const button = element.closest<Element>('clipboard-copy');

  if (button && event.currentTarget.contains(button)) {
    event.preventDefault();

    clipboardCopy(button.getAttribute('value'));

    const clipboardIcon = button.querySelector<SVGElement>('svg.js-clipboard-clippy-icon');
    const checkIcon = button.querySelector<SVGElement>('svg.js-clipboard-check-icon');

    clipboardIcon.classList.add('d-none');
    checkIcon.classList.remove('d-none');

    setTimeout(() => {
      clipboardIcon.classList.remove('d-none');
      checkIcon.classList.add('d-none');
    }, 2000);
  }
}

export function handleCommentClick(event: ReactMouseEvent<HTMLDivElement, MouseEvent>) {
  toggleEmail(event);
  handleClipboardCopy(event);
}

export function processCommentBody(bodyHTML: string) {
  const content = document.createElement('div');
  content.innerHTML = bodyHTML;

  content.querySelectorAll<HTMLAnchorElement>(':not(.email-hidden-toggle) > a').forEach((a) => {
    a.target = '_top';
    a.rel = 'noopener noreferrer nofollow';
  });

  content
    .querySelectorAll<HTMLAnchorElement>('a.commit-tease-sha')
    .forEach((a) => (a.href = 'https://github.com' + a.pathname));

  content
    .querySelectorAll<SVGElement>('svg.js-clipboard-check-icon')
    .forEach((svg) => svg.classList.replace('d-sm-none', 'd-none'));

  return content.innerHTML;
}
