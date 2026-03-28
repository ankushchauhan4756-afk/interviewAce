import express from 'express';
import multer from 'multer';
import {
  analyzeResume,
  getUserResumes,
  getResumeById,
  deleteResume
} from '../controllers/resumeController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/resumes/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

/**
 * Protected routes - Authentication required
 */
router.post('/analyze', authMiddleware, upload.single('resume'), analyzeResume);
router.get('/user/resumes', authMiddleware, getUserResumes);
router.get('/:id', authMiddleware, getResumeById);
router.delete('/:id', authMiddleware, deleteResume);

export default router;
