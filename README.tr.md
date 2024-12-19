# [giscus][giscus]

[GitHub Discussions][discussions] tarafından sağlanan bir yorum sistemi. Ziyaretçilerinizin GitHub üzerinden yorum ve tepki bırakmasını sağlayın! [utterances][utterances] tarafından büyük ölçüde ilham alındı.

- [Açık kaynak][repo]. 🌏
- İzleme yok, reklam yok, daima ücretsiz. 📡 🚫
- Veri tabanına ihtiyaç yok. Tüm veri GitHub Discussions üzerinde depolanıyor. :octocat:
- [Özel tema][creating-custom-themes] destekli! 🌗
- [Birden fazla dil][multiple-languages] destekli. 🌐
- [Kapsamlı şekilde ayarlanabilir][advanced-usage]. 🔧
- Yeni yorum ve düzenlemeler otomatik olarak GitHub'dan çekiliyor. 🔃
- [Şahsi olarak barındırılabilir][self-hosting]! 🤳

> **Not:**\
> giscus hâlâ aktif olarak geliştiriliyor. GitHub da aktif olarak GitHub Discussions ve API'ını geliştiriyiror. Nitekim, giscus'ın özellikleri zamanla değişebilir veya bozulabilir.

## Nasıl çalışır

Giscus yüklendiğinde, [GitHub Discussions arama API'ı][search-api] kullanılarak seçilen bağlantı yöntemi (URL, `pathname`, `<title>`, vb.) ile uyuşan tartışma bulunur. Uyumlu tartışma bulunamazsa, giscus bot birisi yorum veya tepki bıraktığında otomatik olarak bir tartışma oluşturur.

Yorum yapmak için, ziyaretçiler [giscus uygulaması][giscus-app]nı [kendi adlarına yazmak][authorization] için GitHub OAuth üzerinden yetkilendirmeli. Alternatif olarak, ziyaretçiler direkt olarak GitHub Discussions üzerinden yorum yapabilirler. Yorumları GitHub üzerinden yönetebilirsiniz.

[giscus]: https://giscus.app/tr
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

Giscus'ı kullanıyorsanız, [GitHub'da yıldız 🌟 vermeyi][repo] ve [`giscus`][giscus-topic] başlığını [deponuza eklemeyi][topic-howto] düşünün! 🎉

## Gelişmiş kullanım

[Gelişmiş kullanım rehberi][advanced-usage]ni takip ederek ek yapılandırmalar (bkz. belirli kaynaklara izin vermek) ekleyebilirsiniz.

Giscus'ı React, Vue veya Svelte ile kullanmak için [giscus bileşen kütüphanesi][giscus-component]ne göz atın.

## Geçiş yapma

Önceden GitHub Issues kullanan sistemler kullandıysanız (bkz. [utterances][utterances], [gitalk][gitalk]), [bu sorunları tartışmalara çevirebilirsiniz][convert]. Çevirdikten sonra, tartışma başlıklarıyla sayfa bağlantılarının doğru olduğundan emin olduktan sonra, giscus otomatik olarak tartışmaları kullanacaktır.

## Giscus kullanan siteler

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**ve çok daha fazlası!**][giscus-topic]

## Katkı sağlama

[CONTRIBUTING.md][contributing] yazısını inceleyin

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

README şu dillerde de mevcut:

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

[![Vercel tarafından sağlanıyor](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
