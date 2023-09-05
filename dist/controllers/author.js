"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const author_1 = require("../models/author");
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        yield author_1.Author.create({ email, name, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtSecretKey = process.env.JWT_SECRET;
        const { email, password } = req.body;
        const author = yield author_1.Author.findOne({ email }).select('password');
        if (!author) {
            return res.status(400).send('Invalid email or password');
        }
        if (!(yield bcrypt_1.default.compare(password, author.password))) {
            return res.status(400).send('Invalid email or password');
        }
        const token = jsonwebtoken_1.default.sign({ id: author._id }, jwtSecretKey);
        res.status(200).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { register, login };
