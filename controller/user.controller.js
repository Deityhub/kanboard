const bcrypt = require("bcryptjs");
const User = require("../model/user.model");
const asyncHandler = require("../lib/async_handler");
const setCookie = require("../lib/cookie_token");

exports.getUsers = asyncHandler(async (req, res, next) => {
  //TODO
  // check if user is logged in
  // check if user have the necessary priviledges
  // get all the users
  const users = await User.find({}).select("username email name _id");
  res.json({
    count: users.length,
    users
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  if (!req.user) throw new Error("Seems the user is not logged in");

  const user = await User.findById(req.userId, "name username _id email");
  res.json({ user, message: `user with the id ${req.userId} found` });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const usernameExist = await User.findOne({ username: req.body.username });
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) throw new Error("Email already exist");
  if (usernameExist) throw new Error("Username already exist");

  let password = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password });
  const set = await setCookie(user, res);
  if (set) return res.json({ message: "user created successfully" });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  if (!req.body.email || !(req.body.email.length > 0)) throw new Error("email field should not be empty");

  if (!req.body.password) throw new Error("password field should not be empty");

  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) throw new Error("email or password is incorrect");

  const confirmPassword = await bcrypt.compare(req.body.password, user.password);
  if (!confirmPassword) throw new Error("email or password is incorrect");

  const set = await setCookie(user, res);
  if (set) return res.json({ message: "User successfully logged in", user: { _id: user._id, name: user.name, username: user.username } });
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("kanboardToken");
  res.json({ message: "User successfully logged out" });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  //TODO
  // check if the user is logged in
  // check if the user have the necessary permissions to delete
  // delete the specified user
  const deleted = await User.findByIdAndDelete(req.params.id);
  if (deleted) return res.json({ message: "User successfully deleted" });
});
