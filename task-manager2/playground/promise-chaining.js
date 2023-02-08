require('../src/db/mongoose')

const User = require('../src/models/user')

// 63e344b78ad679b22b032871

User.findByIdAndUpdate('63e345694eab30b34bfba74d', { age: 1 }).then((user) => {
    console.log(user)

    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})