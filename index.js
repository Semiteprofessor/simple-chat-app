require("dotenv").config();

const express = require("express");
const app = express();
const appRoute = require("express-routemap");
const path = require("path");
const port = process.env.PORT;

const sequelize = require("./config/db.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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
