# [giscus][giscus]

Система комментариев на основе [GitHub Discussions][discussions].
Позволяет посетителям оставлять свои реакции и комментарии на сайте с помощью GitHub! Разработка была сильно вдохновлена системой комментариев [utterances][utterances].

- [Открытый исходный код][repo]. 🌏
- Бесплатно. Без отслеживания действий и баннеров. 📡 🚫
- Не требуется сторонняя база данных. Вся информация хранится в GitHub Discussions. :octocat:
- Поддержка [собственных тем оформления][creating-custom-themes]! 🌗
- Поддержка [множества языков перевода][multiple-languages]. 🌐
- [Широкие возможности настройки][advanced-usage]. 🔧
- Автоматическая загрузка новых комментариев и изменений из GitHub. 🔃
- [Может быть размещен самостоятельно][self-hosting]! 🤳

> **Note:**\
> giscus находится в фазе активной разработки. GitHub так же активно развивает Discussions и его API. Поэтому некоторые возможности giscus могут ломаться или меняться со временем.

## Принцип работы

После загрузки giscus [GitHub Discussions search API][search-api] используется для поиска обсуждений, связанных с текущей страницей на основе выбранного типа связи (URL, `pathname`, `<title>` и прочее).
Если обсуждение не было найдено, то бот giscus автоматически создаст новое обсуждение, как только кто-нибудь впервые оставит комментарий или реакцию.

Чтобы добавить новый комментарий пользователи должны авторизовать [giscus app][giscus-app] для [опубликования комментариев от их имени][authorization] с помощью GitHub OAuth.
Кроме того, посетители могут оставлять комментарии напрямую в GitHub Discussion. Вы можете модерировать эти комментарии через GitHub.

[giscus]: https://giscus.app/ru
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

Если вы используете giscus, пожалуйста, [поставьте 🌟 giscus на GitHub][repo] и добавьте [`giscus`][giscus-topic] тэг [в ваш репозиторий][topic-howto]! 🎉

## Расширенные настройки

В giscus доступны [расширенные настройки][advanced-usage], например, фильтрация по window.origin.

Для использования giscus с React, Vue, или Svelte обратитесь к [библиотеке компонентов giscus][giscus-component].

## Миграция

Если вы ранее использовали другие системы, использующие GitHub Issues (например, [utterances][utterances], [gitalk][gitalk]), вы можете [сконвертировать запросы в обсуждения][convert].
После конвертации убедитесь в соответствии между названиями обсуждений и страницами сайта, тогда giscus автоматически найдет и отобразит эти обсуждения.

## Сайты, использующие giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Сотрудничество

Подробности: [CONTRIBUTING.md][contributing]

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

Этот README доступен на следующих языках:

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
