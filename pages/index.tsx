import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { readFileSync } from 'fs';
import { join } from 'path';
import Comment from '../components/Comment';
import Widget from '../components/Widget';
import { Reactions } from '../lib/reactions';
import { IComment, IReactionGroups } from '../lib/types/adapter';
import { renderMarkdown } from '../services/github/markdown';
import { getReadAccessToken } from '../services/github/getReadAccessToken';
import { useIsMounted } from '../lib/hooks';
import Configuration from '../components/Configuration';

export const getStaticProps = async () => {
  const path = join(process.cwd(), 'README.md');
  const readme = readFileSync(path, 'utf-8');
  const token = await getReadAccessToken();
  const content = await renderMarkdown(readme, token, 'laymonage/giscussions');
  return {
    props: {
      content,
    },
  };
};

export default function Home({ content }: { content: string }) {
  const isMounted = useIsMounted();
  const router = useRouter();
  const theme = (router.query.theme as string) || 'light';

  const comment: IComment = {
    author: {
      avatarUrl: 'https://github.com/identicons/app/app/giscussions',
      login: 'giscussions',
      url: 'https://github.com/apps/giscussions',
    },
    authorAssociation: 'app',
    bodyHTML: content,
    createdAt: '2021-05-07T13:21:14Z',
    deletedAt: null,
    id: 'onboarding',
    isMinimized: false,
    lastEditedAt: null,
    reactions: Object.keys(Reactions).reduce(
      (prev, key) => ({ ...prev, [key]: { count: 0, viewerHasReacted: false } }),
      {},
    ) as IReactionGroups,
    replies: [],
    replyCount: 0,
    upvoteCount: 0,
    url: 'https://github.com/laymonage/giscussions',
    viewerDidAuthor: false,
    viewerHasUpvoted: false,
  };

  return (
    <>
      <Head>
        <title>Giscussions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full min-h-screen color-bg-canvas" data-theme={theme}>
        <div className="w-full max-w-3xl p-2 mx-auto color-text-primary">
          {isMounted ? (
            <Comment comment={comment}>
              <Configuration />
            </Comment>
          ) : null}
          <div className="my-8" />
          <Widget repo="laymonage/discussions-playground" term="GraphQL" />
        </div>
      </main>
    </>
  );
}
