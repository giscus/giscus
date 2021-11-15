# [giscus][giscus]

Un sistema di commenti basato su [GitHub Discussions][discussions]. Consente ai visitatori di lasciare commenti e reazioni sul tuo sito Web tramite GitHub! Fortemente ispirato a [utterances][utterances].

- [Open source][repo]. 🌏
- No tracking, no pubblicità, sempre gratis. 📡 🚫
- Nessun database richiesto. Tutti i dati sono archiviati in GitHub Discussions. :octocat:
- Supporta [temi personalizzati][creating-custom-themes]! 🌗
- Supporta [più lingue][multiple-languages]. 🌐
- [Ampiamente configurabile][advanced-usage]. 🔧
- Carica automaticamente nuovi commenti e modifiche da GitHub. 🔃
- [Può essere self-hosted][self-hosting]! 🤳

> **Nota:**\
> giscus è ancora in fase di sviluppo attivo. GitHub sta ancora sviluppando attivamente Discussions e le sue API. Pertanto, alcune caratteristiche di giscus possono smettere di funzionare o cambiare nel tempo.

## come funziona

Quando giscus viene caricato, l'[API di ricerca di discussioni di GitHub][search-api] viene utilizzata per trovare la discussione associata alla pagina in base a una mappatura scelta (URL, `pathname`, `<title>`, ecc.). Se non è possibile trovare una discussione corrispondente, il bot di giscus creerà automaticamente una discussione la prima volta che qualcuno lascia un commento o una reazione.

Per commentare, i visitatori devono autorizzare l'[app giscus][giscus-app] a [pubblicare per loro conto][authorization] utilizzando l'autorizzazione OAuth di GitHub. In alternativa, i visitatori possono commentare direttamente la discussione su GitHub. Puoi moderare i commenti su GitHub.

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

Se usi giscus, [metti una stella 🌟 su GitHub][repo] e aggiungi il topic [`giscus`][giscus-topic] [alla tua repository][topic-howto]! 🎉

## utilizzo avanzato

È possibile aggiungere ulteriori configurazioni (ad es. consentire origins specifiche) seguendo la [guida di utilizzo avanzato][advanced-usage].

Per utilizzare giscus con React, Vue o Svelte, dai un'occhiata alla libreria [giscus component][giscus-component].

## migrazione

Se in precedenza hai utilizzato altri sistemi che utilizzano gli Issues di GitHub (es. [utterances][utterances] o [gitalk][gitalk]), puoi [convertire gli issues esistenti in discussioni][convert]. Dopo la conversione, assicurati solo che la mappatura tra i titoli delle discussioni e le pagine sia corretta, quindi giscus utilizzerà automaticamente le discussioni.

## siti che usano giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**e molti altri!**][giscus-topic]

## contribuzioni

Vedi [CONTRIBUTING.md][contributing]

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

Questo README è disponibile in:

[English](README.md) •
[Español](README.es.md) •
[Français](README.fr.md) •
[Deutsch (Schweiz)](README.gsw.md) •
[Indonesia](README.id.md) •
[Italiano](README.it.md) •
[Polski](README.pl.md) •
[Română](README.ro.md) •
[简体中文](README.zh-CN.md)
[한국어](README.ko.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
