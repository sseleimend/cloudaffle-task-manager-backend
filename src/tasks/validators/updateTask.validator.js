const { body } = require("express-validator");

const updateTaskValidator = [
  body("_id", "Valid document id is required").notEmpty().isMongoId(),
  body("title", "The title must be a string").optional().isString(),
  body("title").isLength({ max: 100 }),
  body("title").trim(),
  body(
    "description",
    "The description cannot be empty and needs to be a string"
  )
    .optional()
    .isString()
    .trim(),
  body(
    "description",
    "The description cannot be more than 500 characters"
  ).isLength({ max: 500 }),
  body("dueDate", "dueDate needs to be a valid ISO8601 string")
    .optional()
    .isISO8601(),
  body("priority").optional().isIn(["low", "normal", "high"]),
  body("status").optional().isIn(["todo", "inProgress", "completed"]),
];

module.exports = updateTaskValidator;
