const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.1.1",
  },
  apis: [path.join(__dirname, "..", "**/*.js")],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
