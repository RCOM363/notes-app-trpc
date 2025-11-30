import { PrismaClient } from "../generated/prisma/client.ts";
import config from "../config/environment.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = config.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({
  adapter,
  log: ["query", "error", "warn"],
});
