const url = new URL(window.location.href);
const session = url.searchParams.get('giscussions');

if (session) {
  localStorage.setItem('giscussions-session', session);
  url.searchParams.delete('giscussions');
  history.replaceState(undefined, document.title, url.toString());
}

const script = document.currentScript as HTMLScriptElement;
const params: Record<string, string> = {};
for (const attr of Array.from(script.attributes)) {
  params[attr.name.replace(/^data-/, '')] = attr.value;
}

params.origin = location.href;
params.term = location.pathname;
params.title = document.title;
params.session = session || localStorage.getItem('giscussions-session') || '';

const iframeAttributes = {
  class: 'giscussions-frame',
  title: 'Comments',
  scrolling: 'no',
};

const giscussionsOrigin = script.src.match(
  /^https:\/\/giscussions\.vercel\.app|http:\/\/localhost:\d+/,
)[0];
const src = `${giscussionsOrigin}/widget?${new URLSearchParams(params)}`;

const iframeElement = document.createElement('iframe');
iframeElement.setAttribute('src', src);
Object.entries(iframeAttributes).map(([key, value]) => iframeElement.setAttribute(key, value));

const existingContainer = document.querySelector('.giscussions');
if (!existingContainer) {
  const iframeContainer = document.createElement('div');
  iframeContainer.setAttribute('class', 'giscussions');
  iframeContainer.appendChild(iframeElement);

  script.insertAdjacentElement('afterend', iframeContainer);
} else {
  while (existingContainer.firstChild) existingContainer.firstChild.remove();
  existingContainer.appendChild(iframeElement);
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
  iFrameResize({ checkOrigin: [giscussionsOrigin] }),
);
