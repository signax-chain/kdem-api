const mongoose = require('mongoose');
const InstitutionTypeSchema = mongoose.Schema({
    type: { 
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('institutionType', InstitutionTypeSchema)