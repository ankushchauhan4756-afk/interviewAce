import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
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
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['javascript', 'python', 'java', 'cpp', 'typescript'],
    default: 'javascript'
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  testsPassed: {
    type: Number,
    default: 0
  },
  totalTests: {
    type: Number,
    default: 0
  },
  executionTime: {
    type: Number,
    default: 0
  },
  memoryUsed: {
    type: Number,
    default: 0
  },
  feedback: {
    type: String,
    default: ''
  },
  timeTaken: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
