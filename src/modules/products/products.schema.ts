import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        description: z.string(),
        price: z.number().positive(),
        stock: z.number().int().nonnegative(),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        price: z.number().positive().optional(),
        stock: z.number().int().nonnegative().optional(),
    }),
});
