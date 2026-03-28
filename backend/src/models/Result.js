import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domain: String,
  difficulty: String,
  overallScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  questionScores: [{
    questionId: mongoose.Schema.Types.ObjectId,
    question: String,
    score: Number,
    maxScore: { type: Number, default: 100 },
    feedback: String,
    mistakes: [String],
    improvements: [String]
  }],
  strengths: [String],
  weaknesses: [String],
  mistakesSummary: [String],
  suggestionsSummary: [String],
  communicationScore: { type: Number, default: 0 },
  technicalScore: { type: Number, default: 0 },
  confidenceScore: { type: Number, default: 0 },
  averageTimePerQuestion: { type: Number, default: 0 },
  totalDuration: { type: Number, default: 0 }, // in seconds
  completionPercentage: { type: Number, default: 0 }, // % questions answered
  reportUrl: String, // PDF report URL
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);
