import * as z from "zod";

export const authSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});
