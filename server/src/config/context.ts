import type { IncomingMessage, ServerResponse } from "http";

import { verifyJWT } from "../utils/auth.ts";

/* ----- Context is the data that all procedures have access to ----- */

/* ----- Outer context ----- */
export async function createContext({
  req,
  res,
}: {
  req: IncomingMessage;
  res: ServerResponse;
}) {
  const authHeader = req.headers?.authorization as string;
  const token = authHeader?.split?.(" ")[1];
  let user = null;
  if (token) {
    user = await verifyJWT(token);
  }
  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
