import express, { Application, Request, Response } from 'express';

export const app: Application = express();

app.use(express.json());

import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/products.routes';
import orderRoutes from './modules/orders/orders.routes';

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});
