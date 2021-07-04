# advanced usage

This guide highlights advanced usage of giscus through additional
configurations.

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

[giscus.json]: giscus.json
