import { NextFunction, Request, Response } from 'express';

import logger from '../logger/logger';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            error: err.message
        });
    } else if (err.code === 11000) {
        return res.status(422).json({
            error: err.message
        });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
