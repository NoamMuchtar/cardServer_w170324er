const _ = require("lodash");
const Card = require("../models/mongodb/Card");

const generateBizNumber = async () => {
  let cardsCount = Card.countDocuments();
  if (cardsCount === 8_999_999) {
    throw new Error("The app reached the maximum cards count");
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
    throw new Error("Mongoose:" + error.message);
  }
};

module.exports = generateBizNumber;
