const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    unique: true,
    type: String,
    maxlength: 225
  },
  name: {
    required: true,
    type: String,
    maxlength: 300
  },
  email: {
    required: true,
    unique: true,
    type: String,
    lowercase: true,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  let namesArray = this.name.split(" ");
  namesArray = namesArray.map(name => {
    //capitalize the first letters
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
  this.name = namesArray.join(" ").toString();
  next();
});

module.exports = mongoose.model("User", UserSchema);
