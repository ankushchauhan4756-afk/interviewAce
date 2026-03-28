import express from 'express';
import {
  createSubmission,
  getUserSubmissions,
  getSubmissionById,
  updateSubmission,
  getUserStats
} from '../controllers/submissionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * Protected routes - Authentication required
 */
router.post('/', authMiddleware, createSubmission);
router.get('/user/submissions', authMiddleware, getUserSubmissions);
router.get('/user/stats', authMiddleware, getUserStats);
router.get('/:id', authMiddleware, getSubmissionById);
router.put('/:id', authMiddleware, updateSubmission);

export default router;
