const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  start_date: {
    type: String,
    required: false,
  },
  end_date: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  no_of_participants: {
    type: Number,
    required: false,
  },
  speakers: {
    type: Array,
    required: false,
  },
  incubator_id: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
  participants_file_url: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);
