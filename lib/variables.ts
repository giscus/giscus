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

export const availableThemes = [
  'light',
  'light_high_contrast',
  'light_protanopia',
  'dark',
  'dark_high_contrast',
  'dark_protanopia',
  'dark_dimmed',
  'transparent_dark',
  'preferred_color_scheme',
  'custom',
] as const;

export type AvailableTheme = typeof availableThemes[number];

export type Theme = AvailableTheme | `/${string}` | `https://${string}`;
