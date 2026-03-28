import Feedback from '../models/Feedback.js';
import Submission from '../models/Submission.js';

/**
 * Give feedback on a submission
 */
export const giveFeedback = async (req, res) => {
  try {
    const { submissionId, questionId, codeQuality, efficiency, correctness, readability, strengths, improvements } = req.body;

    // Calculate overall score
    const overallScore = Math.round(
      (codeQuality.score + efficiency.score + correctness.score + readability.score) / 4
    );

    const feedback = new Feedback({
      submissionId,
      userId: req.user.userId,
      questionId,
      codeQuality,
      efficiency,
      correctness,
      readability,
      overallScore,
      strengths,
      improvements,
      confidenceScore: overallScore
    });

    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      feedback
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get feedback for submission
 */
export const getFeedback = async (req, res) => {
  try {
    const { submissionId } = req.params;

    const feedback = await Feedback.findOne({ submissionId })
      .populate('submissionId')
      .populate('questionId', 'title difficulty');

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      feedback
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get user feedback history
 */
export const getUserFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.userId })
      .populate('questionId', 'title difficulty topic')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get weak areas for user
 */
export const getWeakAreas = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ userId: req.user.userId });

    // Analyze feedback to find weak areas
    const areasMap = {};
    feedbacks.forEach(feedback => {
      feedback.areasForImprovement.forEach(area => {
        areasMap[area] = (areasMap[area] || 0) + 1;
      });
    });

    const weakAreas = Object.entries(areasMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([area, count]) => ({ area, frequency: count }));

    res.json({
      success: true,
      weakAreas
    });
  } catch (error) {
    console.error('Error analyzing weak areas:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
