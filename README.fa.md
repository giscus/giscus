# [giscus][giscus]

یک سیستم نظردهی بر اساس [GitHub Discussions][discussions]. که به کاربران اجازه می دهد دیدگاه ها و بازخوردهای خود را در وب سایت شما به وسیله گیت هاب درج کنند.! این بسیار از سیستم [utterances][utterances] الهام گرفته شده است.

- [متن باز][repo]. 🌏
- بدون ترکینگ کد، بدون تبلیغات و و برای همیشه رایگان. 📡 🚫
- بدون نیاز به دیتابیس تمام اطلاعات در سیستم نظرات گیت هاب نگهداری می شوند. :octocat:
- پشتیبانی از [پوسته های سفارشی][creating-custom-themes]! 🌗
- پشتیبانی از [زبان های مختلف][multiple-languages]. 🌐
- [قابلیت تنظیمات بالا][advanced-usage]. 🔧
- دریافت خودکار دیدگاه های جدید و ویرایش شده از گیت هاب. 🔃
- [قابلیت نصب در سرور متعلق به شما][self-hosting]! 🤳

> **توجه**
> giscus هنوز در حال توسعه فعال است. گیت هاب همچنین هنوز به طور فعال در حال توسعه سیستم نظرات و API آن است. بنابراین، برخی از ویژگی های giscus ممکن است در طول زمان شکسته یا تغییر کند.

## نحوه انجام کار

وقتی giscus بارگزاری شد, سیستم [سیستم سرچ نظرات گیت هاب][search-api] اقدام به یافتن دیدگاه های مرتبط به صفحه و بر اساس تنظمیات انتخاب شده می کند (URL, `pathname`, `<title>`, غیره). اگر یک دیدگاه منطبق پیدا نشد، ربات giscus به طور خودکار یک دیدگاه ایجاد می کند اولین بار که کسی دیدگاه یا واکنشی را ثبت می کند.

برای ثبت  دیدگاه به , بازدیدکنندگان باید [برنامه giscus][giscus-app] [دسترسی لازم][authorization] را بر اساس GitHub OAuth بدهند. یا اینکه, می توانند به طور مستقیم در گیت هاب نظر خود را درج کنند. شما می توانید نظرات را در گیت هاب مدیریت کنید.

[giscus]: https://giscus.app/fa
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

اگر از giscus استفاده می کنید, لطفا به ما [در گیت هاب ستاره بدهید 🌟][repo] و موضوع و تاپیک [`giscus`][giscus-topic] را [را به مخزن خود اضافه کنید][topic-howto]! 🎉

## نکات پیشرفته

شما می توانید تنظیمات پیشرفته (مثل دسترسی به یک آدرس خاص) را از طریق  [راهنمای پیشرفته][advanced-usage] استفاده کنید.

برای استفاده از giscus در React, Vue, یا Svelte, این آدرس را ببینید [giscus کتابخانه کامپوننت][giscus-component].

## مهاجرت

اگر قبلا از سیستمی استفاده می کردید که از GitHub Issues استفاده می کرد مثل ([utterances][utterances] یا [gitalk][gitalk]), شما می توانید [سیستم فعلی را به discussion گیت هاب تغییر بدهید][convert]. پس از تبدیل، فقط مطمئن شوید که نگاشت بین عناوین دیدگاه ها و صفحات صحیح است، سپس giscus به طور خودکار از دیدگاه ها استفاده می کند.

## سایت هایی که از giscus استفاده می کنند

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## مشارکت در کدنویسی

لطفا [CONTRIBUTING.md را ببینید][contributing]

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

این صفحه در زبان های دیگه هم ترجمه شده است:

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

[![قدرت گرفته از Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
