# [giscus][giscus]

一个基于 [GitHub Discussions][discussions] 的评论系统。 通过 GitHub 让访问者留下评论和感受在你的网站上！受 [utterances][utterances] 的强烈启发开发本项目。

- [开源][repo]. 🌏
- 没有追踪，没有广告，永远免费。 📡 🚫
- 不需要数据库，所有数据存储在 GitHub Discussions。 :octocat:
- 支持 [自定义主题][creating-custom-themes]! 🌗
- 支持 [多种语言][multiple-languages]。 🌐
- [可扩展性的配置][advanced-usage]。 🔧
- 自动从 GitHub 获取新的评论和编辑。 🔃
- [可以 self-hosted][self-hosting]! 🤳

> **注意:**\
> giscus仍然在活跃开发中，GitHub 也仍然在活跃的开发 Discussions 和它的 API， 因此, giscus 的一些特性可能会随着时间的推移而被破坏或改变。

## 它是怎么运作的

当 gicus 加载时，[GitHub Discussions search API][search-api] 会基于选定的映射关系(URL、`pathname`, `<title>` 等)查找与页面相关联的 discussion。如果找不到匹配的 discussion，giscus bot 会在第一次留下评论或感受时自动创建 discussion。

要发表评论，访问者必须授权 [giscus app][giscus-app] 使用 GitHub OAuth 流[代表他们发表评论][authorization]。或者，访问者可以直接在 GitHub Discussion 评论，你可以在 GitHub 修改这些评论。

[giscus]: https://giscus.app
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

如果你正在用 giscus, 请考虑给 [giscus][repo] 项目star🌟,并且添加 [`giscus`][giscus-topic] topic [到你的仓库][topic-howto]! 🎉

## 高级用法

你可以按照 [高级使用指南][advanced-usage] 添加其他的配置(例如：允许特定的 origins)。

要在 React，Vue，或者 Svelte 中使用 giscus, 请查看 [giscus component library][giscus-component]。

## 迁移

如果你之前使用过基于 GitHub Issues 的评论系统(例如：[utterances][utterances], [gitalk][gitalk])，你可以[将已有的 issues 转换为 discussions][convert]。转换之后，只需要确保 discussion 标题和页面之间的映射关系是正确的，giscus 会自动使用 discussions。

## 使用 giscus 的站点

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**更多!**][giscus-topic]

## 贡献

查看 [CONTRIBUTING.md][contributing]

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

README 有以下几种语言:

[English](README.md) • [French](README.fr.md) • [Indonesian](README.id.md) • [Polish](README.pl.md) • [Romanian](README.ro.md) • [简体中文](README.zh-CN.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
