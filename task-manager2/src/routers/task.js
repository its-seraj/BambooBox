const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async(req, res) => {
    // console.log(req.body)
    
    const task = new Task(req.body)
    // task.save().then(() => {
    //     res.send(task);
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/tasks', async(req, res) => {
    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})
router.get('/tasks/:id', async(req, res) => {
    // Task.findById(req.params.id).then((task) => {
    //     if(!task){
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try{
        const task = await Task.findById(req.params.id)
        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
})


router.patch('/task/:id', async(req, res) => {
    const updateRequest = Object.keys(req.body)
    const allowedUpdates = ['task', 'completed']

    const isValidate = updateRequest.every((key) => allowedUpdates.includes(key))

    if(!isValidate) return res.status(400).send({error: 'Invalid properties update.'})

    try{
        const task = await Task.findById(req.params.id)

        updateRequest.forEach((key) => {
            task[key] = req.body[key]
        })
        await task.save()

        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!task) return res.status(404).send()

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})



module.exports = router