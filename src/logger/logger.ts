import { createLogger, transports, format } from 'winston';
import path from 'path';

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4
};

const logFile = path.join(__dirname, 'logs', 'app.log');

// Configure Winston
const logger = createLogger({
    levels: logLevels,
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}] ${message}`;
        })
    ),
    transports: [new transports.File({ filename: logFile }), new transports.Console()]
});

export default logger;
