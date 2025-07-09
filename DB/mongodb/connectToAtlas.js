const mongoose = require("mongoose");
require("dotenv").config();

const connectionStringForAtlas = process.env.MONGO_ATLAS_URI;

const connectToAtlasDB = async () => {
  try {
    await mongoose.connect(connectionStringForAtlas);
    console.log("Conneted to MongoDb in Atlas");
  } catch (error) {
    console.error("Could not connect MongoDB in Atlas", error);
  }
};

module.exports = connectToAtlasDB;
