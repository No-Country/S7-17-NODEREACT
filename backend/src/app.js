const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./utils/database");
const handleError = require("./middlewares/error.middleware");
const initModels = require("./models/initModels");
const { UserRoutes, AuthRoutes, UserFriendRoutes, RoomMatchRoutes } = require("./routes/index");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

db.authenticate()
  .then(() => console.log("The connection to the database has been established successfully."))
  .catch(error => console.error("Unable to connect to the database: ", error));

initModels();

db.sync({ force: false })
  .then(() => console.log("All models were synchronized successfully."))
  .catch(error => console.error("Unable to synchronize the database: ", error));

app.get("/", (req, res) => {
  console.log("Welcome to the server!");
  res.status(200).json({
    API: "The Question",
    Documentation: `${process.env.HOST}/api/v1/docs`
  });
});

app.use("/api/v1", UserRoutes);
app.use("/api/v1", AuthRoutes);
app.use("/api/v1", UserFriendRoutes);
app.use("/api/v1", RoomMatchRoutes);

app.use(handleError);

module.exports = app;
