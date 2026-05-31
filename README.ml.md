# [giscus][giscus]

GitHub Discussions-ൽ പ്രവർത്തിക്കുന്ന ഒരു കമന്റ് സിസ്റ്റം. സന്ദർശകർക്ക് GitHub വഴി നിങ്ങളുടെ വെബ്സൈറ്റിൽ കമന്റുകളും പ്രതികരണങ്ങളും വിടാൻ അനുവദിക്കുന്നു! ഇത് [utterances][utterances] എന്ന പ്രോജക്ടിൽ നിന്നുള്ള ശക്തമായ പ്രചോദനമാണ്.

- [ഓപ്പൺ സോഴ്‌സ്][repo]. 🌏
- ട്രാക്കിംഗ് ഇല്ല, പരസ്യങ്ങൾ ഇല്ല, എല്ലായ്പ്പോഴും സൗജന്യം. 📡 🚫
- ഡാറ്റാബേസ് ആവശ്യമില്ല. എല്ലാ ഡാറ്റയും GitHub Discussions-ൽ സൂക്ഷിക്കുന്നു. :octocat:
- [കസ്റ്റം തീമുകൾ][creating-custom-themes] പിന്തുണയ്ക്കുന്നു! 🌗
- [ബഹുഭാഷാ പിന്തുണ][multiple-languages]. 🌐
- [വ്യാപകമായി ക്രമീകരിക്കാവുന്നതാണ്][advanced-usage]. 🔧
- GitHub-ൽ നിന്നുള്ള പുതിയ കമന്റുകളും എഡിറ്റുകളും സ്വയം എടുക്കുന്നു. 🔃
- [സ്വയം ഹോസ്റ്റ് ചെയ്യാവുന്നതാണ്][self-hosting]! 🤳

> **കുറിപ്പ്**
> giscus ഇപ്പോഴും സജീവ വികസനത്തിലാണ്. GitHub-ഉം Discussions-ഉം അതിന്റെ API-ഉം സജീവമായി വികസിപ്പിച്ചുകൊണ്ടിരിക്കുകയാണ്. അതിനാൽ, giscus-ന്റെ ചില ഫീച്ചറുകൾ സമയത്തിനൊപ്പം തകരാറിലാകുകയോ മാറ്റപ്പെടുകയോ ചെയ്യാം.

## ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു

giscus ലോഡ് ചെയ്യുമ്പോൾ, തിരഞ്ഞെടുക്കപ്പെട്ട മാപ്പിംഗിന്റെ (URL, `pathname`, `<title>` തുടങ്ങിയവ) അടിസ്ഥാനത്തിൽ പേജുമായി ബന്ധപ്പെട്ട Discussion കണ്ടെത്താൻ [GitHub Discussions search API][search-api] ഉപയോഗിക്കുന്നു. പൊരുത്തമുള്ള ഒരു discussion കണ്ടെത്താൻ കഴിയാത്ത പക്ഷം, ആദ്യമായി ആരെങ്കിലും ഒരു കമന്റ് അല്ലെങ്കിൽ പ്രതികരണം വിടുമ്പോൾ giscus ബോട്ട് സ്വയം ഒരു discussion സൃഷ്ടിക്കും.

കമന്റ് ചെയ്യാൻ, സന്ദർശകർ [giscus app][giscus-app]-നെ GitHub OAuth ഫ്ലോ ഉപയോഗിച്ച് അവരുടെ പേരിൽ [പോസ്റ്റ് ചെയ്യാൻ അനുമതി നൽകണം][authorization]. അല്ലെങ്കിൽ, സന്ദർശകർ നേരിട്ട് GitHub Discussion-ൽ കമന്റ് ചെയ്യാം. GitHub-ൽ നിങ്ങൾ കമന്റുകൾ മോദറേറ്റ് ചെയ്യാവുന്നതാണ്.

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

നിങ്ങൾ giscus ഉപയോഗിക്കുന്നുവെങ്കിൽ, GitHub-ൽ giscus-ന് ഒരു [⭐ സ്റ്റാർ][repo] നൽകാനും നിങ്ങളുടെ റിപോസിറ്ററിയിൽ [`giscus`][giscus-topic] ടോപ്പിക് ചേർക്കാനും പരിഗണിക്കുക! 🎉

## ഉയർന്ന തലത്തിലുള്ള ഉപയോഗം

കൂടുതൽ കോൺഫിഗറേഷനുകൾ (ഉദാഹരണത്തിന് പ്രത്യേക origins അനുവദിക്കൽ) ചേർക്കാൻ [advanced usage guide][advanced-usage] പിന്തുടരുക.

giscus-നെ React, Vue, അല്ലെങ്കിൽ Svelte-ൽ ഉപയോഗിക്കാൻ [giscus component library][giscus-component] പരിശോധിക്കുക.

## മൈഗ്രേഷൻ

മുമ്പ് GitHub Issues ഉപയോഗിച്ചിരുന്ന മറ്റ് സിസ്റ്റങ്ങൾ (ഉദാഹരണത്തിന് [utterances][utterances], [gitalk][gitalk]) ഉപയോഗിച്ചിരുന്നെങ്കിൽ, നിലവിലുള്ള issues-നെ discussions-ലേക്ക് [മാറ്റം ചെയ്യാവുന്നതാണ്][convert]. മാറ്റം കഴിഞ്ഞ്, discussion ശീർഷകങ്ങളും പേജുകളുമായുള്ള മാപ്പിംഗ് ശരിയാണെന്ന് ഉറപ്പാക്കുക; അതിനുശേഷം giscus സ്വയം ആ discussions ഉപയോഗിക്കും.

## giscus ഉപയോഗിക്കുന്ന സൈറ്റുകൾ

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- **മറ്റും നിരവധി!** [giscus-topic]

## സംഭാവനകൾ

കൂടുതൽ വിവരങ്ങൾക്ക് [CONTRIBUTING.md][contributing] കാണുക.

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

ഈ README താഴെപ്പറയുന്ന ഭാഷകളിൽ ലഭ്യമാണ്:

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
- [മലയാളം](README.ml.md)
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

