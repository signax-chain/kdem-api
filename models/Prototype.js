const mongoose = require("mongoose");

const PrototypesSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  link_or_photo: {
    type: String,
    required: false,
  },
  startup: {
    type: Object,
    required: false,
  },
  development_time: {
    type: String,
    required: false,
  },
  incubator_contribution: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Prototypes", PrototypesSchema);