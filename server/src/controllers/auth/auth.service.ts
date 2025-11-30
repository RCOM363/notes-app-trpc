import bcrypt from "bcrypt";

import { prisma } from "../../db/index.ts";
import type { AuthProps } from "./auth.types.ts";
import { TRPCError } from "@trpc/server";
import { generateToken } from "../../utils/auth.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";

async function createUser({ email, password }: AuthProps) {
  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new TRPCError({ code: "CONFLICT", message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  const { password: userPassword, ...safeUser } = newUser;

  return safeUser;
}

async function loginUser({ email, password }: AuthProps) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user.id);

  return { token };
}

async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: {
      password: true,
    },
  });

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
  }

  return user;
}

export default {
  createUser: asyncHandler(createUser),
  loginUser: asyncHandler(loginUser),
  getUserById: asyncHandler(getUserById),
};
