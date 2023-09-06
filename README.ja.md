# [giscus][giscus]

[GitHub Discussions][discussions]を利用したコメントシステムです。サイトの訪問者にGitHubを利用したコメントとリアクションを提供しましょう！このプロジェクトは[utterances][utterances]を元に開発されています。

- [オープンソース][repo]。 🌏
- 追跡や広告は無く、無料です。 📡 🚫
- データベースは不要です。全データはGitHub Discussionsに保管されます。 :octocat:
- [カスタムテーマ][creating-custom-themes]に対応! 🌗
- [複数の言語][multiple-languages]に対応。 🌐
- [詳細な設定項目][advanced-usage]。 🔧
- 自動的に新しいコメントと編集をGitHubから取得します。 🔃
- [自己ホスティングが可能][self-hosting]! 🤳

> **補足**\
> giscusは現在も活発に開発されています。GitHubも同様にDiscussionsとそのAPIを活発に開発しています。そのため、giscusの機能の一部が正常に動作しなくなったり、機能の変更がされる場合があります。

## 仕組み

giscus読み込み時に[GitHub Discussions search API][search-api]を利用してページ連携設定(URL、パス、`<title>`など)に基づき紐づけられたDiscussionを読み込みます。もし紐づけられたDiscussionがない場合、giscusは最初にコメントやリアクションが為された際に自動的にDiscussionを作成します。

コメントするには、サイト訪問者はGitHub OAuth flowを利用して[giscus app][giscus-app]を[自分の代わりに投稿][authorization]させるために連携させる必要があります。もしくは、サイト訪問者はGitHub Discussionに直接コメントを記述することもできます。投稿者と所有者は、GitHub上でコメントを削除することができます。

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

giscusを利用する場合は、[GitHub上のgiscusにスター🌟を付けたり][repo]、[`giscus`][giscus-topic]トピックを[リポジトリに設定][topic-howto]していただけますと幸いです! 🎉

## 上級者向け機能

追加の設定(特定オリジンのみの許可など)。[上級者向け機能ガイド][advanced-usage]をご参照ください。

giscusをReactやVue、Svelteで利用する場合は[giscusコンポーネントライブラリ][giscus-component]をご参照ください。

## 移行

もし以前GitHub Issuesを利用したツール([utterances][utterances]や[gitalk][gitalk]など)を利用していた場合、[既存のIssueをDiscussionに変換する][convert]事が出来ます。返還後はdiscussionタイトルが連携設定に基づき正しく設定されていることを確認してください。その後は、giscusが自動的にdiscussionを利用します。

## giscusを利用しているサイト

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**他多数**][giscus-topic]

## 頒布

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

このREADMEは下記の言語も存在します:

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
