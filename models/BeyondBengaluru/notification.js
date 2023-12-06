const mongoose = require("mongoose");
const BBNotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
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
    read: {
        type: Boolean,
        required: true,
        default: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    },
    to_user_id: {
        type:String,
        required: true,
    },
    meta: {
        type: Map,
        required: false,
        default: {},
    }
});
module.exports = mongoose.model("bbNotifications", BBNotificationSchema);