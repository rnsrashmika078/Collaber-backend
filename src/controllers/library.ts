/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import { statusCode } from "../config/statusCode";
import {
  createWithdrawRequest,
  getLibrary,
  updateLibrary,
} from "../services/library.services";

export const getLibraryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const requester = (req as any).user;

    if (requester.id !== id && requester.role !== "admin" && requester.role !== "coordinator") {
      return res.status(statusCode.FORBIDDEN).json({
        message: "Forbidden",
        error: null,
        result: null,
        success: false,
      } as ApiResponse<null>);
    }

    const library = await getLibrary(id);

    if (!library) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Library not found!",
        success: false,
        error: null,
        result: null,
      } as ApiResponse<null>);
    }

    return res.status(statusCode.SUCCESS).json({
      message: "library fetched successfully!",
      success: true,
      error: null,
      result: library,
    } as ApiResponse<typeof library>);
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

export const updateLibraryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const requester = (req as any).user;

    if (requester.id !== id && requester.role !== "admin") {
      return res.status(statusCode.FORBIDDEN).json({
        message: "Forbidden",
        error: null,
        result: null,
        success: false,
      } as ApiResponse<null>);
    }

    const imageUrl = req.file?.filename;
    const library = await updateLibrary(id, req.body, imageUrl);

    return res.status(statusCode.SUCCESS).json({
      message: "library updated successfully!",
      success: true,
      error: null,
      result: library,
    } as ApiResponse<typeof library>);
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

export const createWithdrawRequestController = async (
  req: Request,
  res: Response,
) => {
  try {
    const requester = (req as any).user;
    const user_id = req.params.id
      ? parseInt(req.params.id as string, 10)
      : requester.id;
    const { message } = req.body;

    const request = await createWithdrawRequest(user_id, message);

    return res.status(statusCode.CREATED).json({
      message: "withdraw request created successfully!",
      success: true,
      error: null,
      result: request,
    } as ApiResponse<typeof request>);
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
