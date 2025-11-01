import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Support multiple environment variable names
    const mongoURI = process.env.MONGODB_URI 
      || process.env.MONGO_URL 
      || process.env.MONGODB_URL
      || process.env.DATABASE_URL;
    
    // Debug: Log available env vars (without sensitive data)
    console.log('\n🔍 Environment Variables Check:');
    console.log('  NODE_ENV:', process.env.NODE_ENV || 'not set');
    console.log('  MONGODB_URI exists:', !!process.env.MONGODB_URI);
    console.log('  MONGO_URL exists:', !!process.env.MONGO_URL);
    console.log('  MONGODB_URL exists:', !!process.env.MONGODB_URL);
    console.log('  DATABASE_URL exists:', !!process.env.DATABASE_URL);
    
    // Critical check: mongoURI must be defined and a string
    if (!mongoURI || typeof mongoURI !== 'string') {
      console.error('\n❌ CRITICAL ERROR: MongoDB URI is undefined or not a string!');
      console.error('   Type received:', typeof mongoURI);
      console.error('   Value:', mongoURI);
      console.error('\n📋 Please set MONGODB_URI environment variable in Render:');
      console.error('\n🚀 RENDER SETUP STEPS:');
      console.error('   1. Go to: https://dashboard.render.com');
      console.error('   2. Select your service/application');
      console.error('   3. Click "Environment" tab (left sidebar)');
      console.error('   4. Click "Add Environment Variable"');
      console.error('   5. Fill the form:');
      console.error('      Key:   MONGODB_URI');
      console.error('      Value: mongodb+srv://voterlist1:ashishp1212@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority');
      console.error('   6. Click "Save Changes"');
      console.error('   7. Wait for redeploy (automatic)');
      console.error('\n📖 Required Connection String:');
      console.error('   mongodb+srv://voterlist1:ashishp1212@cluster0.ezzkjmw.mongodb.net/voter-db?retryWrites=true&w=majority');
      console.error('\n⚠️  Make sure variable name is exactly: MONGODB_URI (case-sensitive)');
      process.exit(1);
    }
    
    // Validate connection string format
    if (mongoURI.trim() === '') {
      console.error('❌ ERROR: MongoDB URI is empty string!');
      console.error('Please set a valid MONGODB_URI in Render Environment variables.');
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

