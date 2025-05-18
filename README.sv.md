# [giscus][giscus]

Ett kommentarsystem som drivs av [GitHub Discussions][discussions]. Låt besökare lämna kommentarer och reaktioner på din webbplats via GitHub! Kraftigt inspirerat av [utterances][utterances].

- [Öppen källkod][repo]. 🌏  
- Ingen spårning, inga annonser, alltid gratis. 📡 🚫  
- Ingen databas behövs. All data lagras i GitHub Discussions. :octocat:  
- Stöd för [anpassade teman][creating-custom-themes]! 🌗  
- Stöd för [flera språk][multiple-languages]. 🌐  
- [Mycket konfigurerbart][advanced-usage]. 🔧  
- Hämtar automatiskt nya kommentarer och redigeringar från GitHub. 🔃  
- [Kan självhostas][self-hosting]! 🤳  

> **Observera**  
> giscus är fortfarande under aktiv utveckling. GitHub utvecklar också fortfarande Discussions och dess API. Därför kan vissa funktioner i giscus ändras eller sluta fungera över tid.

## Hur det fungerar

När giscus laddas används [GitHubs Discussions-söknings-API][search-api] för att hitta den diskussion som är kopplad till sidan baserat på en vald koppling (URL, `pathname`, `<title>`, osv.). Om en matchande diskussion inte hittas kommer giscus-boten automatiskt att skapa en diskussion första gången någon lämnar en kommentar eller reaktion.

För att kommentera måste besökare auktorisera [giscus-appen][giscus-app] att [posta å deras vägnar][authorization] via GitHubs OAuth-flöde. Alternativt kan besökare kommentera direkt i GitHub-diskussionen. Du kan moderera kommentarerna på GitHub.

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

Om du använder giscus, överväg att [stjärnmärka 🌟 giscus på GitHub][repo] och lägga till [`giscus`-ämnet][giscus-topic] [till ditt repository][topic-howto]! 🎉

## Avancerad användning

Du kan lägga till ytterligare konfigurationer (t.ex. tillåta specifika origins) genom att följa [guiden för avancerad användning][advanced-usage].

För användning med React, Vue eller Svelte, kolla in [giscus komponentbibliotek][giscus-component].

## Migrera

Om du tidigare har använt andra system som utnyttjar GitHub Issues (t.ex. [utterances][utterances], [gitalk][gitalk]), kan du [konvertera befintliga issues till diskussioner][convert]. Efter konverteringen, se till att kopplingen mellan diskussionstitlarna och sidorna är korrekt, så kommer giscus automatiskt använda diskussionerna.

## Webbplatser som använder giscus

- [laymonage.com][laymonage-website]  
- [os.phil-opp.com][os-phil-opp]  
- [Stats and R][statsandr]  
- [Tech Debt Burndown Podcast][techdebtburndown]  
- [**och många fler!**][giscus-topic]  

## Bidra

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

---

README:t finns även på andra språk (se originalfilen).

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
- [Svenska](README.sv.md)
- [ภาษาไทย](README.th.md)
- [Türkçe](README.tr.md)
- [Tiếng Việt](README.vi.md)
- [Українська](README.uk.md)
- [O'zbek](README.uz.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)
- [香港繁體](README.zh-HK.md)

[![Drivs av Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
