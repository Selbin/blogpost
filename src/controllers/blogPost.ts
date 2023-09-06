import { NextFunction, Request, Response } from 'express';
import { BlogPost } from '../models/blogPost';

const createBlogPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, content } = req.body;
        const createdPost = await BlogPost.create({ title, content, author: req.author.id });
        res.status(201).json(createdPost);
    } catch (error) {
        next(error);
    }
};

const getAllBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 5;
        const posts = await BlogPost.find()
            .sort({ title: 1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .populate('author');
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const getBlogPostById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const posts = await BlogPost.findById(id).populate('author');
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

const updateBlogPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedPost = await BlogPost.findByIdAndUpdate(id, data, { new: true }).populate('author');
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
        await BlogPost.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog post deleted' });
    } catch (error) {
        next(error);
    }
};

export default { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
