const { matchedData } = require("express-validator");
const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTaskProvider(req, res) {
  const query = matchedData(req);
  console.log(query);
  try {
    const tasks = await Task.find();
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    errorLogger("Error while fetching tasks", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = getTaskProvider;
