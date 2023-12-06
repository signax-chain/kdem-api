const mongoose = require("mongoose");

const ErrorSchema = mongoose.Schema({
  err: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("error", ErrorSchema);
