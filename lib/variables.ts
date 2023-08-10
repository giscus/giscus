export const env = {
  app_id: process.env.GITHUB_APP_ID,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  installation_id: process.env.GITHUB_INSTALLATION_ID,
  token: process.env.GITHUB_TOKEN,
  private_key: process.env.GITHUB_PRIVATE_KEY,
  encryption_password: process.env.ENCRYPTION_PASSWORD,
  app_host: process.env.NEXT_PUBLIC_GISCUS_APP_HOST as `https://${string}`,
  revalidate_first_page: process.env.NEXT_PUBLIC_REVALIDATE_FIRST_PAGE !== 'false',
  origins: JSON.parse(process.env.ORIGINS || '[]') as string[],
  origins_regex: JSON.parse(process.env.ORIGINS_REGEX || '[]') as string[],
} as const;

export const availableThemes = [
  'light',
  'light_high_contrast',
  'light_protanopia',
  'light_tritanopia',
  'dark',
  'dark_high_contrast',
  'dark_protanopia',
  'dark_tritanopia',
  'dark_dimmed',
  'preferred_color_scheme',
  'transparent_dark',
  'noborder_light',
  'noborder_dark',
  'cobalt',
  'purple_dark',
  'custom',
] as const;

export type AvailableTheme = (typeof availableThemes)[number];

export type Theme = AvailableTheme | `/${string}` | `https://${string}`;
