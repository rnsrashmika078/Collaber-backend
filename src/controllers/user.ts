import type { Request, Response } from "express";
import type { ApiResponse, User } from "../types/index.ts";
import { createUser, getUsers } from "../services/user.services.ts";

// i'll use zod validation in the future
export const create = async (req: Request, res: Response) => {
  // request body
  //   const { name, email } = req.body;
  try {
    // for mimic i use custom data
    const user: User = {
      name: "Rashmika Siriwardhana",
      email: "rnsrashmika078@gmail.com",
    };
    const newUser = await createUser(user);
    res.status(201).json({
      message: "User created succesfully!",
      success: true,
      error: null,
      result: newUser,
    } as ApiResponse<User>);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "something went wrong";
    res.status(500).json({
      message: "Something went wrong...",
      error: errorMessage,
      result: null,
      success: false,
    } as ApiResponse<null>);
  }
};

export const retrieve = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(201).json({
      message: "User created succesfully!",
      success: true,
      error: null,
      result: users,
    } as ApiResponse<User[]>);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "something went wrong";
    res.status(500).json({
      message: "Something went wrong...",
      error: errorMessage,
      result: null,
      success: false,
    } as ApiResponse<null>);
  }
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
