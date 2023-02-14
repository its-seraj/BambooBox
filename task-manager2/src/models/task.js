const mongoose = require('mongoose')


const taskSchema = mongoose.Schema({
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',
    // },
    task: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

taskSchema.pre('save', async function(next){
    console.log('pre save')

    next()
})


const Description = mongoose.model('Description', taskSchema)

module.exports = Description