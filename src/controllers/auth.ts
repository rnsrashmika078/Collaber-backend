/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import type { ApiResponse, User } from "../types/index.ts";
import { createUser, getUser } from "../services/user.services.ts";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.ts";
import { statusCode } from "../config/statusCode.ts";
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, picture } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({ email, name, picture, password: hashed });

    return res.status(statusCode.CREATED).json({
      message: "User registration successful!",
      success: true,
      error: null,
      result: user,
    } as ApiResponse<User>);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "something went wrong";
    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong...",
      error: errorMessage,
      result: null,
      success: false,
    } as ApiResponse<null>);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: true,
        error: null,
        result: null,
      } as ApiResponse<null>);
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
      return res.status(400).json({
        message: "Wrong password! try again.",
        success: true,
        error: null,
        result: user,
      } as ApiResponse<User>);

    const payload = {
      email,
      name: user.name ?? "",
      picture: user.picture ?? "",
      id: user.id,
    };

    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "successfully logged in!",
      success: true,
      error: null,
      result: { accessToken, refreshToken, user: payload },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "something went wrong";
    return res.status(500).json({
      message: "Something went wrong...",
      error: errorMessage,
      result: null,
      success: false,
    } as ApiResponse<null>);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken)
      return res.status(statusCode.NOT_FOUND).json({
        message: "refresh token not found!",
        success: false,
        error: null,
        result: null,
      } as ApiResponse<null>);

    const user = verifyRefreshToken(refreshToken) as any;

    const newAccessToken = signAccessToken(user);
    const newRefreshToken = signRefreshToken(user);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "authentication refreshed!!",
      success: true,
      error: null,
      result: { newAccessToken, newRefreshToken, user },
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "something went wrong";
    console.log("ERROR MESSAGE", errorMessage);
    return res.status(500).json({
      message: "Something went wrong...",
      error: errorMessage,
      result: null,
      success: false,
    } as ApiResponse<null>);
  }
};
