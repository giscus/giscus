# [giscus][giscus]

A comments widget built on [GitHub Discussions][discussions]. Let visitors sign in with GitHub and leave comments on your website! Heavily inspired by [utterances][utterances].

- [Open source][repo]. 🌏
- No tracking, no ads, always free. 📡 🚫
- No database needed. All data is stored in GitHub Discussions. :octocat:
- GitHub themes: light, dark, dark dimmed, and more! 🌗
- Only ~40KB total chunks size. ⚡
- Automatically fetches new comments and edits from GitHub. 🔃
- Can be self-hosted! 🤳

> **Note:**\
> giscus is still under active development. GitHub is also still actively developing Discussions and its API. Thus, some features of giscus may break or change over time.

## how it works

When giscus loads, the [GitHub Discussions search API][search-api] is used to find the Discussion associated with the page based on a chosen mapping (URL, `pathname`, `<title>`, etc.). If a matching discussion cannot be found, the giscus bot will automatically create a discussion the first time someone comments.

To comment, visitors must authorize the [giscus app][giscus-app] to [post on their behalf][authorization] using the GitHub OAuth flow. Alternatively, visitors can comment on the GitHub Discussion directly. You can moderate the comments on GitHub.

## contributing

See [CONTRIBUTING.md][contributing]

[giscus]: https://giscus.vercel.app
[repo]: https://github.com/laymonage/giscus
[discussions]: https://docs.github.com/en/discussions
[utterances]: https://github.com/utterance/utterances
[search-api]: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search
[giscus-app]: https://github.com/apps/giscus
[authorization]: https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps
[contributing]: https://github.com/laymonage/giscus/blob/main/CONTRIBUTING.md
