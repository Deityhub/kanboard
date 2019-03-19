const asyncHandler = require("../lib/async_handler");
const Task = require("../model/task.model");
const Process = require("../model/process.model");

exports.createTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, you need to sign in for this");

  const task = await Task.create({ task: req.body.task, process: req.params.processId });
  const process = await Process.findById(req.params.processId);
  process.tasks.push(task._id);
  process.save(err => {
    if (err) next(err);

    res.json({ message: "task created", task, process });
  });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, are you sure you are logged in");

  const process = await Process.findById(req.params.processId);
  if (!process) throw new Error("This process does not exist");

  const task = await Task.findByIdAndDelete(req.params.taskId);
  if (task) {
    process.tasks = process.tasks.filter(task => task.toString() !== req.params.taskId.toString());
    process.save((err, result) => {
      if (err) next(err);
      res.json({ message: "task deleted successfully", task, process });
    });
  } else {
    throw new Error("task already deleted!");
  }
});

exports.modifyTask = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Hey, are you sure you are logged in");

  const task = await Task.findById(req.params.taskId);
  if (!task) throw new Error("Task does not exist, try another one");

  const oldProcess = await Process.findById(task.process);

  const newProcess = await Process.findById(req.params.processId);
  if (!newProcess) throw new Error("This process does not exist");

  if (newProcess.tasks.indexOf(req.params.taskId) >= 0) throw new Error(`Task with the id ${req.params.taskId} already exist in this process`);

  oldProcess.tasks = oldProcess.tasks.filter(task => task.toString() !== req.params.taskId.toString());

  newProcess.tasks.push(req.params.taskId);

  task.process = newProcess._id;
  task.save((err, result) => {
    if (err) next(err);

    oldProcess.save(err => {
      if (err) next(err);

      newProcess.save(err => {
        if (err) next(err);

        res.json({ message: "Task modification complete and successful", task, newProcess, oldProcess });
      });
    });
  });
});
