import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const authService = new AuthService();

export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const token = await authService.register(req.body);
            res.status(201).json({ token });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const token = await authService.login(req.body);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({ error: error.message });
        }
    }
}
