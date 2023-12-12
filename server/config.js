const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://abhishek:abhishek@cluster0.1pxgn0u.mongodb.net/?retryWrites=true&w=majority`)
      console.log("Database is connected")
    } catch (error) {
      console.log("Database is not connected")
      throw error;
    }
  };
  module.exports = connectDB;