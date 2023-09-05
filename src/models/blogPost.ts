import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
    title: string;
    content: string;
    author: string;
}

const BlogPostSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Author'
        }
    },
    { timestamps: true }
);

BlogPostSchema.index({ title: 1 });
export const BlogPost = mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
