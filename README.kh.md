# [giscus][giscus]

វាជាប្រព័ន្ធនៃការពិភាក្សា និងបញ្ចេញមតិដែលត្រូវបានដំណើរការដោយ [GitHub Discussions][discussions] ដែលអនុញ្ញាតអោយអ្នកទស្សនាគេហទំព័ររបស់អ្នកអាចធ្វើការបញ្ចេញមតិ និងជជែកគ្នាតាមរយៈ comments និង reactionsលើគេហទំព័ររបស់អ្នកតាមរយៈ GitHub! យកលំនាំតាម [utterances][utterances]។

- [បើកបង្ហាញប្រភពកូដ - Open source][repo] ។🌏
- គ្មានការតាមដាន, គ្មានពាណិជ្ជកម្ម, ឥតគិតថ្លៃជានិច្ច។ 📡 🚫
- មិនត្រូវការ Database ។ រាល់ទិន្នន័យទាំងអស់នឹងត្រូវរ៉ាប់រងការរក្សាទុកដោយ GitHub :octocat:
- គាំទ្រចំពោះ [ការកែច្នៃម៉ូតស្បែកផ្ទាល់ខ្លួន][creating-custom-themes]! 🌗
- គាំទ្រចំពោះ [ភាសាជាច្រើន][multiple-languages]។ 🌐
- [អាច config បានយ៉ាងទូលំទូលាយ][advanced-usage]។ 🔧
- អាច fetches comments ថ្មី និងកែសម្រួលមតិតាមរយៈ GitHub ដោយផ្ទាល់។ 🔃
- [អាច host ដោយខ្លួនឯងបាន][self-hosting]! 🤳

> **ចំណាំ**
> giscus គឺកំពុងតែស្ថិតក្រោមការអភិវឌ្ឍន៍នៅឡើយទេ។ GitHub គឺកំពុងតែអភិវឌ្ឍន៍មុខងារពិភាក្សា និង API របស់វាយ៉ាងសកម្ម។ ដូច្នេះ, មុខងារ giscus ពេលខ្លះអាចនឹងមានបញ្ហា ឬមិនដំណើរការម្តងម្កាលជាដើម។ 

## តើវាដំណើរការដោយរបៀបម៉េចទៅ?

នៅពេលដែល giscus ដំណើរការ, [GitHub Discussions search API][search-api] ត្រូវបានប្រើដើម្បីស្វែងរកការពិភាក្សាដែលភ្ជាប់ជាមួយទំព័រដោយផ្អែកលើទិសដៅដែលបានជ្រើសរើស (URL, `pathname`, `<title>`, etc.)។ ប្រសិនបើមិនអាចរកឃើញការពិភាក្សាដែលត្រូវគ្នានោះទេ giscus bot នឹងបង្កើតការពិភាក្សាដោយស្វ័យប្រវត្តិ នៅពេលដែលនរណាម្នាក់បញ្ចេញមតិយោបល់ ឬប្រតិកម្មជាលើកដំបូង។

ដើម្បីសរសេរមតិ, អ្នកប្រើប្រាស់ [giscus app][giscus-app] ដាច់ខាតត្រូវតែសុំការអនុញ្ញាតចូលគណនី [ដើម្បីបង្ហោះមតិ][authorization] ដោយប្រើប្រាស់ GitHub OAuth ។ ឬម៉្យាងទៀតអ្នកប្រើក៏អាចធ្វើការសរសេរមតិតាមរយៈ GitHub ដោយផ្ទាល់ក៏បាន។ អ្នកអាចគ្រប់គ្រង comments នៅលើ GitHub ដោយផ្ទាល់។

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

ប្រសិនបើអ្នកប្រើប្រាស់ giscus, សួមជួយ [អោយផ្កាយ 🌟 giscus នៅលើ GitHub][repo] និង [`giscus`][giscus-topic] topic [ទៅកាន់ repository របស់អ្នក][topic-howto]! 🎉

## ការប្រើប្រាស់កម្រិតខ្ពស់

អ្នកអាចធ្វើការ configurations បន្ថែម (e.g. អនុញ្ញាតឱ្យមានប្រភពដើមជាក់លាក់) ដោយធ្វើតាម [ការណែនាំអំពីការប្រើប្រាស់កម្រិតខ្ពស់][advanced-usage].

ដើម្បីប្រើប្រាស់ giscus ជាមួយនឹង React, Vue, ឬ Svelte, សូមឆែកមើល [giscus component library][giscus-component].

## ការ Migrating

ប្រសិនបើអ្នកធ្លាប់ប្រើប្រព័ន្ធផ្សេងទៀតដែលប្រើ GitHub​ Issues (ឧទាហរណ៍៖ [utterances][utterances], [gitalk][gitalk]), អ្នកអាច [បម្លែងពី existing issues ទៅជា discussions][convert]។ បន្ទាប់ពីបានបម្លែងហើយ, គ្រាន់តែបញ្ជាក់ដើម្បីប្រាកដថាការ mapping រវាងចំណងជើងការពិភាក្សានិងទំព័រគឺពិតជាត្រឹមត្រូវ
បន្ទាប់មក giscus នឹងប្រើការពិភាក្សាដោយស្វ័យប្រវត្តិ។

## គេហទំព័រដែលប្រើប្រាស់ giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## ការចូលរួមចំណែក

មើល [CONTRIBUTING.md][contributing]

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

ឯកសារ README នេះមានភាសាដូចជា:

- [Arabic (العربية)](README.ar.md)
- [Català](README.ca.md)
- [Deutsch](README.de.md)
- [English](README.md)
- [Esperanto](README.eo.md)
- [Español](README.es.md)
- [Persian (فارسی)](README.fa.md)
- [Français](README.fr.md)
- [עברית](README.he.md)
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
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
