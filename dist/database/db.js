"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../logger/logger"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
const dbConnect = () => {
    return mongoose_1.default.connect(MONGODB_URI, {
        minPoolSize: 5
    });
};
exports.dbConnect = dbConnect;
const db = mongoose_1.default.connection;
db.on('error', (error) => {
    logger_1.default.error(error);
});
db.once('open', () => {
    logger_1.default.info('Connected to MongoDB database');
});
