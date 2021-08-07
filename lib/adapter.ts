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

const COPY_BUTTON_HTML = `
<div class="zeroclipboard-container position-absolute right-0 top-0">
  <button aria-label="Copy" class="ClipboardButton btn js-clipboard-copy m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" tabindex="0" role="button">
    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-clippy js-clipboard-clippy-icon m-2">
      <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
    </svg>
    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-check js-clipboard-check-icon color-text-success d-none m-2">
      <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
    </svg>
  </button>
</div>`;

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
    comments: { pageInfo, totalCount: totalCommentCount, ...commentsData },
    reactions: { totalCount: reactionCount },
    reactionGroups,
    ...rest
  } = discussion;

  const totalReplyCount = commentsData.nodes.reduce(
    (acc, comment) => acc + comment.replies.totalCount,
    0,
  );

  const reactions = adaptReactionGroups(reactionGroups);
  const comments = commentsData.nodes.map(adaptComment);

  return {
    viewer,
    discussion: {
      totalCommentCount,
      totalReplyCount,
      pageInfo,
      reactionCount,
      reactions,
      comments,
      ...rest,
    },
  };
}

export function toggleEmail(event: ReactMouseEvent<HTMLElement, MouseEvent>) {
  const element = event.target as HTMLElement;
  const toggle = element.closest<HTMLAnchorElement>('.email-hidden-toggle a');
  if (toggle && event.currentTarget.contains(toggle)) {
    event.preventDefault();
    const container = element.closest('div');
    const content = container.querySelector('.email-hidden-reply');
    content.classList.toggle('expanded');
  }
}

export function handleClipboardCopy(event: ReactMouseEvent<HTMLElement, MouseEvent>) {
  const element = event.target as HTMLElement;
  const container = element.closest<HTMLDivElement>('.snippet-clipboard-content, .highlight');
  const button = element.closest<HTMLButtonElement>('button.ClipboardButton');

  if (container && button && event.currentTarget.contains(button)) {
    event.preventDefault();
    const contents =
      container.dataset.snippetClipboardCopyContent ||
      container.querySelector('pre').textContent ||
      '';

    clipboardCopy(contents).then(() => {
      const clipboardIcon = button.querySelector<SVGElement>('svg.js-clipboard-clippy-icon');
      const checkIcon = button.querySelector<SVGElement>('svg.js-clipboard-check-icon');

      clipboardIcon.classList.add('d-none');
      checkIcon.classList.remove('d-none');

      setTimeout(() => {
        clipboardIcon.classList.remove('d-none');
        checkIcon.classList.add('d-none');
      }, 2000);
    });
  }
}

export function handleCommentClick(event: ReactMouseEvent<HTMLElement, MouseEvent>) {
  toggleEmail(event);
  handleClipboardCopy(event);
}

export function processCommentBody(bodyHTML: string) {
  const template = document.createElement('template');
  template.innerHTML = bodyHTML;
  const content = template.content;

  content.querySelectorAll<HTMLAnchorElement>(':not(.email-hidden-toggle) > a').forEach((a) => {
    a.target = '_top';
    a.rel = 'noopener noreferrer nofollow';
  });

  content
    .querySelectorAll<HTMLAnchorElement>('a.commit-tease-sha')
    .forEach((a) => (a.href = 'https://github.com' + a.pathname));

  content
    .querySelectorAll<HTMLDivElement>(
      '.snippet-clipboard-content, .highlight:not(.js-file-line-container)',
    )
    .forEach((div) => {
      div.classList.add('position-relative');
      const copyButton = document.createElement('template');
      copyButton.innerHTML = COPY_BUTTON_HTML.trim();
      div.appendChild(copyButton.content.firstChild);
    });

  return template.innerHTML;
}
