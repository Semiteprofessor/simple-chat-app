require("dotenv").config();

const express = require("express");
const app = express();
const appRoute = require("express-routemap");
const port = process.env.PORT;

const sequelize = require("./config/db.config");

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    appRoute();
  })
  .catch((err) => {
    app.listen(port, () => {
      console.error("Unable to connect to the database:", err);
    });
    process.exit(1);
  });
