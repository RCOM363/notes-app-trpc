import { publicProcedure, protectedProcedure } from "../../config/trpc.ts";
import { authSchema } from "./auth.schema.ts";
import authService from "./auth.service.ts";

const createUser = publicProcedure
  .input(authSchema)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    return authService.createUser({ email, password });
  });

const loginUser = publicProcedure
  .input(authSchema)
  .mutation(async ({ input }) => {
    const { email, password } = input;
    return authService.loginUser({ email, password });
  });

const getUserById = protectedProcedure.query(async ({ ctx }) => {
  const { user } = ctx;
  return user;
});

export default {
  createUser,
  loginUser,
  getUserById,
};
