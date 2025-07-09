const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

const localMongoAddress = process.env.MONGO_LOCAL_URI;
const connectToLocalDB = async () => {
  try {
    await mongoose.connect(localMongoAddress);
    console.log(chalk.bold.white.bgRed("Connected to MongoDB locally"));
  } catch (error) {
    console.error("Could not connect MongoDB locally", error);
  }
};

module.exports = connectToLocalDB;
