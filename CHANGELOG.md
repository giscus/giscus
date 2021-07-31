# changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog][keep-a-changelog]. As of this
writing, this is a rolling-release project without any meaningful versioning
whatsoever. Tags/releases may be created for the sole purpose of documenting
major updates to the project.

## 2021-07-31

### changed

- Use strict-origin Referrer-Policy to avoid excessive header length
  ([#154](https://github.com/laymonage/giscus/pull/154)).

## 2021-07-25

### added

- Add security headers ([#147](https://github.com/laymonage/giscus/pull/147)).

### changed

- Use media query in CSS for `preferred_color_scheme` theme
  ([#146](https://github.com/laymonage/giscus/pull/146)).
- The "origin not allowed" error message implemented in
  [#125](https://github.com/laymonage/giscus/pull/125) is no longer shown.
  Instead, the browser will now refuse to load the `iframe` as a result of
  the `frame-ancestors` value in the `Content-Security-Policy` header
  ([#147](https://github.com/laymonage/giscus/pull/147)).
- Upgrade Next.js to 11 and update other dependencies
  ([#149](https://github.com/laymonage/giscus/pull/149)).
- Only apply `iFrameResize` to `.giscus-frame` iframes
  ([#150](https://github.com/laymonage/giscus/pull/150)).

### fixed

- Fix unreadable reactions popup menu due to transparent background in
  Transparent Dark theme
  ([#148](https://github.com/laymonage/giscus/pull/148)).

## 2021-07-12

### added

- Link to GitHub guides for the repository requirements
  ([#142](https://github.com/laymonage/giscus/pull/142)).

## 2021-07-11

### added

- This changelog ([#139](https://github.com/laymonage/giscus/pull/139)).
- Add option to emit discussion metadata
  ([#136](https://github.com/laymonage/giscus/pull/136)).
- Add support for updating config on-the-fly with `postMessage`
  ([#138](https://github.com/laymonage/giscus/pull/138)).

### fixed

- Minor fixes ([#137](https://github.com/laymonage/giscus/pull/137)).
- Fix unchanged theme on initial load
  ([#140](https://github.com/laymonage/giscus/pull/140)).
- Fix `sendMessage` example
  ([#141](https://github.com/laymonage/giscus/pull/141)).

## 2021-07-10

### fixed

- Improve theme performance
  ([#135](https://github.com/laymonage/giscus/pull/135)).

## 2021-07-09

### fixed

- Fix memory limit config
  ([#133](https://github.com/laymonage/giscus/pull/133)).

## 2021-07-08

### changed

- Limit functions memory usage to 256MB
  ([#132](https://github.com/laymonage/giscus/pull/132)).

## 2021-07-05

### added

- Add custom CSS support
  ([#128](https://github.com/laymonage/giscus/pull/128)).

## 2021-07-04

### added

- Implement origin checking
  ([#125](https://github.com/laymonage/giscus/pull/125)).
- Update GitHub themes and add GitHub Dark High Contrast
  ([#126](https://github.com/laymonage/giscus/pull/126)).

### fixed

- Fix `getFile` service function
  ([#127](https://github.com/laymonage/giscus/pull/127)).

## 2021-07-03

### fixed

- Fix crash on categories with GitHub custom emojis
  ([#122](https://github.com/laymonage/giscus/pull/122)).
- Listen to preferred theme changes
  ([#123](https://github.com/laymonage/giscus/pull/123)).
- Force repository name to lowercase in discussion query
  ([#124](https://github.com/laymonage/giscus/pull/124)).

## 2021-06-13

### added

- Add Transparent Dark theme
  ([#110](https://github.com/laymonage/giscus/pull/110)).

### changed

- Minor improvements ([#111](https://github.com/laymonage/giscus/pull/111)).

## 2021-06-12

### fixed

- Remove typo from privacy policy
  ([#109](https://github.com/laymonage/giscus/pull/109)).

## 2021-06-06

### added

- Add option to also filter by category
  ([#105](https://github.com/laymonage/giscus/pull/105)).

## 2021-06-05

### fixed

- Fix prerender crash if `getAppAccessToken` fails
  ([#103](https://github.com/laymonage/giscus/pull/103)).

## 2021-06-04

### added

- Add default CSS in client script
  ([#102](https://github.com/laymonage/giscus/pull/102)).

### changed

- Drop passthru GraphQL API
  ([#99)](https://github.com/laymonage/giscus/pull/)).

### fixed

- Fix missing space in "Sign in to"
  ([#101](https://github.com/laymonage/giscus/pull/101)).

## 2021-06-02

### added

- Create self-hosting guide
  ([#98](https://github.com/laymonage/giscus/pull/98)).

### changed

- Reduce bundle size ([#97](https://github.com/laymonage/giscus/pull/97)).

## 2021-06-01

### added

- Implement reactions to discussions
  ([#93](https://github.com/laymonage/giscus/pull/93)).
- Add migrating guide ([#94](https://github.com/laymonage/giscus/pull/94)).

### fixed

- Handle bad credentials, invalid state, and log other errors
  ([#95](https://github.com/laymonage/giscus/pull/95)).

## 2021-05-30

### fixed

- Only listen to resize events from the iframe
  ([#89](https://github.com/laymonage/giscus/pull/89)).

## 2021-05-29

### fixed

- Opt-out of FLoC and fix some minor issues
  ([#88](https://github.com/laymonage/giscus/pull/88)).


## 2021-05-27

### fixed

- Minor improvements ([#83](https://github.com/laymonage/giscus/pull/83)).

## 2021-05-26

### changed

- Branding-related updates
  ([#82](https://github.com/laymonage/giscus/pull/82)).

## 2021-05-23

### fixed

- Don't add clipboard button to `js-file-line-container`
  ([#81](https://github.com/laymonage/giscus/pull/81)).

## 2021-05-22

### added

- Reintroduce copy to clipboard button in code blocks
  ([#78](https://github.com/laymonage/giscus/pull/78)).

### fixed

- Minor improvements ([#79](https://github.com/laymonage/giscus/pull/79)).

## 2021-05-15

### added

- Initial release.
- Link to discussions in comments count
  ([#74](https://github.com/laymonage/giscus/pull/74)).

### fixed

- Include forks in search queries
  ([#71](https://github.com/laymonage/giscus/pull/71)).
- Remove `fork:true` in discussion query
  ([#73](https://github.com/laymonage/giscus/pull/73)).

[keep-a-changelog]: https://keepachangelog.com/en/1.0.0
