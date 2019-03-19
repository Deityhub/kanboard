const asyncHandler = require("../lib/async_handler");
const Board = require("../model/board.model");
const Process = require("../model/process.model");
const Task = require("../model/task.model");
const capitalize = require("../lib/capitalize");

exports.createUserBoard = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, you need to log in to perform this operation.");

  if (!req.body.name.trim().length > 0) throw new Error("Board name should not be empty");

  let name = capitalize(req.body.name);
  let nameExist = await Board.findOne({ name, user: req.userId });
  if (nameExist) throw new Error("Board with this name already created by this user, try another one");

  const board = await Board.create({ name: req.body.name, user: req.userId });
  res.json({ message: "board created successfully", board });
});

exports.getBoard = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Wait!, it seems you are not logged in.");

  const board = await Board.findById(req.params.boardId).populate({
    path: "processes",
    populate: { path: "tasks" }
  });
  if (!board) throw new Error("Board not found or does not exist");

  res.json({ message: `board with id ${board._id} found`, board });
});

exports.getUserBoards = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("You need to login");

  const boards = await Board.find({ user: req.userId });
  res.json({ count: boards.length, boards });
});

exports.editUserBoard = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Login to perform this operation");

  const board = await Board.findById(req.params.boardId).populate({
    path: "processes",
    populate: { path: "tasks" }
  });
  if (!board) throw new Error("Board not found or does not exist");

  board.name = req.body.name;
  board.save((err, result) => {
    if (err) next(err);

    res.json({ message: `Board with id ${result._id} updated successfully`, board });
  });
});

exports.deleteUserBoard = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("To prove you are the owner, log in");

  const board = await Board.findById(req.params.boardId);
  const done = board.processes.map(async (process, index, array) => {
    const deletedProcess = await Process.findByIdAndDelete(process);

    let completed = false;
    if (deletedProcess) {
      const taskDeleteDone = deletedProcess.tasks.map(async (task, index, array) => {
        const deletedTask = await Task.findByIdAndDelete(task);

        if (deletedTask) {
          if (index == array.length - 1) completed = true;

          completed = false;
        }
      });

      if (taskDeleteDone) {
        if (index == array.length - 1) completed = true;
      }
    }
    return completed;
  });
  if (done) {
    const deletedBoard = await Board.findByIdAndDelete(req.params.boardId);
    if (deletedBoard) res.json({ message: `board with the id ${deletedBoard._id} deleted successfully.`, deletedBoard: deletedBoard._id });
  }
});
