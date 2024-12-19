# [giscus][giscus]

Система коментарів на основі [GitHub Discussions][discussions].
Дає змогу користувачам залишати свої реакції та коментарі на сайті за допомогою GitHub! Основним чином розробка була натхненна системою коментарів [utterances][utterances].

- [Відкритий код][repo]. 🌏
- Безкоштовно. Без відслідковування дій та банерів. 📡 🚫
- Не потребує сторонньої бази даних. Вся інформація зберігається у GitHub Discussions. :octocat:
- Підтримка [власних тем оформлення][creating-custom-themes]! 🌗
- Підтримка [багатомовності][multiple-languages]. 🌐
- [Можливість гнучких налаштувань][advanced-usage]. 🔧
- Автоматичне завантаження нових коментарів та змін із GitHub. 🔃
- [Може використовуватися самостійно][self-hosting]! 🤳

> **Note:**\
> giscus знаходиться у фазі активної розробки. GitHub також активно розвиває Discussions та його API. Тому деякі можливості giscus можуть не працювати або з часом змінюватися.

## Принцип роботи

Після завантаження giscus [GitHub Discussions search API][search-api] використовується для пошуку обговорень, зв'язаних із поточною сторінкою на основі вибраного типу зв'язку (URL, `pathname`, `<title>`, ітд.).
Якщо обговорення не було знайдене, то бот giscus автоматично створює нове обговорення, як тільки хтось створить перший коментар або реакцію.

Щоб додати новий коментар користувачі мусять пройти авторизацію [giscus app][giscus-app] для [здійснення публікацій коментарів від свого імені][authorization] за допомогою GitHub OAuth.
Крім того, користувачі можуть залишати коментарі напряму в GitHub Discussion. Ви можете проводити модерацію цих коментарів через GitHub.

[giscus]: https://giscus.app/uk
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

Якщо ви використовуєте giscus, [поставте 🌟 giscus на GitHub][repo] будь ласка, та додайте [`giscus`][giscus-topic]  тег [у ваш репозиторій][topic-howto]! 🎉

## Розширені налаштування

В giscus доступні [розширені налаштування][advanced-usage], такі як фільтрація по window.origin, ітд.

Для використання giscus із React, Vue, або Svelte зверніться до [бібліотеки компонентів giscus][giscus-component].

## Міграція

Якщо ви раніше користувалися іншими системами, котрі використовували GitHub Issues (наприклад, [utterances][utterances], [gitalk][gitalk]), ви можете [сконверктувати існуючі запити в дискусії][convert].
Після конвертації переконайтеся у відповідності між дискусіями та сторінками сайту, тоді giscus автоматично знайде та відобразить ці дискусії.

## Сайти, котрі використовують giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**та багато інших!**][giscus-topic]

## Співпраця

Деталі: [CONTRIBUTING.md][contributing]

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

Цей README також є доступним на таких мовах:

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
