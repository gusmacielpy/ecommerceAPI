import { PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { registerSchema, loginSchema } from './auth.schema';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    async register(data: z.infer<typeof registerSchema>['body']) {
        const { email, password } = data;

        // In a real app, hash the password here using bcrypt
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password; // Simulating hashing for simplicity in this step, will add bcrypt later if needed

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        return this.generateToken(user);
    }

    async login(data: z.infer<typeof loginSchema>['body']) {
        const { email, password } = data;

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.password !== password) {
            throw new Error('Invalid credentials');
        }

        return this.generateToken(user);
    }

    private generateToken(user: User) {
        return jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: '1h',
        });
    }
}
