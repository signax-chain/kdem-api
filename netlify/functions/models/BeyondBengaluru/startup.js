const mongoose = require("mongoose");
const BBStartupSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    sector: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      founder: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: false
        },
        contact: {
            type: String,
            required: false,
        },
        designation: {
            type: String,
            required: false,
        }
      },
      email: {
        type: String,
        required: false,
      },
      contact: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      companyType: {
        type: String,
        required: false,
      },
      hasCIN: {
        type: String,
        required: false,
      },
      CIN: {
        type: String,
        required: false,
        default: "N/A"
      },
      isRegisteredWithStartupKarnataka: {
        type: String,
        required: false,
        default: "No"
      },
      isRegisteredWithDPIIT: {
        type: String,
        required: false,
        default: "No"
      },
      profile: {
        type: String,
        required: false,
        default: "https://firebasestorage.googleapis.com/v0/b/kdem-b32a7.appspot.com/o/kdem-icon.svg?alt=media&token=7347229d-36f5-4695-bfac-c3f8ffa8d4d1"
      },
      bbId: {
        type: String,
        required: false,
        default: ""
      },
      password: {
        type: String,
        required: false,
      },
      isVerified: {
        type: Boolean,
        required: false,
        default: false
      },
      firebaseId: {
        type: String,
        required: true,
      },
      dpiitNumber: {
        type: String,
        required: false,
      },
      startupKarnatakaRegisterNumber: {
        type: String,
        required: false,
      }
});
module.exports = mongoose.model("bbStartups", BBStartupSchema);
