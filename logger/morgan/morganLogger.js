const morgan = require("morgan");
const chalk = require("chalk");
const currentTime = require("../../utils/timeHelper");

const morganLogger = morgan(function (tokens, req, res) {
  const { year, month, day, hours, minutes, seconds } = currentTime();
  let message = [
    `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    " - ",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  if (res.statusCode >= 400) return chalk.redBright(message);
  else return chalk.cyanBright(message);
});

module.exports = morganLogger;
