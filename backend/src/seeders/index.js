const db = require("../utils/database");
const initModels = require("../models/initModels");
const getAchievements = require("./achievements");
const getAdvantages = require("./advantages");
const getTopics = require("./topics");

initModels();

db.sync({ force: true })
  .then(() => {
    console.log("Populating the database with an initial set of data. Please, wait a moment...");
    getAchievements();
    getAdvantages();
    getTopics();
  })
  .then(() => console.log("The database has been populated successfully!"))
  .catch(error => console.error("Unable to populate the database: ", error));
