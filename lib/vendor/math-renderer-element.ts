/*! THIS FILE IS NOT COVERED BY THE MIT LICENSE.
 * Adapted from GitHub's client code (and its sourcemaps)
 * provided to the browser when you load their website.
 */

import type MathJaxConfig from 'mathjax/es5/tex-chtml-full';
import { html, render } from 'lit-html';
import { hasStorageAccess } from '../utils';

declare global {
  interface Window {
    MathJax: MathJaxConfig;
  }
}
const MAX_ALLOWED_MACROS = 100;
const BAD_EXPRESSION_ERROR = 'Unable to render expression.';
const INLINE_DELIMITER = '$';
const DISPLAY_DELIMITER = '$$';
const STATIC_RESOURCE_ATTR = 'data-static-url';
const MATHJAX_PREFIX_REGEX = new RegExp('^(TEX|mjx|MJX)-');

const stripAttrsConfigs = {
  ALLOWED_ATTR: [],
  ALLOW_DATA_ATTR: false,
  RETURN_DOM: true,
};

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
    json: '/js/vendor/speech-rule-engine@3.3.3/lib/mathmaps/',
    xpath: '/js/vendor/wicked-good-xpath@master/dist/wgxpath.install.js',
  });
  document.head.appendChild(script);
}

async function configureMathJax({ staticURL }: { staticURL: string }) {
  configurationPromise ||= (async () => {
    window.MathJax = {
      ...(window.MathJax || {}),
      loader: {
        paths: {
          mathjax: '/js/vendor/mathjax@3.2.0/es5',
        },
        load: ['ui/safe'],
      },
      tex: {
        inlineMath: [[INLINE_DELIMITER, INLINE_DELIMITER]],
        displayMath: [[DISPLAY_DELIMITER, DISPLAY_DELIMITER]],
        packages: { '[-]': ['html', 'require', 'newcommand'] },
        maxMacros: 1000,
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
            URLs: 'none',
            classes: 'none',
            cssIDs: 'none',
            styles: 'none',
          },
        },
      },
    };

    // Things like a11y and SVG rendering are still brittle and may break rendering.
    // We don't have much control over them, so always clear the settings on load.
    if (await hasStorageAccess()) {
      localStorage.removeItem('MathJax-Menu-Settings');
    }

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

  /**
   * Create a parallel document node that LaTeX content is injected into.
   * This content will be sanitized and typeset before being re-injected back
   * into the primary document node.
   *
   * We do this to mitigate potentiall XSS and UI redressing attacks that can potentially
   * occur with MathJax's in-place typesetting of LaTeX content.
   **/
  private tempDocumentContentForSanitization() {
    // insert LaTeX into a parallel document to avoid potentially
    // introducing xss vectors
    const doc = document.implementation.createHTMLDocument('');

    doc.open();
    doc.write(`
      <html>
        <body>
          ${this.textContent}
        </body>
      </html>
    `);
    doc.close();

    return doc.body.textContent ?? '';
  }

  private childIsNode(node: Node | null) {
    return Boolean(node && node.nodeType === Node.ELEMENT_NODE);
  }

  private isGitHubError(node: Element | null) {
    return node && node.classList.contains('flash-error');
  }

  private isMathJaxContainer(node: Element | null) {
    return node && node.nodeName === 'MJX-CONTAINER';
  }

  private wasPreviouslyRendered() {
    const node = this.firstElementChild;
    return this.isGitHubError(node) || this.isMathJaxContainer(node);
  }

  private getMathJaxError(node: HTMLElement) {
    if (!node) {
      return null;
    }

    const errorNode = node.querySelector('mjx-merror');
    const mathjaxError = errorNode?.getAttribute('data-mjx-error');

    return mathjaxError ?? null;
  }

  private renderError({ msg, raw }: { msg?: string | null; raw?: string } = {}) {
    const errorMsg = msg ?? BAD_EXPRESSION_ERROR;
    const rawContent = raw ?? this.textContent;

    if (!rawContent) {
      return render(html`<div class="flash flash-error">${errorMsg}</div>`, this);
    }

    return render(
      html`<div class="flash flash-error">${errorMsg}</div>
        <br />
        <pre>${rawContent}</pre>`,
      this,
    );
  }

  private renderContent(node: Node) {
    // Determine if typesetting in the parallel document produced an error.
    // Do this first so we can skip a potentially unecessary sanitization pass.
    const errorText = this.getMathJaxError(node as HTMLElement);

    if (typeof errorText === 'string') {
      this.renderError({
        msg: errorText,
      });

      return;
    }

    /**
     * If the supplied node doesn't have a mathjax error, that doesn't mean
     * it is a valid node we can display.
     * Nodes that have a text node as the value of their `firstChild` property
     * also indicates a math expression that has failed to parse correctly
     */
    if (!this.childIsNode(node)) {
      this.renderError();
      return;
    }

    const sanitized = DOMPurify?.default.sanitize(node, purifyConfigs) as string;

    // Only reset nodes if content remains post-sanitization
    if (!sanitized) {
      this.renderError();
      return;
    }

    this.innerHTML = sanitized;

    // reset the typesetRoot to the real document
    // The properties in output will be present if mathjax is loaded, so the ! are reasonably safe
    const displayedMath = window.MathJax.startup.output.math;

    // ensure the mathjax element exists and is an element node
    if (displayedMath && this.childIsNode(this.firstChild)) {
      displayedMath.typesetRoot = this.firstChild;
      window.MathJax.startup.output.document.menu.addMenu(displayedMath);
    }
  }

  get textContent() {
    return this.firstChild?.textContent ?? '';
  }

  async connectedCallback() {
    this.staticURL = this.getAttribute(STATIC_RESOURCE_ATTR);
    await configureMathJax({ staticURL: this.staticURL });
    requestAnimationFrame(() => this.typeset());
  }

  async typeset() {
    if (!window.MathJax) {
      return;
    }

    // If the document has already been processed, this function is a no-op.
    // This can happen when e.g. a user navigates between files with mathjax in them using
    // the browser's back button.
    if (this.wasPreviouslyRendered()) {
      return;
    }

    if (this.textContent.split('{').length > MAX_ALLOWED_MACROS) {
      this.renderError();
      return;
    }

    const parallelDocContent = this.tempDocumentContentForSanitization();

    /**
     * Users can potentially introduce insecure code that hijacks our behavior observer code
     * by providing the math render element with HTML nodes with classes that match our
     * js behaviors e.g. js-sso-modal-complete
     */
    const sanitizedDocBody = DOMPurify?.default.sanitize(
      parallelDocContent,
      stripAttrsConfigs,
    ) as Element;

    // in-place typeset the content in the parallel document
    await window.MathJax.typesetPromise([sanitizedDocBody]);

    this.renderContent(sanitizedDocBody.firstElementChild as Node);
  }
}

if (!customElements.get('math-renderer')) {
  customElements.define('math-renderer', MathRendererElement);
}
