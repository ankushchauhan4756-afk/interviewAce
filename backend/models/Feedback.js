import mongoose from 'mongoose';

/**
 * Feedback Schema - Stores AI-generated feedback
 */
const feedbackSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  // Feedback categories
  codeQuality: {
    score: Number, // 0-100
    feedback: String,
    suggestions: [String]
  },
  efficiency: {
    score: Number,
    feedback: String,
    suggestions: [String]
  },
  correctness: {
    score: Number,
    feedback: String,
    suggestions: [String]
  },
  readability: {
    score: Number,
    feedback: String,
    suggestions: [String]
  },
  // Overall feedback
  overallScore: {
    type: Number,
    default: 0
  },
  strengths: [String],
  areasForImprovement: [String],
  recommendedTopics: [String],
  confidenceScore: {
    type: Number,
    default: 0 // 0-100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
