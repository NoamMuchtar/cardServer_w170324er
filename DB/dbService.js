const connectToLocalDB = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDB = require("./mongodb/connectToAtlas");

require("dotenv").config();

const ENVIROMENT = process.env.ENVIROMENT;
const DB = process.env.DB;

const connectToDB = async () => {
  if (DB === "MONGODB") {
    if (ENVIROMENT === "development") {
      await connectToLocalDB();
    }
    if (ENVIROMENT === "production") {
      await connectToAtlasDB();
    }
  }

  if (DB === "sql") {
  }
};

module.exports = connectToDB;
