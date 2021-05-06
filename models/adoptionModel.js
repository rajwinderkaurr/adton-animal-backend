const mongoose = require('mongoose')

const adoptionSchema = new mongoose.Schema({
    animal_id: {
        type: String,
        required: true,
    },
    requester_id: {
        type: String,
        required: true,
    },
    allower_id: {
        type: String
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('adoptions', adoptionSchema)