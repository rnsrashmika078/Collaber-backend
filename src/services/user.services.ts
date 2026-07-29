import { prisma } from "../lib/prisma.ts";
import type { User } from "../types/index.ts";

export const createUser = async (newUser: User) => {
  const user = await prisma.user.create({
    data: newUser,
  });

  return user;
};

export const getUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};
