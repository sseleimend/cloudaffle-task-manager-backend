const { matchedData } = require("express-validator");
const User = require("../user.schema.js");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const { StatusCodes } = require("http-status-codes");

async function createUserProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: validatedData.password,
    });
    await user.save();
    delete user.password;
    res.status(StatusCodes.CREATED).json(user);
  } catch (error) {
    errorLogger("Error creating a new user", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "Unable to process your request at the moment, please try later.",
    });
  }
}

module.exports = createUserProvider;
