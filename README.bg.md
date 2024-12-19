# [giscus][giscus]

Система за коментари, базирана на [GitHub Discussions][discussions]. Позволете на посетителите да оставят коментари и реакции на вашия уебсайт чрез GitHub! Силно вдъхновена от [utterances][utterances].

- [Отворен код][repo]. 🌏
- Без проследяване, без реклами, винаги безплатна. 📡 🚫
- Не е необходима база данни. Всички данни се съхраняват в GitHub Discussions. :octocat:
- Поддържа [персонализирани теми][creating-custom-themes]! 🌗
- Поддържа [множество езици][multiple-languages]. 🌐
- [Изключително конфигурируема][advanced-usage]. 🔧
- Автоматично извлича нови коментари и редакции от GitHub. 🔃
- [Може да се хоства самостоятелно][self-hosting]! 🤳

> **Забележка**
> giscus все още е в активна разработка. GitHub също активно разработва Discussions и неговото API. Следователно някои функции на giscus може да се променят или да спрат да работят с времето.

## Как работи

Когато giscus се зареди, [GitHub Discussions API за търсене][search-api] се използва за намиране на дискусията, свързана със страницата, въз основа на избрано съответствие (URL, `pathname`, `<title>` и т.н.). Ако не може да бъде намерена съответстваща дискусия, ботът на giscus автоматично ще създаде дискусия при първия път, когато някой остави коментар или реакция.

За да коментират, посетителите трябва да разрешат на [приложението giscus][giscus-app] да [публикува от тяхно име][authorization], използвайки GitHub OAuth процеса. Алтернативно, посетителите могат да коментират директно в GitHub дискусията. Можете да модерирате коментарите в GitHub.

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

Ако използвате giscus, обмислете да [дадете звезда 🌟 на giscus в GitHub][repo] и да добавите темата [`giscus`][giscus-topic] [към вашето хранилище][topic-howto]! 🎉

## Разширена употреба

Можете да добавите допълнителни конфигурации (напр. разрешаване на специфични origins), като следвате [ръководството за разширена употреба][advanced-usage].

За да използвате giscus с React, Vue или Svelte, вижте [библиотеката с компоненти на giscus][giscus-component].

## Мигриране

Ако преди сте използвали други системи, които използват GitHub Issues (напр. [utterances][utterances], [gitalk][gitalk]), можете да [конвертирате съществуващите issues в дискусии][convert]. След конвертирането просто се уверете, че съответствието между заглавията на дискусиите и страниците е правилно, и giscus автоматично ще използва дискусиите.

## Сайтове използващи giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**и много други!**][giscus-topic]

## Допринасяне

Вижте [CONTRIBUTING.md][contributing]

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

Това README е достъпно на:

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
