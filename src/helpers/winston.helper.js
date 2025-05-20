const winston = require("winston");
const path = require("path");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf(
      (info) => `${info.timestamp} [${info.level}] : ${info.message}`
    )
  ),
});

const transports = [
  new winston.transports.Console({
    level: "info",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  new winston.transports.File({
    level: "info",
    filename: path.join(__dirname, "..", "info.log"),
    format: winston.format.json(),
  }),
  new winston.transports.File({
    level: "error",
    filename: path.join(__dirname, "..", "error.log"),
    format: winston.format.json(),
  }),
];
