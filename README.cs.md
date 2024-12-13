# [giscus][giscus]

Systém komentářů založený na [GitHub Discussions][discussions]. Nechte návštěvníky zanechávat komentáře a reakce na vašem webu prostřednictvím GitHub! Silně inspirováno [utterances][utterances].

- [Open source][repo]. 🌏
- Žádné trackování, žádné reklamy, vždy zdarma. 📡 🚫
- Není potřeba žádná databáze. Všechna data jsou uložena v GitHub Discussions. :octocat:
- Podporuje [vlastní barevná schémata][creating-custom-themes]! 🌗
- Podporuje [více jazyků][multiple-languages]. 🌐
- [Rozsáhle konfigurovatelné][advanced-usage]. 🔧
- Automaticky načítá nové komentáře a úpravy z GitHub. 🔃
- [Lze hostovat na vlastním serveru][self-hosting]! 🤳

> **Poznámka**
> giscus je stále ve fázi aktivního vývoje. GitHub také stále aktivně vyvíjí Discussions a jeho API. Některé funkce giscusu se tedy mohou časem rozbít nebo změnit.

## Jak to funguje

Při načtení nástroje giscus se použije [GitHub Discussions search API][search-api] k vyhledání diskuse spojené se stránkou na základě zvoleného mapování (URL, `pathname`, `<title>` atd.). Pokud odpovídající diskusi nenajde, giscus bot automaticky vytvoří diskusi, jakmile někdo poprvé zanechá komentář nebo reakci.

Aby mohli návštěvníci komentovat, musí autorizovat [aplikaci giscus][giscus-app], aby [psala jejich jménem][authorization] pomocí GitHub OAuth. Případně mohou návštěvníci komentovat přímo v GitHub Discussion. Komentáře můžete moderovat na GitHub.

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

Pokud používáte giscus, zvažte [zahvězdičkování 🌟 giscus na GitHub][repo] a přidání tématu [`giscus`][giscus-topic] [do svého repozitáře][topic-howto]! 🎉

## Pokročilé použití

Další konfigurace (např. povolení konkrétních domén) můžete přidat podle [průvodce pokročilým použitím][advanced-usage].

Chcete-li používat giscus s React, Vue nebo Svelte, podívejte se na [knihovnu komponent giscus][giscus-component].

## Migrace

Pokud jste dříve používali jiné systémy, které využívají GitHub Issues (např. [utterances][utterances], [gitalk][gitalk]), můžete [převést stávající issues na discussions][convert]. Po převodu se jen ujistěte, že mapování mezi názvy diskusí a stránkami je správné, pak bude giscus automaticky používat Discussions.

## Stránky používající giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Přispívání

Viz [CONTRIBUTING.md][contributing]

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

Toto README je k dispozici v:

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
