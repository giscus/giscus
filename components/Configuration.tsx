import { CheckIcon, CopyIcon, SyncIcon, XIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'react';
import { handleClipboardCopy } from '../lib/adapter';
import { useDebounce } from '../lib/hooks';
import {
  AvailableLanguage,
  availableLanguages,
  ConfigI18n,
  Trans,
  useGiscusTranslation,
} from '../lib/i18n';
import { ICategory } from '../lib/types/adapter';
import { InputPosition } from '../lib/types/giscus';
import { availableThemes, Theme } from '../lib/variables';
import { GISCUS_APP_HOST } from '../services/config';
import { getCategories } from '../services/giscus/categories';

interface IDirectConfig {
  theme: Theme;
  themeUrl: Theme;
  reactionsEnabled: boolean;
  emitMetadata: boolean;
  inputPosition: InputPosition;
  lang: AvailableLanguage;
}

interface IConfigurationProps {
  directConfig: IDirectConfig;
  onDirectConfigChange: (
    key: keyof IDirectConfig,
    value: IDirectConfig[keyof IDirectConfig],
  ) => void;
}

type Mapping = 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';

interface IConfig {
  repository: string;
  repositoryId: string;
  mapping: Mapping;
  term: string;
  category: string;
  categoryId: string;
  useCategory: boolean;
  lazyLoad: boolean;
}

const mappingOptions: Array<{
  value: Mapping;
  label: keyof ConfigI18n;
  description: keyof ConfigI18n;
}> = [
  {
    value: 'pathname',
    label: 'titleContainsPathname',
    description: 'titleContainsPathnameDesc',
  },
  {
    value: 'url',
    label: 'titleContainsURL',
    description: 'titleContainsURLDesc',
  },
  {
    value: 'title',
    label: 'titleContainsTitle',
    description: 'titleContainsTitleDesc',
  },
  {
    value: 'og:title',
    label: 'titleContainsOgTitle',
    description: 'titleContainsOgTitleDesc',
  },
  {
    value: 'specific',
    label: 'titleContainsSpecificTerm',
    description: 'titleContainsSpecificTermDesc',
  },
  {
    value: 'number',
    label: 'specificDiscussionNumber',
    description: 'specificDiscussionNumberDesc',
  },
];

function ClipboardCopy() {
  const { t } = useGiscusTranslation('config');
  return (
    <div className="top-0 right-0 zeroclipboard-container position-absolute">
      <button
        aria-label={t('copy')}
        className="p-0 m-2 ClipboardButton btn js-clipboard-copy tooltipped-no-delay"
        data-copy-feedback="Copied!"
        tabIndex={0}
        role="button"
        onClick={handleClipboardCopy}
      >
        <CopyIcon className="m-2 octicon octicon-copy js-clipboard-copy-icon" />
        <CheckIcon className="m-2 octicon octicon-check js-clipboard-check-icon color-text-success d-none" />
      </button>
    </div>
  );
}

export default function Configuration({ directConfig, onDirectConfigChange }: IConfigurationProps) {
  const [config, setConfig] = useState<IConfig>({
    repository: '',
    repositoryId: '',
    mapping: 'pathname',
    term: '',
    category: '',
    categoryId: '',
    useCategory: true,
    lazyLoad: false,
  });
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const dRepository = useDebounce(config.repository);
  const { t } = useGiscusTranslation('config');

  useEffect(() => {
    setError(false);
    setConfig((current) => ({ ...current, repositoryId: '', category: '', categoryId: '' }));
    setCategories([]);
    if (dRepository) {
      getCategories(dRepository)
        .then(({ repositoryId, categories }) => {
          setConfig((current) => ({ ...current, repositoryId }));
          setCategories(categories);
        })
        .catch(() => {
          setError(true);
        });
    }
  }, [dRepository]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const { data } = event;
      if (!(typeof data === 'object' && data?.giscus?.discussion)) return;
      console.log(data);
    };

    if (directConfig.emitMetadata) {
      window.addEventListener('message', handleMessage);
    }
    return () => window.removeEventListener('message', handleMessage);
  }, [directConfig.emitMetadata]);

  return (
    <div className="p-4 pt-0 markdown">
      <h2>{t('configuration')}</h2>

      <h3>{t('language')}</h3>
      <p>
        <Trans
          i18nKey="config:chooseLanguageGiscusDisplayed"
          components={{
            a: (
              <a
                href="https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#adding-localizations"
                target="_blank"
                rel="noreferrer noopener nofollow"
              />
            ),
          }}
        />
      </p>
      <label htmlFor="language" className="sr-only">
        {t('language')}
      </label>
      <select
        name="language"
        id="language"
        value={directConfig.lang}
        onChange={(event) => onDirectConfigChange('lang', event.target.value as AvailableLanguage)}
        className="px-[12px] py-[5px] pr-6 border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary"
      >
        {Object.entries(availableLanguages).map(([value, name]) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>

      <h3>{t('repository')}</h3>
      <p>{t('chooseTheRepository')}</p>
      <ol>
        <li>
          <Trans
            i18nKey="config:theRepositoryIsPublic"
            components={{
              a: (
                <a
                  href="https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                />
              ),
            }}
          />
        </li>
        <li>
          <Trans
            i18nKey="config:theGiscusAppIsInstalled"
            components={{
              a: (
                <a
                  href="https://github.com/apps/giscus"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                />
              ),
            }}
          />
        </li>
        <li>
          <Trans
            i18nKey="config:theDiscussionsFeatureIsTurnedOn"
            components={{
              a: (
                <a
                  href="https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                />
              ),
            }}
          />
        </li>
      </ol>
      <fieldset>
        <label htmlFor="repository" className="block font-semibold">
          {t('repositoryLabel')}
        </label>
        <input
          id="repository"
          value={config.repository}
          onChange={(event) =>
            setConfig((current) => ({ ...current, repository: event.target.value }))
          }
          type="text"
          className="my-2 px-[12px] py-[5px] min-w-[75%] sm:min-w-[50%] form-control border rounded-md placeholder-gray-500"
          placeholder={t('myusername/myrepo')}
        />

        {error || (config.repositoryId && !categories.length) ? (
          <>
            <XIcon className="inline-block ml-2 color-text-danger" />
            <p className="text-xs color-text-danger">{t('cannotUseGiscusOnThisRepository')}</p>
          </>
        ) : config.repositoryId && categories.length ? (
          <>
            <CheckIcon className="inline-block ml-2 color-text-success" />
            <p className="text-xs color-text-success">{t('successRepositoryMeetsCriteria')}</p>
          </>
        ) : (
          <>
            {!error && !config.repositoryId && dRepository ? (
              <SyncIcon className="inline-block ml-2 animate-spin" />
            ) : null}
            <p className="text-xs color-text-secondary">
              <Trans i18nKey="config:aPublicGitHubRepository" />
            </p>
          </>
        )}
      </fieldset>

      <h3>{t('pageDiscussionsMapping')}</h3>
      <p>{t('chooseTheMapping')}</p>
      <fieldset>
        {mappingOptions.map(({ value, label, description }) => (
          <div key={value} className="mt-4 first:mt-0 form-checkbox">
            <input
              id={value}
              className="mt-[3.5px]"
              type="radio"
              name="mapping"
              value={value}
              checked={config.mapping === value}
              onChange={(event) =>
                setConfig((current) => ({
                  ...current,
                  term: '',
                  mapping: event.target.value as Mapping,
                }))
              }
            />
            <label className="cursor-pointer" htmlFor={value}>
              <strong>
                <Trans i18nKey={`config:${label}`} />
              </strong>
            </label>
            <p className="mb-0 text-xs color-text-secondary">
              <Trans
                i18nKey={`config:${description}`}
                components={{
                  aOgTitle: (
                    <a href="https://ogp.me" target="_blank" rel="noreferrer noopener nofollow" />
                  ),
                }}
              />
            </p>
            {['specific', 'number'].includes(config.mapping) && config.mapping === value ? (
              <input
                id="term"
                value={config.term}
                onChange={(event) =>
                  setConfig((current) => ({ ...current, term: event.target.value }))
                }
                type={config.mapping === 'number' ? 'number' : 'text'}
                className="px-[12px] py-[5px] mt-4 form-control border rounded-md placeholder-gray-500 min-w-[75%] sm:min-w-[50%]"
                placeholder={
                  config.mapping === 'number' ? t('enterDiscussionNumberHere') : t('enterTermHere')
                }
              />
            ) : null}
          </div>
        ))}
      </fieldset>

      <h3>{t('discussionCategory')}</h3>
      <p>
        {t('chooseTheDiscussionCategory')}{' '}
        <Trans
          i18nKey={
            config.mapping === 'number'
              ? 'config:categoryIsNotSupported'
              : 'config:recommendAnnouncementsCategory'
          }
        />
      </p>
      <label htmlFor="category" className="sr-only">
        {t('discussionCategoryLabel')}
      </label>
      <select
        name="category"
        id="category"
        disabled={!categories.length || config.mapping === 'number'}
        value={config.categoryId}
        onChange={(event) =>
          setConfig((current) => ({
            ...current,
            category: event.target.selectedOptions[0]?.dataset.category,
            categoryId: event.target.value,
          }))
        }
        className={`px-[12px] py-[5px] pr-6 min-w-[200px] border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary${
          !config.categoryId ? ' color-text-secondary' : ''
        }`}
      >
        <option value="" disabled data-category="">
          {config.mapping === 'number'
            ? t('categoryNotSupportedOption')
            : categories.length
            ? t('pickACategoryOption')
            : t('noCategoriesFoundOption')}
        </option>
        {categories.map(({ id, emoji, name }) => (
          <option key={id} value={id} className="color-text-primary" data-category={name}>
            {emoji} {name}
          </option>
        ))}
      </select>
      <div className="form-checkbox">
        <input
          disabled={config.mapping === 'number'}
          type="checkbox"
          id="useCategory"
          checked={config.useCategory}
          value={config.category}
          onChange={(event) =>
            setConfig((current) => ({ ...current, useCategory: event.target.checked }))
          }
        ></input>
        <label htmlFor="useCategory">
          <strong>{t('onlySearchInThisCategory')}</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">{t('whenSearchingOnlyThisCategory')}</p>
      </div>

      <h3>{t('features')}</h3>
      <p>{t('chooseSpecificFeatures')}</p>
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="reactionsEnabled"
          checked={directConfig.reactionsEnabled}
          value={`${+directConfig.reactionsEnabled}`}
          onChange={(event) => onDirectConfigChange('reactionsEnabled', event.target.checked)}
        ></input>
        <label htmlFor="reactionsEnabled">
          <strong>{t('enableReactionsMainPost')}</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          {t('reactionsMainPostShownBeforeComments')}
        </p>
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="emitMetadata"
          checked={directConfig.emitMetadata}
          value={`${+directConfig.emitMetadata}`}
          onChange={(event) => onDirectConfigChange('emitMetadata', event.target.checked)}
        ></input>
        <label htmlFor="emitMetadata">
          <strong>{t('emitDiscussionMetadata')}</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          <Trans
            i18nKey="config:discussionMetadataSentPeriodically"
            components={{
              a: (
                <a
                  href="https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#imetadatamessage"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                />
              ),
            }}
          />
        </p>
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="inputPosition"
          checked={directConfig.inputPosition === 'top'}
          value={directConfig.inputPosition}
          onChange={(event) =>
            onDirectConfigChange('inputPosition', event.target.checked ? 'top' : 'bottom')
          }
        ></input>
        <label htmlFor="inputPosition">
          <strong>{t('placeCommentBoxAboveComments')}</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          {t('commentInputBoxWillBePlacedAboveComments')}
        </p>
      </div>
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="lazyLoad"
          checked={config.lazyLoad}
          onChange={(event) =>
            setConfig((current) => ({ ...current, lazyLoad: event.target.checked }))
          }
        ></input>
        <label htmlFor="lazyLoad">
          <strong>{t('loadCommentsLazily')}</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          <Trans
            i18nKey="config:loadingCommentsWillBeDeferred"
            components={{
              a: (
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-loading"
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                />
              ),
            }}
          />
        </p>
      </div>

      <h3>{t('theme')}</h3>
      <p>
        <Trans
          i18nKey="config:chooseAThemeThatMatches"
          components={{
            a: (
              <a
                href="https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#creating-new-themes"
                target="_blank"
                rel="noreferrer noopener nofollow"
              />
            ),
          }}
        />
      </p>
      <label htmlFor="theme" className="sr-only">
        {t('theme')}
      </label>
      <select
        name="theme"
        id="theme"
        value={directConfig.theme}
        onChange={(event) => onDirectConfigChange('theme', event.target.value as Theme)}
        className="px-[12px] py-[5px] pr-6 border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary"
      >
        {availableThemes.map((value) => (
          <option key={value} value={value}>
            {t(`theme=${value}`)}
          </option>
        ))}
      </select>

      {directConfig.theme === 'custom' ? (
        <fieldset className="mt-4">
          <label htmlFor="themeUrl" className="block font-semibold">
            {t('URLToThemeCSS')}
          </label>
          <input
            id="themeUrl"
            value={directConfig.themeUrl}
            onChange={(event) => onDirectConfigChange('themeUrl', event.target.value as Theme)}
            type="text"
            className="my-2 px-[12px] py-[5px] min-w-[75%] sm:min-w-[50%] form-control border rounded-md placeholder-gray-500"
            placeholder={`${GISCUS_APP_HOST}/themes/custom_example.css`}
          />

          <p className="text-xs color-text-danger">{t('warningExternalCSSUnsafe')}</p>
        </fieldset>
      ) : null}

      <h3>{t('enableGiscus')}</h3>
      <p>
        <Trans i18nKey="config:addTheFollowingScriptTag" />
      </p>
      <div className="relative highlight highlight-text-html-basic">
        <pre>
          <span className="pl-kos">{'<'}</span>
          <span className="pl-ent">script</span> <span className="pl-c1">src</span>={'"'}
          <span className="pl-s">{GISCUS_APP_HOST}/client.js</span>
          {'"\n        '}
          <span className="pl-c1">data-repo</span>={'"'}
          <span className="pl-s">{config.repository || t('[enterRepoHere]')}</span>
          {'"\n        '}
          <span className="pl-c1">data-repo-id</span>={'"'}
          <span className="pl-s">{config.repositoryId || t('[enterRepoIDHere]')}</span>
          {'"\n        '}
          {config.mapping !== 'number' ? (
            <>
              {config.useCategory ? (
                <>
                  <span className="pl-c1">data-category</span>={'"'}
                  <span className="pl-s">{config.category || t('[enterCategoryHere]')}</span>
                  {'"\n        '}
                </>
              ) : null}
              <span className="pl-c1">data-category-id</span>={'"'}
              <span className="pl-s">{config.categoryId || t('[enterCategoryIDHere]')}</span>
              {'"\n        '}
            </>
          ) : null}
          <span className="pl-c1">data-mapping</span>={'"'}
          <span className="pl-s">{config.mapping}</span>
          {'"\n        '}
          {['specific', 'number'].includes(config.mapping) ? (
            <>
              <span className="pl-c1">data-term</span>={'"'}
              <span className="pl-s">
                {config.term ||
                  (config.mapping === 'number' ? t('[enterNumberHere]') : t('[enterTermHere]'))}
              </span>
              {'"\n        '}
            </>
          ) : null}
          <span className="pl-c1">data-reactions-enabled</span>={'"'}
          <span className="pl-s">{Number(directConfig.reactionsEnabled)}</span>
          {'"\n        '}
          <span className="pl-c1">data-emit-metadata</span>={'"'}
          <span className="pl-s">{Number(directConfig.emitMetadata)}</span>
          {'"\n        '}
          <span className="pl-c1">data-input-position</span>={'"'}
          <span className="pl-s">{directConfig.inputPosition}</span>
          {'"\n        '}
          <span className="pl-c1">data-theme</span>={'"'}
          <span className="pl-s">
            {directConfig.theme === 'custom'
              ? directConfig.themeUrl || t('[enterThemeCSSURLHere]')
              : directConfig.theme}
          </span>
          {'"\n        '}
          <span className="pl-c1">data-lang</span>={'"'}
          <span className="pl-s">{directConfig.lang}</span>
          {'"\n        '}
          {config.lazyLoad ? (
            <>
              <span className="pl-c1">data-loading</span>={'"'}
              <span className="pl-s">lazy</span>
              {'"\n        '}
            </>
          ) : null}
          <span className="pl-c1">crossorigin</span>={'"'}
          <span className="pl-s">anonymous</span>
          {'"\n        '}
          <span className="pl-c1">async</span>
          <span className="pl-kos">{'>'}</span>
          {'\n'}
          <span className="pl-kos">{'<'}/</span>
          <span className="pl-ent">script</span>
          <span className="pl-kos">{'>'}</span>
        </pre>
        <ClipboardCopy />
      </div>
      <p>
        <Trans i18nKey="config:youCanCustomizeTheLayout" />
      </p>
    </div>
  );
}
