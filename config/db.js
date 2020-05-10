const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  });
    console.log("mongoDB connected")
  } catch (err) {
    console.log('There was an error connecting to mongoDB', err);
  }
};

module.exports = connectDB