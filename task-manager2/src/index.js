const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    user.save().then(() => {
        res.send(user);
    }).catch((error) => {
        // res.status(400)
        // res.send(error)
        res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
    console.log(req.body)
    
    const task = new Task(req.body)
    task.save().then(() => {
        res.send(task);
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users)
    }).catch((error) => {
        res.status(400).send(error)
    })
})
// app.get('/users/:name', (req, res) => {
//     console.log(req.params)
//     User.find({ name: req.params.name }).then((user) => {
//         res.send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })
app.get('/users/:id', (req, res) => {
    console.log(req.params)
    User.findById(req.params.id).then((user) => {
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error) => {
        res.status(500).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch((error) => {
        res.status(400).send(error)
    })
})
app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then((task) => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Server is up on port -', port)
})
