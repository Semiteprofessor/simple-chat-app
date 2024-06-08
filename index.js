require("dotenv").config();

const express = require("express");
const app = express();
const displayRoutes = require("express-routemap");
const io = require("socket.io");
const path = require("path");
const port = process.env.PORT;

app.use(express.json());

const sequelize = require("./config/db.config");

const userRoute = require("./routes/user.route");

app.use("/api/v1/users", userRoute);

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

io.on("connection", (socket) => {
  console.log("Client connected" + socket.id);
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Database connected successfully on http://localhost:" + port);
//     displayRoutes(app);
//   })
//   .catch((err) => {
//     app.listen(port, () => {
//       console.error("Unable to connect to the database:", err);
//     });
//     process.exit(1);
//   });
