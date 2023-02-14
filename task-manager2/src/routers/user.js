const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const sendWelcomeEmail = require('../emails/account')
const multer = require('multer')
const upload = multer({
    // dest: 'images/avatar',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb){
        // if(!file.originalname.endsWith('.jpg')){
        if(!file.originalname.match(/\.(jpg|png|jpeg)$/)){
            return cb(new Error('File must be an image.'))
        }

        cb(undefined, true)
    }
})

router.get('/test', (req, res) => {
    res.send('Hello testing')
})

router.get('/users/me', auth, async(req, res) => {
    res.send(req.user);
})

router.get('/users', auth, async(req, res) => {
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

// for signup 
router.post('/users', async(req, res) => {
    // console.log(req.body)
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.send(user);
    // }).catch((error) => {
    //     // res.status(400)
    //     // res.send(error)
    //     res.status(400).send(error)
    // })

    try{
        const token = await user.generateAuthToken(user)

        await user.save()
        sendWelcomeEmail(user.email, user.name) // send an email
        res.status(201).send({user, token})
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
        // const token = await User.generateAuthToken(user);
        const token = await user.generateAuthToken()

        res.send({user, token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            token.token !== req.token
        })
        await req.user.save();

        res.send({'message': 'Successfully logout.'})
    }catch(e){
        res.status(500).send(e);
    }
})

router.post('/user/logoutAll', auth, async (req, res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send({'message': 'Successfully logout from all devices.'})
    }catch(e){
        res.status(500).send(e)
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

// upload user avatar
router.post('/user/me/upload', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send({
        message: 'Avatar successfully uploaded.',
        data: req.user
    })
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})
// delete avatar
router.delete('/user/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.send({
        message: 'Avatar successfully deleted.',
        data: req.user
    })
})

// view avatar
router.get('/user/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById({_id: req.params.id})
        if(!user || !user.avatar){
            throw new Error('Avatar not available.')
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)
        // res.send(`<img src="data:image/jpg;base64,${user.avatar} />`)
    }catch(error){
        res.status(400).send(error)
    }
})


module.exports = router