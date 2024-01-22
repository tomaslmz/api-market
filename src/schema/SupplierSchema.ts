import { z } from 'zod';

export const createSupplierSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters! '}),
    email: z
      .string()
      .min(1, { message: 'E-mail must be greater than 1 character! '}),
    password: z
      .string()
      .min(5, { message: 'Password must be greater than 5 characters! '})
  })
});

export const updateSupplierSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters! '}),
    email: z
      .string()
      .min(1, { message: 'E-mail must be greater than 1 character! '}),
    password: z
      .string()
      .min(5, { message: 'Password must be greater than 5 characters! '})
  })
});