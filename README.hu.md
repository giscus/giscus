# [giscus][giscus]

Egy hozzászólási rendszer, ami a [GitHub Discussions][discussions] adta lehetőségeket használja. Segítségével látogatóid hozzászólásokat és reakciókat hagyhatnak weboldaladon a GitHub által! Erősen inspirálta az [utterances][utterances].

- [Nyílt forráskódú][repo]. 🌏
- Nincs követés, nincs hirdetés, mindig ingyenes. 📡 🚫
- Nincs szükség adatbázisra. Minden adat a GitHub Discussions-ben tárolódik. :octocat:
- Támogatja az [egyéni témákat][creating-custom-themes]! 🌗
- Támogat [több nyelvet][multiple-languages]. 🌐
- [Széleskörűen konfigurálható][advanced-usage]. 🔧
- Automatikusan lekéri az új hozzászólásokat és szerkesztéseket a GitHubról. 🔃
- [Önmagad is üzemeltetheted][self-hosting]! 🤳

> **Megjegyzés**
> A giscus még aktív fejlesztés alatt áll. A GitHub is folyamatosan fejleszti a Discussions-t és annak API-ját. Így előfordulhat, hogy a giscus néhány funkciója idővel elromlik vagy megváltozik.

## Hogyan működik

Amikor a giscus betöltődik, a [GitHub Discussions keresési API][search-api] használatával megkeresi az oldalhoz tartozó beszélgetést egy választott leképezés alapján (URL, `pathname`, `<title>`, stb.). Ha nem található egyező beszélgetés, a giscus bot automatikusan létrehoz egyet, amikor valaki először hagy egy hozzászólást vagy reakciót.

A hozzászóláshoz a látogatóknak engedélyezniük kell a [giscus alkalmazást][giscus-app] számára a GitHub OAuth folyamat segítségével, hogy [a nevükben hozzászólhassanak][authorization]. Alternatív megoldásként a látogatók közvetlenül a GitHubon is hozzászólhatnak. A hozzászólásokat a GitHubon moderálhatod.

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

Ha giscust használsz, fontold meg a [giscus megcsillagozását 🌟 a GitHubon][repo] és a [`giscus`][giscus-topic] téma hozzáadását [a repódhoz][topic-howto]! 🎉

## Haladó beállítások

További konfigurációt (pl. engedélyezett originek) adhatsz hozzá a [haladó használati útmutató][advanced-usage] követésével.

Ha giscust React, Vue vagy Svelte segítségével szeretnéd használni, nézd meg a [giscus komponens könyvtárat][giscus-component].

## Áttérés giscusra

Ha korábban olyan rendszereket használtál, amelyek a GitHub Issues-t használják (pl. [utterances][utterances], [gitalk][gitalk]), [átalakíthatod a meglévő issue-kat beszélgetésekké][convert]. Az átalakítás után csak győződj meg róla, hogy a beszélgetések címei és az oldalak közötti leképezés helyes, és a giscus automatikusan használni fogja a beszélgetéseket.

## Weboldalak, amelyek giscust használnak

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**és még sok más!**][giscus-topic]

## Hozzájárulás

Lásd a [CONTRIBUTING.md][contributing] fájlt

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

This README is available in:

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
