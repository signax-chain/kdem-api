const mongoose = require("mongoose");

const IncubatorSchema = mongoose.Schema({
  password: {
    type: String,
    required: false,
  },
  super_incubator: {
    type: String,
    required: false,
  },
  incubator_id: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  ceo_incubator: {
    type: Map,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  profile: {
    type: String,
    required: false,
    default:
      "https://firebasestorage.googleapis.com/v0/b/kdem-b32a7.appspot.com/o/noun_startup_1561106%20(1).png?alt=media&token=8ecf773b-b13e-4be6-a759-f1d4b0cf607d",
  },
  board_directors: {
    type: [],
    default: [],
  },
  board_managements: {
    type: [],
    default: [],
  },
  team_member: {
    type: Array,
    default: [],
  },
  role: {
    type: String,
    required: false,
    ref: "roles",
  },
  institution_type_id: {
    type: String,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
    enum: [true, false],
  },
  is_accepted: {
    type: Boolean,
    default: true,
    enum: [true, false],
  },
  incubator_type: {
    type: String,
    required: false,
  },
  role_type: {
    type: String,
    required: false,
  },
  tagline: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  incubation_manager: {
    type: Map,
    required: false,
  },
  sectors: {
    type: [],
    required: false,
  },
  linkedin_url: {
    type: String,
    required: false,
  },
  year_of_establishment: {
    type: String,
    required: false,
  },
  total_startups: {
    type: Number,
    required: false,
    default: 0
  },
  total_mentors: {
    type: Number,
    required: false,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("incubator", IncubatorSchema);
