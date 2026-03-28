import express from 'express';
import {
  getCourses,
  getTopics,
  getQuestions,
  getQuestionById,
  searchQuestions,
  getImportantQuestions,
  getStatistics
} from '../controllers/libraryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/courses', getCourses);
router.get('/topics', getTopics);
router.get('/questions', getQuestions);
router.get('/question/:id', getQuestionById);
router.get('/search', searchQuestions);
router.get('/statistics', getStatistics);

// Protected routes
router.get('/important', authMiddleware, getImportantQuestions);

export default router;
