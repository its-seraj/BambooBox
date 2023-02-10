require('../src/db/mongoose')
const User = require('../src/models/user')

const updateAndCount = async(id, age) => {
    await User.findByIdAndUpdate(id, { age: age })
    return await User.countDocuments({ age: age })
}

updateAndCount('63e345694eab30b34bfba74d', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})
