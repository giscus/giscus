export const env = {
  app_id: process.env.GITHUB_APP_ID,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  installation_id: process.env.GITHUB_INSTALLATION_ID,
  token: process.env.GITHUB_TOKEN,
  private_key: process.env.GITHUB_PRIVATE_KEY,
  encryption_password: process.env.ENCRYPTION_PASSWORD,
};

export const Theme = {
  light: 'GitHub Light',
  dark: 'GitHub Dark',
  dark_dimmed: 'GitHub Dark Dimmed',
  dark_high_contrast: 'GitHub Dark High Contrast',
  transparent_dark: 'Transparent Dark',
  preferred_color_scheme: 'Preferred color scheme',
} as const;

export type Theme = keyof typeof Theme;
