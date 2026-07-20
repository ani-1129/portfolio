import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aniket_portfolio';

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log('✅ Connected to MongoDB at', MONGODB_URI);
  } catch (error) {
    console.warn('⚠️ MongoDB Connection Note:', error.message);
    console.log('💡 Using local JSON data store for full zero-downtime responsiveness.');
  }
}
