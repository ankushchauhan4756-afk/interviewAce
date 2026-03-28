import express from 'express';
import { getAll, getById, getByCategory, getByDifficulty, create, update, remove } from '../controllers/questionController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAll);
router.get('/category/:category', getByCategory);
router.get('/difficulty/:difficulty', getByDifficulty);
router.get('/:id', getById);
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, remove);

export default router;
