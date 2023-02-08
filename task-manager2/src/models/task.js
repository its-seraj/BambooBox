const mongoose = require('mongoose')

const Description = mongoose.model('Description', {
    task: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = Description