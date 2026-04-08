import LibraryQuestion from '../models/LibraryQuestion.js';

const COURSES = [
  'Full Stack',
  'Frontend',
  'Backend',
  'Java',
  'Python',
  'Data Analyst',
  'DSA',
  'System Design'
];

/**
 * Get all courses
 */
export const getCourses = async (req, res) => {
  try {
    res.json({
      success: true,
      courses: COURSES
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get topics for a course
 */
export const getTopics = async (req, res) => {
  try {
    const { course } = req.query;

    if (!course) {
      return res.status(400).json({
        success: false,
        message: 'Course parameter required'
      });
    }

    const topics = await LibraryQuestion.distinct('topic', { course });

    res.json({
      success: true,
      course,
      topics: topics.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get questions for a topic
 */
export const getQuestions = async (req, res) => {
  try {
    const { topic, course, page = 1, limit = 30, difficulty, search } = req.query;

    if (!topic || !course) {
      return res.status(400).json({
        success: false,
        message: 'Topic and course parameters required'
      });
    }

    // Build filter
    let filter = { topic, course };

    if (difficulty && difficulty !== 'All') {
      filter.difficulty = difficulty;
    }

    if (search) {
      filter.$or = [
        { question: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get questions
    const questions = await LibraryQuestion.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .select('course topic question answer difficulty tags keyPoints isImportant views createdAt _id');

    const total = await LibraryQuestion.countDocuments(filter);

    res.json({
      success: true,
      questions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get single question with full answer
 */
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await LibraryQuestion.findById(id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Increment views
    question.views = (question.views || 0) + 1;
    await question.save();

    res.json({
      success: true,
      question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Search questions
 */
export const searchQuestions = async (req, res) => {
  try {
    const { search, course, difficulty } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: 'Search parameter required'
      });
    }

    let filter = {
      $or: [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    };

    if (course) filter.course = course;
    if (difficulty) filter.difficulty = difficulty;

    const questions = await LibraryQuestion.find(filter)
      .limit(50)
      .select('question topic course difficulty _id');

    res.json({
      success: true,
      questions: questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get important questions
 */
export const getImportantQuestions = async (req, res) => {
  try {
    const { course, page = 1, limit = 20 } = req.query;

    let filter = { isImportant: true };
    if (course) filter.course = course;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const questions = await LibraryQuestion.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await LibraryQuestion.countDocuments(filter);

    res.json({
      success: true,
      questions,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get statistics
 */
export const getStatistics = async (req, res) => {
  try {
    const stats = {};

    for (const course of COURSES) {
      const topics = await LibraryQuestion.distinct('topic', { course });
      const totalQuestions = await LibraryQuestion.countDocuments({ course });
      stats[course] = {
        topics: topics.length,
        totalQuestions,
        byDifficulty: {
          Easy: await LibraryQuestion.countDocuments({ course, difficulty: 'Easy' }),
          Medium: await LibraryQuestion.countDocuments({ course, difficulty: 'Medium' }),
          Hard: await LibraryQuestion.countDocuments({ course, difficulty: 'Hard' })
        }
      };
    }

    res.json({
      success: true,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
