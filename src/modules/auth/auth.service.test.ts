import { AuthService } from './auth.service';
import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => prismaMock),
}));

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should register a new user', async () => {
        const userInput = {
            email: 'test@example.com',
            password: 'password123',
        };

        const createdUser = {
            id: '1',
            ...userInput,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.user.create.mockResolvedValue(createdUser as any);

        const token = await authService.register(userInput);

        expect(token).toBeDefined();
        expect(prismaMock.user.create).toHaveBeenCalledWith({
            data: userInput,
        });
    });

    it('should login with correct credentials', async () => {
        const userInput = {
            email: 'test@example.com',
            password: 'password123',
        };

        const user = {
            id: '1',
            ...userInput,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(user as any);

        const token = await authService.login(userInput);

        expect(token).toBeDefined();
    });

    it('should throw error with incorrect credentials', async () => {
        const userInput = {
            email: 'test@example.com',
            password: 'wrongpassword',
        };

        const user = {
            id: '1',
            email: 'test@example.com',
            password: 'password123',
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(user as any);

        await expect(authService.login(userInput)).rejects.toThrow('Invalid credentials');
    });
});
