# changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog]. As of this
writing, this is a rolling-release project without any meaningful versioning
whatsoever. Tags/releases may be created for the sole purpose of documenting
major updates to the project.

## 2021-10-02

### changed

- Improve comment replies pagination
  ([#184](https://github.com/giscus/giscus/pull/184)).
- Statically render the onboarding comment
  ([#183](https://github.com/giscus/giscus/pull/183)).

## 2021-09-30

### changed

- Move repository to giscus organization
  ([#180](https://github.com/giscus/giscus/pull/180)).

## 2021-09-24

### added

- Add Vercel banner
  ([#179](https://github.com/giscus/giscus/pull/179)).

## 2021-09-19

### changed

- Reduce memory usage limit to 192MB
  ([#178](https://github.com/giscus/giscus/pull/178)). \
  **Note:** please consider donating, I've been hitting my free usage limit on
  Vercel 🙁

## 2021-09-18

### fixed

- Improve accessibility and Lighthouse score
  ([#175](https://github.com/giscus/giscus/pull/175)).
- Fix transparent background
  ([#176](https://github.com/giscus/giscus/pull/176)).

### changed

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

### changed

- Upgrade dependencies
  ([#171](https://github.com/giscus/giscus/pull/171)).

## 2021-08-30

### changed

- Redirect to app return URL if access is denied by user
  ([#167](https://github.com/giscus/giscus/pull/167)).

## 2021-08-22

### changed

- Update upvotes and reactions UI to match GitHub's new UI
  ([#164](https://github.com/giscus/giscus/pull/164)). \
  **Note:** this might be a **BREAKING** change if you use a custom CSS.
- Scale font size to 5% of viewport width on tiny screens
  ([#164](https://github.com/giscus/giscus/pull/164)).
- Project configuration fixes
  ([#164](https://github.com/giscus/giscus/pull/164)).

## 2021-08-13

### changed

- Upgrade Next.js to 11.1
  ([#161](https://github.com/giscus/giscus/pull/161)).
- Use `next/script` to load scripts
  ([#161](https://github.com/giscus/giscus/pull/161)).

## 2021-08-07

### changed

- Refactor markup and CSS to improve customizability
  ([#158](https://github.com/giscus/giscus/pull/158)). \
  **Note:** this might be a **BREAKING** change if you use a custom CSS.
- Use `Navigator.clipboard` API to copy to clipboard
  ([#159](https://github.com/giscus/giscus/pull/159)).
- Use `stale-while-revalidate` for theme files
  ([#159](https://github.com/giscus/giscus/pull/159)).

## 2021-08-01

### added

- Add link to giscus-component
  ([#155](https://github.com/giscus/giscus/pull/155)).

## 2021-07-31

### changed

- Use strict-origin Referrer-Policy to avoid excessive header length
  ([#154](https://github.com/giscus/giscus/pull/154)).
- Improve theme performance on initial load to prevent flashing
  ([#155](https://github.com/giscus/giscus/pull/155)).

## 2021-07-25

### added

- Add security headers ([#147](https://github.com/giscus/giscus/pull/147)).

### changed

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

### fixed

- Fix unreadable reactions popup menu due to transparent background in
  Transparent Dark theme
  ([#148](https://github.com/giscus/giscus/pull/148)).

## 2021-07-12

### added

- Link to GitHub guides for the repository requirements
  ([#142](https://github.com/giscus/giscus/pull/142)).

## 2021-07-11

### added

- This changelog ([#139](https://github.com/giscus/giscus/pull/139)).
- Add option to emit discussion metadata
  ([#136](https://github.com/giscus/giscus/pull/136)).
- Add support for updating config on-the-fly with `postMessage`
  ([#138](https://github.com/giscus/giscus/pull/138)).

### fixed

- Minor fixes ([#137](https://github.com/giscus/giscus/pull/137)).
- Fix unchanged theme on initial load
  ([#140](https://github.com/giscus/giscus/pull/140)).
- Fix `sendMessage` example
  ([#141](https://github.com/giscus/giscus/pull/141)).

## 2021-07-10

### fixed

- Improve theme performance
  ([#135](https://github.com/giscus/giscus/pull/135)).

## 2021-07-09

### fixed

- Fix memory limit config
  ([#133](https://github.com/giscus/giscus/pull/133)).

## 2021-07-08

### changed

- Limit functions memory usage to 256MB
  ([#132](https://github.com/giscus/giscus/pull/132)).

## 2021-07-05

### added

- Add custom CSS support
  ([#128](https://github.com/giscus/giscus/pull/128)).

## 2021-07-04

### added

- Implement origin checking
  ([#125](https://github.com/giscus/giscus/pull/125)).
- Update GitHub themes and add GitHub Dark High Contrast
  ([#126](https://github.com/giscus/giscus/pull/126)).

### fixed

- Fix `getFile` service function
  ([#127](https://github.com/giscus/giscus/pull/127)).

## 2021-07-03

### fixed

- Fix crash on categories with GitHub custom emojis
  ([#122](https://github.com/giscus/giscus/pull/122)).
- Listen to preferred theme changes
  ([#123](https://github.com/giscus/giscus/pull/123)).
- Force repository name to lowercase in discussion query
  ([#124](https://github.com/giscus/giscus/pull/124)).

## 2021-06-13

### added

- Add Transparent Dark theme
  ([#110](https://github.com/giscus/giscus/pull/110)).

### changed

- Minor improvements ([#111](https://github.com/giscus/giscus/pull/111)).

## 2021-06-12

### fixed

- Remove typo from privacy policy
  ([#109](https://github.com/giscus/giscus/pull/109)).

## 2021-06-06

### added

- Add option to also filter by category
  ([#105](https://github.com/giscus/giscus/pull/105)).

## 2021-06-05

### fixed

- Fix prerender crash if `getAppAccessToken` fails
  ([#103](https://github.com/giscus/giscus/pull/103)).

## 2021-06-04

### added

- Add default CSS in client script
  ([#102](https://github.com/giscus/giscus/pull/102)).

### changed

- Drop passthru GraphQL API
  ([#99)](https://github.com/giscus/giscus/pull/)).

### fixed

- Fix missing space in "Sign in to"
  ([#101](https://github.com/giscus/giscus/pull/101)).

## 2021-06-02

### added

- Create self-hosting guide
  ([#98](https://github.com/giscus/giscus/pull/98)).

### changed

- Reduce bundle size ([#97](https://github.com/giscus/giscus/pull/97)).

## 2021-06-01

### added

- Implement reactions to discussions
  ([#93](https://github.com/giscus/giscus/pull/93)).
- Add migrating guide ([#94](https://github.com/giscus/giscus/pull/94)).

### fixed

- Handle bad credentials, invalid state, and log other errors
  ([#95](https://github.com/giscus/giscus/pull/95)).

## 2021-05-30

### fixed

- Only listen to resize events from the iframe
  ([#89](https://github.com/giscus/giscus/pull/89)).

## 2021-05-29

### fixed

- Opt-out of FLoC and fix some minor issues
  ([#88](https://github.com/giscus/giscus/pull/88)).


## 2021-05-27

### fixed

- Minor improvements ([#83](https://github.com/giscus/giscus/pull/83)).

## 2021-05-26

### changed

- Branding-related updates
  ([#82](https://github.com/giscus/giscus/pull/82)).

## 2021-05-23

### fixed

- Don't add clipboard button to `js-file-line-container`
  ([#81](https://github.com/giscus/giscus/pull/81)).

## 2021-05-22

### added

- Reintroduce copy to clipboard button in code blocks
  ([#78](https://github.com/giscus/giscus/pull/78)).

### fixed

- Minor improvements ([#79](https://github.com/giscus/giscus/pull/79)).

## 2021-05-15

### added

- Initial release.
- Link to discussions in comments count
  ([#74](https://github.com/giscus/giscus/pull/74)).

### fixed

- Include forks in search queries
  ([#71](https://github.com/giscus/giscus/pull/71)).
- Remove `fork:true` in discussion query
  ([#73](https://github.com/giscus/giscus/pull/73)).

[keep-a-changelog]: https://keepachangelog.com/en/1.0.0
