const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('✅ MongoDB Connected');
    console.log('📦 DATABASE:', conn.connection.name);
    console.log('🌐 HOST:', conn.connection.host);
    console.log('🔗 URI DB:', new URL(process.env.MONGO_URI).pathname);

    return conn;
  } catch (error) {
    console.error('❌ MongoDB ERROR:', error.message);
    throw error;
  }
};

module.exports = connectDB;