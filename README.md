# [giscussions][giscussions]

A comments widget built on [GitHub Discussions][discussions]. Let visitors sign in with GitHub and leave comments on your website! Heavily inspired by [utterances][utterances].

- [Open source][repo]. 🌏
- No tracking, no ads, always free. 📡 🚫
- No database needed. All data is stored in GitHub Discussions. :octocat:
- GitHub themes: light, dark, dark dimmed, and more! 🌗
- Only ~30KB bundled. ⚡
- Can be self-hosted! 🤳

> **Note:**\
> giscussions is still under active development. GitHub is also still actively developing Discussions and its API. Thus, some features of giscussions may break or change over time.

## how it works

When giscussions loads, the [GitHub Discussions search API][search-api] is used to find the Discussion associated with the page based on a chosen mapping (URL, `pathname`, `<title>`, etc.). If a matching discussion cannot be found, the giscussions bot will automatically create a discussion the first time someone comments.

To comment, visitors must authorize the [giscussions app][giscussions-app] to [post on their behalf][authorization] using the GitHub OAuth flow. Alternatively, visitors can comment on the GitHub Discussion directly. You can moderate the comments on GitHub.

## contributing

See [CONTRIBUTING.md][contributing]

[giscussions]: https://giscussions.vercel.app
[repo]: https://github.com/laymonage/giscussions
[discussions]: https://docs.github.com/en/discussions
[utterances]: https://github.com/utterance/utterances
[search-api]: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions#search
[giscussions-app]: https://github.com/apps/giscussions
[authorization]: https://docs.github.com/en/developers/apps/identifying-and-authorizing-users-for-github-apps
[contributing]: https://github.com/laymonage/giscussions/blob/main/CONTRIBUTING.md
