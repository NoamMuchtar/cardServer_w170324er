const express = require("express");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");

const corsmiddleware = require("./middlewares/cors");

const app = express();
const PORT = 8181;

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`
  );
  next();
});

app.use(corsmiddleware);

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log("Server is listening to port" + PORT);
  connectToDB();
});
