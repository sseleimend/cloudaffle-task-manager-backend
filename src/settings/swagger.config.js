const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.1.1",
    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "Cloudaffle Task Manager Backend",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Victor Seleimend",
        url: "https://google.com",
        email: "sseleimend@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: [path.join(__dirname, "..", "**/*.js")],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
