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
const MATHJAX_PREFIX_REGEX = new RegExp('^(TEX|mjx|MJX)-');

const purifyConfigs = {
  USE_PROFILES: { mathMl: true },
  ADD_ATTR: ['jax', 'unselectable', 'class', 'style', 'size', 'justify', 'space'],
  KEEP_CONTENT: true,
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: MATHJAX_PREFIX_REGEX,
    attributeNameCheck: MATHJAX_PREFIX_REGEX,
    allowCustomizedBuiltInElements: true,
  },
};

let DOMPurify: null | { default: typeof import('dompurify') } = null;
let configurationPromise: Promise<void> | null = null;

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
  configurationPromise ||= (async () => {
    window.MathJax = {
      ...(window.MathJax || {}),
      loader: {
        paths: {
          mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@3.2.0/es5',
        },
        load: ['ui/safe'],
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
        ready() {
          window.MathJax.startup.defaultReady();
          const menu = window.MathJax.startup.document.menu.menu;
          const renderer = menu.find('Renderer');
          renderer?.disable();
        },
      },
      options: {
        enableMenu: true,
        renderActions: {
          addMenu: [100000],
        },
        safeOptions: {
          allow: {
            //
            //  Values can be "all", "safe", or "none"
            //
            URLs: 'none', // safe are in safeProtocols below
            classes: 'none', // safe start with mjx- (can be set by pattern below)
            cssIDs: 'none', // safe start with mjx- (can be set by pattern below)
            styles: 'none', // safe are in safeStyles below
          },
        },
      },
    };

    // Things like a11y and SVG rendering are still brittle and may break rendering.
    // We don't have much control over them, so always clear the settings on load.
    localStorage.removeItem('MathJax-Menu-Settings');

    configureSRE();

    await import('mathjax/es5/tex-chtml-full');
    await window.MathJax.startup.promise;
    DOMPurify = await import('dompurify');
    DOMPurify?.default.addHook('uponSanitizeAttribute', sanitizeClass);
  })();

  await configurationPromise;
}

function sanitizeClass(_: Element, data: DOMPurify.SanitizeAttributeHookEvent): void {
  // only look at class attributes
  if (data.attrName !== 'class') {
    return;
  }

  // remove css classes that don't match the MathJax prefix pattern or `MathJax`
  data.attrValue = data.attrValue
    .split(' ')
    .filter((c) => MATHJAX_PREFIX_REGEX.test(c) || c === 'MathJax')
    .join(' ');

  // if all class values are filtered, remove the attribute entirely
  if (data.attrValue === '') {
    data.keepAttr = false;
  }
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

    /**
     * Users can potentially introduce insecure code that hijacks our behavior observer code
     * by providing the math render element with HTML nodes with classes that match our
     * js behaviors e.g. js-sso-modal-complete
     */
    const withStrippedAttrs = DOMPurify?.default.sanitize(doc.body.textContent ?? '', {
      ALLOWED_ATTR: [],
      ALLOW_DATA_ATTR: false,
      RETURN_DOM: true,
    }) as Element;

    // in-place typeset the content in the parallel document
    await window.MathJax.typesetPromise([withStrippedAttrs]);

    const sanitized = DOMPurify?.default.sanitize(
      withStrippedAttrs.firstElementChild as Node,
      purifyConfigs,
    ) as string;
    this.innerHTML = sanitized;

    // Only reset nodes if content remains post-sanitization
    if (sanitized) {
      // reset the typesetRoot to the real document
      const displayedMath = window.MathJax.startup.output.math;

      // ensure the mathjax element exists and is an element node
      if (displayedMath && this.firstChild && this.firstChild.nodeType === Node.ELEMENT_NODE) {
        displayedMath.typesetRoot = this.firstChild;
        window.MathJax.startup.output.document.menu.addMenu(displayedMath);
      }
    }
  }
}

if (!customElements.get('math-renderer')) {
  customElements.define('math-renderer', MathRendererElement);
}
