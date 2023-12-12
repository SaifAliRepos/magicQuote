var mongoose = require('mongoose');
const config = require('config')
mongoose.set('strictQuery', false);


const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/quoter')
    console.log('MongoD is now runnning...')
  } catch (error) {
    process.exit(1)
  }
}

module.exports = connectDB;
