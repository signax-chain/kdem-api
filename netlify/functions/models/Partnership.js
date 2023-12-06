const mongoose = require("mongoose");

const PartnershipSchema = mongoose.Schema({
  institution: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  duration_of_mou: {
    type: String,
    required: false,
  },
  expected_outcome: {
    type: String,
    required: false,
  },
  actual_impact: {
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

module.exports = mongoose.model("Partnership", PartnershipSchema);
