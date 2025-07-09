const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const connectToDB = require("./DB/dbService");
const router = require("./router/router");

const corsmiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const loggerMiddleware = require("./logger/loggerService");

const app = express();
const PORT = 8181;

app.use(express.json());
app.use(express.static("./public"));

app.use(loggerMiddleware());

app.use(corsmiddleware);

app.use(router);

app.use((err, req, res, next) => {
  console.log(err);
  return handleError(res, 500, "Internal Server Error");
});

app.listen(process.env.PORT || PORT, () => {
  console.log(chalk.green.bold.bgYellow("app is listening to port " + PORT));
  connectToDB();
});
