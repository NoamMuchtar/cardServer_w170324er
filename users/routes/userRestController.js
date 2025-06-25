const express = require("express");
const {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
  updateUser,
  changeBusinessStatus,
  deleteUser,
} = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError, createError } = require("../../utils/handleErrors");
const returnUser = require("../helpers/returnUser");
const {
  validateRegistertion,
  validateLogin,
} = require("../validation/userValidationService");

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
  try {
    let newUser = req.body;

    const errorMessage = validateRegistertion(newUser);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }

    let user = await registerUser(newUser);
    res.status(201).send(returnUser(user));
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

  try {
    if (!userInfo.isAdmin) {
      throw createError(
        "Authorization",
        "Only admin user can get all users list",
        403
      );
    }
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

    const errorMessage = validateLogin(req.body);
    if (errorMessage != "") {
      console.log(errorMessage);
      return createError("Validation", errorMessage, 400);
    }

    const token = await loginUser(email, password);
    res.send(token).status(200);
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// update user
router.put("/:id", auth, async (req, res) => {
  let userInfo = req.user;
  let updatedUser = req.body;
  const { id } = req.params;
  try {
    if (userInfo._id !== id) {
      throw createError(
        "Authorization",
        "Only the own user can edit is details",
        403
      );
    }

    const errorMessage = validateRegistertion(req.body);
    if (errorMessage != "") {
      return createError("Validation", errorMessage, 400);
    }
    console.log(updatedUser);
    let user = await updateUser(id, updatedUser);
    console.log(user);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// change isBusiness status
router.patch("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;
  try {
    if (userInfo._id !== id) {
      throw createError(
        "Authorization",
        "Only the own user can change is status",
        403
      );
    }

    let user = await changeBusinessStatus(id);
    res.status(201).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

// delete user

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  let userInfo = req.user;

  try {
    if (!userInfo.isAdmin && userInfo._id !== id) {
      throw createError(
        "Authorization",
        "Only the own user or admin can delete",
        403
      );
    }

    let user = await deleteUser(id);
    res.status(200).send(returnUser(user));
  } catch (error) {
    return handleError(res, 400, error.message);
  }
});

module.exports = router;
