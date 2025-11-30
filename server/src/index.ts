import { createHTTPServer } from "@trpc/server/adapters/standalone";
import type { IncomingMessage, ServerResponse } from "http";
import cors from "cors";

import { appRouter } from "./config/app.ts";
import type { AppRouter } from "./config/app.ts";
import { createContext } from "./config/context.ts";
import config from "./config/environment.ts";

export type { AppRouter };

/* ---- Create HTTP server ----- */
const server = createHTTPServer({
  middleware: cors({
    origin: config.CORS_ORIGIN,
  }),
  router: appRouter,
  createContext: async ({ req, res }) => {
    return createContext({
      req: req as IncomingMessage,
      res: res as ServerResponse,
    });
  },
});

server.listen(config.PORT, () => {
  console.log(
    `tRPC standalone server listening at http://localhost:${config.PORT}`
  );
});
