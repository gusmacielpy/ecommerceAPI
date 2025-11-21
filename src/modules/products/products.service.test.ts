import { prismaMock } from '../../test/prisma-mock';
import { ProductService } from './products.service';

import { Decimal } from '@prisma/client/runtime/library';

describe('ProductService', () => {
    let productService: ProductService;

    beforeEach(() => {
        productService = new ProductService();
    });

    it('should create a product', async () => {
        const productInput = {
            name: 'Test Product',
            description: 'Description',
            price: 100,
            stock: 10,
        };

        const expectedProduct = {
            id: '1',
            ...productInput,
            price: new Decimal(100),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.product.create.mockResolvedValue(expectedProduct);

        const result = await productService.createProduct(productInput);

        expect(result).toEqual(expectedProduct);
        expect(prismaMock.product.create).toHaveBeenCalledWith({
            data: productInput,
        });
    });

    it('should get all products', async () => {
        prismaMock.product.findMany.mockResolvedValue([]);
        await productService.getProducts();
        expect(prismaMock.product.findMany).toHaveBeenCalled();
    });
});
