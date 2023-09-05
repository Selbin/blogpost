import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import { dbConnect } from './database/db.js';
import blogPostRouter from './routes/blogPost';
import authorRouter from './routes/author.js';
import logger from './logger/logger.js';
import errorHandler from './middleware/errorHandler.js';

// initialize mongoose connection
dbConnect();
dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;

// configuring helmet to strengthen CSP
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"], // add trustable sources
            objectSrc: ["'none'"],
            upgradeInsecureRequests: []
        }
    })
);

app.use(express.json());

app.use('/api', blogPostRouter);
app.use('/author', authorRouter);

// Handle invalid routes
app.use((req: Request, res: Response): void => {
    logger.info(`Invalid route: ${req.path}`);
    res.status(404).send('404 Not Found');
});

// Configure error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`);
});

export default app;
