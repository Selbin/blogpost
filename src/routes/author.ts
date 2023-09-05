import express from 'express';
import controller from '../controllers/author';
import { Schemas, validateBody } from '../middleware/validateInputs';

const router = express.Router();

router.post('/register', validateBody(Schemas.author.register), controller.register);
router.post('/login', validateBody(Schemas.author.login), controller.login);

export default router;
