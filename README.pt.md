# [giscus][giscus]

Um sistema de comentários mantido por [Discussões do GitHub][discussions]. Permita que visitantes deixem comentários e reações no seu site através do GitHub! Fortemente inspirado por [utterances][utterances].

- [Código Aberto][repo]. 🌏
- Sem rastreamento, sem anúncios, sempre grátis. 📡 🚫
- Nenhum banco de dados necessário. Todos os dados são armazenados no GitHub Discussions. :octocat:
- Suporta [temas personalizados][creating-custom-themes]! 🌗
- Suporta [diversos idiomas][multiple-languages]. 🌐
- [Amplamente configurável][advanced-usage]. 🔧
- Automaticamente procura novos comentários e edições do GitHub. 🔃
- [Pode ser hospedado por conta própria][self-hosting]! 🤳

> **Nota**
> giscus ainda está em desenvolvimento. O GitHub também está ativamente desenvolvendo Discussions e suas API. Desta forma, algumas características do giscus podem quebrar ou mudar no decorrer do tempo.

## Como funciona

Quando o giscus é carregado, a [API de pesquisa das Discussões do GitHub][search-api] é usada para encontrar as discussões associadas com a página baseado no mapeamento escolhido (URL, `pathname`, `<title>`, etc.). Se uma discussão correspondente não for encontrada, o bot do giscus irá criar automaticamente uma discussão na primeira vez que alguém deixar um comentário ou reação.

Para comentar, visitantes devem autorizar o [app giscus][giscus-app] a [postar em seu nome][authorization] usando o fluxo GitHub OAuth. Alternativamente, visitantes podem comentar diretamente no GitHub Discussion. Você pode moderar comentários no GitHub.

[giscus]: https://giscus.app/pt
[discussions]: https://docs.github.com/en/discussions
[utterances]: https://github.com/utterance/utterances
[repo]: https://github.com/giscus/giscus
[usos avançados]: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md
[creating-custom-themes]: https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#data-theme
[multiple-languages]: https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#adding-localizations
[self-hosting]: https://github.com/giscus/giscus/blob/main/SELF-HOSTING.md
[search-api]: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search
[giscus-app]: https://github.com/apps/giscus
[authorization]: https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps

<!-- configuration -->

Se você estiver usando giscus, considere [dar uma 🌟 no giscus no GitHub][repo] e adicionar o tópico [`giscus`][giscus-topic] [no seu repositório][topic-howto]! 🎉

## Usos Avançados

Você pode adicionar configurações adicionais (por exemplo permitindo origens específicas) seguindo o [guia de uso avançado][advanced-usage].

Para usar o giscus com React, Vue, ou Svelte, olhe a [biblioteca de componentes do giscus][giscus-component].

## Migrando

Caso você tenha utilizado outros sistemas que usam os Problemas do GitHub (por exemplo [utterances][utterances], [gitalk][gitalk]), você pode [você pode converter problemas existentes em discussões][convert]. Após a conversão, confira que o mapeamento entre títulos de discussões e páginas está correto, então o giscus irá utilizar as discussões automaticamente.

## Sites que usam o giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Contribuindo

Veja [CONTRIBUTING.md][contributing]

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

Esse README também está disponível em:

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
