import mongoose from 'mongoose';

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
  extractedText: {
    type: String,
    default: ''
  },
  atsScore: {
    type: Number,
    default: 0
  },
  keywordMatches: [String],
  missingKeywords: [String],
  sections: {
    summary: String,
    experience: [String],
    skills: [String],
    education: [String],
    projects: [String]
  },
  strengths: [String],
  improvements: [String],
  suggestions: [String],
  overallFeedback: {
    type: String,
    default: ''
  },
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
