# Self-hosting

To self-host giscus, you need to create a new [GitHub App][app-doc] and deploy
the web app. You can use this guide as a reference.

- [Create a new GitHub App](#create-a-new-github-app)
  - [Register new GitHub App](#register-new-github-app)
  - [Identifying and authorizing users](#identifying-and-authorizing-users)
  - [Post installation](#post-installation)
  - [Webhook](#webhook)
  - [Repository permissions](#repository-permissions)
  - [Organization permissions](#organization-permissions)
  - [User permissions](#user-permissions)
  - [Create GitHub App](#create-github-app)
- [Generate a private key](#generate-a-private-key)
- [Generate a client secret](#generate-a-client-secret)
- [Copy App ID and Client ID](#copy-app-id-and-client-id)
- [Install the app](#install-the-app)
- [Configure Supabase for caching access tokens (optional)](#configure-supabase-for-caching-access-tokens-optional)
- [Deploy giscus](#deploy-giscus)
- [Use the deployed self-hosted giscus](#use-the-deployed-self-hosted-giscus)

## Create a new GitHub App

- Go to the [GitHub App creation page][create-app].

### Register new GitHub App

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402077-837f3100-c36b-11eb-93d6-12fb0710ce46.png)

  - Feel free to name it whatever you want (e.g. `myblog-comments`). I would
    appreciate it if you indicate that it is a self-hosted version of
    [giscus][giscus] (with the link) in the description.
  - Use `https://giscus.app` as the homepage URL unless you also accept any
    users to use your service on their repositories.

### Identifying and authorizing users

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402124-9f82d280-c36b-11eb-940c-41606361b0d6.png)

  - Use `https://[YOUR-DOMAIN-HERE]/api/oauth/authorized` as the authorization
    callback URL, e.g. `https://giscus.app/api/oauth/authorized`.
  - **Do not** check "**Expire user authorization tokens**", as giscus
    currently does not support it.

    > You can change [**`TOKEN_VALIDITY_PERIOD`**][token-validity-period] in
    > the code instead, which will automatically revoke user tokens and sign
    > them out after that period.

  - Do not check "**Request user authorization (OAuth) during installation**".

### Post installation

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402191-c6410900-c36b-11eb-9f07-81f63f5e685d.png)

  - Not needed.

### Webhook

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402232-deb12380-c36b-11eb-9e8c-31abcdc0de52.png)

  - Not needed. Uncheck "**Active**".

### Repository permissions

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402331-25068280-c36c-11eb-8be4-b4e58e64add4.png)

  - Enable "Read & write" access for "**Discussions**". This is the only
    permission that you need, leave everything else as-is.

### Organization permissions

- \
  ![image](https://user-images.githubusercontent.com/6379424/120402893-5d5a9080-c36d-11eb-9aa4-2f742c7a3df1.png)

  - Not needed.

### User permissions

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403034-9abf1e00-c36d-11eb-8242-707989d750ee.png)

  - You don't need to change anything in this section. Leave "**Where can this
    GitHub App be installed?**" set to "**Only on this account**", unless you
    also accept any users to use your service on their repositories.

### Create GitHub App

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403234-fdb0b500-c36d-11eb-9cea-9879497cd3d6.png)

  - Click the button.

## Generate a private key

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403315-29339f80-c36e-11eb-93c1-c63bd588bdb9.png)

  - Upon registration, you will need to create a private key in order to
    install the app.

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403155-d78b1500-c36d-11eb-856a-05f073b3b385.png)

  - Click the button.

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403403-4f593f80-c36e-11eb-8fe9-670d891e48ac.png)

  - The private key will be downloaded to your device.

## Generate a client secret

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403617-bd056b80-c36e-11eb-8f6f-c2063156c0e6.png)

  - Click the "**Generate a new client secret**" button.

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403738-05bd2480-c36f-11eb-9161-915b0c8a8171.png)

  - Copy your client secret and store it somewhere safe.

## Copy App ID and Client ID

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403799-27b6a700-c36f-11eb-9e49-68270f3b4b6a.png)

  - Copy the "**App ID**" and "**Client ID**" values and store them somewhere.

## Install the app

- \
  ![image](https://user-images.githubusercontent.com/6379424/120403963-84b25d00-c36f-11eb-9a71-534fac375a08.png)

  - Click on the "**Install App**" sidebar menu and click on the "**Install**"
    button on your account.

- \
  ![image](https://user-images.githubusercontent.com/6379424/120404133-e2df4000-c36f-11eb-9534-dafac693345d.png)

  - Choose "**Only select repositories**" and select the repositories where
    giscus will be installed on.

    > Alternatively, you can choose "**All repositories**". However, note that
    > this will grant the app access to all of your repositories' discussions,
    > **including private ones**. This also means that anyone can use the app
    > to read and post any discussions in your repositories, as long as they
    > know the repository names.

- \
  ![image](https://user-images.githubusercontent.com/6379424/120404432-8deff980-c370-11eb-86ea-ef2ead3d9667.png)

  - Click the button.

## Configure Supabase for caching access tokens (optional)

GitHub App installation access tokens have a 60 minute TTL. You can configure
giscus to cache the tokens in a Supabase table. This reduces the number of
token requests to GitHub, which helps prevent the app from hitting the rate
limit.

- Log in to [Supabase][supabase].
- Create a new project.
- Create a new table within the project. The table name can be arbitrary, but
  giscus uses `installation_access_tokens` as the default.
- Use the following schema for the table: \
  ![image](https://user-images.githubusercontent.com/6379424/136653256-eca294a4-45cd-4c58-afd1-957493cff76d.png)
  ```
  installation_id: int8, no default value, primary key, uncheck Is Identity
  token: varchar, no default value
  expires_at: timestamptz, no default value
  created_at: timestamptz, default value NOW()
  updated_at: timestamptz, default value NOW()

  None of the columns are nullable (uncheck Is Nullable via the gear icon).
  Only installation_id is the primary key.
  ```
- Take note of your Supabase project's URL (`https://xxxxx.supabase.co`) and
  your API key.
- Make sure that you either:
  - Disable Row Level Security (RLS) on the table, or
  - Use the secret `service_role` API key.

## Deploy giscus

The [giscus.app][giscus] website is hosted on [Vercel][vercel], but you can
deploy it anywhere that can run a Next.js application and its serverless
functions.

- Clone the repository.
- Generate a random string with a reasonable length (e.g. 64 characters) that
  will be used to encrypt the user token.
- Set the [example environment variables][env-example] in your
  deployment and change the values accordingly. On a server, you can put them in
  a `.env.local` file and Next.js will automatically pick it up.

- Install the dependencies.

  ```
  yarn install
  ```

- Build the application.

  ```
  yarn build
  ```

- Start the server.

  ```
  yarn start
  ```

## Use the deployed self-hosted giscus

- You can use the main page of the website to generate the client script
  configurations (e.g. `data-repo-id`, `data-category-id`) just like on
  [giscus.app][giscus].
- Include the script tag to your webpage. Make sure you use the client script
  that is hosted from your deployment.

If you have any questions, ask them on the Q&A [discussion][discussion]. If you
encounter any problems, [create a new issue][new-issue].

[app-doc]: https://docs.github.com/apps/building-integrations
[create-app]: https://github.com/settings/apps/new
[giscus]: https://giscus.app
[token-validity-period]: https://github.com/giscus/giscus/blob/main/pages/api/oauth/authorized.ts#L6
[supabase]: https://supabase.io
[vercel]: https://vercel.com
[env-example]: .env.example
[api-routes]: pages/api
[services]: services
[cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[next-export]: https://nextjs.org/docs/advanced-features/static-html-export
[configuration]: https://github.com/giscus/giscus/blob/main/components/Configuration.tsx#L320
[discussion]: https://github.com/giscus/giscus/discussions/categories/q-a
[new-issue]: https://github.com/giscus/giscus/issues/new
