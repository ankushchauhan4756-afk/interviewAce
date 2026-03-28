import express from 'express';
import { createSubmission, getUserSubmissions, getById, updateSubmission, getUserStats } from '../controllers/submissionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createSubmission);
router.get('/user/submissions', authMiddleware, getUserSubmissions);
router.get('/user/stats', authMiddleware, getUserStats);
router.get('/:id', authMiddleware, getById);
router.put('/:id', authMiddleware, updateSubmission);

export default router;
