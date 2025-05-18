const mongoose = require("mongoose");

const connectToLocalDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/cardsServer");
    console.log("Connected to MongoDB locally");
  } catch (error) {
    console.error("Could not connect MongoDB locally", error);
  }
};

module.exports = connectToLocalDB;
