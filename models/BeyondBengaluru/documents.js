const mongoose = require("mongoose");
const BBDocumentsSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: "--"
    },
    startup_id: {
        type:String,
        required: true,
    },
    files: {
        type: String,
        required: true,
    },
    type: {
        type:String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    }
});
module.exports = mongoose.model("bbDocuments", BBDocumentsSchema);