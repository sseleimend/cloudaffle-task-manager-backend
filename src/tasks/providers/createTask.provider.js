const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");

async function createTaskProvider(req, res) {
  const validatedResult = matchedData(req);
  const task = new Task(validatedResult);
  return await task.save();
}

module.exports = createTaskProvider;
