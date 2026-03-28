import express from 'express';
import { register, login, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

/**
 * Public routes
 */
router.post('/register', register);
router.post('/login', login);

/**
 * Protected routes
 */
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

export default router;
