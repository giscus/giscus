import { MouseEvent as ReactMouseEvent } from 'react';
import { IComment, IGiscussion, IReactionGroups, IReply } from './types/adapter';
import { GComment, GReactionGroup, GReply, GRepositoryDiscussion, GUser } from './types/github';
import { clipboardCopy } from './utils';

const COPY_BUTTON_HTML = `
<div class="zeroclipboard-container position-absolute right-0 top-0">
  <button aria-label="Copy" class="ClipboardButton btn js-clipboard-copy m-2 p-0 tooltipped-no-delay" data-copy-feedback="Copied!" tabindex="0" role="button">
    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-copy js-clipboard-copy-icon m-2">
      <path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
    </svg>
    <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-check js-clipboard-check-icon color-text-success d-none m-2">
      <path fill-rule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
    </svg>
  </button>
</div>`;

// GitHub uses the @ghost user to replace deleted users on the website,
// but returns `null` in the API.
const GhostUser: GUser = {
  avatarUrl: 'https://avatars.githubusercontent.com/u/10137?s=64&v=4',
  login: 'ghost',
  url: 'https://github.com/ghost',
};

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
    author: _author,
    ...rest
  } = reply;

  const reactions = adaptReactionGroups(reactionGroups);
  const author = _author || GhostUser;

  return { ...rest, author, reactions, replyToId };
}

export function adaptComment(comment: GComment): IComment {
  const { replies: repliesData, reactionGroups, author: _author, ...rest } = comment;
  const { totalCount: replyCount, nodes: replyNodes } = repliesData;

  const reactions = adaptReactionGroups(reactionGroups);
  const replies = replyNodes.map(adaptReply);
  const author = _author || GhostUser;

  return { ...rest, author, replyCount, reactions, replies };
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
      const clipboardIcon = button.querySelector<SVGElement>('svg.js-clipboard-copy-icon');
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
  if (typeof document === 'undefined') {
    return bodyHTML.replace(
      /<a (href="[^"]*")/g,
      '<a $1 rel="noopener noreferrer nofollow" target="_top"',
    );
  }

  const template = document.createElement('template');
  template.innerHTML = bodyHTML;
  const content = template.content;

  content.querySelectorAll<HTMLAnchorElement>(':not(.email-hidden-toggle) > a').forEach((a) => {
    const currentLink = window.location.href;

    if (a.href.startsWith(`${currentLink}#`)) {
      let parentLink: URL;
      try {
        parentLink = new URL(document.referrer);
      } catch {
        return;
      }

      parentLink.hash = '';
      a.href = `${parentLink.href}${a.href.substring(currentLink.length)}`;
      return;
    }

    a.rel = 'noopener noreferrer nofollow';
    a.target = '_top';
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
      div.classList.remove('overflow-auto'); // Old comments have this unnecessary class
      const copyButton = document.createElement('template');
      copyButton.innerHTML = COPY_BUTTON_HTML.trim();
      div.appendChild(copyButton.content.firstChild);
    });

  return template.innerHTML;
}
