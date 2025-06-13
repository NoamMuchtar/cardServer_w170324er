const morganLogger = require("./morgan/morganLogger");

const logger = "morgan";

const loggerMiddleware = () => {
  if (logger === "morgan") {
    return morganLogger;
  }
};

module.exports = loggerMiddleware;
