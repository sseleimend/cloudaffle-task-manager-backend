const { StatusCodes } = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js");
const getTasksProvider = require("./providers/getTasks.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");

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

function handleDeleteTasks(req, res) {
  res.send("DELETE tasks controller");
}

module.exports = {
  handleGetTasks,
  handlePostTasks,
  handlePatchTasks,
  handleDeleteTasks,
};
