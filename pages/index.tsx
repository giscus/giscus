import { readFileSync } from 'fs';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { join } from 'path';
import Comment from '../components/Comment';
import { Reactions } from '../lib/reactions';
import { IComment, IReactionGroups } from '../lib/types/adapter';
import { renderMarkdown } from '../services/github/markdown';
import { getAppAccessToken } from '../services/github/getAppAccessToken';
import { useIsMounted } from '../lib/hooks';
import Configuration from '../components/Configuration';
import { useContext } from 'react';
import { ThemeContext } from '../lib/context';

export const getStaticProps = async () => {
  const path = join(process.cwd(), 'README.md');
  const readme = readFileSync(path, 'utf-8');
  const token = await getAppAccessToken('laymonage/giscussions');
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
  const { theme } = useContext(ThemeContext);

  const comment: IComment = {
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/in/106117',
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
    viewerCanUpvote: false,
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
            <>
              <Comment comment={comment}>
                <Configuration />
              </Comment>

              <div className="w-full mt-8 giscussions color-bg-canvas">
                <style jsx>
                  {`
                    :global(.giscussions-frame) {
                      width: 100%;
                      color-scheme: light;
                    }
                  `}
                </style>
              </div>
              {router.isReady ? (
                <Head>
                  <script
                    src="/client.js"
                    data-repo="laymonage/giscussions"
                    data-repo-id="MDEwOlJlcG9zaXRvcnkzNTE5NTgwNTM="
                    data-category-id="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyNzk2NTc1"
                    data-mapping="specific"
                    data-term="Welcome to giscussions!"
                    data-theme={theme}
                  ></script>
                </Head>
              ) : null}
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}
