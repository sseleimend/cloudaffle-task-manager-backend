const express = require("express");
const { validationResult } = require("express-validator");
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js");
const { StatusCodes } = require("http-status-codes");

const tasksRouter = express.Router();

tasksRouter.get("/tasks", tasksController.handleGetTasks);

tasksRouter.post("/tasks", createTaskValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return tasksController.handlePostTasks(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

tasksRouter.patch("/tasks", tasksController.handlePatchTasks);

tasksRouter.delete("/tasks", tasksController.handleDeleteTasks);

module.exports = tasksRouter;
