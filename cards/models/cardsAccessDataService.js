const Card = require("./mongodb/Card");

const DB = "MONGODB";

// Create Card
const createCard = async (newCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(newCard);
      card = await card.save();
      return card;
    } catch (error) {
      throw new Error("Mongoose: " + error.message);
    }
  }

  //   if (DB === "MYSQL") {
  //   }
};

// Get all Cards
const getAllCards = async () => {
  if (DB === "MONGODB") {
    try {
      let cards = await Card.find();
      return cards;
    } catch (error) {
      throw new Error("Mongoose: " + error.message);
    }
  }
};

// Get Card by id
const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      return card;
    } catch (error) {
      throw new Error("Mongoose: " + error.message);
    }
  }
};

module.exports = { createCard, getAllCards, getCard };
