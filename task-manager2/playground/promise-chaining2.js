require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.deleteOne({ _id: '63e346b90a6f6a4d8f62f3b0' }).then((task) => {
    console.log(task)

    return Task.find({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})