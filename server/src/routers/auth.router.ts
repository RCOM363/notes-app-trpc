import { router } from "../config/trpc.ts";
import authController from "../controllers/auth/auth.controller.ts";

/* ----- Define user procedures ----- */
export const authRouter = router({
  createUser: authController.createUser,
  loginUser: authController.loginUser,
  getUserById: authController.getUserById,
});
