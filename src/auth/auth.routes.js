const express = require("express");
const authController = require("./auth.controller.js");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const loginValidator = require("./validators/login.validator.js");

const authRouter = express.Router();

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *    summary: User login
 *    tags: [Authentication]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Login'
 *    responses:
 *      200:
 *        description: User login successfully
 *        content:
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 200
 *              message: Ok
 *              data:
 *                accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODJkZGViMTZmZGRhYTUyNTAyMzg5N2EiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSIsImlhdCI6MTc0NzkyMjIyNiwiZXhwIjoxNzQ4MDA4NjI2fQ.EjRO5G9b5UGckD16xtSTWiAhfsDWjkbEAv9icfn4-Pw
 */

authRouter.post("/login", loginValidator, (req, res) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return authController.handleLogin(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Login:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          description: A valid email address
 *        password:
 *          type: string
 *          description: Must contain 8 characters and also a number, a capital letter and a special character
 *      example:
 *        email: john@doe.com
 *        password: Test123#
 */
