const mongoose = require("mongoose");

const MilestoneSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  period: {
    type: Object,
    required: false,
  },
  due_date: {
    type: String,
    required: false,
  },
  target: {
    type: Number,
    required: false,
  },
  achieved: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  incubator_id: {
    type: String,
    required: false,
  },
  document: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Milestone", MilestoneSchema);
