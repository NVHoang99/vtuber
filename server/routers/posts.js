import express from 'express';
import {
    getPosts,
    createPost,
    updatePost,
    savePost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/*', getPosts);
router.post('/', createPost);
router.post('/save', savePost);
router.post('/update', updatePost);

export default router;
