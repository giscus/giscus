# [giscus][giscus]

Sistemo de komentoj per [GitHub-aj Diskutoj][discussions]. Ebligu vizitantojn lasi komentojn kaj reagojn sur via retejo per GitHub! Forte inspirita de [utterances][utterances].

- [Malferma fonto][repo]. 🌏
- Sen trakado, sen reklamoj, ĉiam senpagaj. 📡 🚫
- Sen bezono de datumbazo. Ĉiuj datumoj estas konservitaj en GitHub Diskutoj. :octocat:
- Subtenas [proprajn aspektojn][creating-custom-themes]! 🌗
- Subtenas [multajn lingvojn][multiple-languages]. 🌐
- [Vaste agordebla][advanced-usage]. 🔧
- Aŭtomate alŝutas novajn komentojn kaj redaktojn el GitHub. 🔃
- [Eblas memgasti][self-hosting]! 🤳

> **Noto**
> giscus ankoraŭ estas aktive disvolvata. GitHub ankaŭ ankoraŭ aktive disvolvas Diskutojn kaj ĝian API-on. Do, iuj funkcioj de giscus povas rompiĝi aŭ ŝanĝiĝi laŭlonge de la tempo.

## Kiel ĝi funkcias

Kiam giscus ŝargas, la [GitHub-a Diskutoj-serĉa API][search-api] estas uzata por trovi la Diskuton kiu estas asociitan kun la paĝo baze sur elektita mapeado (URL, `pathname`, `<title>`, ktp). Se kongrua diskuto ne troviĝas, la giscus-a roboto aŭtomate kreos diskuton la unuafoje kiam iu lasas komenton aŭ reagon.

Por komenti, vizitantoj devas rajtigi la [giscus-an aplikaĵon][giscus-app] por [afiŝi anstataŭ sin][authorization] per la GitHub-a OAuth-fluo. Alternative, vizitantoj povas komenti rekte en la GitHub-a Diskuto. Vi povas moderi la komentojn en GitHub.

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

Se vi uzas giscus-on, konsideru [steligi 🌟 giscus-on en GitHub][repo] kaj aldoni la temon [`giscus`][giscus-topic] [al via deponejo][topic-howto]! 🎉

## Pliaj uzoj

Vi povas aldoni pliaj agordojn (ekz. permesanti specifajn originojn) konformiĝante al la [gvidaĵo pri altnivelaj uzoj][advanced-usage].

Por uzi giscus kun React, Vue, aŭ Svelte, rigardu la [giscus-an komponentan bibliotekon][giscus-component].

## Migrado

Se vi antaŭe uzis aliajn sistemojn kiuj uzas GitHub-Problemojn (ekz. [utterances][utterances], [gitalk][gitalk]), vi povas [konverti la ekzistantajn problemojn en diskutoj][convert]. Post la konvertiĝo, certiĝu ke la mapeado inter la diskutaj titoloj kaj la paĝoj estas ĝustaj, tiam giscus aŭtomate uzos la diskutojn.

## Retejoj kiuj uzas giscus-on

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Kontribuante

Vidu [CONTRIBUTING.md][contributing]

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

Ĉi tiu README haveblas en:

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
