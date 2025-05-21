const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
} = require("../models/usersAccessDataService");

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;
    let user = await registerUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get user by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let user = await getUser(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    let users = await getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
