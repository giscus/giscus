# [giscus][giscus]

একটি মন্তব্য ব্যবস্থা যা [GitHub Discussions][discussions] দ্বারা চালিত। দর্শকরা GitHub এর মাধ্যমে আপনার ওয়েবসাইটে মন্তব্য এবং প্রতিক্রিয়া দিতে পারবেন! এটি [utterances][utterances] দ্বারা অনুপ্রাণিত।

- [ওপেন সোর্স][repo]. 🌏
- কোনো ট্র্যাকিং নেই, কোনো বিজ্ঞাপন নেই, সবসময় ফ্রি। 📡 🚫
- কোনো ডেটাবেসের প্রয়োজন নেই। সব ডেটা GitHub Discussions-এ সংরক্ষিত থাকে। :octocat:
- [কাস্টম থিম][creating-custom-themes] সমর্থিত! 🌗
- [বহুভাষী সমর্থন][multiple-languages]। 🌐
- [বিস্তৃত কনফিগারেশন][advanced-usage] সমর্থিত। 🔧
- GitHub থেকে স্বয়ংক্রিয়ভাবে নতুন মন্তব্য এবং এডিট লোড হয়। 🔃
- [নিজস্ব হোস্টিং][self-hosting] সম্ভব! 🤳

> **দ্রষ্টব্য**
> giscus এখনও সক্রিয়ভাবে উন্নয়নাধীন। GitHubও Discussions এবং এর API উন্নয়ন করছে। তাই giscus-এর কিছু ফিচার সময়ের সাথে পরিবর্তিত বা ভেঙে যেতে পারে।

## এটি কিভাবে কাজ করে

giscus লোড হলে, [GitHub Discussions সার্চ API][search-api] ব্যবহার করে পেজের সাথে সম্পর্কিত আলোচনা খুঁজে বের করে নির্বাচিত মানচিত্র (URL, `pathname`, `<title>` ইত্যাদি) অনুযায়ী। যদি কোনো মিলিত আলোচনা না পাওয়া যায়, giscus বট স্বয়ংক্রিয়ভাবে একটি আলোচনা তৈরি করবে যখন কেউ প্রথমবার মন্তব্য বা প্রতিক্রিয়া দেবে।

মন্তব্য করার জন্য, দর্শকদের [giscus অ্যাপ][giscus-app] অনুমোদন দিতে হবে [GitHub OAuth ফ্লো ব্যবহার করে][authorization] তাদের পক্ষে পোস্ট করার জন্য। বিকল্পভাবে, দর্শকরা সরাসরি GitHub Discussion-এ মন্তব্য করতে পারেন। GitHub-এ মন্তব্যগুলো পরিচালনা করা যায়।

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

যদি আপনি giscus ব্যবহার করছেন, [GitHub-এ giscus-কে স্টার করুন 🌟][repo] এবং আপনার রিপোজিটরিতে [`giscus`][giscus-topic] টপিক যোগ করুন [এভাবে][topic-howto]! 🎉

## উন্নত ব্যবহার

আপনি অতিরিক্ত কনফিগারেশন (যেমন নির্দিষ্ট উৎস অনুমোদন) [উন্নত ব্যবহার নির্দেশিকা][advanced-usage] অনুসরণ করে যোগ করতে পারেন।

React, Vue বা Svelte-এ giscus ব্যবহার করতে [giscus কম্পোনেন্ট লাইব্রেরি][giscus-component] দেখুন।

## giscus-এ মাইগ্রেশন

যদি পূর্বে আপনি GitHub Issues ব্যবহার করা অন্য সিস্টেম (যেমন [utterances][utterances], [gitalk][gitalk]) ব্যবহার করে থাকেন, আপনি [বিদ্যমান ইস্যুগুলোকে আলোচনা তে রূপান্তর করতে পারেন][convert]। রূপান্তরের পর, শুধুমাত্র নিশ্চিত করুন যে আলোচনার শিরোনাম এবং পেজের মানচিত্র সঠিক, তারপর giscus স্বয়ংক্রিয়ভাবে আলোচনা ব্যবহার করবে।

## giscus ব্যবহারকারী সাইট

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**এবং আরও অনেক!**][giscus-topic]

## অবদান

[CONTRIBUTING.md][contributing] দেখুন

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

এই README পাওয়া যাবে:

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
- [Bangla](README.bn.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
