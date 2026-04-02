import mongoose from 'mongoose';

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/interviewace';

  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI is not set; falling back to local mongodb://localhost:27017/interviewace');
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully:', uri);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed to', uri, 'error:', error.message);
    if (process.env.MONGODB_URI) {
      console.error('  - Verify your Atlas URI, network access, and secrets in deployment env vars.');
      console.error('  - For Atlas, allow 0.0.0.0/0 or your host IP and use the full connection string.');
    }
    process.exit(1);
  }
};

export default connectDB;
