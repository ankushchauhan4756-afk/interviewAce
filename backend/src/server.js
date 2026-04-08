import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import LibraryQuestion from './models/LibraryQuestion.js';
import { createLibrarySeedDocuments } from './utils/librarySeedData.js';

// Load environment variables from the appropriate file
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: envFile });

// Import routes
import authRoutes from './routes/auth.js';
import questionRoutes from './routes/questions.js';
import submissionRoutes from './routes/submissions.js';
import feedbackRoutes from './routes/feedback.js';
import resumeRoutes from './routes/resume.js';
import interviewRoutes from './routes/interview.js';
import violationRoutes from './routes/violations.js';
import libraryRoutes from './routes/library.js';
import adminRoutes from './routes/admin.js';

// Initialize Express app
const app = express();

// Middleware - CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL || 'https://interviewace.vercel.app',
  'https://interviewace.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ InterviewAce Backend is running!' });
});

const startApp = async () => {
  await connectDB();

  const libraryCount = await LibraryQuestion.countDocuments();
  if (libraryCount === 0) {
    const libraryDocs = createLibrarySeedDocuments();
    await LibraryQuestion.insertMany(libraryDocs);
    console.log(`✅ Seeded ${libraryDocs.length} library questions on first startup.`);
  }
};

startApp().catch((error) => {
  console.error('Startup error:', error);
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/violations', violationRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
