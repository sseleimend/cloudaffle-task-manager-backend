const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const getUserByEmail = require("../../users/providers/getUserByEmail.provider.js");
const bcrypt = require("bcrypt");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const user = await getUserByEmail(validatedData.email);

    const result = await bcrypt.compare(validatedData.password, user.password);

    if (!result) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please check your credentials",
      });
    }

    return res.status(StatusCodes.OK).json({ login: true });
  } catch (error) {
    errorLogger("Error while trying to login", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = loginProvider;
