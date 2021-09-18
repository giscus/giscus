import { CheckIcon, ClippyIcon, SyncIcon, XIcon } from '@primer/octicons-react';
import { ReactNode, useEffect, useState } from 'react';
import { handleClipboardCopy } from '../lib/adapter';
import { useDebounce } from '../lib/hooks';
import { ICategory } from '../lib/types/adapter';
import { Theme } from '../lib/variables';
import { GISCUS_APP_HOST } from '../services/config';
import { getCategories } from '../services/giscus/categories';

interface IDirectConfig {
  theme: Theme;
  themeUrl: Theme;
  reactionsEnabled: boolean;
  emitMetadata: boolean;
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
}

const mappingOptions: Array<{
  value: Mapping;
  label: ReactNode;
  description: ReactNode;
}> = [
  {
    value: 'pathname',
    label: (
      <>
        Discussion title contains page <code>pathname</code>
      </>
    ),
    description: (
      <>
        giscus will search for a discussion whose title contains the {`page's `}
        <code>pathname</code> URL component.
      </>
    ),
  },
  {
    value: 'url',
    label: <>Discussion title contains page URL</>,
    description: <>giscus will search for a discussion whose title contains the {`page's`} URL.</>,
  },
  {
    value: 'title',
    label: (
      <>
        Discussion title contains page <code>{'<title>'}</code>
      </>
    ),
    description: (
      <>
        giscus will search for a discussion whose title contains the {`page's `}
        <code>{'<title>'}</code> HTML tag.
      </>
    ),
  },
  {
    value: 'og:title',
    label: (
      <>
        Discussion title contains page <code>og:title</code>
      </>
    ),
    description: (
      <>
        giscus will search for a discussion whose title contains the {`page's `}
        <a href="https://ogp.me" target="_blank" rel="noreferrer noopener nofollow">
          <code>{`<meta property="og:title">`}</code>
        </a>{' '}
        HTML tag.
      </>
    ),
  },
  {
    value: 'specific',
    label: <>Discussion title contains a specific term</>,
    description: <>giscus will search for a discussion whose title contains a specific term.</>,
  },
  {
    value: 'number',
    label: <>Specific discussion number</>,
    description: (
      <>
        giscus will load a specific discussion by number. This option <strong>does not</strong>{' '}
        support automatic discussion creation.
      </>
    ),
  },
];

function ClipboardCopy() {
  return (
    <div className="top-0 right-0 zeroclipboard-container position-absolute">
      <button
        aria-label="Copy"
        className="p-0 m-2 ClipboardButton btn js-clipboard-copy tooltipped-no-delay"
        data-copy-feedback="Copied!"
        tabIndex={0}
        role="button"
        onClick={handleClipboardCopy}
      >
        <ClippyIcon className="m-2 octicon octicon-clippy js-clipboard-clippy-icon" />
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
  });
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const dRepository = useDebounce(config.repository);

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
      <h2>configuration</h2>

      <h3>Repository</h3>
      <p>Choose the repository giscus will connect to. Make sure that:</p>
      <ol>
        <li>
          The{' '}
          <strong>
            repository is{' '}
            <a
              href="https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public"
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              public
            </a>
          </strong>
          , otherwise your visitors will not be able to view the discussion.
        </li>
        <li>
          The{' '}
          <strong>
            <a
              href="https://github.com/apps/giscus"
              target="_blank"
              rel="noreferrer noopener nofollow"
            >
              giscus
            </a>{' '}
            app is installed on the repository
          </strong>
          , otherwise visitors will not be able to comment and react.
        </li>
        <li>
          The <strong>Discussions feature is turned on</strong> by{' '}
          <a
            href="https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            enabling it for your repository
          </a>
          .
        </li>
      </ol>
      <fieldset>
        <label htmlFor="repository" className="block font-semibold">
          repository:
        </label>
        <input
          id="repository"
          value={config.repository}
          onChange={(event) =>
            setConfig((current) => ({ ...current, repository: event.target.value }))
          }
          type="text"
          className="my-2 px-[12px] py-[5px] min-w-[75%] sm:min-w-[50%] form-control border rounded-md placeholder-gray-500"
          placeholder="owner/repo"
        />

        {error || (config.repositoryId && !categories.length) ? (
          <>
            <XIcon className="inline-block ml-2 color-text-danger" />
            <p className="text-xs color-text-danger">
              Cannot use giscus in this repository. Make sure all of the above criteria has been
              met.
            </p>
          </>
        ) : config.repositoryId && categories.length ? (
          <>
            <CheckIcon className="inline-block ml-2 color-text-success" />
            <p className="text-xs color-text-success">
              Success! This repository meets all of the above criteria.
            </p>
          </>
        ) : (
          <>
            {!error && !config.repositoryId && dRepository ? (
              <SyncIcon className="inline-block ml-2 animate-spin" />
            ) : null}
            <p className="text-xs color-text-secondary">
              A <strong>public</strong> GitHub repository. This is where the discussions will be
              linked to.
            </p>
          </>
        )}
      </fieldset>

      <h3>Page ↔️ Discussions Mapping</h3>
      <p>Choose the mapping between the embedding page and the embedded discussion.</p>
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
              <strong>{label}</strong>
            </label>
            <p className="mb-0 text-xs color-text-secondary">{description}</p>
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
                  config.mapping === 'number' ? 'Enter discussion number here' : 'Enter term here'
                }
              />
            ) : null}
          </div>
        ))}
      </fieldset>

      <h3>Discussion Category</h3>
      <p>
        Choose the discussion category where new discussions will be created.{' '}
        {config.mapping === 'number' ? (
          <>
            This feature is not supported if you use the <strong>specific discussion number</strong>{' '}
            mapping.
          </>
        ) : (
          <>
            It is recommended to use a category with the <strong>Announcements</strong> type so that
            new discussions can only be created by maintainers and giscus.
          </>
        )}
      </p>
      <label htmlFor="category" className="sr-only">
        Discussion category
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
        <option value="" disabled selected={!config.categoryId} data-category="">
          {config.mapping === 'number'
            ? 'Not supported'
            : categories.length
            ? 'Pick a category'
            : 'No categories found'}
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
          <strong>Only search for discussions in this category</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          When searching for a matching discussion, giscus will only search in this category.
        </p>
      </div>

      <h3>Features</h3>
      <p>Choose whether specific features should be enabled.</p>
      <div className="form-checkbox">
        <input
          type="checkbox"
          id="reactionsEnabled"
          checked={directConfig.reactionsEnabled}
          value={`${+directConfig.reactionsEnabled}`}
          onChange={(event) => onDirectConfigChange('reactionsEnabled', event.target.checked)}
        ></input>
        <label htmlFor="reactionsEnabled">
          <strong>Enable reactions for the main post</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          The reactions for the {`discussion's`} main post will be shown before the comments.
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
          <strong>Emit discussion metadata</strong>
        </label>
        <p className="mb-0 text-xs color-text-secondary">
          Discussion metadata will be sent periodically to the parent window. For demonstration,
          enable this option and open your {`browser's`} console on this page. See{' '}
          <a
            href="https://github.com/laymonage/giscus/blob/main/ADVANCED-USAGE.md#imetadatamessage"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            the documentation
          </a>{' '}
          for more details.
        </p>
      </div>

      <h3>Theme</h3>
      <p>
        Choose a theme that matches your website. {`Can't`} find one that does?{' '}
        <a
          href="https://github.com/laymonage/giscus/blob/main/CONTRIBUTING.md#creating-new-themes"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          Contribute
        </a>{' '}
        a custom theme.
      </p>
      <label htmlFor="theme" className="sr-only">
        Theme
      </label>
      <select
        name="theme"
        id="theme"
        value={directConfig.theme}
        onChange={(event) => onDirectConfigChange('theme', event.target.value as Theme)}
        className="px-[12px] py-[5px] pr-6 border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary"
      >
        {Object.entries(Theme).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {directConfig.theme === 'custom' ? (
        <fieldset className="mt-4">
          <label htmlFor="themeUrl" className="block font-semibold">
            URL to theme CSS file:
          </label>
          <input
            id="themeUrl"
            value={directConfig.themeUrl}
            onChange={(event) => onDirectConfigChange('themeUrl', event.target.value as Theme)}
            type="text"
            className="my-2 px-[12px] py-[5px] min-w-[75%] sm:min-w-[50%] form-control border rounded-md placeholder-gray-500"
            placeholder={`${GISCUS_APP_HOST}/themes/custom_example.css`}
          />

          <p className="text-xs color-text-danger">
            Warning: loading external CSS may be unsafe. Make sure you trust the author and provider
            of the CSS file.
          </p>
        </fieldset>
      ) : null}

      <h3>Enable giscus</h3>
      <p>
        Add the following <code>{'<script>'}</code> tag to your {`website's`} template where you
        want the comments to appear. If an element with the class <code>giscus</code> exists, the
        comments will be placed there instead.
      </p>
      <div className="relative highlight highlight-text-html-basic">
        <pre>
          <span className="pl-kos">{'<'}</span>
          <span className="pl-ent">script</span> <span className="pl-c1">src</span>={'"'}
          <span className="pl-s">{GISCUS_APP_HOST}/client.js</span>
          {'"\n        '}
          <span className="pl-c1">data-repo</span>={'"'}
          <span className="pl-s">{config.repository || '[ENTER REPO HERE]'}</span>
          {'"\n        '}
          <span className="pl-c1">data-repo-id</span>={'"'}
          <span className="pl-s">{config.repositoryId || '[ENTER REPO ID HERE]'}</span>
          {'"\n        '}
          {config.mapping !== 'number' ? (
            <>
              {config.useCategory ? (
                <>
                  <span className="pl-c1">data-category</span>={'"'}
                  <span className="pl-s">{config.category || '[ENTER CATEGORY NAME HERE]'}</span>
                  {'"\n        '}
                </>
              ) : null}
              <span className="pl-c1">data-category-id</span>={'"'}
              <span className="pl-s">{config.categoryId || '[ENTER CATEGORY ID HERE]'}</span>
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
                {config.term || `[ENTER ${config.mapping === 'number' ? 'NUMBER' : 'TERM'} HERE]`}
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
          <span className="pl-c1">data-theme</span>={'"'}
          <span className="pl-s">
            {directConfig.theme === 'custom'
              ? directConfig.themeUrl || '[ENTER THEME CSS URL HERE]'
              : directConfig.theme}
          </span>
          {'"\n        '}
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
        You can customize the layout using the <code>.giscus</code> and <code>.giscus-frame</code>{' '}
        selectors.
      </p>
    </div>
  );
}
