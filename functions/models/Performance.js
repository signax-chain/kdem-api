const mongoose = require("mongoose");

const PerformanceSchema = mongoose.Schema({
  jobs_created: {
    type: Number,
    required: false,
  },
  revenue_generated: {
    type: Number,
    required: false,
  },
  technologies_commercialized: {
    type: Number,
    required: false,
  },
  seat_occupancy_rate: {
    type: Number,
    required: false,
  },
  user_id: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("performance", PerformanceSchema);
