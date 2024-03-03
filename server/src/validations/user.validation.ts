import { z } from 'zod';

export const userRegistrationSchema = z.object({
  email: z.string(),
  phone: z.string().optional(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const userLoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
