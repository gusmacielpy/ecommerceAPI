import { Request, Response } from 'express';
import { ProductService } from './products.service';

const productService = new ProductService();

export class ProductController {
    async createProduct(req: Request, res: Response) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async getProducts(req: Request, res: Response) {
        try {
            const products = await productService.getProducts();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const product = await productService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            await productService.deleteProduct(req.params.id);
            res.status(204).send();
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
