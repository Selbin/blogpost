import express from 'express';
import controller from '../controllers/blogPost';
import { Schemas, validateBody, validateParams } from '../middleware/validateInputs';
import userAuthentication from '../middleware/userAuthentication';

const router = express.Router();

router.get('/posts', controller.getAllBlogPosts);
router.get('/posts/:id', validateParams(Schemas.blogPost.checkId), controller.getBlogPostById);
router.post('/posts', userAuthentication, validateBody(Schemas.blogPost.create), controller.createBlogPost);
router.put('/posts/:id', userAuthentication, validateParams(Schemas.blogPost.checkId), validateBody(Schemas.blogPost.update), controller.updateBlogPost);
router.delete('/posts/:id', userAuthentication, validateParams(Schemas.blogPost.checkId), controller.deleteBlogPost);

export default router;
