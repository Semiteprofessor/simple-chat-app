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

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(port, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running at http://localhost:${port}`);
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onConnected = (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on("chat message", (msg) => {
    console.log(`Message from ${socket.id}: ${msg}`);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
};

io.on("connection", onConnected);

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
