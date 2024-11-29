# [giscus][giscus]

Un sistema de comentarios desarrollado con [Discusiones de GitHub][discussions]. ¡Permite a tus visitantes dejar comentarios y reacciones en su sitio web a través de GitHub! Inspirado en [utterances][utterances].

- [Kode-irekia][repo]. 🌏
- Sin seguimiento, sin anuncios, siempre gratis. 📡 🚫
- Ez da datu-baserik behar. Datu guztiak GitHub eztabaidetan gordetzen dira. :octocat:
- ¡Soporta [temas personalizados][creating-custom-themes]! 🌗
- Soporta [múltiples idiomas][multiple-languages]. 🌐
- [Ampliamente configurable][advanced-usage]. 🔧
- Obtiene automáticamente nuevos comentarios y ediciones de GitHub. 🔃
- [Puede ser autohospedado][self-hosting]! 🤳

> **Nota:**\
> giscus todavía está en desarrollo activo. GitHub también sigue desarrollando activamente Discusiones y su API. Por lo tanto, algunas características de giscus pueden romperse o cambiar con el tiempo.

## Cómo funciona

Cuando se carga giscus, la [API de búsqueda de discusiones de GitHub][search-api] se usa para encontrar la discusión asociada con la página en función de la forma de mapeo elegida (URL, `pathname`, `<title>`, etc.). Si no se puede encontrar una discusión que coincida, el bot giscus creará automáticamente una discusión la primera vez que alguien deje un comentario o una reacción.

Para comentar, los visitantes deben autorizar la [aplicación de giscus][giscus-app] para [publicar en su nombre][authorization] utilizando el flujo de GitHub OAuth. Alternativamente, los visitantes pueden comentar sobre la Discusión de GitHub directamente. Puede moderar los comentarios en GitHub.

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

Si estás usando giscus, considera [recomendar 🌟 giscus en GitHub][repo] y agregar el tópico [`giscus`][giscus-topic] [a tu repositorio][topic-howto]! 🎉

## Uso avanzado

Puedes agregar configuraciones adicionales (por ejemplo, permitir orígenes específicos) siguiendo la [guía de uso avanzado][advanced-usage].

Para usar giscus con React, Vue o Svelte, consulta la [biblioteca de componentes de giscus][giscus-component].

## Migrando

Si has utilizado anteriormente otros sistemas que usan GitHub Issues (p.ej. [utterances][utterances], [gitalk][gitalk]), puedes [convertir los issues existentes en discusiones][convert]. Después de la conversión, asegúrate de que el mapeo entre los títulos de la discusión y las páginas sea correcto, entonces giscus utilizará automáticamente las discusiones.

## Sitios que usan giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**Y muchos más!**][giscus-topic]

## Contribución

Ver [CONTRIBUTING.md][contributing]

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

Este archivo README está disponible en:

- [Arabic (العربية)](README.ar.md)
- [български](README.bg.md)
- [Català](README.ca.md)
- [Čeština](README.cs.md)
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

[![Desarrollado por Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
