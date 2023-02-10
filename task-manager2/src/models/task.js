const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
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

taskSchema.pre('save', async function(next){
    console.log('pre save')

    next()
})


const Description = mongoose.model('Description', taskSchema)

module.exports = Description