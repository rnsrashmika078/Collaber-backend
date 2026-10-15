/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import type { ApiResponse } from "../types";

// authenticated user details
export const getMe = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "authenticated",
    success: true,
    error: null,
    result: { user: (req as any).user },
  } as ApiResponse<any>);
};

// use query params
// URL: /users?page=1&limit=5
export const queryParam = async (req: Request, res: Response) => {
  const page = req.query.page;
  const limit = req.query.limit;

  res.json({ page, limit });
};

// use route param
// URL: /users/10
// router -> router.get("/users/:id" , routerParam)
export const routeParam = async (req: Request, res: Response) => {
  const id = req.params.id;

  res.json({ id });
};

export const requestBody = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.json({ name, email });
};
