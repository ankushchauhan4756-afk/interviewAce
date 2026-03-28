import Question from '../models/Question.js';

/**
 * Get all questions with filters
 */
export const getQuestions = async (req, res) => {
  try {
    const { difficulty, topic, search } = req.query;
    const filter = {};

    if (difficulty) filter.difficulty = difficulty;
    if (topic) filter.topic = topic;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const questions = await Question.find(filter)
      .select('-solution -solutionExplanation')
      .sort({ difficulty: 1 });

    res.json({
      success: true,
      count: questions.length,
      questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single question
 */
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Create a new question (Admin only)
 */
export const createQuestion = async (req, res) => {
  try {
    const questionData = req.body;
    const question = new Question(questionData);
    await question.save();

    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      question
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update question (Admin only)
 */
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question updated successfully',
      question
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete question (Admin only)
 */
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get questions by difficulty
 */
export const getQuestionsByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const questions = await Question.find({ difficulty })
      .select('-solution -solutionExplanation');

    res.json({
      success: true,
      difficulty,
      count: questions.length,
      questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
