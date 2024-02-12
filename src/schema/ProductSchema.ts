import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, { message: 'Name must be greater than 3 characters!' }),
    description: z.string().min(3, { message: 'Description must be greater than 3 characters!' }),
    price: z.number().min(0, { message: 'Price must be greater than 0!' }),
    discount: z.number().optional(),
    tag_id: z.number().min(1, { message: 'Tag id must be valid!' })
  })
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'Product id must be valid!' })
  }),
  body: z.object({
    name: z.string().min(3, { message: 'Name must be greater than 3 characters!' }),
    description: z.string().min(3, { message: 'Description must be greater than 3 characters!' }),
    price: z.number().min(0, { message: 'Price must be greater than 0!' }),
    discount: z.number().optional(),
    tag_id: z.number().min(1, { message: 'Tag id must be valid!' })
  })
});

export const searchPriceProductSchema = z.object({
  query: z.object({
    min: z.coerce.number().min(0, { message: 'Minimum price must be greater than 0!' }),
    max: z.coerce.number().min(0, { message: 'Maximum price must be greater than 0!' })
  })
});

export const searchNameProductSchema = z.object({
  params: z.object({
    name: z.string().min(3, { message: 'Name must be greater than 3 characters!' })
  })
});