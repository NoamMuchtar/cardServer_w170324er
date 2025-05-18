const express = require("express");
const cardRouter = require("../cards/routes/cardRestController");

const router = express.Router();

router.use("/cards", cardRouter);

router.use((req, res) => {
  res.status(404).send("Path not found");
});

module.exports = router;
