const bcrypt = require("bcrypt");

const generateUserPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, cryptPassword) => {
  return bcrypt.compareSync(password, cryptPassword);
};

module.exports = { generateUserPassword, comparePassword };
