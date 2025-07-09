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
const normalizeCard = require("../helpers/normalizeCard");
const { handleError, createError } = require("../../utils/handleErrors");
const cardValidation = require("../validation/cardValidationService");
const Card = require("../models/mongodb/Card");

const router = express.Router();

// Create new card
router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return createError(
        "Authorization",
        "Only business users can create new card",
        403
      );
    }

    const validationErrorMessage = cardValidation(req.body);
    if (validationErrorMessage != "") {
      console.log(validationErrorMessage);
      return createError("Validation", validationErrorMessage, 400);
    }

    let normalizedCard = await normalizeCard(req.body, userInfo._id);
    let card = await createCard(normalizedCard);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// Get all cards
router.get("/", async (req, res) => {
  try {
    let allCards = await getAllCards();
    res.status(200).send(allCards);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// Get my card
router.get("/my-cards", auth, async (req, res) => {
  try {
    // const { id } = req.body;
    const userInfo = req.user;

    if (!userInfo.isBusiness) {
      return createError(
        "Authorization",
        "Only business users can get my cards",
        403
      );
    }

    let myCards = await getMyCard(userInfo._id);
    res.status(200).send(myCards);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// Get card by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// update card
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    let userInfo = req.user;
    const originalCardFromDB = await getCard(id);
    if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
      return createError(
        "Authorization",
        "Only the card creator or admin can update card",
        403
      );
    }

    const validationErrorMessage = cardValidation(req.body);
    if (validationErrorMessage != "") {
      console.log(validationErrorMessage);
      return createError("Validation", validationErrorMessage, 400);
    }

    if (
      req.body.bizNumber !== originalCardFromDB.bizNumber &&
      !userInfo.isAdmin
    ) {
      return createError(
        "Authorization",
        "Only admin user can change bizNumber"
      );
    }
    if (
      userInfo.isAdmin &&
      req.body.bizNumber &&
      req.body.bizNumber !== originalCardFromDB.bizNumber
    ) {
      const cardWithSameBizNumber = await Card.findOne({
        bizNumber: req.body.bizNumber,
      });

      if (cardWithSameBizNumber) {
        return createError(
          "Validation",
          "The new bizNumber is already exist by another card",
          400
        );
      }
    }

    let normalizedUpdateCard = await normalizeCard(req.body, userInfo._id);
    let card = await updateCard(id, normalizedUpdateCard);
    res.status(201).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// delete card
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    let userInfo = req.user;

    const originalCardFromDB = await getCard(id);
    if (!userInfo.isAdmin && userInfo._id != originalCardFromDB.user_id) {
      return createError(
        "Authorization",
        "Only the card creator or admin can delete card",
        403
      );
    }

    let card = await deleteCard(id);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// like card
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userInfo = req.user;
    let card = await likeCard(id, userInfo._id);
    res.status(200).send(card);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});
module.exports = router;
