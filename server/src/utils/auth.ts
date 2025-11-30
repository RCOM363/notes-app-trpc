import jwt from "jsonwebtoken";

import config from "../config/environment.ts";
import { authService } from "../controllers/auth/index.ts";
import { TRPCError } from "@trpc/server";

type tokenPayload = { id: number };

/**
 * Func to generate JWT token
 * @param id
 * @returns token
 */
export function generateToken(id: number) {
  return jwt.sign({ id }, config.TOKEN_SECRET, { expiresIn: "12h" });
}

/**
 * Func to verify JWT token
 * @param token
 * @returns user
 */
export async function verifyJWT(token: string) {
  try {
    const decodedToken = jwt.verify(token, config.TOKEN_SECRET) as tokenPayload;
    if (!decodedToken) {
      throw new Error("No token");
    }
    const user = await authService.getUserById(decodedToken.id);

    return user;
  } catch {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token access",
    });
  }
}
