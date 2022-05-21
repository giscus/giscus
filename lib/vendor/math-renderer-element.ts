/*! THIS FILE IS NOT COVERED BY THE MIT LICENSE.
 * Adapted from GitHub's client code (and its sourcemaps)
 * provided to the browser when you load their website.
 */

import type MathJaxConfig from 'mathjax/es5/tex-chtml-full';

declare global {
  interface Window {
    MathJax: MathJaxConfig;
  }
}

const INLINE_DELIMITER = '$';
const DISPLAY_DELIMITER = '$$';
const STATIC_RESOURCE_ATTR = 'data-static-url';

const purifyConfigs = {
  ADD_ATTR: ['jax', 'unselectable', 'display'],
  FORBID_TAGS: ['style', 'script', 'a'],
  KEEP_CONTENT: true,
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: /^(TEX|mjx|MJX)/,
    attributeNameCheck: /^(TEX|mjx|MJX)/,
    allowCustomizedBuiltInElements: true,
  },
};

let MathJax: null | MathJaxConfig = null;
let DOMPurify: null | { default: typeof import('dompurify') } = null;

/**
 * Get Speech-Rule-Engine files externally.
 */
function configureSRE() {
  const script = document.getElementById('sre-config') || document.createElement('script');
  script.id = 'sre-config';
  script.setAttribute('type', 'text/x-sre-config');
  script.textContent = JSON.stringify({
    json: 'https://cdn.jsdelivr.net/npm/speech-rule-engine@3.3.3/lib/mathmaps/',
    xpath: 'https://cdn.jsdelivr.net/gh/google/wicked-good-xpath@master/dist/wgxpath.install.js',
  });
  document.head.appendChild(script);
}

async function configureMathJax({ staticURL }: { staticURL: string }) {
  if (MathJax) {
    return;
  }

  // Things like a11y and SVG rendering are still brittle and may break rendering.
  // We don't have much control over them, so always clear the settings on load.
  localStorage.removeItem('MathJax-Menu-Settings');

  configureSRE();

  window.MathJax = {
    ...(window.MathJax || {}),
    loader: {
      paths: {
        mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5',
      },
    },
    tex: {
      inlineMath: [[INLINE_DELIMITER, INLINE_DELIMITER]],
      displayMath: [[DISPLAY_DELIMITER, DISPLAY_DELIMITER]],
      packages: { '[-]': ['html', 'require', 'newcommand'] },
    },
    chtml: {
      fontURL: `${staticURL}/fonts/mathjax`,
    },
    startup: {
      typeset: false,
    },
    options: {
      enableMenu: true,
      renderActions: {
        addMenu: [100000],
      },
    },
  };

  MathJax = await import('mathjax/es5/tex-chtml-full');
  DOMPurify = await import('dompurify');
}

class MathRendererElement extends HTMLElement {
  public staticURL = 'https://github.githubassets.com/static';

  async connectedCallback() {
    this.staticURL = this.getAttribute(STATIC_RESOURCE_ATTR) || this.staticURL;
    await configureMathJax({ staticURL: this.staticURL });
    requestAnimationFrame(() => this.typeset());
  }

  async typeset() {
    if (!window.MathJax || !DOMPurify) {
      return;
    }

    // insert latex into a shadow document to avoid potentially
    // introducing xss vectors
    const doc = document.implementation.createHTMLDocument('');

    doc.open();
    doc.write(`
      <html>
        <body>
          ${this.firstChild?.textContent}
        </body>
      </html>
    `);
    doc.close();

    // in-place typeset the content in the parallel document
    await window.MathJax.typesetPromise([doc.body]);

    const sanitized = DOMPurify?.default.sanitize(
      doc.body.firstElementChild as Node,
      purifyConfigs,
    ) as string;
    this.innerHTML = sanitized;

    // If there isn't any content left after sanitizing, don't attempt to reset any nodes
    if (sanitized) {
      // reset the typesetRoot to the real document
      const displayedMath = window.MathJax.startup.output.math;

      if (displayedMath && displayedMath.typesetRoot) {
        displayedMath.typesetRoot = this.firstChild;
        window.MathJax.startup.output.document.menu.addMenu(displayedMath);
      }
    }
  }
}

if (!customElements.get('math-renderer')) {
  customElements.define('math-renderer', MathRendererElement);
}
