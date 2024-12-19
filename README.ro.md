# [giscus][giscus]

Un sistem de comentarii oferit de [GitHub Discussions][discussions]. Oferă vizitatorilor posibilitatea de a lăsa comentarii ori reacții pe site-ul tău via GitHub! Inspirat masiv de [utterances][utterances].

- [Open source][repo]. 🌏
- Nu te urmărește, fără reclame, întotdeauna gratuit. 📡 🚫
- Nu e nevoie de o bază de date. Toate datele sînt stocate în GitHub Discussions. :octocat:
- Suportă [teme personalizate][creating-custom-themes]! 🌗
- Suportă [mai multe limbi][multiple-languages]. 🌐
- [Extrem de configurabil][advanced-usage]. 🔧
- Extrage automat comentariile noi ori pe cele editate de la GitHub. 🔃
- [Poate fi găzduit][self-hosting]! 🤳

> **Note:**\
> giscus este încă în dezvoltare. GitHub dezvoltă încă în mod activ Discussions și API-ul corespunzător. Prin urmare unele funcționalități giscus pot să Thus, some features of giscus pot genera erori sau pot fi schimbate în timp.

## Cum funcționează

Cînd giscus se încarcă, [API-ul de căutare GitHub Discussions][search-api] este folosit pentru a găsi discuția asociată cu pagina pe baza unei atribuiri alese (URL, `pathname`, `<title>`, etc.). Dacă nu este găsită nici o discuție, bot-ul giscus va crea în mod automat o discuție pentru prima dată cînd cineva lasă un comentariu sau o reacție.

Pentru a comenta vizitatorii trebuie să autorizeze [aplicația giscus][giscus-app] ca să [publice în numele lor][authorization] folosind sistemul GitHub OAuth. Alternativ, vizitatorii pot comenta direct în GitHub Discussion. Comentariile pot fi moderate la GitHub.

[giscus]: https://giscus.app/ro
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

Dacă folosești giscus poți să îți arăți aprecierea cu [o 🌟 giscus la GitHub][repo] și adăugînd [`giscus`][giscus-topic] la [repository-ul personal][topic-howto]! 🎉

## Folosire avansată

Configurări adiționale (e. g. permiterea doar a unor origini pentru comentarii) pot fi adăugate urmărind [ghidul avansat de utilizare][advanced-usage].

Pentru a folosi giscus cu React, Vue sau Svelte vezi [giscus component library][giscus-component].

## Migrare

Dacă ai folosit anterior un alt sistem ce folosește GitHub Issues (e.g. [utterances][utterances], [gitalk][gitalk]), poți [converti sistemul exitent în discuții][convert]. După convertire verificați că titlurile discuțiilor și ale paginilor sînt corect atribuite, apoi giscus va folosi în mod automat discuțiile..

## Site-urile care folosesc giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Cum să ajuți

Vezi [CONTRIBUTING.md][contributing]

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

Acest README este disponibil în:

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
