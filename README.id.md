# [giscus][giscus]

Sebuah sistem komentar yang didukung oleh [GitHub Discussions][discussions]. Memungkinkan pengunjung meninggalkan komentar dan reaksi pada website Anda melalui GitHub! Terinspirasi dari [utterances][utterances].

- [Sumber terbuka][repo]. 🌏
- Tidak ada pelacakan, tidak ada iklan, selalu gratis. 📡 🚫
- Tidak memerlukan database. Semua data disimpan di GitHub Discussions. :octocat:
- Mendukung [tema kostumisasi][creating-custom-themes]! 🌗
- Mendukung [banyak bahasa][multiple-languages]. 🌐
- [Konfigurasi luas][advanced-usage]. 🔧
- Otomatis mengambil komentar dan perubahan baru dari GitHub. 🔃
- [Dapat dihosting sendiri][self-hosting]! 🤳

> **Catatan:**\
> giscus masih sedang dalam pengembangan aktif. GitHub juga masih aktif mengembangkan Discussions dan API-nya. Oleh karena itu, beberapa fitur giscus mungkin rusak atau berubah seiring waktu.

## Cara kerja

Ketika giscus dimuat, [GitHub Discussions search API][search-api] digunakan untuk mencari diskusi yang terkait dengan halaman berdasarkan pemetaan yang dipilih (URL, `pathname`, `<title>`, dll.). Jika diskusi yang terkait tidak ditemukan, bot giscus akan otomatis membuat diskusinya ketika ada orang yang meninggalkan komentar atau reaksi untuk pertama kalinya.

Untuk berkomentar, pengunjung harus mengizinkan [aplikasi giscus][giscus-app] untuk [berkomentar atas nama mereka][authorization] menggunakan jalur GitHub OAuth. Atau, pengunjung dapat meninggalkan komentar pada diskusinya secara langsung di GitHub. Anda dapat memoderasi komentarnya di GitHub.

[giscus]: https://giscus.app/id
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

Jika Anda menggunakan giscus, pertimbangkan untuk [membintangi 🌟 giscus di GitHub][repo] dan menambahkan topik [`giscus`][giscus-topic] pada [repositori Anda][topic-howto]! 🎉

## Penggunaan lanjutan

Anda dapat menambahkan konfigurasi tambahan (contoh: hanya mengizinkan situs tertentu) dengan mengikuti [petunjuk penggunaan lanjutan][advanced-usage].

Untuk menggunakan giscus pada React, Vue, atau Svelte, periksa [giscus component library][giscus-component].

## Migrasi

Jika Anda sebelumnya menggunakan sistem lain yang menggunakan GitHub Issues (seperti: [utterances][utterances], [gitalk][gitalk]), Anda dapat [mengkonversi isu yang sudah ada menjadi diskusi][convert]. Setelah proses konversi, pastikan bahwa pemetaan antara judul diskusi dengan halaman-halamannya sudah benar, dan giscus akan otomatis menggunakan diskusinya.

## Situs yang menggunakan giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**dan masih banyak yang lainnya!**][giscus-topic]

## Berkontribusi

Lihat [CONTRIBUTING.md][contributing]

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

README ini tersedia dalam bahasa:

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

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
