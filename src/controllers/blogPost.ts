import { NextFunction, Request, Response } from 'express';
import BlogPostService from '../services/blogPostService';

const createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, content } = req.body;
        const createdPost = await BlogPostService.createBlogPost(title, content, req.author.id);
        res.status(201).json(createdPost);
    } catch (error) {
        next(error);
    }
};

const getAllBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 5;
        const posts = await BlogPostService.getAllBlogPosts(page, pageSize);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getBlogPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const post = await BlogPostService.getBlogPostById(id);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedPost = await BlogPostService.updateBlogPost(id, data);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

const deleteBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        await BlogPostService.deleteBlogPost(id);
        res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
        next(error);
    }
};

export default {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
};
