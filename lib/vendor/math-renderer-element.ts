/*! THIS FILE IS NOT COVERED BY THE MIT LICENSE.
 * Adapted from GitHub's client code (and its sourcemaps)
 * provided to the browser when you load their website.
 */

import type Dompurify from 'dompurify';
import type MathJaxConfig from 'mathjax/es5/tex-chtml-full';
import { html, render } from 'lit-html';
import { hasStorageAccess } from '../utils';

/**
 * UsageTracker is a thin wrapper around the Map class
 * suitable for keeping count of numerical values across
 * catlyst component instances.
 *
 * We are using this alongside the math-render-element as a static
 * way of tracking overall macro counts for a single pipeline run.
 *
 * Because this is a long-lived object, values associated with a pipeline
 * id must be cleared when the component is unmounted from the DOM.
 */
class UsageTracker {
  private usage: Map<string, number>;
  constructor() {
    this.usage = new Map();
  }

  get(key: string) {
    return this.usage.get(key) ?? 0;
  }

  update(key: string, value = 0) {
    const currentValue = this.get(key);
    this.usage.set(key, value + (currentValue ?? 0));
  }

  clear(key: string) {
    this.usage.delete(key);
  }

  // total provides a count of all instances of math usage across all pipeline
  // runs we've registered with the tracker.
  total() {
    return Array.from(this.usage.entries()).reduce((sum, [, time]) => {
      sum += time;
      return sum;
    }, 0);
  }
}

declare global {
  interface Window {
    MathJax?: MathJaxConfig;
  }
}
const MAX_ALLOWED_MACROS = 100;
/**
 * While each instance of a math renderer element is limited
 * to 100 macros, there is nothing preventing users with malicious intent
 * from authoring many comments, each with 100 macros. This value allows
 * us to limit the total number of macros on any given page.
 */
const GLOBAL_MAX_ALLOWED_MACROS = 2000;

const BAD_EXPRESSION_ERROR = 'Unable to render expression.';
const INLINE_DELIMITER = '$';
const DISPLAY_DELIMITER = '$$';
const STATIC_RESOURCE_ATTR = 'data-static-url';
const MATHJAX_PREFIX_REGEX = new RegExp('^(TEX|mjx|MJX)-');
const DIMENSION_ARG_MACROS = [
  'hskip',
  'hspace',
  'raise',
  'mspace',
  'mskip',
  'kern',
  'lower',
  'above',
  'mkern',
  'moveleft',
  'moveright',
  'rule',
  'Rule',
  'space',
  'Space',
];
const DISALLOWED_MACROS = [
  'DeclareMathOperator',
  'DeclarePairedDelimiters',
  'renewtagform',
  'newtagform',
  'colorbox',
  'fcolorbox',
  'hphantom',
  'vphantom',
  'phantom',
  'operatorname',
  'Newextarrow',
  'definecolor',
  'mathchoice',
  'unicode',
  'mmlToken',
];

// MathML parsing error messages that we want to replace with a generic error message
const MATHML_PARSING_ERROR_MESSAGES = ['Misplaced &'];

// Maps possible dimension units that can be passed to LaTeX macros to the maximum value (absolute) that we allow.
const unitToMaxVal: Record<string, number> = {
  em: 2,
  pt: 20,
  pc: 0.75,
  ex: 2.5,
};

const macrosWithDimensionArgs = DIMENSION_ARG_MACROS.join('|');
const unitTypes = Object.keys(unitToMaxVal).join('|');
const dimensionRegex = '-?\\d+.?\\d*?';
const macrosWithDimensionsRegex = new RegExp(
  `(${macrosWithDimensionArgs})({${dimensionRegex}(${unitTypes})})+`,
  'g',
);

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

const macroUsageTracker = new UsageTracker();

let DOMPurify: null | { default: typeof Dompurify } = null;
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
        packages: {
          '[-]': ['noerrors', 'bbox', 'html', 'require', 'newcommand', 'action', 'colortbl'],
        },
        maxMacros: 1000,
      },
      chtml: {
        fontURL: `${staticURL}/fonts/mathjax`,
      },
      startup: {
        typeset: false,
        ready() {
          // MathJax has loaded all needed components
          const mathjax = window.MathJax as MathJaxConfig;

          // Initializes the MathJax internal objects and creates typesetting and conversion methods
          mathjax.startup.defaultReady();

          // Disable SVG option from context menu
          const menu = mathjax.startup.document.menu.menu;
          const renderer = menu.find('Renderer');
          renderer?.disable();

          for (const jax of mathjax.startup.document!.inputJax) {
            jax.preFilters.add(async ({ math: mathObj }) => {
              for (const macro of DISALLOWED_MACROS) {
                if (mathObj.math.includes(`\\${macro}`)) {
                  mathObj.math = `\\text{${macro} macro is not supported}`;
                }
              }

              return true;
            }, -1000);
          }

          const safe = mathjax.startup.document?.safe;

          if (safe) {
            safe.filterAttributes.set('fontfamily', 'filterSemiColon');
            safe.filterAttributes.set('fontstyle', 'filterSemiColon');
            safe.filterAttributes.set('fontweight', 'filterSemiColon');
            safe.filterMethods.filterSemiColon = function (_: unknown, input: string) {
              const [split] = input.split(/;/);
              return split;
            };
          }
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
            styles: 'safe',
          },
          // Largest padding/border/margin value allowed, in ems
          // Note: There is a bug in mathjax that appears to prevent this setting from working correctly
          lengthMax: 2,
          // an emtpy object here is equivalent to setting all style properties to false, but is required so that lengthMax is respected.
          safeStyles: {},
          styleLengths: {},
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

// Workaround to force DOMPurify to not remove `columnalign` attributes from MathML elements
function allowMathMlAttributes(el: Element, data: Dompurify.UponSanitizeAttributeHookEvent): void {
  const allowedTags = ['mtable'];
  const allowedAttributes = ['columnalign'];

  if (allowedTags.includes(el.tagName) && allowedAttributes.includes(data.attrName)) {
    data.keepAttr = true;
    data.forceKeepAttr = true;
  }
}

function sanitizeClass(_: Element, data: Dompurify.UponSanitizeAttributeHookEvent): void {
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
  private runId: string;

  mathmlEnabled: boolean = false;

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
    // Check whether math being parsed already exists within a MJX-CONTAINER (was already processed by MathJax)
    // or a MATH-RENDERER element (just in case math elements are mistakenly nested somehow)
    return node && (node.nodeName === 'MJX-CONTAINER' || node.nodeName === 'MATH-RENDERER');
  }

  private wasPreviouslyRendered() {
    const node = this.firstElementChild;
    return this.isGitHubError(node) || this.isMathJaxContainer(node);
  }

  private getMathJaxError(node: HTMLElement) {
    if (!node) {
      return null;
    }

    const selector = 'merror';
    const errorNode = node.querySelector(selector);
    let errorMessage = errorNode?.textContent ?? null;

    if (errorMessage) {
      // Replace MathML's weird parsing error messages with a generic error message
      const containsParsingError = MATHML_PARSING_ERROR_MESSAGES.some((mjxErrorMessage: string) =>
        errorMessage?.includes(mjxErrorMessage),
      );

      if (containsParsingError) {
        errorMessage = BAD_EXPRESSION_ERROR;
      }
    }

    return errorMessage;
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

  // certain macros allow the user to alter other parts of the page, such as by
  // allowing custom operators to override existing ones.  We disallow these.
  private checkDisallowedMacros() {
    const disallowedMacrosFound = [];
    for (const macro of DISALLOWED_MACROS) {
      if (this.textContent.includes(`\\${macro}`)) {
        disallowedMacrosFound.push(macro);
      }
    }
    return disallowedMacrosFound;
  }

  // Effectively does what the lengthMax attribute of safeOptions is supposed to but evidently does not;
  // limits the value of numeric arguments to macros that can change padding or spacing, such as \hskip or \raise
  // such that users cannot alter GitHub's UI.
  private enforcePaddingLimit(textContent: string) {
    // match all macros that can change padding or spacing (listed in DIMENSION_ARG_MACROS)
    return textContent.replace(macrosWithDimensionsRegex, (match, other) => {
      const dimensionAndUnitRegex = new RegExp(`(${dimensionRegex}(${unitTypes}))+`, 'g');
      const matches = match?.match(dimensionAndUnitRegex);
      if (!matches || !matches.length) {
        return match;
      }
      // iterate through each dimension argument and clamp its value according to the allowed max value for its unit.
      const output = matches.map((m) => {
        const unit = m.split(new RegExp(`(${unitTypes})`));

        if (!unit.length) {
          return m;
        }

        const numericArg = Number(unit[0]);
        const unitType = unit[1] ?? '';

        if (!unitType) {
          return m;
        }

        const maxVal = unitToMaxVal[unitType] ?? 0;
        if (numericArg < -maxVal || numericArg > maxVal) {
          return `{${maxVal}${unitType}}`;
        } else {
          return `{${m}}`;
        }
      });
      return `${other}${output.join('')}`;
    });
  }

  private enforceMathJaxSafety() {
    if (!this.textContent) {
      return '';
    }

    return this.enforcePaddingLimit(this.textContent);
    // TODO: Call a method here that disallows passing `transparent` as a color argument
    // and potentially other methods that enforce UI safeguards
  }

  // Workaround for WebKit bug (https://bugs.webkit.org/show_bug.cgi?id=160075)
  // that prevents columnalign from being applied to mtd elements
  private setColumnAlignments() {
    const validAlignments = ['left', 'center', 'right'];
    const tables = this.querySelectorAll('mtable[columnalign]');

    for (const table of tables) {
      const alignments = table.getAttribute('columnalign')?.trim().split(/\s+/);

      if (alignments && alignments.length > 1) {
        const rows = table.querySelectorAll(':scope > mtr');

        for (const row of rows) {
          const columns = row.querySelectorAll('mtd');

          for (let j = 0; j < columns.length; j++) {
            const column = columns[j];
            const alignment = alignments[j] ?? alignments[alignments.length - 1];

            if (column?.style && alignment && validAlignments.includes(alignment)) {
              column.style.textAlign = alignment;
            }
          }
        }
      }
    }
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
  }

  get isInline(): boolean {
    return this.classList.contains('js-inline-math');
  }

  get isDisplay(): boolean {
    return this.classList.contains('js-display-math');
  }

  override get textContent() {
    return this.firstChild?.textContent ?? '';
  }

  override set textContent(content: string) {
    if (this.firstChild) {
      this.firstChild.textContent = content;
    }
  }

  async connectedCallback() {
    this.staticURL = this.getAttribute(STATIC_RESOURCE_ATTR)!;
    this.runId = this.getAttribute('data-run-id')!;

    macroUsageTracker.update(this.runId);

    await configureMathJax({ staticURL: this.staticURL });

    requestAnimationFrame(() => {
      this.renderMath();
    });
  }

  convertTexToMathML() {
    const parallelDocContent = this.tempDocumentContentForSanitization();
    const mathJax = window.MathJax;

    // We need to remove the $ delimiters from the TeX content before feeding it to MathJax
    const tex = parallelDocContent
      .trim()
      .replace(new RegExp(`^\\${INLINE_DELIMITER}{1,2}|\\${INLINE_DELIMITER}{1,2}$`, 'g'), '');

    if (mathJax && mathJax.tex2mml) {
      const mathMl = mathJax.tex2mml(tex, { display: !this.isInline });

      /**
       * Add a custom hook to preserve table attributes,
       * which should have been preserved with DOMPurify's "ALLOWED_ATTR" and "ADD_ATTR" configs,
       * but that apparently isn't working at this time.
       */
      DOMPurify?.default.addHook('uponSanitizeAttribute', allowMathMlAttributes);
      const sanitizedDocBody = DOMPurify?.default.sanitize(mathMl, {
        USE_PROFILES: { mathMl: true },
        RETURN_DOM: true,
      }) as Element;

      this.renderContent(sanitizedDocBody.firstElementChild as Node);

      // Fix any misaligned math tables in browsers that don't yet support `mtable[columnalign]`
      this.setColumnAlignments();
    }
  }

  disconnectedCallback() {
    macroUsageTracker.clear(this.runId);
  }

  renderMath() {
    if (!window.MathJax) {
      return;
    }

    // If the document has already been processed, this function is a no-op.
    // This can happen when e.g. a user navigates between files with mathjax in them using
    // the browser's back button.
    if (this.wasPreviouslyRendered()) {
      return;
    }

    // Large amounts of macros can crash the page, so we set an upper limit
    const estimatedElMacroCount = this.textContent.split('{').length;
    macroUsageTracker.update(this.runId, estimatedElMacroCount);

    const aggregateMacroCount = macroUsageTracker.total();

    if (
      aggregateMacroCount > GLOBAL_MAX_ALLOWED_MACROS ||
      estimatedElMacroCount > MAX_ALLOWED_MACROS
    ) {
      this.renderError();
      return;
    }

    // Perform additional sanitization to prevent behavior that MathJax technically allows.
    const disallowedMacrosFound = this.checkDisallowedMacros();
    if (disallowedMacrosFound.length > 0) {
      this.renderError({
        msg: `The following macros are not allowed: ${disallowedMacrosFound.join(', ')}`,
      });
      return;
    }

    this.textContent = this.enforceMathJaxSafety();

    this.convertTexToMathML();
  }
}

if (!customElements.get('math-renderer')) {
  customElements.define('math-renderer', MathRendererElement);
}
