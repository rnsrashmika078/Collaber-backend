import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const createUser = async (newUser: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: newUser,
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
    },
  });

  return user;
};

export const getUsers = async () => {
  const allUsers = await prisma.user.findMany();
  return allUsers;
};
export const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};
