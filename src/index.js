const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("./middleware/responseFormatter.middleware.js");
const tasksRouter = require("./tasks/tasks.routes.js");

const app = express();
const port = 3001;

app.use(express.json());

const corsOptions = {
  origin: ["localhost"],
};

app.use(cors(corsOptions));

let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"),
  {
    flags: "a",
  }
);

app.use(
  morgan("combined", {
    stream: accessLogStream,
  })
);

app.use(responseFormatter);

app.use("/", tasksRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(null);
});

app.listen(port, () => {
  console.log(`App listening on port number: ${port}`);
});
