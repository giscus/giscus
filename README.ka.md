# [giscus][giscus]

კომენტარების სისტემა, რომელიც მუშაობს [GitHub Discussions][discussions]-ის საფუძველზე. მიეცით ვიზიტორებს საშუალება დატოვონ კომენტარები და რეაქციები თქვენს ვებ-გვერდზე GitHub-ის მეშვეობით! ძლიერ შთაგონებული [utterances][utterances]-ით.

- [ღია წყარო][repo]. 🌏
- თვალთვალის გარეშე, რეკლამების გარეშე, ყოველთვის უფასო. 📡 🚫
- მონაცემთა ბაზა არ არის საჭირო. ყველა მონაცემი ინახება GitHub Discussions-ში. :octocat:
- მხარს უჭერს [მორგებულ თემებს][creating-custom-themes]! 🌗
- მხარს უჭერს [მრავალ ენას][multiple-languages]. 🌐
- [ფართოდ კონფიგურირებადი][advanced-usage]. 🔧
- ავტომატურად იღებს ახალ კომენტარებსა და რედაქტირებებს GitHub-დან. 🔃
- [შესაძლებელია საკუთარ სერვერზე განთავსება][self-hosting]! 🤳

> **შენიშვნა**
> giscus კვლავ აქტიურ განვითარებაშია. GitHub-იც აქტიურად ავითარებს Discussions-სა და მის API-ს. შესაბამისად, giscus-ის ზოგიერთი ფუნქცია შესაძლოა დროთა განმავლობაში დაირღვეს ან შეიცვალოს.

## როგორ მუშაობს

giscus-ის ჩატვირთვისას, [GitHub Discussions-ის ძიების API][search-api] გამოიყენება გვერდთან ასოცირებული დისკუსიის მოსაძებნად არჩეული ბმის მიხედვით (URL, `pathname`, `<title>` და ა.შ.). თუ შესაბამისი დისკუსია ვერ მოიძებნება, giscus-ის ბოტი ავტომატურად შექმნის დისკუსიას, როდესაც ვინმე პირველად დატოვებს კომენტარს ან რეაქციას.

კომენტარის დასატოვებლად, ვიზიტორებმა უნდა მიანიჭონ უფლება [giscus აპლიკაციას][giscus-app], რომ [მათი სახელით გამოაქვეყნოს კომენტარები][authorization] GitHub OAuth flow-ის გამოყენებით. ალტერნატივად, ვიზიტორებს შეუძლიათ კომენტარი დაწერონ უშუალოდ GitHub Discussion-ში. კომენტარების მოდერაცია შეგიძლიათ GitHub-ზე.

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

თუ იყენებთ giscus-ს, განიხილეთ [giscus-ის ვარსკვლავით 🌟 მონიშვნა GitHub-ზე][repo] და დაამატეთ [`giscus`][giscus-topic] თემა [თქვენს რეპოზიტორიას][topic-howto]! 🎉

## დამატებითი გამოყენება

შეგიძლიათ დაამატოთ დამატებითი კონფიგურაციები (მაგ., კონკრეტული origin-ების დაშვება) [დამატებითი გამოყენების გზამკვლევის][advanced-usage] მიხედვით.

giscus-ის React-თან, Vue-სთან ან Svelte-თან გამოსაყენებლად, იხილეთ [giscus-ის კომპონენტების ბიბლიოთეკა][giscus-component].

## მიგრაცია

თუ აქამდე იყენებდით სხვა სისტემებს, რომლებიც დაფუძნებულია GitHub Issues-ზე (მაგ., [utterances][utterances], [gitalk][gitalk]), შეგიძლიათ [არსებული issues-ები გადააკეთოთ დისკუსიებად][convert]. გადაკეთების შემდეგ, უბრალოდ დარწმუნდით, რომ დისკუსიის სათაურებსა და გვერდებს შორის ბმა სწორია, და giscus ავტომატურად გამოიყენებს დისკუსიებს.

## ვებ-გვერდები, რომლებიც იყენებენ giscus-ს

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**და მრავალი სხვა!**][giscus-topic]

## კონტრიბუცია

იხილეთ [CONTRIBUTING.md][contributing]

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

ეს README ხელმისაწვდომია შემდეგ ენებზე:

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
- [ქართული](README.ka.md)
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
