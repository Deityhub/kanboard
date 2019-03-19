const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    processes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Process"
      }
    ]
  },
  { timestamps: true }
);

BoardSchema.pre("save", function(next) {
  let nameArray = this.name.split(" ");
  nameArray = nameArray.map(name => {
    //capitalize the first letters
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
  this.name = nameArray.join(" ").toString();
  next();
});

module.exports = mongoose.model("Board", BoardSchema);
