import express from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestionsByDifficulty
} from '../controllers/questionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * Public routes
 */
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.get('/difficulty/:difficulty', getQuestionsByDifficulty);

/**
 * Protected routes (Admin only - can be added later)
 */
router.post('/', authMiddleware, createQuestion);
router.put('/:id', authMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

export default router;
