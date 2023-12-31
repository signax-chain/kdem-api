const mongoose = require("mongoose");
require("dotenv").config();

const connect = mongoose.connect(
  process.env.MONGODB_URL_PROD,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Connected to database");
  }
);

module.exports = connect;
