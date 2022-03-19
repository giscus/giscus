import { readFileSync } from 'fs';
import { join } from 'path';
import Script from 'next/script';
import { ComponentProps, useContext, useEffect, useState } from 'react';
import Comment from '../components/Comment';
import { Reactions } from '../lib/reactions';
import { IComment, IReactionGroups } from '../lib/types/adapter';
import { renderMarkdown } from '../services/github/markdown';
import { getAppAccessToken } from '../services/github/getAppAccessToken';
import { useDebounce } from '../lib/hooks';
import Configuration from '../components/Configuration';
import { ThemeContext } from '../lib/context';
import { sendData } from '../lib/messages';
import { ISetConfigMessage } from '../lib/types/giscus';
import { getThemeUrl } from '../lib/utils';
import { GISCUS_APP_HOST } from '../services/config';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Router from 'next/router';
import getT from 'next-translate/getT';
import { AvailableLanguage } from '../lib/i18n';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const localeSuffix = locale === 'en' ? '' : `.${locale}`;
  const t = await getT(locale, 'config');

  const path = join(process.cwd(), `README${localeSuffix}.md`);
  const readme = readFileSync(path, 'utf-8');
  const contents = readme.split('<!-- configuration -->');
  const [afterConfig] = contents[1].split('<!-- end -->');

  contents[1] = `${afterConfig}\n## ${t('tryItOut')} 👇👇👇\n`;

  const token = await getAppAccessToken('giscus/giscus').catch(() => '');
  const [contentBefore, contentAfter] = await Promise.all(
    contents.map((section) => renderMarkdown(section, token, 'giscus/giscus')),
  );

  const comment: IComment = {
    author: {
      avatarUrl: 'https://avatars.githubusercontent.com/in/106117',
      login: 'giscus',
      url: 'https://github.com/apps/giscus',
    },
    authorAssociation: 'APP',
    bodyHTML: contentBefore,
    createdAt: '2021-05-15T13:21:14Z',
    deletedAt: null,
    id: 'onboarding',
    isMinimized: false,
    lastEditedAt: null,
    reactions: Object.keys(Reactions).reduce((prev, key) => {
      prev[key] = { count: 0, viewerHasReacted: false };
      return prev;
    }, {}) as IReactionGroups,
    replies: [],
    replyCount: 0,
    upvoteCount: 0,
    url: 'https://github.com/giscus/giscus',
    viewerDidAuthor: false,
    viewerHasUpvoted: false,
    viewerCanUpvote: false,
  };

  return {
    props: {
      comment,
      contentAfter,
      locale: locale as AvailableLanguage,
    },
  };
}

type DirectConfig = ComponentProps<typeof Configuration>['directConfig'];
type DirectConfigHandler = ComponentProps<typeof Configuration>['onDirectConfigChange'];

export default function Home({
  comment,
  contentAfter,
  locale,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [directConfig, setDirectConfig] = useState<DirectConfig>({
    theme: 'light',
    themeUrl: `${GISCUS_APP_HOST}/themes/custom_example.css`,
    reactionsEnabled: true,
    emitMetadata: false,
    lang: locale,
    inputPosition: 'bottom',
  });
  const themeUrl = useDebounce(directConfig.themeUrl);
  const configTheme = getThemeUrl(directConfig.theme, themeUrl);

  const handleDirectConfigChange: DirectConfigHandler = (key, value) =>
    setDirectConfig({ ...directConfig, [key]: value });

  useEffect(() => {
    setTheme(configTheme);
  }, [setTheme, configTheme]);

  useEffect(() => {
    const data: ISetConfigMessage = {
      setConfig: {
        theme: configTheme,
        reactionsEnabled: directConfig.reactionsEnabled,
        emitMetadata: directConfig.emitMetadata,
        inputPosition: directConfig.inputPosition,
        lang: directConfig.lang,
      },
    };
    sendData(data, location.origin);
  }, [
    directConfig.emitMetadata,
    directConfig.reactionsEnabled,
    directConfig.inputPosition,
    directConfig.lang,
    configTheme,
    themeUrl,
  ]);

  useEffect(() => {
    Router.replace(Router.asPath, Router.pathname, {
      locale: directConfig.lang,
      scroll: false,
    });
  }, [directConfig.lang]);

  return (
    <main className="w-full min-h-screen gsc-homepage-bg" data-theme={theme}>
      <div className="w-full max-w-3xl p-2 mx-auto color-text-primary">
        <Comment comment={comment}>
          <Configuration
            directConfig={directConfig}
            onDirectConfigChange={handleDirectConfigChange}
          />
          <div className="p-4 pt-0 markdown" dangerouslySetInnerHTML={{ __html: contentAfter }} />
        </Comment>

        <div id="comments" className="w-full my-8 giscus" />
        <Script
          src="/client.js"
          data-repo="giscus/giscus"
          data-repo-id="MDEwOlJlcG9zaXRvcnkzNTE5NTgwNTM="
          data-category-id="MDE4OkRpc2N1c3Npb25DYXRlZ29yeTMyNzk2NTc1"
          data-mapping="specific"
          data-term="Welcome to giscus!"
          data-theme="light"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-lang={locale}
        />
        <a
          className="block mx-auto mb-6 w-max"
          href="https://vercel.com/?utm_source=giscus&utm_campaign=oss"
        >
          <img src="/powered-by-vercel.svg" alt="Powered by Vercel" />
        </a>
      </div>
    </main>
  );
}
