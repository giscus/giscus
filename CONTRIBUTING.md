# Contributing

Thanks for considering to contribute!

GitHub currently requires authentication for all GraphQL API requests. With
the way giscussions works, you'll need to create a GitHub App in order to get
it running on your machine. This makes contributing to giscussions a bit
tricky.

For some of giscussions' features, you can use your personal access token
(PAT) to authenticate with GitHub.

I haven't been able to write a thorough guide on this, but you can try to
figure things out from the code. There are also environment variable examples
in [`.env.example`][env-example].

## Setup

This project is built with [Next.js][next.js]. To get started:

1. `yarn`: install dependencies
2. `yarn dev`: compile and hot-reload for development
3. `yarn build`: compile and minify for production
4. `yarn lint`: lint and fix files
5. `yarn start`: serve the compiled build in production mode

## Creating new themes

Create a new file in [`styles/themes`][themes-dir]. The file name (without
`.css`) will be the theme's key. You can use the other theme files as reference.
A lot of the variables aren't actually used, but I haven't found a way to
remove them reliably. (I've tried PurgeCSS but it didn't play well with the
setup.)

Once you've added the theme file, add the key and name to `themeOptions` in
[`lib/variables.ts`][variables] so that it shows up in the setup guide.

[env-example]: .env.example
[next.js]: https://github.com/vercel/next.js
[themes-dir]: styles/themes
[variables]: lib/variables.ts
