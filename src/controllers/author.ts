import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Author } from '../models/author';

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Author.create({ email, name, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        next(error);
    }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET!;
        const { email, password } = req.body;
        const author = await Author.findOne({ email }).select('password');
        if (!author) {
            return res.status(400).send('Invalid email or password');
        }

        if (!(await bcrypt.compare(password, author.password))) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: author._id }, jwtSecretKey);
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

export default { register, login };
