import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger/logger';

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URI!;

export const dbConnect = () => {
    return mongoose.connect(MONGODB_URI, {
        minPoolSize: 5
    });
};

const db: Connection = mongoose.connection;

db.on('error', (error) => {
    logger.error(error);
});

db.once('open', () => {
    logger.info('Connected to MongoDB database');
});
