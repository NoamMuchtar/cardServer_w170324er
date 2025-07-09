const morganLogger = require("./morgan/morganLogger");
require("dotenv").config();

const LOGGER = process.env.LOGGER;
const loggerMiddleware = () => {
  if (LOGGER === "morgan") {
    return morganLogger;
  }
};

module.exports = loggerMiddleware;
