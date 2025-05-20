const { StatusCodes } = require("http-status-codes");
const Task = require("./task.schema.js");

function handleGetTasks(req, res) {
  let response = [
    {
      title: "Title of the task",
      date: "2025-01-01T12:00:00Z",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis, felis a rutrum finibus, metus elit dapibus ante, eu tempus mi nulla sed libero. Suspendisse sed odio id magna imperdiet accumsan. Nunc aliquet, sem at dictum vehicula, elit urna pellentesque nisl, sit amet feugiat enim nisi vel turpis. Phasellus faucibus.",
      priority: "normal",
      status: "todo",
    },
    {
      title: "Title of the task 2",
      date: "2025-01-01T12:00:00Z",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur venenatis, felis a rutrum finibus, metus elit dapibus ante, eu tempus mi nulla sed libero. Suspendisse sed odio id magna imperdiet accumsan. Nunc aliquet, sem at dictum vehicula, elit urna pellentesque nisl, sit amet feugiat enim nisi vel turpis. Phasellus faucibus.",
      priority: "normal",
      status: "todo",
    },
  ];

  res.status(StatusCodes.OK).json(response);
}

async function handlePostTasks(req, res) {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
  });

  await task.save();

  res.status(StatusCodes.CREATED).json(task);
}

function handlePatchTasks(req, res) {
  res.send("PATCH tasks controller");
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
