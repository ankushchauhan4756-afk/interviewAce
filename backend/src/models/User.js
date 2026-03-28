import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: null
  },
  stats: {
    totalQuestionsAttempted: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  },
  topicWisePerformance: {
    type: Map,
    of: {
      attempted: Number,
      correct: Number,
      accuracy: Number
    },
    default: new Map()
  },
  preferences: {
    darkMode: { type: Boolean, default: false },
    language: { type: String, default: 'JavaScript' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('passwordHash')) {
    const salt = await bcryptjs.genSalt(10);
    this.passwordHash = await bcryptjs.hash(this.passwordHash, salt);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcryptjs.compare(password, this.passwordHash);
};

export default mongoose.model('User', userSchema);
