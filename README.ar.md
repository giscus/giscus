# [غيسكوس giscus][giscus]

نظام تعليقات مدعوم بواسطة [مناقشات GitHub][discussions]. يتيح للزوار ترك التعليقات والتفاعلات على موقعك عبر GitHub! مستوحى بشكل كبير من [utterances][utterances].

- [مفتوح المصدر][repo]. 🌏
- بدون تتبع أو إعلانات، ومجاني دائمًا. 📡 🚫
- لا حاجة لقاعدة بيانات. جميع البيانات مخزنة في مناقشات GitHub. :octocat:
- يدعم [الثيمات المخصصة][creating-custom-themes]! 🌗
- يدعم [العديد من اللغات][multiple-languages]. 🌐
- [قابل للتخصيص بشكل واسع][advanced-usage]. 🔧
- يجلب التعليقات والتعديلات الجديدة تلقائيًا من GitHub. 🔃
- [يمكن استضافته ذاتيًا][self-hosting]! 🤳

> **ملاحظة**
> غيسكوس لا يزال قيد التطوير النشط. كما أن GitHub لا يزال يطور المناقشات وواجهتها البرمجية. لذلك، قد تتعطل بعض ميزات غيسكوس أو تتغير مع مرور الوقت.

## كيفية العمل

عند تحميل غيسكوس، يتم استخدام [واجهة برمجة التطبيقات للبحث في مناقشات GitHub][search-api] للعثور على المناقشة المرتبطة بالصفحة بناءً على طريقة الربط المختارة (مثل الرابط، `pathname`، `<title>`، إلخ). إذا لم يتم العثور على مناقشة مطابقة، سيقوم بوت غيسكوس بإنشاء مناقشة تلقائيًا عند ترك أول تعليق أو تفاعل.

للتعليق، يجب على الزوار تفويض [تطبيق غيسكوس][giscus-app] [للنشر نيابة عنهم][authorization] باستخدام تدفق OAuth الخاص بـ GitHub. أو بدلاً من ذلك، يمكن للزوار التعليق مباشرة على مناقشة GitHub. يمكنك الإشراف على التعليقات عبر GitHub.

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

إذا كنت تستخدم غيسكوس، يُرجى [تقييمنا بنجمة 🌟 على GitHub][repo] وإضافة موضوع [`giscus`][giscus-topic] [إلى مستودعك][topic-howto]! 🎉

## الاستخدام المتقدم

يمكنك إضافة إعدادات إضافية (مثل السماح بأصول معينة) من خلال [دليل الاستخدام المتقدم][advanced-usage].

لاستخدام غيسكوس مع React أو Vue أو Svelte، اطلع على [مكتبة مكونات غيسكوس][giscus-component].

## الترحيل

إذا كنت قد استخدمت سابقًا أنظمة تعتمد على قضايا GitHub (مثل [utterances][utterances] أو [gitalk][gitalk])، يمكنك [تحويل القضايا الحالية إلى مناقشات][convert]. بعد التحويل، تأكد من صحة الربط بين عناوين المناقشات والصفحات، وبعدها سيستخدم غيسكوس المناقشات تلقائيًا.

## مواقع تستخدم غيسكوس

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**والعديد من المواقع الأخرى!**][giscus-topic]

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

ملف README متوفر أيضًا باللغات:

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

[![مدعوم من Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
