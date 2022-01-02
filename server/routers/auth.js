import express from 'express';
import {
    googlelogin,
    checkAuthenticated,
    getUserByToken,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/googlelogin', googlelogin);
router.get('/', checkAuthenticated, getUserByToken);

export default router;
