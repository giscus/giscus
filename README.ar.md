# [giscus][giscus]
نظام تعليقات مشغل بواسطة [GitHub Discussions][discussions]. يمنح هذا النظام زوار موقعك القدرة على ترك تعليقاتهم و ردود افعالهم عبر GitHub.  مستوحى بشكل كبير من [utterances][utterances]

- [مفتوح المصدر][repo]. 🌏
- 📡 🚫 لا يتعقبك، بدون إشهارات، مجاني دائماً , 
- لا يحتاج لقاعدة بيانات. كل البيانات مخزنة في GitHub Discussions. :octocat:
- يدعم [ثيمات مخصصة][creating-custom-themes]! 🌗
- يدعم [عدة لغات][multiple-languages]. 🌐
- [قابل للتخصيص بشكل رائع][advanced-usage]. 🔧
- يجلب التعليقات الجديدة على غيتهاب آليا. 🔃
- [يمكنك استضافته بشكل مستقل][self-hosting]! 🤳

> **ملاحظة:**\
> لا يزال giscus قيد التطوير بشكل نشط. GitHub أيضا مازالوا يطورون ميزة النقاشات و واجهة برمجة التطبيقات الخاصة بها و لذلك قد تتعطل بعض ميزات النظام من حين لآخر.

## كيف يعمل giscus 
عندما ينتهي giscus من التحميل، يتم استخدام واجهة برمجة التطبيقات الخاصة بنقاشات غيتهاب للبحث عن المناقشة المتعلقة بالصفحة الحالية لموقعك
بناءً على ظوابط محددة مثل الرابط، المسار و العنوان ... إلخ. إذا لم يجد البحث نتيجة، يقوم الروبوت الخاص بـ giscus بإنشاء مناقشة بصفة آلية و ذلك عندما يترك أحدهم تعليقا أو تفاعلاً على الموقع.

حتى يتسنى للمستخدمين التعليق، يجب عليهم الترخيص لـ [تطبيق giscuss][giscus-app] لكي [ينشر نيابة عنهم][authorization]. باستعمال تقنية التحقق 0Auth الخاصة بغيتهاب.
كبديل آخر، يمكن للزوار التعليق على المناقشة مبائرة في  GitHub حيث يمكنك الاشراف على التعليقات هناك أيضاً.

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
إذا كنت تستعمل giscus، يرجى منك ان [تضع نجمة 🌟 على مستودعنا في غيتهاب][repo] و إضافة [`giscus`][giscus-topic] إلى 
[قائمة المواضيع في مستودعك][topic-howto] ! 🎉ذ

## الاستعمال المتقدم

يمكنك إضافة إعدادات متقدمة (السماح بالتعليق من فئة معينة مثلاً) باتباع [دليل الاستعمال المتقدم][advanced-usage].

لاستعمال giscus مع React أو Vue أو Svelte, يرجى زيارة [مكتبة مكونات giscus][giscus-component].

## الانتقال إلى giscus

إذا قمت بتجربة نظم تعليقات تستعمل ميزة Issues في غيتهاب من قبل (مثل [utterances][utterances] و [gitalk][gitalk])، يمكنك معرفة كيفية [تحويل مشكلة إلى نقاش على غيتهاب][convert]

بعد القيام بالتحويل، فقط تأكد من أن الربط بين عناوين النقاشات و الصفحات على موقعك يعمل بشكل صحيح. بعد ذلك سيقوم giscus آليا باستعمال النقاشات.

## مواقع تستعمل giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## المساهمة

يرجى زيارة [CONTRIBUTING.md][contributing]

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

يتوفر ملف README باللغات الآتية:

[English](README.md) • [Français](README.fr.md) • [Indonesia](README.id.md) • [Polski](README.pl.md) • [Română](README.ro.md) • [简体中文](README.zh-CN.md) • [العربية](README.ar.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
