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
exports.Schemas = exports.validateParams = exports.validateBody = void 0;
const joi_1 = __importDefault(require("joi"));
const validateBody = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validateAsync({ _id: req.params.id });
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.validateParams = validateParams;
exports.Schemas = {
    blogPost: {
        create: joi_1.default.object({
            title: joi_1.default.string().required(),
            content: joi_1.default.string().required()
        }),
        update: joi_1.default.object({
            title: joi_1.default.string(),
            content: joi_1.default.string()
        }),
        checkId: joi_1.default.object({
            _id: joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/, 'mongoDB ID')
        })
    },
    author: {
        login: joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required()
        }),
        register: joi_1.default.object({
            name: joi_1.default.string().min(3).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required()
        })
    }
};
