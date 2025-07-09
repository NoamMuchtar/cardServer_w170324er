const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

// generate auth token
const generateAuthToken = (user) => {
  //create payload (ID, ISADMIN, ISBUSINESS)
  const payload = {
    _id: user._id,
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

// VERIFY TOKEN
const verifyToken = (tokenFromClient) => {
  try {
    const payload = jwt.verify(tokenFromClient, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
};

module.exports = { generateAuthToken, verifyToken };
