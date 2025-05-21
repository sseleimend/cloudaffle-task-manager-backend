const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("./middleware/responseFormatter.middleware.js");
const tasksRouter = require("./tasks/tasks.routes.js");
const authRouter = require("./auth/auth.routes.js");
const usersRouter = require("./users/users.routes.js");
const mongoose = require("mongoose");
const expressWinstonLogger = require("./middleware/expressWinston.middleware.js");

const app = express();
const port = 3001;
console.log(process.env.NODE_ENV);

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
app.use(expressWinstonLogger);

app.use("/", tasksRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(null);
});

async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://sseleimend:U39yVmn284x@cluster0.tlskeqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        dbName: "taskManager",
      }
    );
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App listening on port number: ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

bootstrap();
