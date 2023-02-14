const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    avatar: {
        type: Buffer
    }
})

userSchema.methods.toJSON = function(){
    const userObj = this.toObject()
    
    delete userObj.password
    delete userObj.tokens
    delete userObj.avatar
    
    return userObj
}

userSchema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET)
    
    this.tokens = this.tokens.concat({token})
    await this.save();

    return token;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) throw new Error('Unable to connect.')

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error('Unable to connect.')

    return user;
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        // console.log('password changes')
        this.password = await bcrypt.hash(this.password, 8)
    }
    // console.log('pre call before save')
    
    next()
})


const User = mongoose.model('User', userSchema)


module.exports = User