# [giscus][giscus]

Et kommentarsystem drevet af [GitHub Discussions][discussions]. Lad besøgende efterlade kommentarer og reaktioner på din hjemmeside via GitHub! Stærkt inspireret af [utterances][utterances].

- [Open source][repo]. 🌏
- Ingen sporing, ingen reklamer, altid gratis. 📡 🚫
- Ingen database nødvendig. Alle data opbevares i GitHub-diskussioner. :octocat:
- Understøtter [tilpasset temaer][creating-custom-themes]! 🌗
- Understøtter [flere sprog][multiple-languages]. 🌐
- [Ekstrem konfigurerbar][advanced-usage]. 🔧
- Henter automatisk nye kommentarer og redigeringer fra GitHub. 🔃
- [Kan være selvhostet][self-hosting]! 🤳

> **Note**
> Giscus er stadig under aktiv udvikling. GitHub udvikler også stadig Diskussioner og dets API. Derfor kan nogle funktioner i Giscus bryde eller ændre sig over tid.

## Sådan fungerer det

Når Giscus indlæses, bruges [GitHub-diskussionssøgnings-API'et][search-api] til at finde diskussionen, der er knyttet til siden baseret på en valgt mapping (URL, `stinavn`, `<title>`, osv.). Hvis en matchende diskussion ikke kan findes, vil Giscus-botten automatisk oprette en diskussion første gang nogen efterlader en kommentar eller reaktion.

For at kommentere skal besøgende autorisere [giscus app][giscus-app] til at [poste på deres vegne][authorization] ved hjælp af GitHub OAuth-flow. Alternativt kan besøgende kommentere direkte på GitHub-diskussionen. Du kan moderere kommentarerne på GitHub.

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

Hvis du bruger Giscus, skal du overveje at [stjernemarkere 🌟 Giscus på GitHub][repo] og tilføje emnet [`giscus`][giscus-topic] topic [til dit repository][topic-howto]! 🎉

## Avanceret brug

Du kan tilføje yderligere konfigurationer (f.eks. tillade specifikke oprindelser) ved at følge [avanceret brug-guiden][advanced-usage].

For at bruge Giscus med React, Vue eller Svelte, skal du tjekke [giscus komponentbiblioteket][giscus-component].

## Migration

Hvis du tidligere har brugt andre systemer, der udnytter GitHub Issues (f.eks [utterances][utterances], [gitalk][gitalk]), kan du [ckonvertere de eksisterende problemer til diskussioner][convert]. Efter konverteringen skal du bare sørge for, at mappingen mellem diskussionstitlerne og siderne er korrekt, så vil Giscus automatisk bruge diskussionerne.

## Websteder, der bruger Giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**og mange flere!!**][giscus-topic]

## Bidrag

Se [CONTRIBUTING.md][contributing]

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

Denne README er tilgængelig på:

- [Arabic (العربية)](README.ar.md)
- [Català](README.ca.md)
- [Dansk](README.da.md)
- [Deutsch](README.de.md)
- [English](README.md)
- [Esperanto](README.eo.md)
- [Español](README.es.md)
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

[![Drevet af Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
