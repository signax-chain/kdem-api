const mongoose = require("mongoose");

const FounderSchema = mongoose.Schema({
  founders: {
    type: Array,
    required: false,
    default: [],
  },
  incubator_id: {
    type: String,
    required: true,
  },
  startup_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("founder", FounderSchema);
