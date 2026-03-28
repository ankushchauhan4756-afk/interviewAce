import Feedback from '../models/Feedback.js';

export const giveFeedback = async (req, res) => {
  try {
    const { submissionId, codeQuality, efficiency, correctness, readability } = req.body;

    const overallScore = (codeQuality.score + efficiency.score + correctness.score + readability.score) / 4;

    const feedback = new Feedback({
      submissionId,
      userId: req.user.userId,
      codeQuality,
      efficiency,
      correctness,
      readability,
      overallScore
    });

    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ userId: req.user.userId });
    res.json({ success: true, feedbackList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWeakAreas = async (req, res) => {
  try {
    const feedbackList = await Feedback.find({ userId: req.user.userId });
    const weakAreas = [];
    feedbackList.forEach(f => {
      if (f.improvements) weakAreas.push(...f.improvements);
    });
    res.json({ success: true, weakAreas: [...new Set(weakAreas)] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
