const loginValidation = require("./Joi/loginValidation");
const registerValidation = require("./Joi/registerValidation");

const validator = "Joi";

const validateRegistertion = (user) => {
  if (validator === "Joi") {
    const { error } = registerValidation(user);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

const validateLogin = (user) => {
  if (validator === "Joi") {
    const { error } = loginValidation(user);
    console.log(error);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

module.exports = { validateLogin, validateRegistertion };
