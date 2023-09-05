import mongoose, { Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
    name: string;
    email: string;
    password: string;
}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }
    },
    { timestamps: true }
);

export const Author = mongoose.model<IAuthor>('Author', AuthorSchema);
