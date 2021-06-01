const GISCUS_SESSION_KEY = 'giscus-session';
const script = document.currentScript as HTMLScriptElement;
const giscusOrigin = new URL(script.src).origin;

function formatError(message: string) {
  return `[giscus] An error occurred. Error message: "${message}".`;
}

// Set up iframeResizer
declare let iFrameResize: (options: Record<string, unknown>) => void;

function loadScript(url: string, callback: VoidFunction) {
  const target = document.createElement('script');
  target.setAttribute('src', url);
  target.onload = callback;
  script.insertAdjacentElement('beforeend', target);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js', () =>
  iFrameResize({ checkOrigin: [giscusOrigin], resizeFrom: 'child' }),
);

// Set up iframe src URL and params
const url = new URL(location.href);
let session = url.searchParams.get('giscus');
const savedSession = localStorage.getItem(GISCUS_SESSION_KEY);

if (session) {
  localStorage.setItem(GISCUS_SESSION_KEY, JSON.stringify(session));
  url.searchParams.delete('giscus');
  history.replaceState(undefined, document.title, url.toString());
} else {
  try {
    session = JSON.parse(savedSession) || '';
  } catch (e) {
    session = '';
    localStorage.removeItem(GISCUS_SESSION_KEY);
    console.warn(`${formatError(e?.message)} Session has been cleared.`);
  }
}

const attributes = script.dataset;
const params: Record<string, string> = {};
const ogDescriptionMeta = document.querySelector(
  `meta[property='og:description'],meta[name='description']`,
) as HTMLMetaElement;

params.origin = location.href;
params.session = session;
params.theme = attributes.theme;
params.reactionsEnabled = attributes.reactionsEnabled || '1';
params.repo = attributes.repo;
params.repoId = attributes.repoId;
params.categoryId = attributes.categoryId;
params.description = ogDescriptionMeta ? ogDescriptionMeta.content : '';

switch (attributes.mapping) {
  case 'url':
    params.term = location.href;
    break;
  case 'title':
    params.term = document.title;
    break;
  case 'og:title':
    {
      const ogtitleMeta = document.querySelector(
        `meta[property='og:title'],meta[name='og:title']`,
      ) as HTMLMetaElement;
      params.term = ogtitleMeta ? ogtitleMeta.content : '';
    }
    break;
  case 'specific':
    params.term = attributes.term;
    break;
  case 'number':
    params.number = attributes.term;
    break;
  case 'pathname':
  default:
    params.term =
      location.pathname.length < 2 ? 'index' : location.pathname.substr(1).replace(/\.\w+$/, '');
    break;
}

const src = `${giscusOrigin}/widget?${new URLSearchParams(params)}`;

// Set up iframe element
const iframeElement = document.createElement('iframe');
const iframeAttributes = {
  class: 'giscus-frame',
  title: 'Comments',
  scrolling: 'no',
  src,
};
Object.entries(iframeAttributes).forEach(([key, value]) => iframeElement.setAttribute(key, value));

// Insert iframe element
const existingContainer = document.querySelector('.giscus');
if (!existingContainer) {
  const iframeContainer = document.createElement('div');
  iframeContainer.setAttribute('class', 'giscus');
  iframeContainer.appendChild(iframeElement);

  script.insertAdjacentElement('afterend', iframeContainer);
} else {
  while (existingContainer.firstChild) existingContainer.firstChild.remove();
  existingContainer.appendChild(iframeElement);
}
const suggestion = `Please consider reporting this error at https://github.com/laymonage/giscus/issues/new.`;

// Listen to error messages
window.addEventListener('message', (event) => {
  if (event.origin !== giscusOrigin) return;

  const { data } = event;
  if (!(typeof data === 'object' && data?.giscus?.error)) return;

  const message: string = data.giscus.error;

  if (message.includes('Bad credentials') || message.includes('Invalid state value')) {
    // Might be because token is expired or other causes
    if (localStorage.getItem(GISCUS_SESSION_KEY) !== null) {
      localStorage.removeItem(GISCUS_SESSION_KEY);
      console.warn(`${formatError(message)} Session has been cleared.`);

      iframeElement.src += ''; // Force reload
    } else if (!savedSession) {
      console.error(`${formatError(message)} No session is stored initially. ${suggestion}`);
    }
  } else if (message.includes('Discussion not found')) {
    console.warn(
      `[giscus] ${message}. A new discussion will be created if a comment/reaction is submitted.`,
    );
  } else {
    console.error(`${formatError(message)} ${suggestion}`);
  }
});
