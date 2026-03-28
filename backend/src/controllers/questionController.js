import Question from '../models/Question.js';

export const getAll = async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 10 } = req.query;
    let filter = {};

    // Filter by category
    if (category && category !== 'All') {
      filter.category = category;
    }

    // Filter by difficulty
    if (difficulty) {
      filter.difficulty = difficulty;
    }

    // Search by title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const questions = await Question.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Question.countDocuments(filter);

    res.json({
      success: true,
      questions,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }
    res.json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getByCategory = async (req, res) => {
  try {
    const questions = await Question.find({ category: req.params.category });
    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getByDifficulty = async (req, res) => {
  try {
    const questions = await Question.find({ difficulty: req.params.difficulty });
    res.json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Question deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
