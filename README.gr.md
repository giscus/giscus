# [giscus][giscus]

Ένα σύστημα σχολιασμού που λειτουργεί με τις [Συζητήσεις (Discussions) του GitHub][discussions]. Επιτρέψτε στους επισκέπτες να σχολιάσουν και να αντιδράσουν μέσω του GitHub! Εμπνευσμένο απο [utterances][utterances].

- [Ανοικτού κώδικα][repo]. 🌏
- Χωρίς ιχνηλασία, χωρίς διαφημίσεις, για πάντα δωρεάν. 📡 🚫
- Δεν απαιτείται βάση δεδομένων. Όλα τα δεδομένα αποθηκεύονται στις Συζητήσεις του GitHub. :octocat:
- Υποστηρίζει [προσαρμοσμένα θέματα][creating-custom-themes]! 🌗
- Υποστηρίζει [πολλαπλές γλώσσες][multiple-languages]. 🌐
- [Πλήρως παραμετροποιήσιμο][advanced-usage]. 🔧
- Αυτόματα αντλεί νέα σχόλια και επεξεργασμένα σχόλια από το GitHub. 🔃
- [Μπορεί να είναι αυτο-φιλοξενούμενο][self-hosting]! 🤳

> **Σημείωση**
> Το giscus είναι ακόμα σε ενεργή ανάπτυξη. Το GitHub επίσης αναπτύσει ενεργά τις συζητήσεις και το API τους. Γι' αυτό το λόγο, μερικές λειτουργικότητες του giscus ίσως να μην λειτουργούν σωστά η να αλλάξουν αργότερα.

## Πώς λειτουργεί

Όταν το giscus φορτώσει, τα [API αναζήτησης των GitHub Συζητήσεων][search-api] χρησιμοποιείται για να αναζητήσει τις Συζητήσεις που σχετίζονται με τη σελίδα βάση της επιλεγμένης αντιστοίχισης (URL, `pathname`, `<title>`, κ.τ.λ.). Αν δεν μπορεί να βρεθεί καμία μέθοδος αντιστοίχισης, το giscus bot θα δημιουργήσει αυτόματα μια συζήτηση την πρώτη φορά που κάποιος θα καταγράψει ένα σχόλιο ή μια αντίδραση.

Για να μπορέσουν να σχολιάσουν, οι επισκέπτες θα πρέπει να εξουσιοδοτήσουν την [εφαρμογή giscus][giscus-app] ώστε να [αναρτά περιεχόμενο γι αυτούς][authorization] χρησιμοποιώντας τη ροή OAuth του GitHub. Εναλλακτικά, οι επισκέπτες μπορούν να σχολιάσουν απ'ευθείας στις Συζητήσεις του GitHub. Μπορείτε να διαχειριστείτε τα σχόλια στο GitHub.

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

Εαν χρησιμοποιείτε το giscus, μπορείτε να [βάλετε στα αγαπημένα 🌟 το giscus στο GitHub][repo] και να προσθέσετε το [`giscus`][giscus-topic] θέμα [στο αποθετήριό σας][topic-howto]! 🎉

## Προχωρημένη χρήση

Μπορείτε να προσθέσετε επιπλέον ρυθμίσεις (π.χ. να επιτρέψετε συγκεκριμένες πηγές) ακολουθώντας τον [οδηγό προχωρημένης χρήσης][advanced-usage].

Για να χρησιμοποιήσετε το giscus με React, Vue, ή Svelte, δείτε τη [βιβλιοθήκη στοιχείων του giscus][giscus-component].

## Μεταφορά

Εαν έχετε χρησιμοποιήσει στο παρελθόν άλλα συστήματα που βασίζονται στα GitHub Ζητήματα (Issues) (π.χ. [utterances][utterances], [gitalk][gitalk]), μπορείτε να [μετατρέψετε τα υπάρχοντα ζητήματα σε συζητήσεις][convert]. Μετά τη μετατροπή, βεβαιωθείτε οτι η αντιστοιχία μεταξύ των τίτλων των συζητήσεων και των σελίδων είναι σωστές, έπειτα το giscus αυτόματα θα χρησιμοποιήσει τις συζητήσεις.

## Σελίδες που χρησιμοποιούν το giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**και πολλές ακόμη!**][giscus-topic]

## Συνεισφορά

Δείτε το [CONTRIBUTING.md][contributing]

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

Το README είναι διαθέσιμο σε:

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

[![Με την υποστήριξη του Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
