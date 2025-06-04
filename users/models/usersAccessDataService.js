const { generateAuthToken } = require("../../auth/providers/jwt");
const { createError } = require("../../utils/handleErrors");
const User = require("./mongodb/User");

// Register new user
const registerUser = async (newUser) => {
  try {
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

    if (userFromDB.password !== password) {
      return createError("Authentication", "Invalid email or password");
    }

    const token = generateAuthToken(userFromDB);
    return token;
  } catch (error) {
    return createError("Authentication", error.message);
  }
};
module.exports = { registerUser, getUser, getAllUsers, loginUser };
