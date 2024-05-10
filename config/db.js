const mongoose = require("mongoose");
const colors = require("colors");
const config = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.MONGO_URI);
    console.log(`Mongo DB connected : ${conn.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`Error in connectDB function ${error}`.bgRed);
  }
};
module.exports = connectDB;
