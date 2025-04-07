const mongoose = require('mongoose');
const User = require('../src/models/User');

async function deleteAllUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete all users
    const result = await User.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} users`);

    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteAllUsers(); 