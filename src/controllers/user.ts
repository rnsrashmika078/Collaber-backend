import type { Request, Response } from "express";

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
