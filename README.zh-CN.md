# [giscus][giscus]

由 [GitHub Discussions][discussions] 驱动的评论系统。让访客借助 GitHub 在你的网站上留下评论和反应吧！本项目受 [utterances][utterances] 强烈启发。

- [开源][repo]。🌏
- 无跟踪，无广告，永久免费。📡 🚫
- 无需数据库。全部数据均储存在 GitHub Discussions 中。:octocat:
- 支持[自定义主题][creating-custom-themes]！🌗
- 支持[多种语言][multiple-languages]。🌐
- [高度可配置][advanced-usage]。🔧
- 自动从 GitHub 拉取新评论与编辑。🔃
- [可自建服务][self-hosting]！🤳

> **注意：**\
> giscus 仍处于活跃开发中。GitHub 也还在活跃地开发 Discussions 及其 API。因此，一些 giscus 的特性可能随时间损坏或改变。

## 它如何运作

giscus 加载时，会使用 [GitHub Discussions 搜索 API][search-api] 根据选定的映射方式（如 URL、`pathname`、`<title>` 等）来查找与当前页面关联的 discussion。如果找不到匹配的 discussion，giscus bot 就会在第一次有人留下评论或回应时自动创建一个 discussion。

要评论，访客必须按 GitHub OAuth 流程授权 [giscus app][giscus-app] [代表他发帖][authorization]。或者访客也可以直接在 GitHub Discussion 里评论。你可以在 GitHub 上管理评论。

[giscus]: https://giscus.app/zh-CN
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

如果你使用 giscus，请考虑[在 GitHub 上 star 🌟 giscus][repo] 并[为你的仓库][topic-howto]添加 [`giscus`][giscus-topic] 话题！🎉

## 高级用法

你可以依照[高级用法指南][advanced-usage]添加额外配置（例如允许特定来源）。

要在 React、Vue 和 Svelte 中使用 giscus，请查看 [giscus 组件库][giscus-component]。

## 迁移

如果你曾经使用过其它利用 GitHub Issue 的评论系统（如 [utterances][utterances]、[gitalk][gitalk]），你可[把已有的 issue 转换成 discussion][convert]。转换后，只要确保 discussion 标题与页面的映射关系正确，giscus 就会自动使用这些 discussion。

## 正使用 giscus 的网站

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**还有更多！**][giscus-topic]

## 贡献

请查看 [CONTRIBUTING.md][contributing]。

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

本 README 有以下语言版本：

- [Arabic (العربية)](README.ar.md)
- [Deutsch](README.de.md)
- [Deutsch (Schweiz)](README.gsw.md)
- [English](README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Indonesia](README.id.md)
- [Italiano](README.it.md)
- [日本語](README.ja.md)
- [한국어](README.ko.md)
- [Nederlands](README.nl.md)
- [Polski](README.pl.md)
- [Português](README.pt.md)
- [Română](README.ro.md)
- [Русский](README.ru.md)
- [Türkçe](README.tr.md)
- [Tiếng Việt](README.vi.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)

[![由 Vercel 驱动](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
