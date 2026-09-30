export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  role: string;
}
