import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import { statusCode } from "../config/statusCode";
import { listMembers } from "../services/general.services";

export const getMembersController = async (req: Request, res: Response) => {
  try {
    const members = await listMembers();
    return res.status(statusCode.SUCCESS).json({
      message: "members fetched successfully!",
      success: true,
      error: null,
      result: members,
    } as ApiResponse<typeof members>);
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
