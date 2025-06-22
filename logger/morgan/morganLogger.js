const morgan = require("morgan");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const currentTime = require("../../utils/timeHelper");

const logDirectory = path.join(__dirname, "../../logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const morganLogger = morgan(function (tokens, req, res) {
  const { year, month, day, hours, minutes, seconds } = currentTime();

  const dateForFile = `${year}-${month}-${day}`;
  const logFilePath = path.join(logDirectory, `${dateForFile}.log`);

  let message = [
    `[${year}/${month}/${day} ${hours}:${minutes}:${seconds}]`,
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    " - ",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");

  if (res.statusCode >= 400) {
    const errorText = res.locals.errorMessage
      ? ` | ${res.locals.errorMessage}`
      : "";
    const plainMessage = message + errorText + "\n";
    fs.appendFileSync(logFilePath, plainMessage);
    return chalk.redBright(message);
  } else return chalk.cyanBright(message);
});

module.exports = morganLogger;
