import { readFileSync } from 'fs';
import { join } from 'path';
import Comment from '../components/Comment';
import { Reactions } from '../lib/reactions';
import { IComment, IReactionGroups } from '../lib/types/adapter';
import { renderMarkdown } from '../services/github/markdown';
import { getAppAccessToken } from '../services/github/getAppAccessToken';
import { useDebounce, useIsMounted } from '../lib/hooks';
import Configuration from '../components/Configuration';
import { ComponentProps, useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../lib/context';
import { sendData } from '../lib/messages';
import { ISetConfigMessage } from '../lib/types/giscus';

export const getStaticProps = async () => {
  const path = join(process.cwd(), 'README.md');
  const readme = readFileSync(path, 'utf-8');
  const contents = readme.split('<!-- configuration -->');
  contents[1] = `${contents[1]}\n## try it out 👇👇👇\n`;

  const token = await getAppAccessToken('laymonage/giscus').catch(() => '');
  const [contentBefore, contentAfter] = await Promise.all(
    contents.map(async (section) => await renderMarkdown(section, token, 'laymonage/giscus')),
  );

  return {
    props: {
      contentBefore,
      contentAfter,
    },
  };
};

interface HomeProps {
  contentBefore: string;
  contentAfter: string;
}

type DirectConfig = ComponentProps<typeof Configuration>['directConfig'];
type DirectConfigHandler = ComponentProps<typeof Configuration>['onDirectConfigChange'];

export default function Home({ contentBefore, contentAfter }: HomeProps) {
  const isMounted = useIsMounted();
  const { theme, setTheme } = useContext(ThemeContext);
  const [directConfig, setDirectConfig] = useState<DirectConfig>({
    theme: 'light',
    themeUrl: '',
    reactionsEnabled: true,
    emitMetadata: false,
  });
  const themeUrl = useDebounce(directConfig.themeUrl);
  const resolvedTheme = directConfig.theme === 'custom' ? themeUrl : directConfig.theme;

  const handleDirectConfigChange: DirectConfigHandler = (key, value) =>
    setDirectConfig({ ...directConfig, [key]: value });

  useEffect(() => {
    setTheme(resolvedTheme);
  }, [setTheme, resolvedTheme]);

  useEffect(() => {
    const data: ISetConfigMessage = {
      setConfig: {
        theme: resolvedTheme,
        reactionsEnabled: directConfig.reactionsEnabled,
        emitMetadata: directConfig.emitMetadata,
      },
    };
    sendData(data, location.origin);
  }, [directConfig.emitMetadata, directConfig.reactionsEnabled, resolvedTheme, themeUrl]);

  useEffect(() => {
    const script = document.createElement('script');
    const attributes = {
      'data-repo': 'laymonage/giscus',
      'data-repo-id': 'MDEwOlJlcG9zaXRvcnkzNTE5NTgwNTM=',
      'data-category-id': 'MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyNzk2NTc1',
      'data-mapping': 'specific',
      'data-term': 'Welcome to giscus!',
      'data-theme': 'light',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
    };
    script.src = '/client.js';
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(key, value));
    document.body.appendChild(script);
  }, []);

  const comment: IComment = {
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/in/106117',
      login: 'giscus',
      url: 'https://github.com/apps/giscus',
    },
    authorAssociation: 'app',
    bodyHTML: contentBefore,
    createdAt: '2021-05-15T13:21:14Z',
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
    url: 'https://github.com/laymonage/giscus',
    viewerDidAuthor: false,
    viewerHasUpvoted: false,
    viewerCanUpvote: false,
  };

  return (
    <main className="w-full min-h-screen gsc-homepage-bg" data-theme={theme}>
      <div className="w-full max-w-3xl p-2 mx-auto color-text-primary">
        {isMounted ? (
          <Comment comment={comment}>
            <Configuration
              directConfig={directConfig}
              onDirectConfigChange={handleDirectConfigChange}
            />
            <div className="p-4 pt-0 markdown" dangerouslySetInnerHTML={{ __html: contentAfter }} />
          </Comment>
        ) : null}

        <div className="w-full my-8 giscus" />
      </div>
    </main>
  );
}
