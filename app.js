const express = require("express");
const chalk = require("chalk");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");

const corsmiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");

const app = express();
const PORT = 8181;

app.use(express.json());
app.use(express.static("./public"));

app.use((req, res, next) => {
  console.log(
    chalk.yellow(
      `Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`
    )
  );
  next();
});

app.use(corsmiddleware);

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  return handleError(res, 500, "Internal Server Error");
});

app.listen(PORT, () => {
  console.log(chalk.green.bold.bgYellow("app is listening to port " + PORT));
  connectToDB();
});
