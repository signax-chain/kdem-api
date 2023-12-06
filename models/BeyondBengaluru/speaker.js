const mongoose = require("mongoose");
const BBSpeakerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    creatorId: {
        type:String,
        required: true,
    },
    photoURL: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
});
module.exports = mongoose.model("bbSpeaker", BBSpeakerSchema);