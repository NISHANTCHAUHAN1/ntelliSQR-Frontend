import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
});
