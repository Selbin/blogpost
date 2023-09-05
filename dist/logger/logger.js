"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4
};
const logFile = path_1.default.join(__dirname, 'logs', 'app.log');
// Configure Winston
const logger = (0, winston_1.createLogger)({
    levels: logLevels,
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}] ${message}`;
    })),
    transports: [new winston_1.transports.File({ filename: logFile }), new winston_1.transports.Console()]
});
exports.default = logger;
