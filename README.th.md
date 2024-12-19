# [giscus][giscus]

ระบบความคิดเห็นที่ขับเคลื่อนโดย [GitHub Discussions][discussions] ให้ผู้เยี่ยมชมแสดงความคิดเห็นและรีแอคชันบนเว็บไซต์ของคุณผ่าน GitHub! ได้รับแรงบันดาลใจอย่างมากจาก [utterances][utterances]

- [โอเพนซอร์ส][repo] 🌏
- ไม่มีตัวติดตาม, ไม่มีโฆษณา, ฟรีตลอดไป 📡 🚫
- ไม่ต้องมีฐานข้อมูล ข้อมูลทั้งหมดเก็บไว้ใน GitHub Discussions :octocat:
- รองรับ[ธีมที่กำหนดเอง][creating-custom-themes]! 🌗
- รองรับ[หลายภาษา][multiple-languages] 🌐
- [ปรับแต่งได้หลายอย่าง][advanced-usage] 🔧
- โหลดความคิดเห็นและการแก้ไขใหม่จาก GitHub อัตโนมัติ 🔃
- [โอสต์ด้วยตัวเองได้][self-hosting]! 🤳

> **หมายเหตุ**
> giscus ยังอยู่ในช่วงการพัฒนาอย่างต่อเนื่อง เหมือนกับ GitHub ที่พัฒนา Discussions และ API อย่างต่อเนื่องเช่นเดียวกัน ดังนั้นฟีเจอร์บางอย่างอาจหยุดทำงานหรือเปลี่ยนแปลงได้เสมอ

## ทำงานยังไง

เมื่อถูกโหลด giscus จะใช้ [API การค้นหาของ GitHub Discussions][search-api] เพื่อค้นหาการสนทนาของหน้าเว็บนั้นผ่านการเชื่อมโยงที่เลือกไว้ (URL, `pathname`, `<title>`, ฯลฯ) หากไม่พบการสนทนาที่ตรงกัน บอต giscus จะสร้างการสนทนาใหม่อัตโนมัติเมื่อมีผู้แสดงความคิดเห็นหรือรีแอคชันครั้งแรก

ในการแสดงความคิดเห็น ผู้เยี่ยมชมจะต้องอนุญาตให้ [แอป giscus][giscus-app] [โพสต์ในนามตนเอง][authorization] ผ่าน GitHub OAuth หรืออีกทางเลือกหนึ่ง ผู้เยี่ยมชมสามารถแสดงความคิดเห็นในการสนทนาบน GitHub ได้โดยตรง คุณสามารถจัดการความคิดเห็นได้บน GitHub

[giscus]: https://giscus.app/th
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

หากคุณกำลังใช้งาน giscus พิจารณา [ให้ดาว 🌟 giscus บน GitHub][repo] และเพิ่มหัวข้อ [`giscus`][giscus-topic] [ไปยังคลังเก็บของคุณ][topic-howto]! 🎉

## การใช้งานขั้นสูง

คุณสามารถเพิ่มการกำหนดค่าเพิ่มเติม (เช่น อนุญาตเฉพาะบางโดเมน) โดยทำตามขั้นตอนใน[คู่มือการใช้งานขั้นสูง][advanced-usage]

ในการใช้ giscus กับ React, Vue หรือ Svelte ดู[ไลบรารี giscus component][giscus-component]

## การย้ายข้อมูล

หากก่อนหน้านี้คุณใช้ระบบความคิดเห็นอื่นที่ใช้ GitHub Issues (เช่น [utterances][utterances], [gitalk][gitalk]) คุณสามารถ[แปลง issues ที่มีอยู่เป็นการสนทนาได้][convert] หลังจากการแปลง ตรวจสอบแน่ใจว่าตั้งค่าการเชื่อมโยงระหว่างหน้าเว็บและหัวข้อการสนทนาถูกต้อง จากนั้น giscus จะใช้การสนทนานั้นอัตโนมัติ

## เว็บไซต์ที่ใช้ giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**และอีกเพียบ!**][giscus-topic]

## การมีส่วนร่วม

ดู [CONTRIBUTING.md][contributing]

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

README นี้ในภาษาอื่น:

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

[![ขับเคลื่อนด้วย Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
