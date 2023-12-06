const mongoose = require('mongoose');
const SectorSchema = mongoose.Schema({
    sector_name: { 
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('sector', SectorSchema)