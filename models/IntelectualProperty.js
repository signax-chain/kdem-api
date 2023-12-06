const mongoose = require("mongoose");

const IntelectualPropertySchema = mongoose.Schema({
  startup: {
    type: Object,
    required: false,
  },
  ip_generated: {
    type: String,
    required: false,
  },
  ip_details: {
    type: String,
    required: false,
  },
  patent_field: {
    type: String,
    required: false,
  },
  patent_granted: {
    type: String,
    required: false,
  },
  patent_application_date: {
    type: String,
    required: false,
  },
  incubator_contribution: {
    type: String,
    required: false,
  },
  jurisdiction: {
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

module.exports = mongoose.model(
  "IntelectualProperty",
  IntelectualPropertySchema
);
