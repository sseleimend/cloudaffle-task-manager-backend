const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const tasksRouter = require("./tasks/tasks.router.js");

const app = express();
const port = 3001;

app.use(express.json());

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

app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`App listening on port number: ${port}`);
});
