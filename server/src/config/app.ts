import { router } from "./trpc.ts";
import { authRouter } from "../routers/auth.router.ts";
import { noteRouter } from "../routers/note.router.ts";

/* ----- Define all routers/procedures (API endpoints) ----- */
export const appRouter = router({
  auth: authRouter,
  note: noteRouter,
});

/* ----- Export type for client user ----- */
export type AppRouter = typeof appRouter;
