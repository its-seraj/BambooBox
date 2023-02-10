require('../src/db/mongoose')
const Task = require('../src/models/task')

const deleteAndCount = async() => {
    await Task.deleteOne({ completed: true })
    return Task.countDocuments()
}

deleteAndCount().then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})