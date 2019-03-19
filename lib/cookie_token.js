const jwt = require("jsonwebtoken");

module.exports = async (user, res) => {
  let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  // TODO
  // set secure flag, so it can only be sent throught https
  res.cookie("kanboardToken", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
  });

  if (token) return true;

  return false;
};
