const connectToLocalDB = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDB = require("./mongodb/connectToAtlas");

const ENVIROMENT = "development";
const DB = "mongodb";

const connectToDB = async () => {
  if (DB === "mongodb") {
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
