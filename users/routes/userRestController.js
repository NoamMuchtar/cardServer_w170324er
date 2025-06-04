const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
} = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError, createError } = require("../../utils/handleErrors");

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    let user = await registerUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// Get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    let userInfo = req.user;
    let user = await getUser(id);
    if (!userInfo.isAdmin && userInfo._id != user._id) {
      return createError(
        "Authorization",
        "Only the own user or admin can show is details",
        403
      );
    }

    res.status(200).send(user);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// Get all users
router.get("/", auth, async (req, res) => {
  let userInfo = req.user;

  if (!userInfo.isAdmin) {
    return createError(
      "Authorization",
      "Only admin user can get all users list",
      403
    );
  }
  try {
    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    return handleError(res, error.status, error.message);
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    const token = await loginUser(email, password);
    res.send(token).status(200);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

module.exports = router;
