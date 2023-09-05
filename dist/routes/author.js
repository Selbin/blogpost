"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const author_1 = __importDefault(require("../controllers/author"));
const validateInputs_1 = require("../middleware/validateInputs");
const router = express_1.default.Router();
router.post('/register', (0, validateInputs_1.validateBody)(validateInputs_1.Schemas.author.register), author_1.default.register);
router.post('/login', (0, validateInputs_1.validateBody)(validateInputs_1.Schemas.author.login), author_1.default.login);
exports.default = router;
