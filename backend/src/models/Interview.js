import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domain: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full Stack', 'Java', 'Python', 'Data Analyst', 'DSA'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 5
  },
  questionsAsked: [{
    questionId: mongoose.Schema.Types.ObjectId,
    question: String,
    userAnswer: String,
    score: Number,
    feedback: String,
    timeSpent: Number // in seconds
  }],
  recordingUrl: {
    type: String,
    default: null
  },
  recordingBuffer: {
    type: Buffer,
    default: null
  },
  totalDuration: {
    type: Number,
    default: 0 // in seconds
  },
  overallScore: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed', 'ended'],
    default: 'not-started'
  },
  cheatingDetected: {
    type: Boolean,
    default: false
  },
  violationCount: {
    type: Number,
    default: 0
  },
  strengths: [String],
  weaknesses: [String],
  mistakes: [String],
  suggestions: [String],
  startedAt: Date,
  completedAt: Date,
  endedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Interview', interviewSchema);
