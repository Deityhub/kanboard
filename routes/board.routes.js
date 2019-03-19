const express = require("express");
const board = require("../controller/board.controller");
const route = express.Router();

route.post("/user/board", board.createUserBoard);
route.get("/user/boards", board.getUserBoards);
route.get("/boards/:boardId", board.getBoard);
route.put("/boards/:boardId", board.editUserBoard);
route.delete("/boards/:boardId", board.deleteUserBoard);

module.exports = route;
