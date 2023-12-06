const mongoose = require("mongoose");
const BBEventsSchema = mongoose.Schema({
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
    creatorId: {
        type:String,
        required: true,
    },
    date: {
        type: String,
        required: false,
        default: `${Date.now()}`
    },
    time: {
        type: String,
        required: false,
        default: "--"
    },
    type: {
        type: String,
        required: false,
    },
    speakers: {
        type: Array,
        required: false,
        default: [],
    },
    zoom: {
        id: {
            type: String,
            required: false,
            default: "--"
        },
        password: {
            type: String,
            required: false,
            default: "--"     
        },
        link: {
            type: String,
            required: false,
            default: "--"
        }
    },
    status: {
        type: String,
        required: false,
    },
    privacy: {
        type: String,
        required: false,
        default: "Public"
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now()
    },
    isFeedback: {
        type: Boolean,
        required: false,
        default: false
    },
    responses: {
        type: Array,
        required: false,
        default: []
    },
    eventMode: {
        type: String,
        required: false,
        default: 'Online'
    },
    eventLink: {
        type: String,
        required: false,
        default: "-"
    },
    eventLocation: {
        type: String,
        required: false,
        default: "-"
    }

});
module.exports = mongoose.model("bbEvents", BBEventsSchema);