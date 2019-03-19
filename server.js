require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const user_route = require("./routes/user.routes");
const process_route = require("./routes/process.routes");
const task_route = require("./routes/task.routes");
const board_route = require("./routes/board.routes");
const User = require("./model/user.model");

mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => console.log("database is connected..."))
  .catch(error => console.log(error));
mongoose.Promise = global.Promise;

const app = express();

// have access to all the static files generated for the frontend
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(function(req, res, next) {
  // This cors setting makes sure that cookie is set on the client's device
  // In the frontend make sure to set withCredentials: true, so that cookie can be sent along on network request

  // use this in  production
  res.header("Access-Control-Allow-Origin", "https://kanboarding.herokuapp.com");

  // use this in production
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());

app.use(async (req, res, next) => {
  const { kanboardToken } = req.cookies;
  if (kanboardToken) {
    try {
      const { userId } = await jwt.verify(kanboardToken, process.env.JWT_SECRET);
      req.userId = userId;
    } catch (err) {
      res.clearCookie("kanboardToken");
      next(err);
    }
  }
  next();
});

app.use(async (req, res, next) => {
  if (!req.userId) return next();

  const user = await User.findById(req.userId, "name email username _id");
  req.user = user;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", user_route);
app.use("/api", process_route);
app.use("/api", task_route);
app.use("/api", board_route);

app.use((err, req, res, next) => {
  res.json({
    error: err.message
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 4500;
app.listen(port, () => console.log(`server running on port ${port}`));
