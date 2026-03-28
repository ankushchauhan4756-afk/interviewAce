import express from 'express';
import {
  logViolation,
  getInterviewViolations,
  getUserViolationHistory
} from '../controllers/violationController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Log a violation
router.post('/log', authMiddleware, logViolation);

// Get violations for an interview
router.get('/interview/:interviewId', authMiddleware, getInterviewViolations);

// Get user's violation history
router.get('/history/all', authMiddleware, getUserViolationHistory);

export default router;
