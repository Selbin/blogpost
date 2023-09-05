"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const userAuthentication = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return res.sendStatus(401);
        }
        // Verify jwt token
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.author = decodedData;
        next();
    }
    catch (error) {
        return res.sendStatus(403);
    }
};
exports.default = userAuthentication;
