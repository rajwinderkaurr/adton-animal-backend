const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        length: 170,
        trim: true,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Categories', categorySchema)