/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import type { ApiResponse } from "../types/index.ts";
import { statusCode } from "../config/statusCode";
import {
  createActivity,
  deleteActivity,
  getActivity,
  listActivities,
  listByUser,
  listPublished,
  updateActivity,
} from "../services/activity.services";

export const getActivities = async (req: Request, res: Response) => {
  try {
    const activities = await listActivities();
    return res.status(statusCode.SUCCESS).json({
      message: "activities fetched successfully!",
      success: true,
      error: null,
      result: activities,
    } as ApiResponse<typeof activities>);
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

export const getPublishedActivities = async (req: Request, res: Response) => {
  try {
    const activities = await listPublished();
    return res.status(statusCode.SUCCESS).json({
      message: "published activities fetched successfully!",
      success: true,
      error: null,
      result: activities,
    } as ApiResponse<typeof activities>);
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

export const getActivitiesByUser = async (req: Request, res: Response) => {
  try {
    const user_id = parseInt(req.params.id as string, 10);
    const activities = await listByUser(user_id);
    return res.status(statusCode.SUCCESS).json({
      message: "user activities fetched successfully!",
      success: true,
      error: null,
      result: activities,
    } as ApiResponse<typeof activities>);
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

export const getActivityById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const activity = await getActivity(id);

    if (!activity) {
      return res.status(statusCode.NOT_FOUND).json({
        message: "Activity not found!",
        success: false,
        error: null,
        result: null,
      } as ApiResponse<null>);
    }

    return res.status(statusCode.SUCCESS).json({
      message: "activity fetched successfully!",
      success: true,
      error: null,
      result: activity,
    } as ApiResponse<typeof activity>);
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

export const createActivityController = async (req: Request, res: Response) => {
  try {
    const user_id = (req as any).user.id;
    const imageUrl = req.file?.filename;

    const activity = await createActivity(user_id, req.body, imageUrl);

    return res.status(statusCode.CREATED).json({
      message: "activity created successfully!",
      success: true,
      error: null,
      result: activity,
    } as ApiResponse<typeof activity>);
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

export const updateActivityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const imageUrl = req.file?.filename;

    const activity = await updateActivity(id, req.body, imageUrl);

    return res.status(statusCode.SUCCESS).json({
      message: "activity updated successfully!",
      success: true,
      error: null,
      result: activity,
    } as ApiResponse<typeof activity>);
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

export const deleteActivityController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await deleteActivity(id);

    return res.status(statusCode.SUCCESS).json({
      message: "activity deleted successfully!",
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
