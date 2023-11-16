// UserLoginRequest.ts
export interface UserLoginRequest {
  emial: string;
  password: string;
}

// UserLoginResponse.ts
export interface UserLoginResponse {
  userId: number;
  email: string;
  role: string;
  token: string;
}
