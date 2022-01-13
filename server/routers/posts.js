import express from 'express';
import {
    getPosts,
    createPost,
    updatePost,
    savePost,
    unSavePost,
    getPostDetail,
    addComment,
    getCreatedPost,
    getSavedPost,
    searchPost,
} from '../controllers/posts.js';

const router = express.Router();

router.get('/videos', getPosts);
router.get('/images', getPosts);
router.post('/', createPost);
router.post('/save', savePost);
router.post('/unsave', unSavePost);
router.post('/update', updatePost);
router.get('/detail/*', getPostDetail);
router.post('/comment', addComment);
router.get('/created/:userId', getCreatedPost);
router.get('/saved/:userId', getSavedPost);
router.get('/search', searchPost);
export default router;
