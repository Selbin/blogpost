import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

// Extend req object to have author property
declare global {
    namespace Express {
        interface Request {
            author: any;
        }
    }
}

const userAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }

        // Verify jwt token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET!);
        req.author = decodedData;
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
};

export default userAuthentication;
