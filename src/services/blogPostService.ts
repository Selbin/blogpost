import { BlogPost } from '../models/blogPost';

interface BlogPostUpdateData {
    title?: string;
    content?: string;
}

const createBlogPost = async (title: string, content: string, authorId: string) => {
    return BlogPost.create({ title, content, author: authorId });
};

const getAllBlogPosts = async (page: number, pageSize: number) => {
    return BlogPost.find()
        .sort({ title: 1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate('author');
};

const getBlogPostById = async (id: string) => {
    return BlogPost.findById(id).populate('author');
};

const updateBlogPost = async (id: string, data: BlogPostUpdateData) => {
    return BlogPost.findByIdAndUpdate(id, data, { new: true }).populate('author');
};

const deleteBlogPost = async (id: string) => {
    return BlogPost.findByIdAndDelete(id);
};

export default {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    deleteBlogPost
};
