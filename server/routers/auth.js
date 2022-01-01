import express from 'express';
import { googlelogin } from '../controllers/auth.js';

const router = express.Router();

router.post('/', googlelogin);

export default router;
