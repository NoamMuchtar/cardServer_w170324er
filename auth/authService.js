const { createError, handleError } = require("../utils/handleErrors");
const { verifyToken } = require("./providers/jwt");
require("dotenv").config();

const TOKEN_GENERATOR = process.env.TOKEN_GENERATOR;

const auth = (req, res, next) => {
  if (TOKEN_GENERATOR === "jwt") {
    try {
      const tokenFromClient = req.header("x-auth-token");
      if (!tokenFromClient) {
        return createError("Authentication", "Please login", 401);
      }

      const userInfo = verifyToken(tokenFromClient);
      if (!userInfo) {
        return createError("Authentication", "Unauthorize user", 403);
      }

      req.user = userInfo;
      return next();
    } catch (error) {
      return handleError(res, error.status, error.message);
    }
  }

  return handleError(res, 500, "Server auth method not found");
};

module.exports = auth;
