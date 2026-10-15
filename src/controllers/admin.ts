/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import { statusCode } from "../config/statusCode";
import {
  approveWithdrawRequest,
  createInstitution,
  deleteInstitution,
  deleteUser,
  getStats,
  listInstitutions,
  listLibraries,
  listWithdrawRequests,
  rejectWithdrawRequest,
  updateInstitution,
  updateUserStatus,
} from "../services/admin.services";

export const getStatsController = async (req: Request, res: Response) => {
  try {
    const stats = await getStats();
    return res.status(statusCode.SUCCESS).json({
      message: "stats fetched successfully!",
      success: true,
      error: null,
      result: stats,
    } as ApiResponse<typeof stats>);
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

export const getLibrariesController = async (req: Request, res: Response) => {
  try {
    const libraries = await listLibraries();
    return res.status(statusCode.SUCCESS).json({
      message: "libraries fetched successfully!",
      success: true,
      error: null,
      result: libraries,
    } as ApiResponse<typeof libraries>);
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

export const getInstitutionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const institutions = await listInstitutions();
    return res.status(statusCode.SUCCESS).json({
      message: "institutions fetched successfully!",
      success: true,
      error: null,
      result: institutions,
    } as ApiResponse<typeof institutions>);
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

export const createInstitutionController = async (req: Request, res: Response) => {
  try {
    const institution = await createInstitution(req.body);
    return res.status(statusCode.CREATED).json({
      message: "institution created successfully!",
      success: true,
      error: null,
      result: institution,
    } as ApiResponse<typeof institution>);
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

export const updateInstitutionController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const institution = await updateInstitution(id, req.body);
    return res.status(statusCode.SUCCESS).json({
      message: "institution updated successfully!",
      success: true,
      error: null,
      result: institution,
    } as ApiResponse<typeof institution>);
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

export const deleteInstitutionController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await deleteInstitution(id);
    return res.status(statusCode.SUCCESS).json({
      message: "institution deleted successfully!",
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

export const updateUserStatusController = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const { status, active } = req.body;

    const user = await updateUserStatus(id, status, active === true || active === "true");

    if (!user) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "User not found!",
        success: false,
        error: null,
        result: null,
      } as ApiResponse<null>);
    }

    return res.status(statusCode.SUCCESS).json({
      message: "user status updated successfully!",
      success: true,
      error: null,
      result: user,
    } as ApiResponse<typeof user>);
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

export const getWithdrawRequestsController = async (req: Request, res: Response) => {
  try {
    const requests = await listWithdrawRequests();
    return res.status(statusCode.SUCCESS).json({
      message: "withdraw requests fetched successfully!",
      success: true,
      error: null,
      result: requests,
    } as ApiResponse<typeof requests>);
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

export const approveWithdrawRequestController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const request = await approveWithdrawRequest(id);
    return res.status(statusCode.SUCCESS).json({
      message: "withdraw request approved successfully!",
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

export const rejectWithdrawRequestController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const request = await rejectWithdrawRequest(id);
    return res.status(statusCode.SUCCESS).json({
      message: "withdraw request rejected successfully!",
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

export const removeUserController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await deleteUser(id);

    return res.status(statusCode.SUCCESS).json({
      message: "user deleted successfully!",
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
