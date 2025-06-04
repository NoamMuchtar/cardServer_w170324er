const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
  let cardsCount = Card.countDocuments();
  if (cardsCount === 8_999_999) {
    return createError(
      "Mongoose",
      "The app reached the maximum cards count",
      409
    );
  }

  let random;
  do {
    random = _.random(1_000_000, 9_999_999);
  } while (await isBizNumberExsist(random));

  return random;
};

const isBizNumberExsist = async (bizNumber) => {
  try {
    const cardWithThisbizNumber = await Card.findOne({ bizNumber });
    return Boolean(cardWithThisbizNumber);
  } catch (error) {
    return createError("Mongoose:", error.message, 500);
  }
};

module.exports = generateBizNumber;
