import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Support multiple environment variable names
    const mongoURI = process.env.MONGODB_URI 
      || process.env.MONGO_URL 
      || process.env.MONGODB_URL
      || process.env.DATABASE_URL;
    
    // Debug: Log available env vars (without sensitive data)
    console.log('🔍 Environment Check:');
    console.log('  MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('  MONGO_URL exists:', !!process.env.MONGO_URL);
    console.log('  MONGODB_URL exists:', !!process.env.MONGODB_URL);
    console.log('  DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    if (!mongoURI) {
      console.error('\n❌ ERROR: MongoDB URI is not defined!');
      console.error('\n📋 Please set one of these environment variables:');
      console.error('   - MONGODB_URI (recommended)');
      console.error('   - MONGO_URL');
      console.error('   - MONGODB_URL');
      console.error('   - DATABASE_URL');
      console.error('\n💡 For Render:');
      console.error('   1. Go to Render Dashboard → Your Service');
      console.error('   2. Click "Environment" tab');
      console.error('   3. Click "Add Environment Variable"');
      console.error('   4. Fill form:');
      console.error('      Key: MONGODB_URI');
      console.error('      Value: mongodb+srv://username:password@cluster.mongodb.net/database-name');
      console.error('   5. Click "Save Changes"');
      console.error('\n📖 Example connection string:');
      console.error('   mongodb+srv://admin:voterlist@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority');
      process.exit(1);
    }
    
    // Validate connection string format
    if (typeof mongoURI !== 'string' || mongoURI.trim() === '') {
      console.error('❌ ERROR: MongoDB URI must be a non-empty string!');
      console.error('Current value type:', typeof mongoURI);
      process.exit(1);
    }
    
    console.log('🔗 Attempting MongoDB connection...');
    const conn = await mongoose.connect(mongoURI.trim(), {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB Connected Successfully!`);
    console.log(`   Host: ${conn.connection.host}`);
    console.log(`   Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('\n❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 Authentication Error - Check:');
      console.error('   1. Username and password are correct');
      console.error('   2. Password special characters are URL encoded');
      console.error('   3. Database user exists in MongoDB Atlas');
    } else if (error.message.includes('network')) {
      console.error('\n💡 Network Error - Check:');
      console.error('   1. Network Access allows 0.0.0.0/0 in MongoDB Atlas');
      console.error('   2. Internet connection is working');
    }
    
    process.exit(1);
  }
};

export default connectDB;

