const express = require("express");
const cardRouter = require("../cards/routes/cardRestController");
const userRouter = require("../users/routes/userRestController");
const { handleError } = require("../utils/handleErrors");

const router = express.Router();

router.use("/cards", cardRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  return handleError(res, 404, "Path not found");
});

module.exports = router;
