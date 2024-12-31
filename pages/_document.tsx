import Document, { Html, Head, Main, NextScript } from 'next/document';
import { AvailableLanguage, getDir } from '../lib/i18n';
import { getThemeUrl, resolveTheme } from '../lib/utils';

class CustomDocument extends Document {
  render() {
    // Use the `theme` prop of the page if available
    // to immediately set the correct theme.
    const theme = this.props.__NEXT_DATA__.props.pageProps.theme;
    const resolvedTheme = resolveTheme(theme || 'preferred_color_scheme');
    const themeUrl = getThemeUrl(resolvedTheme, theme);

    return (
      <Html dir={getDir(this.props.locale as AvailableLanguage)}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://api.github.com" />
          <link rel="preconnect" href="https://avatars3.githubusercontent.com" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <meta name="color-scheme" content="light dark" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="stylesheet" href={themeUrl} crossOrigin="anonymous" id="giscus-theme" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
