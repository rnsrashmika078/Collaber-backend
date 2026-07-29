import type { Request, Response } from "express";
import type { User } from "../types/index.ts";
import { createUser, getUsers } from "../services/user.services.ts";

export const create = async (req: Request, res: Response) => {
  // request body
  //   const { name, email } = req.body;
  const user: User = {
    name: "Rashmika Siriwardhana",
    email: "rnsrashmika078@gmail.com",
  };
  const newUser = await createUser(user);
  res.json({ message: "User created!", user: newUser });
};

export const retrieve = async (req: Request, res: Response) => {
  const users = await getUsers();
  console.log("USERS", users);
  res.json({ message: "Getting all users", allUsers: users });
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
