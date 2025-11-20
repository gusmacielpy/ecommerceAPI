import { Router } from 'express';
import { OrderController } from './orders.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();
const orderController = new OrderController();

router.post('/', authenticateToken, orderController.createOrder);
router.get('/', authenticateToken, orderController.getOrders);

export default router;
