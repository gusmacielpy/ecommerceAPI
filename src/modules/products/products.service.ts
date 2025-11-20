import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createProductSchema, updateProductSchema } from './products.schema';

const prisma = new PrismaClient();

export class ProductService {
    async createProduct(data: z.infer<typeof createProductSchema>['body']) {
        return prisma.product.create({
            data,
        });
    }

    async getProducts() {
        return prisma.product.findMany();
    }

    async getProductById(id: string) {
        return prisma.product.findUnique({
            where: { id },
        });
    }

    async updateProduct(id: string, data: z.infer<typeof updateProductSchema>['body']) {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async deleteProduct(id: string) {
        return prisma.product.delete({
            where: { id },
        });
    }
}
