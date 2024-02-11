import { z } from 'zod';

export const createAdministratorSchema = z.object({
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

export const updateAdministratorSchema = z.object({
  body: z
    .object({
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