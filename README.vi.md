# [giscus][giscus]

Hệ thống bình luận được cung cấp bởi [GitHub Discussions][discussions]. Hãy để mọi người truy cập để lại bình luận và reactions trên website của bạn thông qua GitHub! Truyền cảm hứng bởi [utterances][utterances].

- [Open source][repo]. 🌏
- Không theo dõi, không có quảng cáo, luôn luôn miễn phí. 📡 🚫
- Không cần cơ sở dữ liệu. Tất cả dữ liệu được lưu trữ trong GitHub Discussions. :octocat:
- Hỗ trợ [tuỳ chỉnh themes][creating-custom-themes]! 🌗
- Hỗ trợ [đa ngôn ngữ][multiple-languages]. 🌐
- [Extensively configurable][advanced-usage]. 🔧
- Tự động tìm nạp các nhận xét và chỉnh sửa mới từ GitHub. 🔃
- [Có thể tự lưu trữ][self-hosting]! 🤳

> **Chú thích:**\
> giscus vẫn đang được phát triển tích cực. GitHub cũng vẫn đang tích cực phát triển Discussions và API của nó. Do đó, một số tính năng của giscus có thể bị lỗi hoặc thay đổi theo thời gian.

## Cách mà Giscus hoạt động

Khi giscus loads, [GitHub Discussions tìm kiếm API][search-api] được sử dùng để tìm Discussion được liên kết với trang dựa trên mapping đã chọn(URL, `pathname`, `<title>`, v.v..). Nếu không tìm thấy discussion phù hợp, bot giscus sẽ tự động tạo discussion vào lần đầu tiên ai đó để lại bình luận hoặc reaction.

Để mà bình luận, người muốn bình luận phải authorize cho [giscus app][giscus-app] thành [đăng trên danh nghĩa của họ][authorization] sử dụng luồng OAuth của GitHub. Ngoài ra, khách truy cập có thể nhận xét trực tiếp trên Discussion GitHub. Bạn có thể kiểm duyệt các bình luận trên GitHub.

[giscus]: https://giscus.app/vi
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

Nếu bạn đang sử dụng giscus, hãy cân nhắc [tặng 🌟 giscus trên GitHub][repo] và thêm [`giscus`][giscus-topic] topic [đến repository của bạn][topic-howto]! 🎉

## Cách sử dụng nâng cao

Bạn có thể thêm các cài đặt bổ sung (ví dụ: allowing specific origins) bằng cách làm theo [hướng dẫn sử dụng nâng cao][advanced-usage].

Để sử dụng giscus với React, Vue hoặc Svelte, hãy xem ở đây [Thư viện giscus component][giscus-component].

## Migrating

Nếu trước đây bạn đã sử dụng các hệ thống khác sử dụng GitHub Issues(ví dụ như: [utterances][utterances], [gitalk][gitalk]), Bạn có thể [chuyển đổi các issues hiện có thành discussions][convert]. Sau khi chuyển đổi, chỉ cần đảm bảo rằng việc mapping giữa các tiêu đề discussion và các trang là chính xác, sau đó giscus sẽ tự động sử dụng các discussion.

## Các website sử dụng giscus

- [laymonage.com][laymonage-website]
- [os.phil-opp.com][os-phil-opp]
- [Stats and R][statsandr]
- [Tech Debt Burndown Podcast][techdebtburndown]
- [**and many more!**][giscus-topic]

## Contributing

Xem [CONTRIBUTING.md][contributing]

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

README này có sẵn trong:

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


[![Powered by Vercel](public/powered-by-vercel.svg)][vercel]

[vercel]: https://vercel.com/?utm_source=giscus&utm_campaign=oss
