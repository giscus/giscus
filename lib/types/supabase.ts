export interface InstallationAccessToken {
  installation_id: number;
  token: string;
  expires_at: string;
  created_at?: string;
  updated_at?: string;
}
