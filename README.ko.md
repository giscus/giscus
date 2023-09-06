# [giscus][giscus]

[GitHub Discussions][discussions]로 작동하는 댓글 시스템입니다. GitHub를 이용해 방문자가 댓글과 반응을 웹사이트에 남기게 해보세요! [utterances][utterances]에서 큰 영감을 받았습니다.

- [오픈 소스][repo]입니다. 🌏
- 사용자 추적도, 광고도 없습니다. 항상 무료입니다. 📡 🚫
- 데이터베이스가 필요 없습니다. 모든 데이터는 GitHub Discussions에 저장됩니다. :octocat:
- [커스텀 테마 제작][creating-custom-themes]을 지원합니다! 🌗
- [여러 언어][multiple-languages]를 지원합니다. 🌐
- [여러 설정][advanced-usage]을 제공합니다. 🔧
- 자동으로 GitHub에서 새로운 코멘트와 수정사항을 반영합니다. 🔃
- [셀프 호스팅이 가능합니다][self-hosting]! 🤳

> **주의:**\
> giscus는 활발히 개발되고 있습니다. GitHub에서도 Discussions와 그 API를 활발하게 개발하고 있습니다. 따라서 시간이 지나면서 giscus의 일부 기능이 작동하지 않거나 변경될 수 있습니다.

## 작동 원리

giscus가 로드되면, [GitHub Discussions 검색 API][search-api]를 사용하여 선택된 매핑 방법(URL, `pathname`, `<title>`, etc.)에 따라 페이지와 연관된 Discussion을 찾습니다. 일치하는 discussion이 없으면 giscus 봇은 누군가 처음으로 댓글이나 반응이 남길 때 자동으로 discussion을 생성합니다.

댓글을 남기기 위해 방문자는 GitHub OAuth를 이용하여 [giscus app][giscus-app]이 [대신 게시할 수 있도록][authorization] 권한을 부여해야합니다. 혹은 방문자들은 GitHub Discussion에서 직접 댓글을 달 수도 있습니다. GitHub에서 댓글을 관리할 수 있습니다.

[giscus]: https://giscus.app/ko
[discussions]: https://docs.github.com/en/discussions
[utterances]: https://github.com/utterance/utterances
[repo]: https://github.com/giscus/giscus
[advanced-usage]: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
[creating-custom-themes]: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme
[multiple-languages]: https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#adding-localizations
[self-hosting]: https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md
[search-api]: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search
[giscus-app]: https://github.com/apps/giscus
[authorization]: https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps

<!-- configuration -->

giscus를 사용한다면, [giscus GitHub 저장소 스타🌟를 눌러 주시고][repo][저장소의 토픽에][topic-howto] [`giscus`][giscus-topic]를 추가해 주세요! 🎉

## 고급 사용법

[고급 사용법 가이드][advanced-usage]를 따라서 추가적인 설정(예를 들면, 특정 origin 허가하기)을 할 수 있습니다.

React, Vue, 또는 Svelte와 함께 giscus를 사용하고 싶다면, [giscus component library][giscus-component]를 확인해보세요.

## 전환하기

GitHub Issues를 활용한 다른 시스템(예를 들면, [utterances][utterances], [gitalk][gitalk])을 사용하고 있다면 [이미 생성된 issue를 discussion으로 변환할 수 있습니다][convert]. 변환 후에 discussion의 제목과 페이지 간의 매핑이 올바른지 확인하세요. 그러면 giscus가 자동으로 해당 discussion을 사용합니다.

## giscus를 사용하는 사이트

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## 기여하기

[CONTRIBUTING.md][contributing]를 참고하세요.

[giscus-component]: https://github.com/giscus/giscus-component
[repo]: https://github.com/giscus/giscus
[giscus-topic]: https://github.com/topics/giscus
[topic-howto]: https://docs.github.com/en/github/administering-a-repository/classifying-your-repository-with-topics
[advanced-usage]: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
[utterances]: https://github.com/utterance/utterances
[gitalk]: https://github.com/gitalk/gitalk
[convert]: https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions#converting-an-issue-to-a-discussion
[laymonage-website]: https://laymonage.com/posts/giscus
[os-phil-opp]: https://os.phil-opp.com
[statsandr]: https://statsandr.com
[techdebtburndown]: https://techdebtburndown.com
[contributing]: https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md

<!-- end -->

---

이 README는 다음 언어로도 제공됩니다. :

- [Arabic (العربية)](README.ar.md)
- [Català](README.ca.md)
- [Deutsch](README.de.md)
- [English](README.md)
- [Esperanto](README.eo.md)
- [Español](README.es.md)
- [Persian (فارسی)](README.fa.md)
- [Français](README.fr.md)
- [עברית](README.he.md)
- [Indonesia](README.id.md)
- [Italiano](README.it.md)
- [日本語](README.ja.md)
- [ភាសាខ្មែរ](README.kh.md)
- [한국어](README.ko.md)
- [Nederlands](README.nl.md)
- [Polski](README.pl.md)
- [Português](README.pt.md)
- [Română](README.ro.md)
- [Русский](README.ru.md)
- [ภาษาไทย](README.th.md)
- [Türkçe](README.tr.md)
- [Tiếng Việt](README.vi.md)
- [Українська](README.uk.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
