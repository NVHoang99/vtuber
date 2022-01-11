import express from 'express';
import {
    googlelogin,
    checkAuthenticated,
    getUserByToken,
    getUserById,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/googlelogin', googlelogin);
router.get('/', checkAuthenticated, getUserByToken);
router.get('/:userId', getUserById);
export default router;
