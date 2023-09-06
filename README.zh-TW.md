# [giscus][giscus]

由 [GitHub Discussions][discussions] 驅動的留言系統。讓訪客借助 GitHub 在你的網站上留言和留下反應吧！本專案很大一部份是受 [utterances][utterances] 啟發。

- [開放原始碼][repo]。🌏
- 無追蹤，無廣告，永久免費。📡 🚫
- 無需資料庫。全部資料均儲存在 GitHub Discussions 中。:octocat:
- 支援[自訂佈景主題][creating-custom-themes]！🌗
- 支援[多語言][multiple-languages]。🌐
- [高度彈性][advanced-usage]。🔧
- 自動從 GitHub 取得新留言（包含編輯）。🔃
- [可自架伺服器][self-hosting]！🤳

> **注意：**\
> giscus 仍活躍開發中。GitHub 也還在活躍地開發 Discussions 及其 API。因此，一些 giscus 的功能可能將隨時間而無法使用或改變。

## 運作原理

giscus 載入時，會使用 [GitHub Discussions 搜尋 API][search-api] 根據選定的搜尋對應方式（如 URL、`pathname`、`<title>` 等）來搜尋與目前頁面相關的 discussion。如果找不到符合的 discussion，giscus bot 就會在第一次有人留言或反應時自動建立一則 discussion。

如要留言，訪客必須按照 GitHub OAuth 流程授權 [giscus app][giscus-app] [代表他發文][authorization]。或者訪客也可以直接在 GitHub Discussion 裡面留言。你可以在 GitHub 上管理留言。

[giscus]: https://giscus.app/zh-TW
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

如果你使用了 giscus，請考慮[在 GitHub 上 star 🌟 giscus][repo] 並[為你的repo][topic-howto] 加上 [`giscus`][giscus-topic] topic！🎉

## 進階用法

你可以依照[進階用法指南][advanced-usage]添加其他設定（例如允許特定來源）。

要在 React、Vue 和 Svelte 中使用 giscus，請查看 [giscus components][giscus-component]。

## 轉移

如果你曾經使用過其它利用 GitHub Issue 的留言系統（如 [utterances][utterances]、[gitalk][gitalk]），你可以[把已有的 issue 轉換成 discussion][convert]。轉換後，只要確保 discussion 標題與頁面的對應關係正確，giscus 就會自動使用這些 discussion。

## 正使用 giscus 的網站

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**還有更多！**][giscus-topic]

## 貢獻

請查看 [CONTRIBUTING.md][contributing]。

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

此 README 有以下語言版本：

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

[![由 Vercel 技術支援](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
