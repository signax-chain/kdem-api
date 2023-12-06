const mongoose = require("mongoose");

const ConnectSchema = mongoose.Schema({
  startup: {
    type: Object,
    required: false,
  },
  organisation_connected: {
    type: String,
    required: false,
  },
  purpose: {
    type: String,
    required: false,
  },
  date_of_connect: {
    type: String,
    required: false,
  },
  outcome_of_connect: {
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

module.exports = mongoose.model("Connect", ConnectSchema);
