import { Request, Response } from 'express';
import { OrderService } from './orders.service';

const orderService = new OrderService();

export class OrderController {
    async createOrder(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            const order = await orderService.createOrder(userId, req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOrders(req: Request, res: Response) {
        try {
            const userId = (req as any).user.userId;
            const orders = await orderService.getOrders(userId);
            res.status(200).json(orders);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
