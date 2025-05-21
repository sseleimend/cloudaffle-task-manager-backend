const { query } = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid integer")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("limit").customSanitizer((value) => (value ? value : 5)),
  query("page", "page must be a valid integer")
    .optional()
    .isInt()
    .toInt({ min: 1 }),
  query("page").customSanitizer((value) => (value ? value : 1)),
  query("order", "order must be one of ['asc', 'dsc']")
    .optional()
    .isIn(["asc", "dsc"]),
  query("order").customSanitizer((value) => (value ? value : "asc")),
];

module.exports = getTasksValidator;
