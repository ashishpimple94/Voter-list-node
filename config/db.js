import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Support both MONGODB_URI and MONGO_URL (Railway uses MONGO_URL sometimes)
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URL;
    
    if (!mongoURI) {
      console.error('❌ Error: MONGODB_URI/MONGO_URL is not defined!');
      console.error('Please set MONGODB_URI or MONGO_URL environment variable.');
      console.error('Example: mongodb+srv://username:password@cluster.mongodb.net/database-name');
      console.error('\nFor Railway: Add MONGODB_URI in Variables tab');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Check your connection string and network access settings.');
    process.exit(1);
  }
};

export default connectDB;

