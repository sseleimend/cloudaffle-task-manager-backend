const { StatusCodes } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvider = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");
const deleteTaskProvider = require("./providers/deleteTask.provider.js");

async function handleGetTasks(req, res) {
  const tasks = await getTasksProvider(req, res);
  res.status(StatusCodes.OK).json(tasks);
}

async function handlePostTasks(req, res) {
  const task = await createTaskProvider(req, res);
  res.status(StatusCodes.CREATED).json(task);
}

async function handlePatchTasks(req, res) {
  const updatedTask = await updateTaskProvider(req, res);
  res.status(StatusCodes.OK).json(updatedTask);
}

async function handleDeleteTasks(req, res) {
  const deletedTask = await deleteTaskProvider(req, res);
  res.status(StatusCodes.OK).json(deletedTask);
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
