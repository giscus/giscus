# [giscus][giscus]

[GitHub Discussions][discussions] tərəfindən dəstəklənən şərh sistemi. Ziyarətçilərə GitHub vasitəsilə veb saytınızda şərhlər və reaksiyalar buraxmağa icazə verin! [utterances][utterances]-dən böyük ölçüdə ilhamlanmışdır.

- [Açıq kodlu][repo]. 🌏
- İzləmə yoxdur, reklam yoxdur, həmişə pulsuzdur. 📡 🚫
- Verilənlər bazasına ehtiyac yoxdur. Bütün məlumatlar GitHub Discussions-da saxlanılır. :octocat:
- [Fərdi temaları][creating-custom-themes] dəstəkləyir! 🌗
- [Çoxsaylı dilləri][multiple-languages] dəstəkləyir. 🌐
- [Geniş konfiqurasiya edilə bilər][advanced-usage]. 🔧
- GitHub-dan yeni şərhləri və düzəlişləri avtomatik əldə edir. 🔃
- [Self-host (öz serverində yerləşdirmə) edilə bilər][self-hosting]! 🤳

> **Qeyd**
> giscus hələ də aktiv inkişaf mərhələsindədir. GitHub da həmçinin Discussions və onun API-ni aktiv şəkildə inkişaf etdirir. Buna görə də, giscus-un bəzi funksiyaları zamanla işləməyə bilər və ya dəyişə bilər.

## Necə işləyir

giscus yükləndikdə, seçilmiş əlaqələndirməyə (URL, `pathname`, `<title>` və s.) əsaslanaraq səhifə ilə əlaqəli Müzakirəni tapmaq üçün [GitHub Discussions axtarış API-si][search-api] istifadə olunur. Uyğun müzakirə tapılmadıqda, kimsə ilk dəfə şərh və ya reaksiya yazdıqda giscus botu avtomatik olaraq müzakirə yaradacaq.

Şərh yazmaq üçün ziyarətçilər GitHub OAuth axınından istifadə edərək [onların adından paylaşım etmək][authorization] üçün [giscus tətbiqini][giscus-app] səlahiyyətləndirməlidirlər. Alternativ olaraq, ziyarətçilər birbaşa GitHub Discussion-da şərh yaza bilərlər. Şərhləri GitHub-da idarə (moderasiya) edə bilərsiniz.

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

Əgər giscus istifadə edirsinizsə, GitHub-da [giscus-a ulduz verməyi 🌟][repo] və [repozitoriyanıza][topic-howto] [`giscus`][giscus-topic] mövzusunu əlavə etməyi düşünün! 🎉

## Qabaqcıl istifadə

[Qabaqcıl istifadə bələdçisinə][advanced-usage] əməl edərək əlavə konfiqurasiyalar (məs. xüsusi mənbələrə icazə vermək) əlavə edə bilərsiniz.

giscus-u React, Vue və ya Svelte ilə istifadə etmək üçün [giscus komponent kitabxanasına][giscus-component] nəzər salın.

## Miqrasiya

Əgər əvvəllər GitHub Issues istifadə edən digər sistemlərdən (məs. [utterances][utterances], [gitalk][gitalk]) istifadə etmisinizsə, [mövcud problemləri (issues) müzakirələrə çevirə bilərsiniz][convert]. Çevrilmədən sonra, sadəcə müzakirə başlıqları ilə səhifələr arasındakı əlaqənin düzgün olduğuna əmin olun, daha sonra giscus avtomatik olaraq müzakirələrdən istifadə edəcək.

## giscus istifadə edən saytlar

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**və daha çoxu!**][giscus-topic]

## Töhfə vermək

Töhfə təlimatlarını oxuyun: [CONTRIBUTING.md][contributing]

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

Bu README aşağıdakı dillərdə mövcuddur:

- [&lrm;العربية](README.ar.md)
- [Azərbaycan dili](README.az.md)
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
