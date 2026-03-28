import Submission from '../models/Submission.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

/**
 * Create a new submission
 */
export const createSubmission = async (req, res) => {
  try {
    const { questionId, code, language, timeTaken } = req.body;

    if (!questionId || !code) {
      return res.status(400).json({
        success: false,
        message: 'Question ID and code are required'
      });
    }

    const submission = new Submission({
      userId: req.user.userId,
      questionId,
      code,
      language: language || 'javascript',
      timeTaken: timeTaken || 0
    });

    await submission.save();

    // Update question attempt count
    await Question.findByIdAndUpdate(
      questionId,
      { $inc: { attemptCount: 1 } }
    );

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      submission
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get user submissions
 */
export const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.userId })
      .populate('questionId', 'title difficulty topic')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: submissions.length,
      submissions
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get submission by ID
 */
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('questionId');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.json({
      success: true,
      submission
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update submission (with feedback)
 */
export const updateSubmission = async (req, res) => {
  try {
    const { isCorrect, score, testsPassed, totalTests, feedback } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      {
        isCorrect: isCorrect || false,
        score: score || 0,
        testsPassed: testsPassed || 0,
        totalTests: totalTests || 0,
        feedback: feedback || ''
      },
      { new: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    // Update user stats
    if (isCorrect) {
      await User.findByIdAndUpdate(req.user.userId, {
        $inc: { 
          totalQuestionsAttempted: 1,
          totalQuestionsCorrect: 1
        }
      });
    } else {
      await User.findByIdAndUpdate(req.user.userId, {
        $inc: { totalQuestionsAttempted: 1 }
      });
    }

    res.json({
      success: true,
      message: 'Submission updated successfully',
      submission
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get user stats
 */
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const user = await User.findById(userId);
    const submissions = await Submission.find({ userId });

    const stats = {
      totalAttempted: submissions.length,
      totalCorrect: submissions.filter(s => s.isCorrect).length,
      accuracy: submissions.length > 0 
        ? ((submissions.filter(s => s.isCorrect).length / submissions.length) * 100).toFixed(2)
        : 0,
      averageScore: user.averageScore,
      totalMockInterviews: user.totalMockInterviews,
      topicWisePerformance: user.topicWisePerformance
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
