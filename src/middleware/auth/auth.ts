/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { MiddlewareResponse } from "../../types";
import { verifyAccessToken } from "../../utils/jwt";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer"))
    return res.status(401).json({
      error: "unauthorized",
      message: "User not authorized.. Please Login before access",
    } as MiddlewareResponse);

  try {
    const token = auth.split(" ")[1];
    const decoded = verifyAccessToken(token); // verfiy
    (req as any).user = decoded; // backend autmaocally add the user for the requets body
    next();
  } catch {
    return res.status(401).json({
      error: "Invalid token",
      message: "Invalid token",
    } as MiddlewareResponse);
  }
};
