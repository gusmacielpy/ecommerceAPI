import { Router } from 'express';
import { ProductController } from './products.controller';
import { authenticateToken } from '../../middlewares/auth.middleware';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', authenticateToken, productController.createProduct);
router.put('/:id', authenticateToken, productController.updateProduct);
router.delete('/:id', authenticateToken, productController.deleteProduct);

export default router;
