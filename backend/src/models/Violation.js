import mongoose from 'mongoose';

const ViolationSchema = new mongoose.Schema({
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
  violationType: {
    type: String,
    enum: [
      'tab_switch',
      'window_blur',
      'camera_off',
      'fullscreen_exit',
      'copy_paste_attempt',
      'right_click',
      'dev_tools_open',
      'multiple_violations'
    ],
    required: true
  },
  description: String,
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'low'
  },
  count: {
    type: Number,
    default: 1
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  actionTaken: {
    type: String,
    enum: ['warning', 'recorded', 'interview_ended'],
    default: 'recorded'
  },
  autoEnded: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Violation', ViolationSchema);
