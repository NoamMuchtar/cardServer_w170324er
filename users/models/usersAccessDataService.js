const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const { generateUserPassword, comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");

// Register new user
const registerUser = async (newUser) => {
  try {
    newUser.password = generateUserPassword(newUser.password);
    let user = new User(newUser);
    user = await user.save();
    return user;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// get user
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// login user

const loginUser = async (email, password) => {
  try {
    const userFromDB = await User.findOne({ email });
    if (!userFromDB) {
      return createError("Authentication", "User not exist");
    }

    // בדיקה האם המשתמש חסום
    if (userFromDB.lockUntil && userFromDB.lockUntil > Date.now()) {
      return createError(
        "Authentication",
        "Account is locked due to multiple login attemts. Try agian later.",
        403
      );
    }
    if (!comparePassword(password, userFromDB.password)) {
      const attempts = (userFromDB.loginAttempts || 0) + 1;
      userFromDB.loginAttempts = attempts;

      if (attempts >= 3) {
        userFromDB.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000);
      }
      await userFromDB.save();
      return createError("Authentication", "Invalid email or password");
    }

    // איפוס נסיונות במקרה של התחברות מוצלחת
    userFromDB.loginAttempts = 0;
    userFromDB.lockUntil = undefined;
    await userFromDB.save();

    const token = generateAuthToken(userFromDB);
    return token;
  } catch (error) {
    return createError("Authentication", error.message);
  }
};

// update user

const updateUser = async (id, updatedUser) => {
  try {
    const userFromDB = await User.findById(id);

    if (!userFromDB) {
      return createError("Authentication", "User not exist", 400);
    }
    let user = await User.findByIdAndUpdate(id, updatedUser);
    user = await user.save();
    return user;
  } catch (error) {
    return createError("Mongoos", error.message);
  }
};

// update business status
const changeBusinessStatus = async (id) => {
  let user = await User.findById(id);

  if (!user) {
    return createError("Authentication", "User not exist", 400);
  }

  user.isBusiness = !user.isBusiness;
  user = await user.save();
  return user;
};

// delete user

const deleteUser = async (id) => {
  let user = await User.findById(id);

  if (!user) {
    return createError("Authentication", "User not exist", 400);
  }

  user = await User.findByIdAndDelete(id);
  return user;
};
module.exports = {
  registerUser,
  getUser,
  getAllUsers,
  loginUser,
  updateUser,
  changeBusinessStatus,
  deleteUser,
};
