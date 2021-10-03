export const env = {
  app_id: process.env.GITHUB_APP_ID,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  installation_id: process.env.GITHUB_INSTALLATION_ID,
  token: process.env.GITHUB_TOKEN,
  private_key: process.env.GITHUB_PRIVATE_KEY,
  encryption_password: process.env.ENCRYPTION_PASSWORD,
  origins: JSON.parse(process.env.ORIGINS || '[]') as string[],
  origins_regex: JSON.parse(process.env.ORIGINS_REGEX || '[]') as string[],
} as const;

export const Theme = {
  light: 'GitHub Light',
  dark: 'GitHub Dark',
  dark_dimmed: 'GitHub Dark Dimmed',
  dark_high_contrast: 'GitHub Dark High Contrast',
  dark_protanopia: 'GitHub Dark Colorblind',
  light_protanopia: 'GitHub Light Colorblind',
  transparent_dark: 'Transparent Dark',
  preferred_color_scheme: 'Preferred color scheme',
  custom: 'Custom (experimental)',
} as const;

export type Theme = keyof typeof Theme | `/${string}` | `https://${string}`;
