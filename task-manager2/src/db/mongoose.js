const mongoose = require('mongoose')
// const validator = require('validator')

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1/task-managerAPI', {
    // useNewUrlParser: true, // depricated
    // useCreateIndex: true //depricated
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(val){
//             if(!validator.isEmail(val)) throw new Error('Email is not correct.')
//         }
//     },
//     age: {
//         type: Number,
//         validate(value){ // custom validaton
//             if(value < 0) throw new Error('Must greater than 0.')
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(pass){
//             // if(pass.length <= 6) throw new Error('Password must be at least 7 chars of length.')
//             if(pass.toLowerCase().includes('password')) throw new Error('Password should not conatains password.')   
//         }
//     }
// })

// const me = new User({
//     name: '     Gemini  ',
//     age: 28,
//     email: '    kjsdjkJJD@male.com  ',
//     password: 'dfPasSword'
// })

// me.save().then(() => console.log(me)).catch((error) => console.log(error))

// const Description = mongoose.model('Description', {
//     task: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     }
// })

// const task1 = new Description({
//     task: 'Buy a laptop in end of the month.',
//     completed: false
// })
// task1.save().then(() => console.log(task1)).catch((error) => console.log(error))
