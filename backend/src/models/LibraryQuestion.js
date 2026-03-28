import mongoose from 'mongoose';

/**
 * Library Question Schema - Interview Question/Answer Library
 */
const libraryQuestionSchema = new mongoose.Schema({
  course: {
    type: String,
    enum: ['Full Stack', 'Frontend', 'Backend', 'Java', 'Python', 'Data Analyst', 'DSA', 'System Design'],
    required: true,
    index: true
  },
  topic: {
    type: String,
    required: true,
    index: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  codeExample: {
    type: String,
    default: ''
  },
  keyPoints: [String],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  tags: [String],
  isImportant: {
    type: Boolean,
    default: false,
    index: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for quick lookups
libraryQuestionSchema.index({ course: 1, topic: 1 });
libraryQuestionSchema.index({ difficulty: 1 });
libraryQuestionSchema.index({ tags: 1 });

export default mongoose.model('LibraryQuestion', libraryQuestionSchema);
