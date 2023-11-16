// UserRegisterRequest.ts
export interface UserRegisterRequest {
  email: string;
  password: string;
  role: number;
  createdBy: number;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNo: string;
}

export interface UserRegisterResponse {
  UserId: number;
  Email: string;
  Role: string;
  Token: string;
}
