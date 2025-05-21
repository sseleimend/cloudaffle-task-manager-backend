const express = require("express");
const authController = require("./auth.controller.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;
