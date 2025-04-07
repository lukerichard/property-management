import mongoose from 'mongoose';

async function testConnection() {
  try {
    const uri = process.env.MONGODB_URI;
    console.log('Attempting to connect to MongoDB...');
    
    await mongoose.connect(uri!);
    console.log('Successfully connected to MongoDB!');
    
    // Test a simple query
    if (mongoose.connection.db) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log('Available collections:', collections.map(c => c.name));
    } else {
      console.log('Database connection not available');
    }
    
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Connection error:', error);
  }
}

testConnection(); 