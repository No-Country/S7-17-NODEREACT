const swaggerJSDOC = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "The Question API",
      version: "1.0.0",
      description:
        "API que sirve para almacenar datos de un juego web y realizar distintas operaciones de tipo CRUD con ellos."
    }
  },
  apis: ["./src/routes/*.routes.js", "./src/models/*.model.js"]
};

const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app, port) => {
  //documentation route
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  //Docs on JSON format
  app.get("api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application1/json");
    res.send(swaggerSpec);
  });
  console.log(`API Documentation available in ${process.env.HOST}/api/v1/docs`);
};

module.exports = swaggerDocs;
