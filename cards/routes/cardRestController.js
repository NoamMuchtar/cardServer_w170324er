const express = require("express");
const {
  createCard,
  getAllCards,
  getCard,
} = require("../models/cardsAccessDataService");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let card = await createCard(req.body);
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let allCards = await getAllCards();
    res.status(200).send(allCards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
