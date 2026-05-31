# [giscus][giscus]

Um sistema de comentários alimentado por [Discussões do GitHub][discussions]. Permite que visitantes comentem e reajam num site através do GitHub! Fortemente inspirado no [utterances][utterances].

- [Código aberto][repo]. 🌏
- Sem tracking, sem anúncios, sempre gratuito. 📡 🚫
- Sem base de dados. Todos os dados são armazenados nas Discussões do GitHub. :octocat:
- Suporte para [temas personalizados][creating-custom-themes]! 🌗
- Suporte para [vários idiomas][multiple-languages]. 🌐
- [Altamente configurável][advanced-usage]. 🔧
- Busca automaticamente novos comentários e edições do GitHub. 🔃
- [Possibilidade de auto-hospedagem][self-hosting]! 🤳

> **Nota**
> O giscus ainda está em desenvolvimento. O GitHub também está a desenvolver ativamente as Discussões e a sua API. Assim, algumas funcionalidades do giscus podem deixar de funcionar ou sofrer alterações ao longo do tempo.

## Como funciona

Quando o giscus é carregado, a [API de pesquisa das Discussões do GitHub][search-api] é utilizada para encontrar a Discussão associada à página, com base no mapeamento escolhido (URL, `pathname`, `<title>`, etc.). Se não for encontrada uma discussão correspondente, o bot do giscus cria automaticamente uma discussão na primeira vez que alguém comentar ou reagir.

Para comentar, os visitantes têm de autorizar a [aplicação giscus][giscus-app] a [publicar em seu nome][authorization] através do fluxo OAuth do GitHub. Em alternativa, podem comentar diretamente na Discussão do GitHub. A moderação dos comentários é feita no GitHub.

[giscus]: https://giscus.app/pt
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

Se utiliza o giscus, considere [dar uma ⭐ ao giscus no GitHub][repo] e adicionar o tópico [`giscus`][giscus-topic] [ao seu repositório][topic-howto]! 🎉

## Utilização avançada

É possível adicionar configurações adicionais (ex: permitir origens específicas) seguindo o [guia de utilização avançada][advanced-usage].

Para utilizar o giscus com React, Vue ou Svelte, consulte a [biblioteca de componentes do giscus][giscus-component].

## Migração

Se já utilizou outros sistemas baseados em Issues do GitHub (ex: [utterances][utterances], [gitalk][gitalk]), pode [converter as issues existentes em discussões][convert]. Após a conversão, certifique-se de que o mapeamento entre os títulos das discussões e as páginas está correto; o giscus utilizará automaticamente essas discussões.

## Sites que utilizam o giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**e muitos mais!**][giscus-topic]

## Contribuir

Consulte [CONTRIBUTING.md][contributing]

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

Este README também está disponível em:

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
- [Português (Brasil)](README.pt.md)
- [Português (Portugal)](README.pt-PT.md)
- [Română](README.ro.md)
- [Русский](README.ru.md)
- [ภาษาไทย](README.th.md)
- [Türkçe](README.tr.md)
- [Tiếng Việt](README.vi.md)
- [Українська](README.uk.md)
- [O'zbek](README.uz.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)
- [香港繁體](README.zh-HK.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
