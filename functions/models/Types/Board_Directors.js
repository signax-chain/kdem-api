const mongoose = require('mongoose');
const BoardDirectorSchema = mongoose.Schema({
    email: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    socialLinks: {
        type: [String],
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('boardDirectors', BoardDirectorSchema)