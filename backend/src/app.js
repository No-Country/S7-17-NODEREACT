const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const hendleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("The connection to the database has been established successfully."))
  .catch(error => console.error("Unable to connect to the database: ", error));

initModels();

db.sync({ force: true })
  .then(() => console.log("All models were synchronized successfully."))
  .catch(error => console.error("Unable to synchronize the database: ", error));

app.get("/", (req, res) => {
  console.log("Welcome to the server!");
});

app.use(hendleError);

module.exports = app;
