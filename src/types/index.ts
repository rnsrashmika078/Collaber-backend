export type JwtPayload = {
  id: number;
  email: string;
  role: "user";
};
export type User = {
  id?: number;
  email: string;
  name: string;
  picture?: string;
  password?: string;
};
export type ApiResponse<T> = {
  message: string;
  error: string | null;
  result: T;
  success: boolean;
};
export type MiddlewareResponse = {
  message: string;
  error: string | null;
};

