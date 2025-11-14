import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
});


export const forgotSchema = z.object({
  email: z.string().email(),
});

export const resetSchema = z.object({
  password: z.string().min(6),
});
