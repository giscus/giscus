# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog]. As of this
writing, this is a rolling-release project without any meaningful versioning
whatsoever. Tags/releases may be created for the sole purpose of documenting
major updates to the project.

## 2023-08-19

### Added

- Add Purple Dark theme
  ([#1144](https://github.com/giscus/giscus/pull/1144)).

## 2023-08-12

### Changed

- Disable upvote button
  ([#1152](https://github.com/giscus/giscus/pull/1152)).

### Fixed

- Fix timeline element not being hidden when the discussion hasn't been created
  ([#1151](https://github.com/giscus/giscus/pull/1151)).

## 2023-07-29

### Added

- Add Esperanto localization
  ([#1124](https://github.com/giscus/giscus/pull/1124)).

## 2023-07-01

### Changed

- Update comment sorting button styles to match GitHub
  ([#1096](https://github.com/giscus/giscus/pull/1096)).

## 2023-06-25

### Changed

- Various style fixes
  ([#1030](https://github.com/giscus/giscus/pull/1030)).

## 2023-06-24

### Added

- Add Hebrew localization
  ([#1056](https://github.com/giscus/giscus/pull/1056)).

- Add Catalan localization
  ([#1071](https://github.com/giscus/giscus/pull/1071)).

- Add NoBorder themes
  ([#1052](https://github.com/giscus/giscus/pull/1052)).

## 2023-04-01

### Added

- Add Ukrainian localization
  ([#677](https://github.com/giscus/giscus/pull/677),
  [#855](https://github.com/giscus/giscus/pull/855),
  [#911](https://github.com/giscus/giscus/pull/911)).

## 2023-02-26

### Added

- Add sign out button
  ([#919](https://github.com/giscus/giscus/pull/919)).

### Changed

- Use `<link>` element to load default CSS
  ([#920](https://github.com/giscus/giscus/pull/920)).

## 2023-02-25

### Changed

- Use lazy loading for avatar images
  ([#918](https://github.com/giscus/giscus/pull/918)).

## 2023-02-11

### Added

- Add Persian localization
  ([#867](https://github.com/giscus/giscus/pull/867)).

## 2022-12-14

### Fixed

- Clear session if state has expired
  ([#823](https://github.com/giscus/giscus/pull/823)).

## 2022-12-10

### Changed

- Fix locale loader to avoid bundling all locales
  ([#818](https://github.com/giscus/giscus/pull/818)).

## 2022-12-04

### Changed

- Improve onboarding config UX
  ([#807](https://github.com/giscus/giscus/pull/807)).

## 2022-12-03

### Changed

- Disable automatic revalidation of the first page
  ([#805](https://github.com/giscus/giscus/pull/805)).

## 2022-11-12

### Fixed

- Fix iframe transparency
  ([#785](https://github.com/giscus/giscus/pull/785),
  [#787](https://github.com/giscus/giscus/pull/787)).

## 2022-11-06

### Fixed

- Fix iframe transparency
  ([#775](https://github.com/giscus/giscus/pull/775),
  [#776](https://github.com/giscus/giscus/pull/776)).

- Fix copy button permission
  ([#774](https://github.com/giscus/giscus/pull/774)).

### Added

- Add locale fallback for `zh-Hant`
  ([#773](https://github.com/giscus/giscus/pull/773)).

- Add locale fallbacks for `zh-Hans` and `gsw`
  ([#772](https://github.com/giscus/giscus/pull/772)).

- Add Thai localization
  ([#771](https://github.com/giscus/giscus/pull/771)).


## 2022-10-26

### Fixed

- Fix `LAUGH` reaction emoji
  ([#746](https://github.com/giscus/giscus/pull/746)).

## 2022-08-13

### Changed

- Minify client script locally
  ([#665](https://github.com/giscus/giscus/pull/665)).

- Default to `preferred_color_scheme` theme
  ([#664](https://github.com/giscus/giscus/pull/664)).

## 2022-07-30

### Added

- Use `giscus:backlink` `<meta>` tag if exists to link to the origin page
  ([#642](https://github.com/giscus/giscus/pull/642)).
- Add styles for `flash` and `flash-error` classes
  ([#639](https://github.com/giscus/giscus/pull/639)).

### Changed

- Self-host MathJax libraries
  ([#637](https://github.com/giscus/giscus/pull/637)).
- Remove iframe-resizer host script
  ([#638](https://github.com/giscus/giscus/pull/638)). \
  **Note:** if you're using
  [giscus-component](https://github.com/giscus/giscus-component), make sure to
  update to v2 and up.
- Safely remove MathJax settings
  ([#641](https://github.com/giscus/giscus/pull/641)).

## 2022-07-24

### Added

- Add Arabic localization
  ([#622](https://github.com/giscus/giscus/pull/622)).

### Changed

- Improve RTL languages support
  ([#626](https://github.com/giscus/giscus/pull/626)).

### Fixed

- Prevent duplicated discussion creation
  ([#623](https://github.com/giscus/giscus/pull/623)).
- Prevent input zoom on iPhone Safari
  ([#625](https://github.com/giscus/giscus/pull/625)).

## 2022-07-23

### Added

- Add Dutch localization
  ([#612](https://github.com/giscus/giscus/pull/612)).
- Add option to use strict title matching
  ([#621](https://github.com/giscus/giscus/pull/621)).

## 2022-06-26

### Added

- Add Portuguese localization
  ([#581](https://github.com/giscus/giscus/pull/581)).

## 2022-05-21

### Added

- Add support for mathematical expressions using MathJax
  ([#548](https://github.com/giscus/giscus/pull/548)).
- Add Tritanopia themes
  ([#549](https://github.com/giscus/giscus/pull/549)).
- Use MathJax 3.2.0 and fix a11y failing to load
  ([#550](https://github.com/giscus/giscus/pull/550)).

## 2022-05-20

### Added

- Add support for Note and Warning with blockquotes
  ([#544](https://github.com/giscus/giscus/pull/544)).

## 2022-04-17

### Fixed

- Minor style fixes
  ([#500](https://github.com/giscus/giscus/pull/500)).

## 2022-04-10

### Fixed

- Remove `<summary>` marker for reactions button on Safari
  ([#486](https://github.com/giscus/giscus/pull/486)).

## 2022-04-09

### Changed

- Use GitHub's Mona loading animation
  ([#477](https://github.com/giscus/giscus/pull/477)).

### Fixed

- Minor style fixes
  ([#484](https://github.com/giscus/giscus/pull/484)).

## 2022-04-06

### Fixed

- Minor style fixes
  ([#475](https://github.com/giscus/giscus/pull/475)).

## 2022-04-02

### Changed

- Add spaces between date parts for Chinese locale
  ([#464](https://github.com/giscus/giscus/pull/464)).

## 2022-03-26

### Changed

- Improve reaction button popover menu
  ([#449](https://github.com/giscus/giscus/pull/449)).

## 2022-03-19

### Added

- Add the option to use `loading="lazy"` on the `<iframe>`
  ([#438](https://github.com/giscus/giscus/pull/438)).

- Append container element id as anchor to the origin URL
  ([#439](https://github.com/giscus/giscus/pull/439)).

## 2022-03-07

### Added

- Add Turkish localization
  ([#420](https://github.com/giscus/giscus/pull/420)).

## 2022-02-20

### Fixed

- Fix new comment creation when comments are ordered by newest-first
  ([#413](https://github.com/giscus/giscus/pull/413)).

- Fix mismatched mutators when comments are ordered by newest-first
  ([#412](https://github.com/giscus/giscus/pull/412)).

## 2022-02-18

### Fixed

- Fix height with top input position or reactions disabled
  ([#409](https://github.com/giscus/giscus/pull/409)).

## 2022-02-16

### Fixed

- Only apply `X-Frame-Options` header on homepage or widget with invalid origin
  ([#403](https://github.com/giscus/giscus/pull/403)).

## 2022-02-09

### Changed

- Resize iframe with `ResizeObserver`
  ([#392](https://github.com/giscus/giscus/pull/392)). \
  **Note:** if you're using
  [giscus-component](https://github.com/giscus/giscus-component), please update
  to the latest version. The previous iframe resizing technique is now
  deprecated and will be removed in the future.

## 2022-02-07

### Fixed

- Fix crash if a comment author user account has been deleted
  ([#391](https://github.com/giscus/giscus/pull/391)).

## 2022-02-06

### Changed

- Expose ids and description in config context
  ([#383](https://github.com/giscus/giscus/pull/383)).

### Fixed

- Fix crash when rendering footnotes
  ([#382](https://github.com/giscus/giscus/pull/382)).

## 2022-01-29

### Added

- Allow setting default comment order in giscus.json
  ([#375](https://github.com/giscus/giscus/pull/375)).

## 2022-01-27

### Added

- Add GitHub Light High Contrast theme
  ([#373](https://github.com/giscus/giscus/pull/373)).

## 2022-01-26

### Added

- Add Russian localization
  ([#355](https://github.com/giscus/giscus/pull/355)).

- Add `inputPosition` option to place the comment box above the comments
  ([#358](https://github.com/giscus/giscus/pull/358)). \
  **Note:** the `gsc-comment-box-separator` class has been removed.

- Add buttons to order comments by oldest and newest
  ([#372](https://github.com/giscus/giscus/pull/372)). \
  **Note:** you'll need to add `--color-btn-selected-bg` and
  `--color-primer-shadow-inset` variables if you use a custom CSS.

## 2022-01-16

### Fixed

- Fix blob-wrapper styles
  ([#347](https://github.com/giscus/giscus/pull/347)).

## 2022-01-15

### Added

- Add Vietnamese localization
  ([#346](https://github.com/giscus/giscus/pull/346)).

## 2022-01-12

### Fixed

- Wrap client script in IIFE
  ([#343](https://github.com/giscus/giscus/pull/343)).

## 2022-01-09

### Added

- Add German localization
  ([#325](https://github.com/giscus/giscus/pull/325)).

### Fixed

- Fix emoji `font-weight` and `font-family`
  ([#324](https://github.com/giscus/giscus/pull/324)).

## 2021-12-23

### Changed

- Minify client script
  ([#322](https://github.com/giscus/giscus/pull/322)).

## 2021-12-15

### Fixed

- Wrap search term in double quotes
  ([#290](https://github.com/giscus/giscus/pull/313)).

## 2021-12-04

### Added

- Add Japanese localization
  ([#290](https://github.com/giscus/giscus/pull/290)).

## 2021-11-23

### Fixed

- Minor fixes
  ([#273](https://github.com/giscus/giscus/pull/273)).

## 2021-11-21

### Added

- Add fixed-width font toggle to `CommentBox`
  ([#213](https://github.com/giscus/giscus/pull/213)).

## 2021-11-17

### Added

- Add Korean localization
  ([#253](https://github.com/giscus/giscus/pull/253)).

### Changed

- Improve French localization
  ([#256](https://github.com/giscus/giscus/pull/256),
  [#257](https://github.com/giscus/giscus/pull/257)).

## 2021-11-14

### Added

- Add Italian localization
  ([#245](https://github.com/giscus/giscus/pull/245)).

- Add Swiss German localization
  ([#242](https://github.com/giscus/giscus/pull/242)).

### Changed

- Ensure `session` param is removed in `origin` URL
  ([#246](https://github.com/giscus/giscus/pull/246)). \
  **Note:** for security measures, user tokens have been reset. Users will
  need to authorize giscus again the next time they log in.

## 2021-11-13

### Added

- Add Spanish localization
  ([#241](https://github.com/giscus/giscus/pull/241)).

## 2021-11-07

### Changed

- Update dependencies
  ([#217](https://github.com/giscus/giscus/pull/217)).

### Fixed

- Minor style fixes
  ([#238](https://github.com/giscus/giscus/pull/238)).

## 2021-11-06

### Added

- Add Dependabot for updates
  ([#215](https://github.com/giscus/giscus/pull/215)).

### Changed

- Use new setup-node caching
  ([#216](https://github.com/giscus/giscus/pull/216)).

### Fixed

- Add `type="button"` to non-submit buttons in `CommentBox`
  ([#212](https://github.com/giscus/giscus/pull/212)).

### Added

- Allow submitting comment with Command+Enter
  ([#211](https://github.com/giscus/giscus/pull/211)).

### Changed

- Show language names in their original language
  ([#210](https://github.com/giscus/giscus/pull/210)).

## 2021-11-01

### Added

- Add Simplified Chinese localization
  ([#206](https://github.com/giscus/giscus/pull/206)).

## 2021-10-26

### Added

- Add French localization
  ([#202](https://github.com/giscus/giscus/pull/202)).

## 2021-10-22

### Fixed

- Fix relative time formatting
  ([#201](https://github.com/giscus/giscus/pull/201)).

### Added

- Add Indonesian localization
  ([#200](https://github.com/giscus/giscus/pull/200)).
- Properly introduce i18n and l10n support
  ([#199](https://github.com/giscus/giscus/pull/199)).

## 2021-10-17

### Added

- Add Romanian localization
  ([#196](https://github.com/giscus/giscus/pull/196)).

## 2021-10-10

### Added

- Use next-translate for i18n and add Polish l10n
  ([#192](https://github.com/giscus/giscus/pull/192)).

## 2021-10-09

### Fixed

- Cache GitHub App installation access tokens using Supabase
  ([#195](https://github.com/giscus/giscus/pull/195)). \
  **Note:** if you self-host giscus, check out the new addition to the
  self-hosting guide to configure token caching on your installation.

## 2021-10-05

### Fixed

- Show API rate limit error message and sign in button
  ([#190](https://github.com/giscus/giscus/pull/190)).

## 2021-10-04

### Fixed

- Log error if `response.data` is `undefined`
  ([#189](https://github.com/giscus/giscus/pull/189)).

## 2021-10-03

### Added

- Add colorblind beta themes
  ([#187](https://github.com/giscus/giscus/pull/187)).

### Changed

- Use primer/primitives v5 as theme base and update looks to match GitHub
  updates ([#186](https://github.com/giscus/giscus/pull/186)).

## 2021-10-02

### Changed

- Improve footnotes rendering
  ([#185](https://github.com/giscus/giscus/pull/185)).
- Improve comment replies pagination
  ([#184](https://github.com/giscus/giscus/pull/184)).
- Statically render the onboarding comment
  ([#183](https://github.com/giscus/giscus/pull/183)).

## 2021-09-30

### Changed

- Move repository to giscus organization
  ([#180](https://github.com/giscus/giscus/pull/180)).

## 2021-09-24

### Added

- Add Vercel banner
  ([#179](https://github.com/giscus/giscus/pull/179)).

## 2021-09-19

### Changed

- Reduce memory usage limit to 192MB
  ([#178](https://github.com/giscus/giscus/pull/178)). \
  **Note:** please consider donating, I've been hitting my free usage limit on
  Vercel 🙁

## 2021-09-18

### Fixed

- Improve accessibility and Lighthouse score
  ([#175](https://github.com/giscus/giscus/pull/175)).
- Fix transparent background
  ([#176](https://github.com/giscus/giscus/pull/176)).

### Changed

- Self-host iframeResizer
  ([#172](https://github.com/giscus/giscus/pull/172),
  [#173](https://github.com/giscus/giscus/pull/173)).
- Upgrade SWR to 1.0
  ([#174](https://github.com/giscus/giscus/pull/174)).
- Get app host from environment variable
  ([#177](https://github.com/giscus/giscus/pull/177)). \
  **Note:** if you self-host giscus, you need to set the
  `NEXT_PUBLIC_GISCUS_APP_HOST` variable so that the domain correctly shows up
  in the configuration step.

## 2021-09-17

### Changed

- Upgrade dependencies
  ([#171](https://github.com/giscus/giscus/pull/171)).

## 2021-08-30

### Changed

- Redirect to app return URL if access is denied by user
  ([#167](https://github.com/giscus/giscus/pull/167)).

## 2021-08-22

### Changed

- Update upvotes and reactions UI to match GitHub's new UI
  ([#164](https://github.com/giscus/giscus/pull/164)). \
  **Note:** this might be a **BREAKING** change if you use a custom CSS.
- Scale font size to 5% of viewport width on tiny screens
  ([#164](https://github.com/giscus/giscus/pull/164)).
- Project configuration fixes
  ([#164](https://github.com/giscus/giscus/pull/164)).

## 2021-08-13

### Changed

- Upgrade Next.js to 11.1
  ([#161](https://github.com/giscus/giscus/pull/161)).
- Use `next/script` to load scripts
  ([#161](https://github.com/giscus/giscus/pull/161)).

## 2021-08-07

### Changed

- Refactor markup and CSS to improve customizability
  ([#158](https://github.com/giscus/giscus/pull/158)). \
  **Note:** this might be a **BREAKING** change if you use a custom CSS.
- Use `Navigator.clipboard` API to copy to clipboard
  ([#159](https://github.com/giscus/giscus/pull/159)).
- Use `stale-while-revalidate` for theme files
  ([#159](https://github.com/giscus/giscus/pull/159)).

## 2021-08-01

### Added

- Add link to giscus-component
  ([#155](https://github.com/giscus/giscus/pull/155)).

## 2021-07-31

### Changed

- Use strict-origin Referrer-Policy to avoid excessive header length
  ([#154](https://github.com/giscus/giscus/pull/154)).
- Improve theme performance on initial load to prevent flashing
  ([#155](https://github.com/giscus/giscus/pull/155)).

## 2021-07-25

### Added

- Add security headers ([#147](https://github.com/giscus/giscus/pull/147)).

### Changed

- Use media query in CSS for `preferred_color_scheme` theme
  ([#146](https://github.com/giscus/giscus/pull/146)).
- The "origin not allowed" error message implemented in
  [#125](https://github.com/giscus/giscus/pull/125) is no longer shown.
  Instead, the browser will now refuse to load the `iframe` as a result of
  the `frame-ancestors` value in the `Content-Security-Policy` header
  ([#147](https://github.com/giscus/giscus/pull/147)).
- Upgrade Next.js to 11 and update other dependencies
  ([#149](https://github.com/giscus/giscus/pull/149)).
- Only apply `iFrameResize` to `.giscus-frame` iframes
  ([#150](https://github.com/giscus/giscus/pull/150)).

### Fixed

- Fix unreadable reactions popup menu due to transparent background in
  Transparent Dark theme
  ([#148](https://github.com/giscus/giscus/pull/148)).

## 2021-07-12

### Added

- Link to GitHub guides for the repository requirements
  ([#142](https://github.com/giscus/giscus/pull/142)).

## 2021-07-11

### Added

- This changelog ([#139](https://github.com/giscus/giscus/pull/139)).
- Add option to emit discussion metadata
  ([#136](https://github.com/giscus/giscus/pull/136)).
- Add support for updating config on-the-fly with `postMessage`
  ([#138](https://github.com/giscus/giscus/pull/138)).

### Fixed

- Minor fixes ([#137](https://github.com/giscus/giscus/pull/137)).
- Fix unchanged theme on initial load
  ([#140](https://github.com/giscus/giscus/pull/140)).
- Fix `sendMessage` example
  ([#141](https://github.com/giscus/giscus/pull/141)).

## 2021-07-10

### Fixed

- Improve theme performance
  ([#135](https://github.com/giscus/giscus/pull/135)).

## 2021-07-09

### Fixed

- Fix memory limit config
  ([#133](https://github.com/giscus/giscus/pull/133)).

## 2021-07-08

### Changed

- Limit functions memory usage to 256MB
  ([#132](https://github.com/giscus/giscus/pull/132)).

## 2021-07-05

### Added

- Add custom CSS support
  ([#128](https://github.com/giscus/giscus/pull/128)).

## 2021-07-04

### Added

- Implement origin checking
  ([#125](https://github.com/giscus/giscus/pull/125)).
- Update GitHub themes and add GitHub Dark High Contrast
  ([#126](https://github.com/giscus/giscus/pull/126)).

### Fixed

- Fix `getFile` service function
  ([#127](https://github.com/giscus/giscus/pull/127)).

## 2021-07-03

### Fixed

- Fix crash on categories with GitHub custom emojis
  ([#122](https://github.com/giscus/giscus/pull/122)).
- Listen to preferred theme changes
  ([#123](https://github.com/giscus/giscus/pull/123)).
- Force repository name to lowercase in discussion query
  ([#124](https://github.com/giscus/giscus/pull/124)).

## 2021-06-13

### Added

- Add Transparent Dark theme
  ([#110](https://github.com/giscus/giscus/pull/110)).

### Changed

- Minor improvements ([#111](https://github.com/giscus/giscus/pull/111)).

## 2021-06-12

### Fixed

- Remove typo from privacy policy
  ([#109](https://github.com/giscus/giscus/pull/109)).

## 2021-06-06

### Added

- Add option to also filter by category
  ([#105](https://github.com/giscus/giscus/pull/105)).

## 2021-06-05

### Fixed

- Fix prerender crash if `getAppAccessToken` fails
  ([#103](https://github.com/giscus/giscus/pull/103)).

## 2021-06-04

### Added

- Add default CSS in client script
  ([#102](https://github.com/giscus/giscus/pull/102)).

### Changed

- Drop passthru GraphQL API
  ([#99)](https://github.com/giscus/giscus/pull/)).

### Fixed

- Fix missing space in "Sign in to"
  ([#101](https://github.com/giscus/giscus/pull/101)).

## 2021-06-02

### Added

- Create self-hosting guide
  ([#98](https://github.com/giscus/giscus/pull/98)).

### Changed

- Reduce bundle size ([#97](https://github.com/giscus/giscus/pull/97)).

## 2021-06-01

### Added

- Implement reactions to discussions
  ([#93](https://github.com/giscus/giscus/pull/93)).
- Add migrating guide ([#94](https://github.com/giscus/giscus/pull/94)).

### Fixed

- Handle bad credentials, invalid state, and log other errors
  ([#95](https://github.com/giscus/giscus/pull/95)).

## 2021-05-30

### Fixed

- Only listen to resize events from the iframe
  ([#89](https://github.com/giscus/giscus/pull/89)).

## 2021-05-29

### Fixed

- Opt-out of FLoC and fix some minor issues
  ([#88](https://github.com/giscus/giscus/pull/88)).

## 2021-05-27

### Fixed

- Minor improvements ([#83](https://github.com/giscus/giscus/pull/83)).

## 2021-05-26

### Changed

- Branding-related updates
  ([#82](https://github.com/giscus/giscus/pull/82)).

## 2021-05-23

### Fixed

- Don't add clipboard button to `js-file-line-container`
  ([#81](https://github.com/giscus/giscus/pull/81)).

## 2021-05-22

### Added

- Reintroduce copy to clipboard button in code blocks
  ([#78](https://github.com/giscus/giscus/pull/78)).

### Fixed

- Minor improvements ([#79](https://github.com/giscus/giscus/pull/79)).

## 2021-05-15

### Added

- Initial release.
- Link to discussions in comments count
  ([#74](https://github.com/giscus/giscus/pull/74)).

### Fixed

- Include forks in search queries
  ([#71](https://github.com/giscus/giscus/pull/71)).
- Remove `fork:true` in discussion query
  ([#73](https://github.com/giscus/giscus/pull/73)).

[keep-a-changelog]: https://keepachangelog.com/en/1.0.0
