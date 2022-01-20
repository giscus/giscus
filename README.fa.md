# [giscus][giscus]

سیستم کامنت و نظرات، قدرت گرفته از [GitHub Discussions][discussions].امکان دادن به بازدیدکنندگان برای نظر دادن روی وبسایت شما از طریق گیت‌هاب! الهام گرفته شده از [utterances][utterances].

- [متن باز][repo]. 🌏
- بدون رهگیری، تبلیغ و رایگان برای همیشه. 📡 🚫
- بدون نیاز به دیتابیس. تمام داده ها روی انجمن گیت‌هاب ذخیره خواهد شد. :octocat:
- پیشتبانی از [قالب های دلخواه][creating-custom-themes]! 🌗
- پیشتبانی از [چندین زبان][multiple-languages]. 🌐
- [قابلیت تنظیم][advanced-usage]. 🔧
- به طور خودکار تغییرات را روی گیتهاب بروز می‌کند. 🔃
- [قابلیت میزبانی شخصی][self-hosting]! 🤳

> **تذکر:**\
> هنوز giscus در دست توسعه است. گیت‌هاب مشغول توسعه بخش Discussions و APIاش می‌باشد. بدین منظور، ممکن است بعضی از فیچرهای این پروژه خراب شوند یا تغییر کنند.

## نحوه‌ی کارکرد
هنگامی که giscus بارگیری می شود، API جستجوی GitHub Discussions برای یافتن بحث مرتبط با صفحه بر اساس مپ انتخابی (URL, `pathname`, `<title>`, etc.) استفاده می شود. اگر یک بحث منطبق پیدا نشد، ربات giscus به طور خودکار بحثی را در اولین باری که کسی نظر یا واکنشی می‌گذارد ایجاد می‌کند.

برای نظر دادن، بازدیدکنندگان باید به برنامه [giscus app][giscus-app] اجازه دهند تا از طرف آنها با استفاده از [Github OAuth][authorization] پست کند. همچنین، بازدیدکنندگان می‌توانند مستقیماً در Github Discussions نظر دهند. پس می توانید نظرات را در GitHub مدیریت کنید.

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

اگر از giscus استفاده می کنید، لطفا [آن را روی گیت‌هاب star کنید 🌟][repo] و [`giscus`][giscus-topic] تاپیک را به ریپویتان [اضافه کنید.][topic-howto]! 🎉

## استفاده ی پیشرفته

شما می توانید استفاده های پیشرفته تری انجام دهید.[advanced usage guide][advanced-usage].

برای استفاده با React, Vue یا Svelte این لینک را چک کنید. [giscus component library][giscus-component].

## مهاجرت

اگر قبلا از پروژه هایی که کامنت ها را به صورت Issue در گیتهاب قرار می داد، مانند (e.g. [utterances][utterances], [gitalk][gitalk]),  میتوانید [آن هارا به Discussion منقل کنید][convert]. بعد از اینکار مطمعن باشید که مپینگ موضوعات درست هستند. در این صورت به طور خودکار و کامل آن ها منتقل خواهند شد.

## سایت هایی که از این پروژه استفاده می کنند.

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## کانتربیوت کردن

این لینک را ببینید. [CONTRIBUTING.md][contributing]

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

این فایل در زبان های زیر نیز در دسترس است:

- [Deutsch](README.de.md)
- [Deutsch (Schweiz)](README.gsw.md)
- [English](README.md)
- [Español](README.es.md)
- [Français](README.fr.md)
- [Indonesia](README.id.md)
- [Italiano](README.it.md)
- [日本語](README.ja.md)
- [한국어](README.ko.md)
- [Polski](README.pl.md)
- [Română](README.ro.md)
- [Tiếng Việt](README.vi.md)
- [简体中文](README.zh-CN.md)
- [繁體中文](README.zh-TW.md)

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
