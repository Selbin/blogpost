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
Object.defineProperty(exports, "__esModule", { value: true });
const blogPost_1 = require("../models/blogPost");
const createBlogPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const createdPost = yield blogPost_1.BlogPost.create({ title, content, author: req.author.id });
        res.status(201).json(createdPost);
    }
    catch (error) {
        next(error);
    }
});
const getAllBlogPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;
        const posts = yield blogPost_1.BlogPost.find()
            .sort({ title: 1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
const getBlogPostById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const posts = yield blogPost_1.BlogPost.findById(id);
        res.status(200).json(posts);
    }
    catch (error) {
        next(error);
    }
});
const updateBlogPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedPost = yield blogPost_1.BlogPost.findByIdAndUpdate(id, data, { new: true }).populate('author');
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    }
    catch (error) {
        next(error);
    }
});
const deleteBlogPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield blogPost_1.BlogPost.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog post deleted' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
