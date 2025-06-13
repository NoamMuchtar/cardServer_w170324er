const cardValidate = require("./Joi/cardValidate");

const validator = "Joi";

const cardValidation = (card) => {
  if (validator === "Joi") {
    const { error } = cardValidate(card);
    if (error) return error.details.map((detail) => detail.message);
    return "";
  }
};

module.exports = cardValidation;
