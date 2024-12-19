# [giscus][giscus]

Ein Kommentar-System möglich gemacht durch [GitHub Diskussionen][discussions]. Lass Besucher Kommentare und Reaktionen auf deiner Webseite hinterlassen durch GitHub! Stark inspiriert durch [utterances][utterances].

- [Quelloffen][repo]. 🌏
- Kein Tracking, keine Werbung. Immer Gratis. 📡 🚫
- Keine Datenbank benötigt. Sämtliche Daten sind in Diskussionen gespeichert. :octocat:
- Unterstützt [benutzerdefinierte Themes][creating-custom-themes]! 🌗
- Unterstützt [mehrere Sprachen][multiple-languages]. 🌐
- [Umfangreiche Konfigurationsmöglichkeiten][advanced-usage]. 🔧
- Sammle neue Kommentare und Bearbeitungen von GitHub komplett automatisch. 🔃
- [Kann selbst gehostet werden][self-hosting]! 🤳

> **Hinweis:**\
> giscus ist noch immer unter Entwicklung. GitHub ist auch aktiv an der Weiterentwicklung Ihrer Diskussionen und deren API beschäftigt. Darum können einige Funktionen von giscus in Zukunft ändern oder Fehler auftreten.

## Wie es funktioniert

Wenn giscus lädt, wird die [GitHub Diskussionen Such-API][search-api] verwendet um die Diskussion, welche mit der Seite durch ein bestimmtes Mapping (URL, `<pathname>`, `<title>`, etc.) assoziert wird, zu finden. Wenn eine treffende Diskussion nicht gefunden werden kann, erstellt der giscus Bot automatisch eine neue Diskussion, wenn jemand zum ersten Mal einen Kommentar oder eine Reaktion hinterlässt.

Um zu kommentieren, müssen Besucher die [giscus App][giscus-app] autorisieren [in ihrem Namen][authorization] zu posten, mithilfe des GitHub OAuth flows. Alternativ können Besucher direkt auf der Diskussion kommentieren. Du kannst die Kommentare auf GitHub moderieren.

[giscus]: https://giscus.app/de
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

Wenn du giscus verwendest, überlege dir, der Repository auf Github [einen Stern 🌟 zu geben][repo] und den [`giscus`][giscus-topic] Topic [deiner Repository hinzuzufügen][topic-howto]! 🎉

## Fortgeschrittene Anwendung

Du kannst zusätzliche Konfigurationen (z.B. das Erlauben verschiedener Quellen) einrichten, in dem du den [fortgeschrittenen Benutzerguide][advanced-usage] liest.

Um giscus mit React, Vue oder Svelte zu verwenden, schau dir die [giscus Komponenten-Bücherei][giscus-component] an.

## Migration

Wenn du vorher andere Systeme verwendet hast, welche GitHub Issues verwendeten (z.B. [utterances][utterances], [gitalk][gitalk], etc.) kannst du [existierende Issues zu Diskussionen konvertieren][convert]. Nach der Konvertierung musst du nur sicherstellen, dass das Mapping zwischen den Titeln der Diskussionen und den Seiten korrekt ist, dann sollte giscus automatisch die Diskussionen verwenden.

## Seiten, die giscus verwenden

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**und mehr!**][giscus-topic]

## Mitmachen

Siehe [CONTRIBUTING.md][contributing]

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

Diese README ist verfügbar in:

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
