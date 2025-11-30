import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";

import type { AppRouter } from "@server/index";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();

/* ---- tRPC HTTP client ---- */
export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    loggerLink(), // logs requests in dev
    // Batches all requests into one
    httpBatchLink({
      url: `http://localhost:5000`,
      headers() {
        const token = localStorage.getItem("notes-app-token");
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
