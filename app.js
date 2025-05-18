const express = require("express");
const mongoose = require("mongoose");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");

const app = express();
const PORT = 8181;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("Server is listening to port" + PORT);
  connectToDB();
});
