const { matchedData } = require("express-validator");
const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");

async function getTaskProvider(req, res) {
  const data = matchedData(req);

  try {
    const totalTasks = await Task.countDocuments();
    const currentPage = data.page;
    const limit = data.limit;
    const order = data.order;
    const totalPages = Math.ceil(totalTasks / limit);
    const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
    const previousPage = currentPage === 1 ? currentPage : currentPage - 1;

    const tasks = await Task.find()
      .limit(limit)
      .skip(currentPage - 1);
    return res.status(StatusCodes.OK).json(tasks);
  } catch (error) {
    errorLogger("Error while fetching tasks", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = getTaskProvider;
