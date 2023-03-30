const db = require("../utils/database");
const initModels = require("../models/initModels");
const getAchievements = require("./achievements");
const getAdvantages = require("./advantages");
const getNews = require("./news");
const getQuestions = require("./questions");
const getTopics = require("./topics");
const getUsers = require("./users");

initModels();

db.sync({ force: true })
  .then(() => {
    console.log("Populating the database with an initial set of data...");
    getAchievements();
    getAdvantages();
    getTopics()
      .then(() => {
        getNews();
        getQuestions();
      })
      .then(() =>
        console.log(
          "The database has been populated successfully! Please, wait a few more seconds until the operation ends."
        )
      );
    getUsers();
  })
  .catch(error => console.error("Unable to populate the database: ", error));
