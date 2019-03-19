const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
      trim: true
    },
    process: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Process",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
