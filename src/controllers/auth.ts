/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import { createHash, randomBytes } from "node:crypto";
import type { ApiResponse, User } from "../types/index.ts";
import {
  createUser,
  getUser,
  getUserByResetToken,
  setUserResetToken,
  updateUserPassword,
} from "../services/user.services";
import bcrypt from "bcrypt";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { sendEmail } from "../utils/mailer";

import { statusCode } from "../config/statusCode";
export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      library_name,
      library_address_lane1,
      library_address_lane2,
      library_address_lane3,
      library_contact_mobile,
      library_contact_landline,
      library_establishment_date,
      library_incorporation_act,
      library_type,
      library_nature,
      officer_name,
      officer_designation,
      officer_email,
      officer_contact_number,
      officer_whatsapp_number,
      institution_name,
      head_of_institution,
      institution_address_lane1,
      institution_address_lane2,
      institution_address_lane3,
      institution_contact_mobile,
      institution_whatsapp,
    } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await createUser({
      email,
      password: hashed,
      library_name,
      library_address_lane1,
      library_address_lane2,
      library_address_lane3,
      library_contact_mobile,
      library_contact_landline,
      library_establishment_date: library_establishment_date
        ? new Date(library_establishment_date)
        : null,
      library_incorporation_act,
      library_type,
      library_nature,
      officer_name,
      officer_designation,
      officer_email,
      officer_contact_number,
      officer_whatsapp_number,
      institution_name,
      head_of_institution,
      institution_address_lane1,
      institution_address_lane2,
      institution_address_lane3,
      institution_contact_mobile,
      institution_whatsapp,
    });

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

export const signout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.status(statusCode.SUCCESS).json({
      message: "successfully logged out!",
      success: true,
      error: null,
      result: null,
    } as ApiResponse<null>);
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
      name: user.officer_name ?? user.name ?? user.library_name ?? "",
      library_name: user.library_name ?? "",
      picture: user.picture ?? user.image_url ?? "",
      id: user.id,
      role: user.role,
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

    const decoded = verifyRefreshToken(refreshToken) as any;

    const payload = {
      email: decoded.email,
      name: decoded.name ?? "",
      library_name: decoded.library_name ?? "",
      picture: decoded.picture ?? "",
      id: decoded.id,
      role: decoded.role,
    };

    const newAccessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

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
      result: { newAccessToken, newRefreshToken, user: payload },
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

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await getUser(email);

    if (user) {
      const resetToken = randomBytes(32).toString("hex");
      const resetTokenHash = createHash("sha256")
        .update(resetToken)
        .digest("hex");
      const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

      await setUserResetToken(user.id, resetTokenHash, resetTokenExpiry);

      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

      await sendEmail({
        to: email,
        subject: "SLSTINET - Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937;">
            <div style="background: #1e3a5f; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 2px;">SLSTINET</h1>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none;">
              <p>Hello,</p>
              <p>We received a request to reset the password for your SLSTINET account.</p>
              <p>Click the button below to choose a new password. This link is valid for 1 hour.</p>
              <p style="text-align: center; margin: 32px 0;">
                <a href="${resetUrl}" style="background: #1e3a5f; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; display: inline-block; font-weight: bold;">
                  Reset Password
                </a>
              </p>
              <p style="font-size: 13px; color: #6b7280;">If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="font-size: 13px; word-break: break-all;"><a href="${resetUrl}" style="color: #1e3a5f;">${resetUrl}</a></p>
              <p style="font-size: 13px; color: #6b7280;">If you did not request this, you can safely ignore this email.</p>
            </div>
            <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 16px;">SLSTINET Team</p>
          </div>
        `,
      }).catch((err) => {
        console.error(
          "Password reset email failed to send:",
          err instanceof Error ? err.message : err,
        );
        console.log("Password reset link (email not sent):", resetUrl);
      });
    }

    return res.status(statusCode.SUCCESS).json({
      message:
        "If an account exists for that email, a password reset link has been sent.",
      success: true,
      error: null,
      result: null,
    } as ApiResponse<null>);
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

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Token and new password are required.",
        success: false,
        error: "Token and new password are required.",
        result: null,
      } as ApiResponse<null>);
    }

    const resetTokenHash = createHash("sha256").update(token).digest("hex");
    const user = await getUserByResetToken(resetTokenHash);

    if (!user) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: "Invalid or expired reset token.",
        success: false,
        error: "Invalid or expired reset token.",
        result: null,
      } as ApiResponse<null>);
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await updateUserPassword(user.id, hashed);

    return res.status(statusCode.SUCCESS).json({
      message:
        "Password reset successfully. You can now log in with your new password.",
      success: true,
      error: null,
      result: null,
    } as ApiResponse<null>);
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
