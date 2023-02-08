const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(val){
            if(!validator.isEmail(val)) throw new Error('Email is not correct.')
        }
    },
    age: {
        type: Number,
        validate(value){ // custom validaton
            if(value < 0) throw new Error('Must greater than 0.')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(pass){
            // if(pass.length <= 6) throw new Error('Password must be at least 7 chars of length.')
            if(pass.toLowerCase().includes('password')) throw new Error('Password should not conatains password.')   
        }
    }
})

module.exports = User