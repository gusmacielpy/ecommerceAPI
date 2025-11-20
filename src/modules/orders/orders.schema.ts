import { z } from 'zod';

export const createOrderSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                productId: z.string().uuid(),
                quantity: z.number().int().positive(),
            })
        ).min(1),
    }),
});
