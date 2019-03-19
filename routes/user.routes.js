const express = require("express");
const user = require("../controller/user.controller");

const route = express.Router();

route.get("/users", user.getUsers);
route.get("/user", user.getUser);
route.delete("/users/:id", user.deleteUser);
route.post("/user/logout", user.logoutUser);
route.post("/user/signup", user.createUser);
route.post("/user/login", user.loginUser);

module.exports = route;
