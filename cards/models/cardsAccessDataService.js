const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");
require("dotenv").config();

const DB = process.env.DB;

// Create Card
const createCard = async (newCard) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card(newCard);
      card = await card.save();
      return card;
    } catch (error) {
      return createError("Mongoose", error.message);
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
      return createError("Mongoose", error.message, 500);
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
      return createError("Mongoose", error.message);
    }
  }
};

//Get my cards
const getMyCard = async (id) => {
  try {
    let myCards = await Card.find({ user_id: id });
    return myCards;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};
// update cards
const updateCard = async (cardId, updatedCard) => {
  try {
    let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
    return card;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

// delete cards
const deleteCard = async (cardId) => {
  try {
    let card = await Card.findByIdAndDelete(cardId);
    return card;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

// like card
const likeCard = async (cardId, userId) => {
  try {
    let card = await Card.findById(cardId);
    if (!card) {
      return createError(
        "Mongoose",
        "A card with this ID cannot be found in the database"
      );
    }

    if (card.likes.includes(userId)) {
      let newLikesArray = card.likes.filter((id) => id != userId);
      card.likes = newLikesArray;
    } else {
      card.likes.push(userId);
    }
    await card.save();
    return card;
  } catch (error) {
    return createError("Mongoose", error.message);
  }
};

module.exports = {
  createCard,
  getAllCards,
  getCard,
  getMyCard,
  updateCard,
  deleteCard,
  likeCard,
};
