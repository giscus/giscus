export const env = {
  app_id: process.env.GITHUB_APP_ID,
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  installation_id: process.env.GITHUB_INSTALLATION_ID,
  token: process.env.GITHUB_TOKEN,
  private_key: process.env.GITHUB_PRIVATE_KEY,
  encryption_password: process.env.ENCRYPTION_PASSWORD,
};

export const themeOptions = [
  { label: 'GitHub Light', value: 'light' },
  { label: 'GitHub Dark', value: 'dark' },
  { label: 'GitHub Dark Dimmed', value: 'dark_dimmed' },
  { label: 'Transparent Dark', value: 'transparent_dark' },
  { label: 'Preferred color scheme', value: 'preferred_color_scheme' },
];
