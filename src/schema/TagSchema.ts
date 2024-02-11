import { z } from 'zod';

export const createTagSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters!'}),
    color: z
      .string()
      .nullable()
      .refine((value) => {
        if(!value) {
          return false;
        }
        return /#?([\da-fA-F]{6})|#([\d|a-f|A-F]){3}/g.test(value);
      }, { message: 'Insert a valid hexcode color!'})
  })
});

export const updateTagSchema = z.object({
  params: z.object({ id: z.coerce.number() }),
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be greater than 3 characters!'}),
    color: z
      .string()
      .nullable()
      .refine((value) => {
        if(!value) {
          return false;
        }
        return /#?([\da-fA-F]{6})|#([\d|a-f|A-F]){3}/g.test(value);
      }, { message: 'Insert a valid hexcode color!'})
  })
});