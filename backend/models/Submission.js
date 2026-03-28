import mongoose from 'mongoose';

/**
 * Submission Schema - Stores user submissions and attempts
 */
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
    enum: ['javascript', 'python', 'java', 'cpp', 'csharp'],
    default: 'javascript'
  },
  isCorrect: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // Execution details
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
    default: 0 // in milliseconds
  },
  memoryUsed: {
    type: Number,
    default: 0 // in MB
  },
  // Feedback
  feedback: {
    type: String,
    default: ''
  },
  timeTaken: {
    type: Number,
    default: 0 // in seconds
  },
  hints: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
