const mongoose = require("mongoose");
const ActivitySchema = mongoose.Schema({
  activity_type: {
    type: String,
    required: true,
    enum: ["LOGIN", "CREATE_PROFILE", "UPDATE_PROFILE"],
  },
  user_id: {
    type: String,
    required: true,
  },
  incubator_id: {
    type: String,
    required: false,
  },
  startup_id: {
    type: String,
    required: false,
  },
  mentor_id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  statement: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  role_type: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("activityLogs", ActivitySchema);
