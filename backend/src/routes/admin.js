import express from 'express';
import LibraryQuestion from '../models/LibraryQuestion.js';
import { SAMPLE_QUESTIONS, extractKeyPoints } from '../../seedData.js';

const router = express.Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'admin-123-change-in-production';

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
};

/**
 * POST /api/admin/seed - Seed database with questions
 */
router.post('/seed', verifyAdmin, async (req, res) => {
  try {
    const count = await LibraryQuestion.countDocuments();
    if (count > 0) {
      return res.status(400).json({
        success: false,
        message: `Database already has ${count} questions. Use /clear first to reset.`
      });
    }

    let totalAdded = 0;

    for (const [course, topics] of Object.entries(SAMPLE_QUESTIONS)) {
      for (const [topic, questions] of Object.entries(topics)) {
        const questionsToInsert = [];

        for (let i = 0; i < questions.length; i++) {
          const { q, a } = questions[i];
          const difficulties = ['Easy', 'Medium', 'Hard'];
          const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
          const isImportant = Math.random() < 0.2;

          questionsToInsert.push({
            course,
            topic,
            question: q,
            answer: a,
            difficulty,
            tags: [topic, course, difficulty.toLowerCase()],
            isImportant,
            views: 0,
            keyPoints: extractKeyPoints(a),
          });
        }

        await LibraryQuestion.insertMany(questionsToInsert);
        totalAdded += questionsToInsert.length;
      }
    }

    res.json({
      success: true,
      message: `Successfully seeded ${totalAdded} questions!`
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * GET /api/admin/status - Check database status
 */
router.get('/status', async (req, res) => {
  try {
    const count = await LibraryQuestion.countDocuments();
    res.json({
      success: true,
      database: 'Connected',
      totalQuestions: count,
      isEmpty: count === 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
