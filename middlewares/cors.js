const cors = require("cors");

const corsmiddleware = cors({
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "https://www.cardsproject.co.il",
    "https://cards-project-front-end.onrender.com",
  ],
});

module.exports = corsmiddleware;
