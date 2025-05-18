const connectToLocalDB = require("./mongodb/connectToMongodbLocally");
const connectToAtlasDB = require("./mongodb/connectToAtlas");

const ENVIROMENT = "development";

const connectToDB = async () => {
  if (ENVIROMENT === "development") {
    await connectToLocalDB();
  }
  if (ENVIROMENT === "production") {
    await connectToAtlasDB();
  }
};

module.exports = connectToDB;
