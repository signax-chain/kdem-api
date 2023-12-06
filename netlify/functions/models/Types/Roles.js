const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema({
    role: { 
        type: String,
        required: true,
        enum: ['superincubator', 'startup', 'incubator', 'mentor'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('roles', RoleSchema)