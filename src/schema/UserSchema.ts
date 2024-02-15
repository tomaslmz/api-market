import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters!'}),
    email: z
      .string()
      .min(1, { message: 'E-mail must be greater than 1 characters!'}),
    password: z
      .string()
      .min(5, { message: 'Password must be greater than 8 characters!'})
  })
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters!'}),
    email: z
      .string()
      .min(1, { message: 'E-mail must be greater than 1 characters!'}),
    password: z
      .string()
      .min(5, { message: 'Password must be greater than 8 characters!'})
  })
});

export const buyProductUserSchema = z.object({
  params: z.object({
    productId: z.coerce.number().min(0, { message: 'Invalid product!' })
  })
});

export const depositUserSchema = z.object({
  params: z.object({
    money: z.coerce.number().min(0, { message: 'Invalid deposit value!' })
  })
});