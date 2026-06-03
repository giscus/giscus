# [giscus][giscus]

एक टिप्पणियाँ प्रणाली है जो [GitHub Discussions][discussions] द्वारा सञ्चालित है। अतः आगंतुक आपकी वेबसाइट पर GitHub के माध्यम से टिप्पणियाँ तथा प्रतिक्रियाएँ छोड़ सकेंगे। यह परियोजना [utterances][utterances] से प्रचुर प्रेरित है।

- [मुक्त स्रोत][repo]. 🌏  
- न कोई अनुगमन, न विज्ञापन, सदैव निःशुल्क। 📡 🚫  
- किसी डेटाबेस की आवश्यकता नहीं। समस्त डेटा GitHub Discussions में संग्रहित रहता है। :octocat:  
- [कस्टम थीम][creating-custom-themes] का समर्थन करता है। 🌗  
- [अनेक भाषाओं][multiple-languages] का समर्थन करता है। 🌐  
- [व्यापक रूप से विन्यस्त][advanced-usage]। 🔧  
- स्वतः GitHub से नयी टिप्पणियाँ व संपादनों को प्राप्त करता है। 🔃  
- [स्वयं-होस्टिंग संभव][self-hosting]! 🤳

> **ध्यान**  
> giscus अभी सक्रिय विकास में है। GitHub स्वयं भी Discussions व उसके API पर सक्रिय रूप से विकास कर रहा है। अतः समय के साथ giscus की कुछ विशेषताएँ परिवर्तित या अस्थिर हो सकती हैं।

## यह कैसे कार्य करता है

जब giscus लोड होता है, तो पृष्ठ के लिए चुनी गई मिलान नीति (URL, `pathname`, `<title>`, आदि) के आधार पर सम्बद्ध Discussion खोजने हेतु [GitHub Discussions खोज API][search-api] का उपयोग होता है। यदि उपयुक्त मिलती-जुलती चर्चा न मिले, तो giscus बोट स्वचालित रूप से पहली टिप्पणी या प्रतिक्रिया के समय एक नई चर्चा बना देगा।

टिप्पणी करने हेतु, आगंतुकों को [giscus app][giscus-app] को GitHub OAuth फ्लो द्वारा [उनके प्रतिनिधि के रूप में पोस्ट करने हेतु अधिकृत][authorization] करना आवश्यक है। वैकल्पिक रूप से, आगंतुक प्रत्यक्षतः GitHub Discussion पर भी टिप्पणी कर सकते हैं। टिप्पणियों का moderation (नियमन) आप GitHub पर कर सकते हैं।

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

यदि आप giscus का उपयोग कर रहे हैं, तो कृपया GitHub पर giscus को स्टार देना विचार करें 🌟 और अपने संग्रह में [`giscus`][giscus-topic] विषय जोड़ना न भूलें! 🎉

## उन्नत उपयोग

आप अतिरिक्त विन्यास (उदा. विशिष्ट origins की अनुमति) जोड़ने के लिये [उन्नत उपयोग मार्गदर्शिका][advanced-usage] का अवलोकन कर सकते हैं।

React, Vue, या Svelte में giscus प्रयोग करने हेतु, [giscus कम्पोनेन्ट पुस्तकालय][giscus-component] देखें।

## स्थानान्तरण

यदि आपने पूर्व में ऐसे व्यवस्थाएँ उपयोग की हैं जो GitHub Issues का प्रयोग करती थीं (उदा. [utterances][utterances], [gitalk][gitalk]), तो आप मौजूदा Issues को [Discussions में परिवर्तित][convert] कर सकते हैं। रूपांतरणोपरांत, केवल यह सुनिश्चित करें कि चर्चा शीर्षकों तथा पृष्ठों का मिलान सम्मति में है — इसके पश्चात giscus स्वतः उन चर्चाओं का उपयोग कर लेगा।

## giscus का उपयोग करने वाली साइटें

- [laymonage.com][laymonage-website]  
- [os.phil-opp.com][os-phil-opp]  
- [Stats and R][statsandr]  
- [Tech Debt Burndown Podcast][techdebtburndown]  
- [**और भी कई!**][giscus-topic]

## योगदान

देखें [CONTRIBUTING.md][contributing]

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

यह README निम्न भाषाओं में उपलब्ध है:

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
- [हिन्दी](README.hi.md) 
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

[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
