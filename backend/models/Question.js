import mongoose from 'mongoose';

/**
 * Question Schema - Stores coding questions
 */
const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
    required: true
  },
  topic: {
    type: String,
    enum: ['Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'DP', 'Hash Maps', 'Sorting', 'Stacks', 'Queues'],
    required: true
  },
  constraints: {
    type: String,
    default: ''
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  // Solution
  solution: {
    type: String,
    default: ''
  },
  solutionExplanation: {
    type: String,
    default: ''
  },
  // Time and space complexity
  timeComplexity: {
    optimal: String,
    bruteForce: String
  },
  spaceComplexity: {
    optimal: String,
    bruteForce: String
  },
  // Metadata
  attemptCount: {
    type: Number,
    default: 0
  },
  avgAccuracy: {
    type: Number,
    default: 0
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Question', questionSchema);
