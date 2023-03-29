const db = require("../utils/database");
const initModels = require("../models/initModels");
const getAdvantages = require("./advantages");
const getAchievements = require("./achievements");

initModels();

db.sync({ force: true })
  .then(() => {
    console.log("Populating the database with an initial set of data. Please, wait a moment...");
    getAdvantages();
    getAchievements();
  })
  .then(() => console.log("The database has been populated successfully!"))
  .catch(error => console.error("Unable to populate the database: ", error));
