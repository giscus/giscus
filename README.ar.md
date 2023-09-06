# [غيسكوس giscus][giscus]

نظام تعليقات يعمل بواسطة [مناقشات جيب هب][discussions]. دع الزوار يتركون التعليقات والتفاعلات على موقع الويب الخاص بك عبر جيت هب! مستلهم بشدة من [utterances][utterances].


- [مفتوح المصدر][repo]. 🌏
- بدون تتبع أو إعلانات ومجاني دائما. 📡 🚫
- لا يحتاج قاعدة بيانات. كل البيانات مخزنة في مناقشات جيب هب. :octocat:
- يدعم [الثيمات المخصصة][creating-custom-themes]! 🌗
- يدعم [لغات متعددة][multiple-languages]. 🌐
- [قابل للتخصيص بشكل كبير][advanced-usage]. 🔧
- يحمل التعليقات والتعديلات الجديدة بشكل تلقائي من جيت هب. 🔃
- [يمكن استضافته ذاتيا][self-hosting]! 🤳

> **ملاحظة**
> غيسكوس ما زال تحت التطوير. أيضا جيت هب ما زالوا يطورون المناقشات وواجهتها البرمجية. لذلك، بعض ميزات غيسكوس قد تتعطل أو تتغير مع الوقت.

## كيف يعمل

عندما يحمل غيسكوس تستخدم [الواجهة البرمجية للبحث في مناقشات جيت هب][search-api] لإيجاد المناقشة المرتبطة بالصفحة بناءا على طريقة ربط يتم اختيارها مثل (الرابط أو `pathname` أو `<title>` إلخ). إذا تعذر العثور على مناقشة مطابقة فسيقوم بوت غيسكوس تلقائيًا بإنشاء مناقشة في المرة الأولى التي يترك فيها أحد الأشخاص تعليقًا أو تفاعل.

للتعليق على المناقشات، يجب على الزائرين تخويل [تطبيق غيسكوس][giscus-app] [للنشر نيابة عنهم][authorization] باستخدام تدفق جيب هب OAuth. أو بدلاً من ذلك يمكن للزوار التعليق على مناقشة جيت هب مباشرةً. ويمكنك الإشراف على التعليقات على جيت هب.

[giscus]: https://giscus.app/ar
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

إذا كنت تستخدم غيسكوس من فضلك قم [بعمل نجمة 🌟 لنا على جيت هب][repo] وأضف موضوع [`giscus`][giscus-topic] [إلى مستودع موقعك][topic-howto]! 🎉

## الاستخدام المتقدم

يمكنك إضافة خيارات تهيئة إضافية (مثلا السماح بالوصول عبر أصول معينة) من خلال [دليل الاستخدام المتقدم][advanced-usage].

لاستخدام غيسكوس مع أطر عمل رياكت أو فيو أو سيفلت، اطلع على [مكتبة مكون غيسكوس][giscus-component].

## الترحيل

إذا استخدمت سابقا أي أنظمة تستغل قضايا جيت هب (مثل [utterances][utterances] أو [gitalk][gitalk])، يمكنك [تحويل القضايا الحالية إلى مناقشات][convert]. بعد التحويل تأكد من صحة طريقة الربط بين عناوين المناقشات والصفحات، وبعدها سيتخدم غيسكوس المناقشات بشكل تلقائي.

## مواقع تستخدم غيسكوس

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**ومواقع أخرى عديدة!**][giscus-topic]

## المساهمة

اطلع على [CONTRIBUTING.md][contributing]

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

ملف README متوفر أيضا باللغات:

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

[![مدعوم من Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
