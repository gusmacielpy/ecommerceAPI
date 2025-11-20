import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { createOrderSchema } from './orders.schema';

const prisma = new PrismaClient();

export class OrderService {
    async createOrder(userId: string, data: z.infer<typeof createOrderSchema>['body']) {
        const { items } = data;

        // Transaction to ensure stock is checked and deducted atomically
        return prisma.$transaction(async (tx: any) => {
            let totalAmount = 0;
            const orderItemsData = [];

            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new Error(`Product ${item.productId} not found`);
                }

                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ${product.name}`);
                }

                // Deduct stock
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: product.stock - item.quantity },
                });

                const itemTotal = Number(product.price) * item.quantity;
                totalAmount += itemTotal;

                orderItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                });
            }

            // Create order
            const order = await tx.order.create({
                data: {
                    userId,
                    total: totalAmount,
                    status: 'COMPLETED',
                    items: {
                        create: orderItemsData,
                    },
                },
                include: {
                    items: true,
                },
            });

            return order;
        });
    }

    async getOrders(userId: string) {
        return prisma.order.findMany({
            where: { userId },
            include: { items: true },
        });
    }
}
