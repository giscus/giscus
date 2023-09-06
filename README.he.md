# [giscus][giscus]

מערכת תגובות המופעלת על ידי [GitHub Discussions][discussions]. אפשר למבקרים להשאיר תגובות וסמלונים באתר שלך באמצעות GitHub! בהשראתו של [utterances][utterances].

- [קוד מקור][repo]. 🌏
- ללא מעקב, ללא פרסומות, ללא עלות לעולם. 📡 🚫
- לא נדרש מסד נתונים. כל הנתונים מאוחסנים ב-GitHub Discussions. :octocat:
- תמוך ב- [ערכות נושא מותאמות אישית][creating-custom-themes]! 🌗
- תמוך ב- [רב-לשוניות][multiple-languages]. 🌐
- [ניתן להגדרה באופן נרחב][advanced-usage]. 🔧
- מייבא באופן אוטומטי תגובות ועריכות חדשות מ-GitHub. 🔃
- [ניתן לארח באופן עצמאי][self-hosting]! 🤳

> **הערה**
> giscus נמצא כרגע בשלבי פיתוח. GitHub באופן דומה עדיין מפתחים באופן אקטיבי את מערכת הדיונים ואת ממשק תכנות היישומים (API). בשל כך, חלק מהמאפיינים של giscus עשויים להיתקל או להשתנות עם הזמן.

## איך זה עובד


כאשר giscus נטען, ה-[GitHub Discussions search API][search-api] משמש כדי למצוא את הדיון המשויך לדף בהתבסס על נתב שנבחר (כתובת אתר, שם נתיב, `<title>` וכדומה). אם לא נמצא דיון מתאים, הבוט של giscus יצור דיון באופן אוטומטי בפעם הראשונה שמישהו משאיר תגובה או סמלון.

בכדי להגיב, מבקרים חייבים לאשר את [אפליקציית giscus][giscus-app] ל[פרסם בשמם][authorization] באמצעות זרימת OAuth של GitHub. לחילופין, מבקרים יוכלי להגיב ישירות בדיון של GitHub. אתה יכול לנהל את התגובות ב-GitHub.

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

אתה משתמש ב-giscus? אתה מוזמן ללחוץ על [כפתור המצלה 🌟 במאגר giscus ב-GitHub][repo] ולהוסיף תגית [`giscus`][giscus-topic] [למאגר שלך][topic-howto]! 🎉

## שימוש מתקדם

אתה יכול להוסיף תצורות נוספות (למשל, התרת מקומות ספציפיים) על ידי שימוש ב[מדריך השימוש המתקדם][advanced-usage].

בכדי להשתמש ב-giscus עם ריאקט (React), ויו (Vue) או סוולט (Svelte), ראה את [ספריית הרכיבים של giscus][giscus-component].

## מעבר ממערכות אחרות

אם השתמשת בעבר במערכות אחרות המתוחזקות בידי GitHub (למשל, [utterances][utterances], [gitalk][gitalk]), אתה יכול [להמיר את התגובות הקיימות לדיונים][convert]. לאחר ההמרה, וודא שהמיפוי בין כותרות הדיון והעמודים נכון, ואז giscus ישתמש באופן אוטומטי בדיונים.

## אתרים שמשתמשים ב giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## תרום ל giscus

ראה [CONTRIBUTING.md][contributing]

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
דף זה זמין בשפות נוספות:

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

[![מופעל על ידי Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
