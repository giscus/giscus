const script = document.currentScript as HTMLScriptElement;
const giscusOrigin = new URL(script.src).origin;

// Set up iframeResizer
declare let iFrameResize: (options: Record<string, unknown>) => void;

function loadScript(url: string, callback: VoidFunction) {
  const target = document.createElement('script');
  target.setAttribute('src', url);
  target.onload = callback;
  script.insertAdjacentElement('beforeend', target);
}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.1/iframeResizer.min.js', () =>
  iFrameResize({ checkOrigin: [giscusOrigin] }),
);

// Set up iframe src URL and params
const url = new URL(location.href);
let session = url.searchParams.get('giscus');

if (session) {
  localStorage.setItem('giscus-session', JSON.stringify(session));
  url.searchParams.delete('giscus');
  history.replaceState(undefined, document.title, url.toString());
} else {
  try {
    session = JSON.parse(localStorage.getItem('giscus-session')) || '';
  } catch (e) {
    session = '';
    localStorage.removeItem('giscus-session');
    console.error(e);
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
