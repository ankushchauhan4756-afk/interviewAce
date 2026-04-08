import mongoose from 'mongoose';

const connectToMongo = async (uri) => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const connectDB = async () => {
  const atlasUri = process.env.MONGODB_URI;
  const localUri = 'mongodb://localhost:27017/interviewace';
  const uri = atlasUri || localUri;

  if (!atlasUri) {
    console.warn('⚠️ MONGODB_URI is not set; using local MongoDB at mongodb://localhost:27017/interviewace');
  }

  try {
    const conn = await connectToMongo(uri);
    console.log('✅ MongoDB connected successfully:', uri);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB connection failed to', uri, 'error:', error.message);

    if (atlasUri && atlasUri.startsWith('mongodb+srv://')) {
      console.warn('⚠️ Atlas SRV connection failed. Trying local MongoDB fallback...');
      try {
        const conn = await connectToMongo(localUri);
        console.log('✅ Local MongoDB connected successfully:', localUri);
        return conn;
      } catch (localError) {
        console.error('❌ Local MongoDB fallback also failed:', localError.message);
      }
    }

    if (atlasUri) {
      console.error('  - Verify your Atlas URI, network access, and secrets in deployment env vars.');
      console.error('  - For Atlas, allow 0.0.0.0/0 or your host IP and use the full connection string.');
      console.error('  - If you do not have Atlas access locally, install and run MongoDB locally or use a working local URI.');
    }

    process.exit(1);
  }
};

export default connectDB;
