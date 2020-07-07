const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//import mongoURI and use it to connect to mongoDB atlas.

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('mongoDB connected');
  } catch (err) {
    console.log('There was an error connecting to mongoDB', err);
    process.exit(1)
  }
};

module.exports = connectDB;
