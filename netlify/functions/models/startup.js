const mongoose = require("mongoose");

const StartupSchema = mongoose.Schema({
  incubator_id: {
    type: String,
    required: false,
  },
  incubator_profile: {
    type: String,
    required: false,
  },
  incubator_name: {
    type: String,
    required: false,
  },
  incubator_location: {
    type: String,
    required: false,
  },
  incubator_details: {
    type: Object,
    required: false,
  },
  startup_id: {
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
  incubation_date: {
    type: String,
    required: false,
  },
  graduation_date: {
    type: Date,
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
  no_of_employees: {
    type: Number,
    required: false,
  },
  active: {
    type: Boolean,
    default: false,
    enum: [false, false],
  },
  funding_status: {
    type: Map,
    required: false,
    default: {
      external: 0,
      internal: 0,
      utilized: 0,
    },
  },
  role: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
    default: "",
  },
  mentors: {
    type: Array,
    default: [],
    required: false,
  },
  cohort_month: {
    type: String,
    required: false,
  },
  cohort_year: {
    type: String,
    required: false,
  },
  program_id: {
    type: String,
    required: false,
  },
  program_name: {
    type: String,
    required: false,
  },
  cin_number: {
    type: String,
    required: false,
    default: "",
  },
  pan_number: {
    type: String,
    required: false,
    default: "",
  },
  gst_number: {
    type: String,
    required: false,
    default: "",
  },
  address: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  sector: {
    type: [],
    required: false,
  },
  industry: {
    type: String,
    required: false,
  },
  startup_type: {
    type: String,
    required: false,
  },
  team_member: {
    type: Array,
    default: [],
    required: false,
  },
  founders: {
    type: Array,
    default: [],
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
  password: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("startup", StartupSchema);
