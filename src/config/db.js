const mongoose = require('mongoose');

const config = require('./key');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);

    await mongoose.connect(config.mongoURI);

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // 실패시 프로세스 종료
    process.exit(1);
  }
};

module.exports = connectDB;
