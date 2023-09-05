"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger/logger"));
exports.default = (err, req, res, next) => {
    logger_1.default.error(err);
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            error: err.message
        });
    }
    else if (err.code === 11000) {
        return res.status(422).json({
            error: err.message
        });
    }
    else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
