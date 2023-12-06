const mongoose = require("mongoose");

const fundingRaisedSchema = mongoose.Schema({
  startup: {
    type: Object,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  agency: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("fundingRaised", fundingRaisedSchema);
