# [giscus][giscus]

Een comment-systeem mogelijk gemaakt door [GitHub Discussions][discussions]. Laat bezoekers opmerkingen en reacties achterlaten op je website via GitHub! Geïnspireerd door[utterances][utterances].

- [Open source][repo]. 🌏
- Geen tracking, geen advertenties, altijd gratis. 📡 🚫
- Geen database nodig. Alle gegevens worden opgeslagen in GitHub Discussions.:octocat:
- Ondersteund [custom themas][creating-custom-themes]! 🌗
- Ondersteund [meerdere talen][multiple-languages]. 🌐
- [Uitgebreid configureerbaar][advanced-usage]. 🔧
- Haalt automatisch nieuwe opmerkingen en bewerkingen op van GitHub. 🔃
- [Kan zelf worden gehost][self-hosting]! 🤳

> **Opmerking**
> giscus is nog volop in ontwikkeling. GitHub is ook nog steeds actief bezig met het ontwikkelen van Discussions en de bijbehorende API. Sommige kenmerken van giscus kunnen dus in de loop van de tijd breken of veranderen.

## Hoe het werkt

Wanneer giscus laadt, wordt de [GitHub Discussions search API][search-api] gebruikt om de Discussion die bij de pagina hoort te vinden. Dit is gebaseerd op een gekozen mapping tussen de pagina en de Discussion (bv. URL, `pathname`, `<title>`...) Als er geen overeenkomende Discussion gevonden kan worden, zal de giscus bot er automatisch eentje maken.

Om een opmerking achter te laten, moeten gebruikers de [giscus app][giscus-app] authorizeren om [namens hen te posten][authorization] met behulp van de GitHub OAuth-stroom. Als alternatief kunnen bezoekers rechtstreeks reageren op de GitHub-discussie. U kunt de opmerkingen op GitHub modereren.

[giscus]: https://giscus.app/nl
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

Als je giscus gebruikt, overweeg dan [giscus een ster 🌟 te geven op GitHub][repo] en de [`giscus`][giscus-topic] topic [aan je repository toe te voegen][topic-howto]! 🎉

## Geavanceerd gebruik

Je kan aanvullende configuraties toevoegen (bv. specifieke herkomst toestaan) door de [geavanceerde gebruiksgids][advanced-usage] te volgen.

Om giscus te gebruiken met React, Vue of Svelte, bekijk de [giscus component bibliotheek][giscus-component].

## Migreren

Als je eerder andere systemen hebt gebruikt die GitHub Issues gebruiken (bv. [utterances][utterances], [gitalk][gitalk]), kan je [je bestaande issues omvormen naar discussions][convert]. Zorg er na de conversie voor dat de toewijzing tussen de titels van de discussie en de pagina's correct is, dan zal giscus de discussies automatisch gebruiken.

## Sites die giscus gebruiken

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Bijdragen

Bekijk [CONTRIBUTING.md][contributing]

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

Deze readme is ook beschikbaar in het:

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
