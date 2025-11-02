# [giscus][giscus]

Сыстэма камэнтароў на ґрунце [GitHub Абмеркаваньняў][discussions]. Дазвольце наведвальнікам пакідаць камэнтары і рэакцыі на вашым ўэбсайце праз GitHub! Моцна натхнёна [utterances][utterances].

- [Адкрыты код][repo]. 🌏
- Без адсочваньня, без рэклямы, заўжды задарма. 📡 🚫
- Не патрабуе базы зьвесткаў. Усе зьвесткі захоўваюцца ў GitHub Абмеркаваньнях. :octocat:
- Падтрымлівае [ўласныя каляровыя тэмы][creating-custom-themes]! 🌗
- Падтрымлівае [шматмоўнасьць][multiple-languages]. 🌐
- [Шырока наладжвальная][advanced-usage]. 🔧
- Аўтаматычна ладуе новыя камэнтары ды рэдаґаваньні з GitHub. 🔃
- [Можна гаставаць на ўласным сэрвэры][self-hosting]! 🤳

> **Заўвага**
> giscus яшчэ ў стадыі актыўнага розьвітку. GіtHub таксама актыўна распрацоўвае Абмеркаваньні ды іхні APІ. Такім чынам, некаторыя уласьцівасьці giscus з часам могуць парушацца або зьмяняцца.

## Як гэта працуе

Пры ладаваньні, giscus ужывае [APІ пошуку GіtHub Абмеркаваньняў][search-api] каб знайсьці абмеркаваньне, зьвязанае з старонкаю на ґрунце абранага зьяднаньня (URL, `pathname`, `<title>`, і г. д.). Калі адпаведнае абмеркаваньне ня знойдзенае, giscus бот аўтаматычна створыць абмеркаваньне ў першы раз, калі хтосьці пакіне камэнтар або рэакцыю.

Каб камэнтаваць, наведвальнікі мусяць аўтарызаваць [giscus app][giscus-app] для [публікацыі ад іх імя][authorization] з дапамогаю GіtHub OAuth. Акрамя таго, наведвальнікі могуць непасрэдна камэнтаваць у GіtHub Абмеркаваньнях. Вы можаце мадэраваць камэнтары на GіtHub.

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

Калі вы ўжываеце gіscus, калі ласка, [зазорце 🌟 giscus на GitHub][repo] і дадайце [`giscus`][giscus-topic] тэму [да вашага рэпазітару][topic-howto]! 🎉

## Пашыранае ўжываньне

Вы можаце дадаць дадатковыя налады (напр., дазволіць пэўныя дамэны) прытрымліваючыся [інструкцыі па пашыраным ўжываньні][advanced-usage].

Каб ужываць gіscus з React, Vue або Svelte, паглядзіце [бібліятэку кампанэнтаў gіscus][giscus-component].

## Міґрацыя

Калі вы ранейша карысталіся іншымі сыстэмамі, якія ўжываюць GіtHub Іssues (напр., [utterances][utterances], [gitalk][gitalk]), вы можаце [канвэртаваць існуючыя issue ў абмеркаваньні][convert]. Пасьля канвэртацыі проста ўпэўніцеся, што супастаўленьне паміж назвамі абмеркаваньняў і старонкамі слушнае, тады gіscus аўтаматычна ўжывацьме абмеркаваньні.

## Сайты, што ўжываюць giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**і шмат іншых!**][giscus-topic]

## Уклад

Глядзіце [CONTRIBUTING.md][contributing]

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

Гэты README даступны ў:

- [&lrm;العربية](README.ar.md)
- [Беларуская](README.be.md)
- [български](README.bg.md)
- [Català](README.ca.md)
- [Čeština](README.cs.md)
- [Dansk](README.da.md)
- [Deutsch](README.de.md)
- [English](README.md)
- [Esperanto](README.eo.md)
- [Español](README.es.md)
- [Euskera](README.eu.md)
- [فارسی](README.fa.md)
- [Français](README.fr.md)
- [Galego](README.gl.md)
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
- [香港繁體](README.zh-HK.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
