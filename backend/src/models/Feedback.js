import mongoose from 'mongoose';

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
  codeQuality: {
    score: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    suggestions: [String]
  },
  efficiency: {
    score: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    suggestions: [String]
  },
  correctness: {
    score: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    suggestions: [String]
  },
  readability: {
    score: { type: Number, default: 0 },
    feedback: { type: String, default: '' },
    suggestions: [String]
  },
  overallScore: {
    type: Number,
    default: 0
  },
  strengths: [String],
  improvements: [String],
  recommendedTopics: [String],
  confidenceScore: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Feedback', feedbackSchema);
