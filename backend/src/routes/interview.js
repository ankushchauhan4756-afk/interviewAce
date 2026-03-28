import express from 'express';
import {
  startInterview,
  getNextQuestion,
  submitAnswer,
  endInterview,
  getResult,
  getInterviewHistory
} from '../controllers/interviewController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Interview management
router.post('/start', authMiddleware, startInterview);
router.get('/:interviewId/next-question', authMiddleware, getNextQuestion);
router.post('/submit-answer', authMiddleware, submitAnswer);
router.post('/end', authMiddleware, endInterview);

// Results
router.get('/result/:resultId', authMiddleware, getResult);
router.get('/history/all', authMiddleware, getInterviewHistory);

export default router;
