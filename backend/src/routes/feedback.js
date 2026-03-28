import express from 'express';
import { giveFeedback, getFeedback, getUserFeedback, getWeakAreas } from '../controllers/feedbackController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, giveFeedback);
router.get('/submission/:id', authMiddleware, getFeedback);
router.get('/user/feedback', authMiddleware, getUserFeedback);
router.get('/user/weak-areas', authMiddleware, getWeakAreas);

export default router;
