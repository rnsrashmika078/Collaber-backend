import type { Request, Response, NextFunction } from "express";
import { MiddlewareResponse } from "../../types";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  //   const token = req.headers.authorization;
  // for now
  const token = "rashmika";
  if (token.includes("rashmika")) {
    next();
  } else {
    res.status(401).json({
      message: "Authentication failed!",
      error: null,
    } as MiddlewareResponse);
  }
};

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  const role = "admin";
  if (role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "Role is not accepted!",
      error: null,
    } as MiddlewareResponse);
  }
};
