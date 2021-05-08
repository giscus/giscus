# giscussions

A comments widget built on [GitHub Discussions][discussions]. Let visitors sign in with GitHub and leave comments on your website! Heavily inspired by [utterances][utterances].

- Open source. 🌏
- No tracking, no ads, always free. 📡 🚫
- No database needed. All data is stored in GitHub Discussions. :octocat:
- GitHub themes: light, dark, dark dimmed, and more! 🌗
- Only ~30KB bundled. ⚡
- Can be self-hosted! 🤳

> **Note:**
> giscussions is still in the early stages and under active development. GitHub is also still actively developing Discussions and its API. Thus, some features of giscussions may break or change over time.

## how it works

When giscussions loads, the GitHub Discussions search API is used to find the Discussion associated with the page based on a chosen mapping (URL, `pathname`, `<title>`, etc.).

To comment, visitors must authorize the giscussions app to post on their behalf using the GitHub OAuth flow. Alternatively, visitors can comment on the GitHub Discussion directly. You can moderate the comments on GitHub.

[discussions]: https://docs.github.com/en/discussions
[utterances]: https://github.com/utterance/utterances
