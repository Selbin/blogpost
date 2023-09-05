import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IBlogPost } from '../models/blogPost';
import { IAuthor } from '../models/author';

export const validateBody = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const validateParams = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync({ _id: req.params.id });
            next();
        } catch (error) {
            next(error);
        }
    };
};

export const Schemas = {
    blogPost: {
        create: Joi.object<IBlogPost>({
            title: Joi.string().required(),
            content: Joi.string().required()
        }),
        update: Joi.object<IBlogPost>({
            title: Joi.string(),
            content: Joi.string()
        }),
        checkId: Joi.object<IBlogPost>({
            _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'mongoDB ID')
        })
    },
    author: {
        login: Joi.object<IAuthor>({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        }),
        register: Joi.object<IAuthor>({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        })
    }
};
