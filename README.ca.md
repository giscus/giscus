# [giscus][giscus]

Un sistema de comentaris desenvolupat amb [Discussions de GitHub][discussions]. Permet als visitants deixar comentaris i reaccions al teu lloc web mitjançant GitHub! Inspirat en [utterances][utterances].

- [Codi obert][repo]. 🌏
- Sense seguiment, sense anuncis, sempre gratuït. 📡 🚫
- No es necessita una base de dades. Totes les dades s'emmagatzemen a les Discussions de GitHub. :octocat:
- Suporta [temes personalitzats][creating-custom-themes]! 🌗
- Suporta múltiples idiomes][multiple-languages]. 🌐
- [Ampliament configurable][advanced-usage]. 🔧
- Obté automàticament nous comentaris i edicions des de GitHub. 🔃
- [Pot ser autoallotjat][self-hosting]! 🤳

> **Nota:**\
> giscus segueix sent un projecte en desenvolupament. GitHub també continua desenvolupant activament les Discussions i la seva API. Per tant, és possible que algunes característiques de giscus puguin trencar-se o canviar amb el temps. És recomanable mantenir-se actualitzat amb les últimes versions i actualitzacions de giscus i seguir les actualitzacions relacionades amb les Discussions i la seva API a GitHub. Això assegurarà que giscus segueixi funcionant de manera òptima i s'aprofiti de les últimes funcionalitats i millores.

## Com funciona

Quan es carrega giscus, s'utilitza [l'API de cerca de discussions de GitHub][search-api] per trobar la discussió associada amb la pàgina en funció de la forma de mapeig triada (URL, pathname, <title>, etc.). Si no es pot trobar cap discussió que coincideixi, el bot giscus crearà automàticament una discussió la primera vegada que algú deixi un comentari o una reacció.

Per deixar un comentari, els visitants han d'autoritzar [l'aplicació de giscus][giscus-app] per [publicar en el seu nom][authorization] utilitzant el flux de GitHub OAuth. Alternativament, els visitants poden comentar directament a la Discussió de GitHub. Pots moderar els comentaris a GitHub.

[giscus]: https://giscus.app/ca
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

Si estàs utilitzant giscus, considera [recomanar 🌟 giscus a GitHub][repo] i afegir el tema [giscus][giscus-topic] al [teu repositori][topic-howto]! 🎉

## Ús avançat

Pots afegir configuracions addicionals (com permetre orígens específics) seguint la [guia d'ús avançat][advanced-usage].

Per utilitzar giscus amb React, Vue o Svelte, consulta la [biblioteca de components de giscus][giscus-component].

## Migrant

Si has utilitzat anteriorment altres sistemes que fan servir GitHub Issues (com ara [utterances][utterances] o [gitalk][gitalk]), pots [convertir les issues existents en discussions][convert]. Després de la conversió, assegura't que el mapeig entre els títols de la discussió i les pàgines sigui correcte, i giscus utilitzarà automàticament les discussions.

## Webs que utilitzen giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**I molts més!**][giscus-topic]

## Contribució

Veure [CONTRIBUTING.md][contributing]

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

Aquest fitxer README està disponible en:

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

[![Desenvolupat per Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
