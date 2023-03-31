const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const hendleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");
const { UserRoutes, AuthRoutes, UserFriend } = require("./routes/index");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("Authenticate complete"))
  .catch(error => console.log(error));

initModels();

db.sync({ force: false })
  .then(() => console.log("Synchronized database"))
  .catch(error => console.log(error));

app.get("/", (req, res) => {
  console.log("Bienvenido al server");
  res.status(200).json({
    API: "The Question",
    Documanetation: `${process.env.HOST}/api/v1/docs`
  });
});

app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", UserFriend);

app.use(hendleError);

module.exports = app;
