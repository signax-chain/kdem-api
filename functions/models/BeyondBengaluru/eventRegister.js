const mongoose = require("mongoose");
const BBEventRegisterSchema = mongoose.Schema({
    startupName: {
        type: String,
        required: true
    },
    startupDetails: {
        type: Map,
        required: false,
        default: {}
    },
    startup_id: {
        type: String,
        required: true
    },
    event_id: {
        type:String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
        default: new Date(),
    },
});
module.exports = mongoose.model("bbEventResponses", BBEventRegisterSchema);