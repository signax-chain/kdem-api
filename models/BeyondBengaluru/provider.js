const mongoose = require("mongoose");
const BBServiceProvider = mongoose.Schema({
    title: {
        type: String,
        required: false,
        default: "--"
    },
    description: {
        type:String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true,
    },
    apply_url: {
        type:String,
        required: true,
    },
    offering_type: {
        type:String,
        required: true,
    },
    thumbnail: {
        type:String,
        required: false,
    },
    provider: {
        type:String,
        required: true,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now()
    }
});
module.exports = mongoose.model("bbServiceProviders", BBServiceProvider);