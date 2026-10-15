import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const createUser = async (newUser: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: newUser,
    select: {
      id: true,
      email: true,
      library_name: true,
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

export const setUserResetToken = async (
  id: number,
  reset_token: string,
  reset_token_expiry: Date,
) => {
  return prisma.user.update({
    where: { id },
    data: { reset_token, reset_token_expiry },
  });
};

export const getUserByResetToken = async (reset_token: string) => {
  return prisma.user.findFirst({
    where: {
      reset_token,
      reset_token_expiry: { gt: new Date() },
    },
  });
};

export const updateUserPassword = async (id: number, password: string) => {
  return prisma.user.update({
    where: { id },
    data: { password, reset_token: null, reset_token_expiry: null },
  });
};
