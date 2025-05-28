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
const auth = require("../../auth/authService");

const router = express.Router();

// Create new card
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return res.status(403).send("Only business users can create new card");
    }

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
router.get("/my-cards", auth, async (req, res) => {
  try {
    // const { id } = req.body;
    const userInfo = req.user;

    if (!userInfo.isBusiness) {
      return res.status(403).send("Only business users can get my cards");
    }

    let myCards = await getMyCard(userInfo._id);
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
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = req.body;

    let userInfo = req.user;
    const originalCardFromDB = await getCard(id);
    if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
      return res
        .status(403)
        .send("Only the card creator or admin can update card");
    }

    let card = await updateCard(id, updatedCard);
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete card
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;

    const originalCardFromDB = await getCard(id);
    if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
      return res
        .status(403)
        .send("Only the card creator or admin can delete card");
    }
    let card = await deleteCard(id);
    res.status(200).send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// like card
router.patch("/:id", auth, async (req, res) => {
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
