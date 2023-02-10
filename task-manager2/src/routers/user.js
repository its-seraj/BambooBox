const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('Hello testing')
})

router.get('/users', async(req, res) => {
    // User.find({}).then((users) => {
    //     res.send(users)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })

    try{
        const users = await User.find({})
        res.status(201).send(users)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users', async(req, res) => {
    console.log(req.body)
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.send(user);
    // }).catch((error) => {
    //     // res.status(400)
    //     // res.send(error)
    //     res.status(400).send(error)
    // })

    try{
        await user.save()
        res.status(201).send(user)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/users/:id', async(req, res) => {
    console.log(req.params)
    // User.findById(req.params.id).then((user) => {
    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(500).send(error)
    // })

    try{
        const user = await User.findById(req.params.id)
        res.status(201).send(user)
    }catch(e){
        res.status(500).send(e)
    }

})
router.patch('/user/:id', async(req, res) => {
    const updateRequests = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']

    const isValidate = updateRequests.every((key) => allowedUpdates.includes(key))

    if(!isValidate) return res.status(400).send({error: 'Invalid properties update.'})

    try{
        const user = await User.findById(req.params.id)

        updateRequests.forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


router.delete('/user/:id', async(req, res) => {
    try{
        const user = await User.deleteOne({ _id: req.params.id})

        if(!user) return res.status(400).send()

        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
})


module.exports = router