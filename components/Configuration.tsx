import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../lib/context';
import { useDebounce } from '../lib/hooks';
import { ICategory } from '../lib/types/adapter';
import { clipboardCopy } from '../lib/utils';
import { themeOptions } from '../lib/variables';
import { getCategories } from '../services/giscussions/categories';

const mappingOptions = [
  {
    value: 'pathname',
    label: (
      <>
        Discussion title contains page <code>pathname</code>
      </>
    ),
    description: (
      <>
        giscussions will search for a discussion whose title contains the {`page's `}
        <code>pathname</code> URL component.
      </>
    ),
  },
  {
    value: 'url',
    label: <>Discussion title contains page URL</>,
    description: (
      <>giscussions will search for a discussion whose title contains the {`page's`} URL.</>
    ),
  },
  {
    value: 'title',
    label: (
      <>
        Discussion title contains page <code>{'<title>'}</code>.
      </>
    ),
    description: (
      <>
        giscussions will search for a discussion whose title contains the {`page's `}
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
        giscussions will search for a discussion whose title contains the page&apos;s{' '}
        <code>{`<meta property="og:title">`}</code> HTML tag.
      </>
    ),
  },
  {
    value: 'specific',
    label: <>Discussion title contains a specific term</>,
    description: (
      <>giscussions will search for a discussion whose title contains a specific term.</>
    ),
  },
  {
    value: 'number',
    label: <>Specific discussion number</>,
    description: (
      <>
        giscussions will load a specific discussion by number. This option does not support
        automatic discussion creation.
      </>
    ),
  },
];

export default function Configuration() {
  const [repository, setRepository] = useState('');
  const [repositoryId, setRepositoryId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [mapping, setMapping] = useState('pathname');
  const [term, setTerm] = useState('');
  const [theme, setTheme] = useState('light');
  const [isCopied, setIsCopied] = useState(false);
  const dRepository = useDebounce(repository);
  const scriptBox = useRef<HTMLPreElement>();
  const { setTheme: setGlobalTheme } = useContext(ThemeContext);

  const handleCopy = useCallback(() => {
    clipboardCopy(scriptBox.current.textContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  }, []);

  useEffect(() => {
    setGlobalTheme(theme);
  }, [setGlobalTheme, theme]);

  useEffect(() => {
    setError('');
    setRepositoryId('');
    setCategories([]);
    if (dRepository) {
      getCategories(dRepository)
        .then(({ repositoryId, categories }) => {
          setRepositoryId(repositoryId);
          setCategories(categories);
          setError('');
        })
        .catch(() => {
          setError(`Unable to fetch discussion category details for the selected repository.`);
        });
    }
  }, [dRepository]);

  return (
    <div className="p-4 pt-0 markdown">
      <h2>configuration</h2>

      <h3>Repository</h3>
      <p>Choose the repository giscussions will connect to.</p>
      <ol>
        <li>
          Make sure the repository is public, otherwise your visitors will not be able to view the
          discussion.
        </li>
        <li>
          Make sure the{' '}
          <a
            href="https://github.com/apps/giscussions"
            target="_blank"
            rel="noreferrer noopener nofollow"
          >
            giscussions
          </a>{' '}
          app is installed on the repository, otherwise visitors will not be able to post comments
          and replies.
        </li>
        <li>
          Make sure the Discussions feature is turned <strong>on</strong> by enabling it in the
          settings tab of the repository.
        </li>
      </ol>
      <fieldset className="mx-4">
        <div>
          <label htmlFor="repository" className="block font-semibold">
            repository:
          </label>
          <input
            id="repository"
            value={repository}
            onChange={(event) => setRepository(event.target.value)}
            type="text"
            className="my-2 px-[12px] py-[5px] min-w-[50%] form-control border rounded-md placeholder-gray-500"
            placeholder="owner/repo"
          />
          <p className="text-xs color-text-secondary">
            A <strong>public</strong> GitHub repository. This is where the discussions will be
            linked to.
          </p>
        </div>
      </fieldset>

      <h3>Discussion Category</h3>
      <p>Choose the discussion category where new discussions will be created.</p>
      <select
        name="category"
        id="category"
        disabled={!categories.length}
        value={categoryId}
        onChange={(event) => setCategoryId(event.target.value)}
        className="px-[12px] py-[5px] pr-6 min-w-[200px] border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary"
      >
        <option value="" disabled selected>
          {categories.length ? 'Pick a category' : 'No categories found'}
        </option>
        {categories.map(({ id, emoji, name }) => (
          <option key={id} value={id}>
            {emoji} {name}
          </option>
        ))}
      </select>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}

      <h3>Page ↔️ Discussions Mapping</h3>
      <p>Choose the mapping between the embedding page and the embedded discussion.</p>
      <fieldset className="mx-4">
        {mappingOptions.map(({ value, label, description }) => (
          <div key={value} className="flex">
            <input
              id={value}
              className="mt-[3.5px]"
              type="radio"
              name="mapping"
              value={value}
              checked={mapping === value}
              onChange={(event) => {
                setTerm('');
                setMapping(event.target.value);
              }}
            />
            <div className="ml-2">
              <label className="cursor-pointer" htmlFor={value}>
                {label}
                <p className="text-xs color-text-secondary">{description}</p>
              </label>
              {['specific', 'number'].includes(mapping) && mapping === value ? (
                <input
                  id="term"
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  type={mapping === 'number' ? 'number' : 'text'}
                  className={`px-[12px] py-[5px] form-control border rounded-md placeholder-gray-500 mb-4 ${
                    mapping === 'number' ? 'min-w-[240px]' : 'min-w-[50%]'
                  }`}
                  placeholder={
                    mapping === 'number' ? 'Enter discussion number here' : 'Enter term here'
                  }
                />
              ) : null}
            </div>
          </div>
        ))}
      </fieldset>

      <h3>Theme</h3>
      <p>
        Choose a theme that matches your website. Can&apos;t find one that does?{' '}
        <a
          href="https://github.com/laymonage/giscussions/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          Contribute
        </a>{' '}
        a custom theme.
      </p>
      <select
        name="theme"
        id="theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="px-[12px] py-[5px] pr-6 border rounded-md appearance-none bg-no-repeat form-control form-select color-border-primary color-bg-primary"
      >
        {themeOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <h3>Enable giscussions</h3>
      <p>
        Add the following <code>{'<script>'}</code> tag to your {`website's`} template where you
        want the comments to appear. If an element with the class <code>giscussions</code> exists,
        the comments will be placed there instead. You can customize the layout using the{' '}
        <code>.giscussions</code> and <code>.giscussions-frame</code> selectors.
      </p>
      <div className="highlight highlight-text-html-basic">
        <pre ref={scriptBox}>
          <span className="pl-kos">{'<'}</span>
          <span className="pl-ent">script</span> <span className="pl-c1">src</span>={'"'}
          <span className="pl-s">https://giscussions.vercel.app/client.js</span>
          {'"\n        '}
          <span className="pl-c1">data-repo</span>={'"'}
          <span className="pl-s">{repository || '[ENTER REPO HERE]'}</span>
          {'"\n        '}
          <span className="pl-c1">data-repo-id</span>={'"'}
          <span className="pl-s">{repositoryId || '[ENTER REPO ID HERE]'}</span>
          {'"\n        '}
          <span className="pl-c1">data-category-id</span>={'"'}
          <span className="pl-s">{categoryId || '[ENTER CATEGORY ID HERE]'}</span>
          {'"\n        '}
          <span className="pl-c1">data-mapping</span>={'"'}
          <span className="pl-s">{mapping}</span>
          {'"\n        '}
          {['specific', 'number'].includes(mapping) ? (
            <>
              <span className="pl-c1">data-term</span>={'"'}
              <span className="pl-s">{term || '[ENTER TERM HERE]'}</span>
              {'"\n        '}
            </>
          ) : null}
          <span className="pl-c1">data-theme</span>={'"'}
          <span className="pl-s">{theme}</span>
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
      </div>
      <div className="w-full mb-4 text-right">
        <span className={`mr-2${!isCopied ? ' hidden' : ''}`}>✔️ Copied!</span>
        <button
          className="px-4 py-[5px] ml-1 border rounded-md btn btn-primary"
          onClick={handleCopy}
        >
          Copy
        </button>
      </div>
      <p>
        If {`you're`} using giscussions, consider{' '}
        <a
          href="https://docs.github.com/en/github/administering-a-repository/classifying-your-repository-with-topics"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          adding the <code>giscussions</code> topic to your repo
        </a>
        ! 🎉
      </p>
      <h2>try it out 👇👇👇</h2>
    </div>
  );
}
