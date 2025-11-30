import { initTRPC, TRPCError } from "@trpc/server";

import type { Context } from "./context.ts";

/* ----- Initialize with context ----- */
const t = initTRPC.context<Context>().create();

/* ----- Router to specify diff methods ----- */
export const router = t.router;

/* ----- Procedures are methods exposed to client (Query, Mutation, Subscription) ------ */

/* ----- Public procedure (default) open to anyone ----- */
export const publicProcedure = t.procedure;

/* ----- Protected procedure for authorized users only ----- */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token access",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
