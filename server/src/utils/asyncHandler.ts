import { TRPCError } from "@trpc/server";

type AsyncFn = (...args: any[]) => Promise<any>;

export const asyncHandler =
  <Fn extends AsyncFn>(fn: Fn) =>
  (...args: Parameters<Fn>): Promise<ReturnType<Fn>> =>
    Promise.resolve(fn(...args)).catch((err) => {
      if (err instanceof TRPCError) throw err;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
        cause: err,
      });
    });
