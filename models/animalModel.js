const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        length: 70
    },
    category: {
        type: String,
        required: true,
        length: 70
    },
    dob: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true,
        length: 5000
    },
    isAdopted: {
        type: Boolean,
        default: false
    },
    images: {
        type: Array,
        default: []
    },
    breed: {
        type: String,
        length: 70,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Animals', animalSchema)