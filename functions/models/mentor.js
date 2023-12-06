const mongoose = require("mongoose");

const MentorSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  linkedin_url: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: false,
    default:
      "https://firebasestorage.googleapis.com/v0/b/kdem-b32a7.appspot.com/o/noun_startup_1561106%20(1).png?alt=media&token=8ecf773b-b13e-4be6-a759-f1d4b0cf607d",
  },
  social_links: {
    type: Map,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  year_of_experience: {
    type: String,
    required: false,
  },
  area_of_expertise: {
    type: Array,
    required: false,
  },
  current_designation: {
    type: String,
    required: false,
  },
  organisation: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  incubator_id: {
    type: String,
    required: false,
  },
  incubator_name: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("mentor", MentorSchema);
