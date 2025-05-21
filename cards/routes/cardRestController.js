const express = require("express");
const {
  createCard,
  getAllCards,
  getCard,
  updateCard,
  getMyCard,
  deleteCard,
  likeCard,
} = require("../models/cardsAccessDataService");

const router = express.Router();

// Create new card
router.post("/", async (req, res) => {
  try {
    let card = await createCard(req.body);
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all cards
router.get("/", async (req, res) => {
  try {
    let allCards = await getAllCards();
    res.status(200).send(allCards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get my card
router.get("/my-cards", async (req, res) => {
  try {
    const { id } = req.body;
    let myCards = await getMyCard(id);
    res.status(200).send(myCards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get card by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// update card
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = req.body;
    let card = await updateCard(id, updatedCard);
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete card
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await deleteCard(id);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// like card
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    let card = await likeCard(id, userId);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
