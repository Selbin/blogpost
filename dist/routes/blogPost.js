"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogPost_1 = __importDefault(require("../controllers/blogPost"));
const validateInputs_1 = require("../middleware/validateInputs");
const userAuthentication_1 = __importDefault(require("../middleware/userAuthentication"));
const router = express_1.default.Router();
router.get('/posts', blogPost_1.default.getAllBlogPosts);
router.get('/posts/:id', (0, validateInputs_1.validateParams)(validateInputs_1.Schemas.blogPost.checkId), blogPost_1.default.getBlogPostById);
router.post('/posts', userAuthentication_1.default, (0, validateInputs_1.validateBody)(validateInputs_1.Schemas.blogPost.create), blogPost_1.default.createBlogPost);
router.put('/posts/:id', userAuthentication_1.default, (0, validateInputs_1.validateParams)(validateInputs_1.Schemas.blogPost.checkId), (0, validateInputs_1.validateBody)(validateInputs_1.Schemas.blogPost.update), blogPost_1.default.updateBlogPost);
router.delete('/posts/:id', userAuthentication_1.default, (0, validateInputs_1.validateParams)(validateInputs_1.Schemas.blogPost.checkId), blogPost_1.default.deleteBlogPost);
exports.default = router;
