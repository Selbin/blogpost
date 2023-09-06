import { NextFunction, Request, Response } from 'express';
import AuthorService from '../services/authorService';

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, password } = req.body;
        await AuthorService.registerAuthor(email, name, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const token = await AuthorService.loginAuthor(email, password);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login
};
