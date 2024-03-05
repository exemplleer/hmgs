import { z } from 'zod';

export const roomCreateSchema = z.object({
  num: z.number().min(3).max(2147483647),
  price: z.number().min(0).max(2147483647),
  capacity: z.number().min(0).max(2147483647),
  title: z.string().trim().min(0).max(256),
  description: z.string().trim().max(5000),
});

const toNumber = (value: unknown) => Number(value);

export const roomsGetQueryParamsSchema = z.object({
  limit: z.string().transform((i) => Number(i)).optional(),
  page: z.string().transform((i) => Number(i)).optional(),
  sortBy: z.enum(['title', 'num', 'price', 'capacity']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
  title: z.string().optional(),
  num: z.string().transform((i) => Number(i)).optional(),
});
