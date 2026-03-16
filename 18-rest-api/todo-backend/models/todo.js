const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    date: Date,
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { Timestamp: true },
);

module.exports = mongoose.model("TodoItem", todoSchema);
