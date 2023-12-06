const mongoose = require("mongoose");
const BBCertificateSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: "--"
    },
    description: {
        type: String,
        required: false,
        default: "--"
    },
    user_id: {
        type:String,
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    }
});
module.exports = mongoose.model("bbCertificate", BBCertificateSchema);