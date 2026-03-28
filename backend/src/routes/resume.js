import express from 'express';
import multer from 'multer';
import { analyzeResume, getUserResumes, getById, deleteResume } from '../controllers/resumeController.js';
import { authMiddleware } from '../middleware/auth.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ensure uploads/resumes directory exists
const uploadsDir = 'uploads/resumes';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Only allow PDF and DOC files
    const allowedMimes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOC files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.post('/analyze', authMiddleware, upload.single('resume'), analyzeResume);
router.get('/user/resumes', authMiddleware, getUserResumes);
router.get('/:id', authMiddleware, getById);
router.delete('/:id', authMiddleware, deleteResume);

export default router;
