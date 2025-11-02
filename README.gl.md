# [giscus][giscus]

Un sistema de comentarios desenvolvido con [Discussions de GitHub][discussions]. Permite aos teus visitantes deixar comentarios e reaccións no teu sitio web a través de GitHub! Inspirado en [utterances][utterances].

-  [Código aberto][repo]. 🌏
-  Sen seguimento, sen anuncios, sempre de balde. 📡 🚫
-  Non precisa base de datos. Todos os datos almacénanse en Discussions de GitHub. :octocat:
-  Soporta [temas personalizados][creating-custom-themes]! 🌗
-  Soporta [múltiples linguas][multiple-languages]. 🌐
-  [Altamente configurábel][advanced-usage]. 🔧
-  Obtén automaticamente novos comentarios e edicións de GitHub. 🔃
-  [Pódese autoaloxar][self-hosting]! 🤳

> **Nota:**\
> giscus aínda está en desenvolvemento activo. GitHub tamén segue a desenvolver activamente Discussions e a súa API. Polo tanto, algunhas funcionalidades de giscus poden romperse ou cambiar co tempo.

## Como funciona

Cando se carga giscus, a [API de busca de discusións de GitHub][search-api] úsase para atopar a discusión asociada coa páxina en función da forma de mapeo elixida (URL, `pathname`, `<title>`, etc.). Se non se pode atopar unha discusión que coincida, o bot de giscus creará automaticamente unha discusión a primeira vez que alguén deixe un comentario ou unha reacción.

Para comentar, as persoas visitantes deben autorizar a [aplicación de giscus][giscus-app] para [publicar no seu nome][authorization] empregando o fluxo OAuth de GitHub. Alternativamente, poden comentar directamente na Discussion de GitHub. Podes moderar os comentarios en GitHub.

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

Se estás usando giscus, considera [recomendar 🌟 giscus en GitHub][repo] e engadir o topic [`giscus`][giscus-topic] [ao teu repositorio][topic-howto]! 🎉

## Uso avanzado

Podes engadir configuracións adicionais (por exemplo, permitir orixes específicas) seguindo a [guía de uso avanzado][advanced-usage].

Para usar giscus con React, Vue ou Svelte, consulta a [biblioteca de compoñentes de giscus][giscus-component].

## Migración

Se usaches anteriormente outros sistemas que empregan GitHub Issues (p.ex. [utterances][utterances], [gitalk][gitalk]), podes [converter os issues existentes en discussions][convert]. Despois da conversión, asegúrate de que o mapeo entre os títulos da discussion e as páxinas sexa correcto; daquela giscus empregará automaticamente as discussions.

## Sitios que usan giscus

-  [laymonage.com][laymonage-website]
-  [os.phil-opp.com][os-phil-opp]
-  [Stats and R][statsandr]
-  [Tech Debt Burndown Podcast][techdebtburndown]
-  [**E moitos máis!**][giscus-topic]

## Contribución

Véxase [CONTRIBUTING.md][contributing]

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

Este ficheiro README está dispoñíbel en:

-  [&lrm;العربية](README.ar.md)
-  [Беларуская](README.be.md)
-  [български](README.bg.md)
-  [Català](README.ca.md)
-  [Čeština](README.cs.md)
-  [Dansk](README.da.md)
-  [Deutsch](README.de.md)
-  [English](README.md)
-  [Esperanto](README.eo.md)
-  [Español](README.es.md)
-  [Euskera](README.eu.md)
-  [فارسی](README.fa.md)
-  [Français](README.fr.md)
-  [Galego](README.gl.md)
-  [Ελληνικά](README.gr.md)
-  [Srpsko-Hrvatski (BCMS)](README.hbs.md)
-  [עברית](README.he.md)
-  [Magyar](README.hu.md)
-  [Indonesia](README.id.md)
-  [Italiano](README.it.md)
-  [日本語](README.ja.md)
-  [ភាសាខ្មែរ](README.kh.md)
-  [한국어](README.ko.md)
-  [Nederlands](README.nl.md)
-  [Polski](README.pl.md)
-  [Português](README.pt.md)
-  [Română](README.ro.md)
-  [Русский](README.ru.md)
-  [ภาษาไทย](README.th.md)
-  [Türkçe](README.tr.md)
-  [Tiếng Việt](README.vi.md)
-  [Українська](README.uk.md)
-  [O'zbek](README.uz.md)
-  [简体中文](README.zh-CN.md)
-  [繁體中文](README.zh-TW.md)
-  [香港繁體](README.zh-HK.md)

[![Desenvolvido por Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
