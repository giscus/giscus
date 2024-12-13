# [giscus][giscus]

[GitHub Eztabaidak][discussions] ahalbidetutako weborrientzako iradokizunen sistema. 
Weborria bisitazen dutenei iradokizunak idazteko eta erreakzioak uzteko aukera eman GitHub plataformaren bitartez! [utterances][utterances] plataforman inspiratuta.

- [Kode irekia][repo]. 🌏
- Jarraipenik gabe, anuntziorik gabe, doan betirako. 📡 🚫
- Ez da datu-baserik behar. Datu guztiak GitHub Eztabaidan gordetzen dira. :octocat:
- [Estiloa pertsonalizatu][creating-custom-themes] daiteke! 🌗
- [Hainbat hizkutzetan][multiple-languages]. 🌐
- [Erabilera aurreratuak][advanced-usage]. 🔧
- Iradokizun eta eztabaida eguneratuak jaso GitHub Eztabaidak orritik. 🔃
- [Puede ser autohospedado][self-hosting]! 🤳

> **Oharra:**\
> giscus eguneratze prozesuan dago. 
> GitHub plataformak ere Eztabaida funtzionalitatea eta APIa aktiboki eguneratzen ditu. 
> Beraz, giscusen ezaugarri batzuk aldaketak izan ditzakete edo gaizki funtzionatu dezakete.

## Nola funtzionatzen du

giscus kargatzerakoan, [GitHub-en bilaketa APIa][search-api] erabiltzen da webguneari lotutako eztabaida aurkitzeko (URL, `pathname`, `<title>`, eta abar). 
Eztabaidarik ez bada aurkitzen, giscus bot-ak webguneari lotutako eztabaida berri bat sortuko du behin erabiltzaireren batek iradokizun bat uzten duentean.

Iradokizunak idazteko, bisitariek [giscus aplikazioa][giscus-app] beraien izenean publikatzeko baimendu behar dute [GitHub OAuth][authorization] baimenen protokoloa erabilita.
Aukeran, bisitariek GitHub Eztabaidan bertan publikatu dezakete.
Iradokizuznak GitHub plataforman moderatu daitezke.

[giscus]: https://giscus.app/es
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

giscus erabiltzen baduzu, [GitHub-en gomendatzea 🌟][repo] eta [zure errepositorioaren][topic-howto] mintzagaitean [`giscus`][giscus-topic] jartzea eskertzen da! 🎉

## Erabilera aurreratua

[Erabilera aurreratuaren gida][advanced-usage] ikusi ezarpen aurreratuak erabiltzeko, adibidez, jatorri zehatzetako iradokizunak baimentzeko.

giscusen erabilera React, Vue edo Svelte plataformetan nola funtzionatzen duen [giscusen osagarrien bibliotekan][giscus-component] topa daiteke.

## Migratzeko

Lehenagotik GitHub Issues sistema erabiltzen duten beste herraminta batzuk erabili badituzu, adibidez, [utterances][utterances], [gitalk][gitalk] eta abar, [issues-ak eztabaida bilakatu][convert] ditzakezu. 
Eztabaiden izenburuaren eta giscusen arteko lotura egokia dela ziurtatu bilakaeraren ondoren.
Horrela, giscus aplikazioak estabaidak automatikoki bilatzeko aukera izango du.

## giscus erabitzen duten webguneak

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**Eta askoz gehiago!**][giscus-topic]

## Lagundu

Ikusi [CONTRIBUTING.md][contributing]

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

README fitxategia hizkuntza ezberdinetan topa daiteke:

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

[![Vercel-ek garatua](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
