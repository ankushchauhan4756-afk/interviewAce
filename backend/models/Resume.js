import mongoose from 'mongoose';

/**
 * Resume Schema - Stores resume information and analysis
 */
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileURL: {
    type: String,
    required: true
  },
  // Extracted information
  extractedText: {
    type: String,
    default: ''
  },
  // Analysis results
  atsScore: {
    type: Number,
    default: 0 // 0-100
  },
  keywordMatches: [String],
  missingKeywords: [String],
  // Breakdown
  sections: {
    summary: String,
    experience: [String],
    skills: [String],
    education: [String],
    projects: [String]
  },
  // Feedback
  strengths: [String],
  improvements: [String],
  suggestions: [String],
  overallFeedback: {
    type: String,
    default: ''
  },
  // Metadata
  contactInfo: {
    email: String,
    phone: String,
    linkedin: String
  },
  analyzedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);
