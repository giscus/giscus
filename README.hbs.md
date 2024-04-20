# [giscus][giscus]

Sistem za komentarisanje koji koristi [GitHub Diskusije][discussions]. Dajte čitaocima da ostave komentare i reakcije na vašem sajtu preko GitHub-a! Veoma inspirisano ugledajući se na [utterances][utterances].

- [Otvorenog koda][repo]. 🌏
- Bez praćenja, bez reklama, zauvek besplatno. 📡 🚫
- Baza podataka nepotrebna. Sve je skladišteno u GitHub Diskusijama. :octocat:
- Podržava [prilagođavanje tema][creating-custom-themes]! 🌗
- Podržava [više jezika][multiple-languages]. 🌐
- [Veoma lako za dodatnu konfiguraciju][advanced-usage]. 🔧
- Automatski preuzima nove komentare i reakcije od GitHub-a. 🔃
- [Može da se self-hostuje][self-hosting]! 🤳

> **Beleška**
> giscus je još uvek u izgradnji. GitHub takođe aktivno gradi GitHub Diskusije i njihov API. Posledično tome, neke funkcionalnosti giscus-a se moguće vremenom pokvare.

## Kako sve to radi

Kada se giscus učita, [API za pretragu GitHub Diskusija][search-api] se koristi da se pronađe diskusija vezana za stranicu na osnovu izabranog mapiranja (URL, `pathname`, `<title>`, itd.). Ako se diskusija ne pronađe, giscus bot će automatski napraviti diskusiju odmah nakon što neko ostavi reakciju ili komentar.

Da bi komentarisali, korisnici moraju dati autoritet [giscus aplikaciji][giscus-app] da [objavljuje u njihovo ime][authorization] koristeći GitHub OAuth tok. Alternativno, čitaoci mogu komentarisati na GitHub Diskusiji direktno. Vlasnik diskusije može biti moderator iste.

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

Ako koristite giscus, bilo bi lepo da [starujete 🌟 giscus na GitHub-u][repo] i da dodate [`giscus`][giscus-topic] kao temu [na vaš repozitorijum][topic-howto]! 🎉

## Napredno korišćenje

Možete dodati dodatne konfiguracije (npr. dopuštanje specifičnih origin-a) prateći [uputstvo za napredne korisnike][advanced-usage].

Da bi koristili giscus sa React-om, Vue-om, ili Svelte-om, proverite [giscus biblioteku komponenti][giscus-component].

## Migracija

Ako ste prethodno koristili sisteme koji se oslanjaju na GitHub Issues (npr. [utterances][utterances], [gitalk][gitalk]), možete [konvertovati issue-e u diskusije][convert]. Nakon konverzije, uverite se da je mapiranje korektno, onda će giscus automatski da koristi diskusije.

## Sajtovi koji koriste giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**i još mnogi!**][giscus-topic]

## Kontribucija

Pogledajte [CONTRIBUTING.md][contributing]

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

Ovaj README je dostupan na:

- [Arabic (العربية)](README.ar.md)
- [Català](README.ca.md)
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

[![Radi uz pomoć Vercel-a](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
