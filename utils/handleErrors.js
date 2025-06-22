const chalk = require("chalk");

const createError = (validator, message, status) => {
  if (message.includes(`Error:`)) {
    const error = new Error(message);
    error.status = status || 400;
    throw error;
  }
  const error = new Error(`${validator} Error: ${message}`);
  error.status = status || 400;
  throw error;
};

const handleError = (res, status, message = "") => {
  res.locals.errorMessage = message;
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};

module.exports = { createError, handleError };
