const mongoose = require('mongoose');
const StatSchema = mongoose.Schema({
    count: { 
        type: Map,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('stats', StatSchema)