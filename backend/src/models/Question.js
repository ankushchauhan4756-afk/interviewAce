import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  category: {
    type: String,
    enum: ['Frontend', 'Backend', 'Full Stack', 'Java', 'Python', 'Data Analyst', 'DSA', 'System Design', 'UI/UX', 'DevOps'],
    required: true
  },
  tags: [String],
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  solution: {
    type: String,
    default: ''
  },
  solutionCode: {
    type: String,
    default: ''
  },
  testCases: [{
    input: String,
    output: String,
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    }
  }],
  timeComplexity: {
    optimal: String,
    bruteForce: String
  },
  spaceComplexity: {
    optimal: String,
    bruteForce: String
  },
  attemptCount: {
    type: Number,
    default: 0
  },
  avgAccuracy: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Question', questionSchema);
