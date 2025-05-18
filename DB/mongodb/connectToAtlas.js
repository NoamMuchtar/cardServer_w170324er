const mongoose = require("mongoose");

const connectionStringForAtlas = "";

const connectToAtlasDB = async () => {
  try {
    await mongoose.connect(connectionStringForAtlas);
    console.log("Conneted to MongoDb in Atlas");
  } catch (error) {
    console.error("Could not connect MongoDB in Atlas", error);
  }
};

module.exports = connectToAtlasDB;
