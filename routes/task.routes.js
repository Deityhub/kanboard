const express = require("express");
const task = require("../controller/task.controller");

const route = express.Router();

route.post("/task/create/:processId", task.createTask);
route.put("/task/:processId/:taskId", task.modifyTask);
route.delete("/task/:processId/:taskId", task.deleteTask);

module.exports = route;
