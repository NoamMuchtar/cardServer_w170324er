const createError = (validator, message, status) => {
  if (message.includes(`Error:`)) {
    const error = new Error(message);
    error.status = status || 400;
    console.log(error.message);
    throw error;
  }
  const error = new Error(`${validator} Error: ${message}`);
  error.status = status || 400;
  console.log(error.message);
  throw error;
};

const handleError = (res, status, message = "") => {
  console.log(message);
  return res.status(status).send(message);
};

module.exports = { createError, handleError };
