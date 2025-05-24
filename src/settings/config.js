const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("../middleware/responseFormatter.middleware.js");
const tasksRouter = require("../tasks/tasks.routes.js");
const authRouter = require("../auth/auth.routes.js");
const usersRouter = require("../users/users.routes.js");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger.config.js");

function configureApp(app) {
  /* cors */
  const corsOptions = {
    origin: ["http://localhost:5173"],
  };
  app.use(cors(corsOptions));

  /* morgan */
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "../..", "access.log"),
    {
      flags: "a",
    }
  );
  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );

  /* other middlewares */
  app.use(responseFormatter);
  app.use(expressWinstonLogger);

  /* define routes */
  app.use("/", tasksRouter);
  app.use("/auth", authRouter);
  app.use("/users", usersRouter);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json(null);
  });
}

module.exports = configureApp;
