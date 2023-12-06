const mongoose = require("mongoose");
const ProgramSchema = mongoose.Schema({
  program_name: {
    type: String,
    required: true,
  },
  incubator_id: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("program", ProgramSchema);
