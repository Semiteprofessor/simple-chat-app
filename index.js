require("dotenv").config();

const express = require("express");
const app = express();
const displayRoutes = require("express-routemap");
const path = require("path");
const port = process.env.PORT;

app.use(express.json());

const sequelize = require("./config/db.config");

const userRoute = require("./routes/user.route");

app.use("/api/v1/users", userRoute);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");
    displayRoutes(app);
  })
  .catch((err) => {
    app.listen(port, () => {
      console.error("Unable to connect to the database:", err);
    });
    process.exit(1);
  });
