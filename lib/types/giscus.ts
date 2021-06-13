export interface ITokenRequest {
  session: string;
}

export interface ITokenResponse {
  token: string;
}

export interface RepoConfig {
  origins?: string[];
  originsRegex?: string[];
}
