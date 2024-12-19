# [giscus][giscus]

[GitHub Discussions][discussions]を利用したコメントシステムです。サイト訪問者にGitHubを利用したコメント・リアクション機能を提供しましょう！このプロジェクトは[utterances][utterances]から着想を得ています。

- [オープンソース][repo]。 🌏
- 追跡や広告は無く、無料です。 📡 🚫
- データベースは不要です。全データはGitHub Discussionsに保管されます。 :octocat:
- [カスタムテーマ][creating-custom-themes]に対応! 🌗
- [多言語][multiple-languages]に対応。 🌐
- [詳細な設定項目][advanced-usage]。 🔧
- 自動的に新しいコメントと編集内容をGitHubから取得します。 🔃
- [セルフホスティングが可能][self-hosting]! 🤳

> **注記**\
> giscusは現在も活発に開発が行われています。GitHubも同様にDiscussionsとそのAPIの開発を活発に行っています。そのため、giscusの機能の一部が正常に動作しなくなったり、変更されたりする場合があります。

## 仕組み

giscus読み込み時に[GitHub Discussions search API][search-api]を利用してページ連携設定(URL、パス、`<title>`など)に基づき紐づけられたDiscussionを読み込みます。もし紐づけられたDiscussionがない場合、giscusは最初にコメントやリアクションが為された際に自動的にDiscussionを作成します。

サイト訪問者のコメントは[giscus app][giscus-app]によって[訪問者に代わって投稿][authorization]されるために、GitHub OAuth flowを利用した連携設定が行われる必要があります。あるいは、サイト訪問者はGitHub Discussionに直接コメントすることも可能です。コメントはGitHub上で管理することができます。

[giscus]: https://giscus.app/ja
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

giscusを利用する場合は、[giscusにGitHubスター🌟を付けたり][repo]、[`giscus`][giscus-topic]を[リポジトリのトピックに追加][topic-howto]したりしていただけると幸いです! 🎉

## 上級者向け機能

追加の設定(特定オリジンのみの許可など)については[上級者向け機能ガイド][advanced-usage]をご参照ください。

giscusをReactやVue、Svelteで利用する場合は[giscusコンポーネントライブラリ][giscus-component]をご参照ください。

## 移行

もし以前GitHub Issuesを利用したツール([utterances][utterances]や[gitalk][gitalk]など)を使用していた場合、[既存のIssueをDiscussionに移管する][convert]事が出来ます。移管後はDiscussionタイトルが連携設定に基づき正しく設定されていることを確認してください。その後は、giscusが自動的にDiscussionを利用します。

## giscusを利用しているサイト

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**他多数**][giscus-topic]

## 貢献するには

[CONTRIBUTING.md][contributing]をご参照ください。

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

READMEは下記の言語で参照できます:

- [Arabic (العربية)](README.ar.md)
- [български](README.bg.md)
- [Català](README.ca.md)
- [Čeština](README.cs.md)
- [Dansk](README.da.md)
- [Deutsch](README.de.md)
- [English](README.md)
- [Esperanto](README.eo.md)
- [Español](README.es.md)
- [Euskera](README.eu.md)
- [Persian (فارسی)](README.fa.md)
- [Français](README.fr.md)
- [Ελληνικά](README.gr.md)
- [Srpsko-Hrvatski (BCMS)](README.hbs.md)
- [עברית](README.he.md)
- [Magyar](README.hu.md)
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
- [O'zbek](README.uz.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
