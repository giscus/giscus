# advanced usage

This guide highlights advanced usage of giscus through additional
configurations.

- [`giscus.json`](#giscusjson)
  - [`origins`](#origins)
  - [`originsRegex`](#originsregex)
- [`data-` attributes](#data--attributes)
  - [`data-theme`](#data-theme)

## `giscus.json`

Additional configurations can be made by creating a `giscus.json` file at
the root of your repository. You can see an example
[on this repository][giscus.json]. The `giscus.json` file supports the
following keys:

- [`origins`](#origins)
- [`originsRegex`](#originsregex)

### `origins`

You can restrict the domains that can load giscus with your repository's
discussions using the `origins` key. The `origins` key accepts a list of
strings that will be checked against the `window.origin` of the page that loads
giscus. The strings are compared using the following code.

```js
string === window.origin
```

You can combine `origins` with [`originsRegex`](#originsregex). If none of the
strings in `origins` and `originsRegex` match `window.origin`, then giscus will
refuse to load. If `origins` and `originsRegex` are both empty lists (or
undefined), giscus will proceed to load the discussion.

Example `giscus.json`:

```json
{
  "origins": ["https://giscus.app"]
}
```

### `originsRegex`

Like [`origins`](#origins), but it accepts a list of regular expression
patterns to test the origin. The test is done using the following code.

```js
new RegExp(pattern).test(window.origin)
```

Example `giscus.json`:

```json
{
  "origins": ["https://giscus.app"],
  "originsRegex": ["http:\/\/localhost:[0-9]+"]
}
```

## `data-` attributes

Some of the `data-` attributes of the `<script>` tag may be used to further
customize giscus.

### `data-theme`

Instead of the built-in themes, you can supply a URL to a CSS file as the value
for the `data-theme` attribute. The URL will be used by giscus to construct a
`<link rel="stylesheet">` element as the last child of the `<head>` element.

For example, given the following `<script>` tag:

```html
<script src="https://giscus.app/client.js"
        data-repo="laymonage/giscus"
        ...
        data-theme="https://giscus.app/themes/custom_example.css"
        ...>
</script>
```

then giscus will add the following element:


```html
<link id="giscus-theme" rel="stylesheet" crossorigin="anonymous" href="https://giscus.app/themes/custom_example.css">
```

Please note that loading an external CSS file **may be unsafe**. Make sure that
you trust the author and provider of the CSS file. We are not responsible if
the CSS file that you use opens a security vulnerability to giscus users on
your website. Make sure that your users are aware of this.

For more details, see [creating new themes][creating-new-themes].

[giscus.json]: giscus.json
[creating-new-themes]: https://github.com/laymonage/giscus/blob/main/CONTRIBUTING.md#creating-new-themes
