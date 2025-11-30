import * as z from "zod";

const environmentSchema = z.object({
  PORT: z.coerce.number<number>(),
  CORS_ORIGIN: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_USERNAME: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_URL: z.string(),
  TOKEN_SECRET: z.string(),
});

export default environmentSchema;
