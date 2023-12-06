const mongoose = require("mongoose");

const FundignSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  incubator_id: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("funding", FundignSchema);
