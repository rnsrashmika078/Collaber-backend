import jwt from "jsonwebtoken";
import { User } from "../types";

export const signAccessToken = (payload: User) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "30m",
  });
};
export const signRefreshToken = (payload: User) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
};
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};
