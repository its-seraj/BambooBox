const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')
const bcrypt = require('bcrypt')



const app = express()
const port = process.env.PORT


// app.use((req, res, next) => {
//     // console.log(req.method, req.path)
//     if(req.method === 'GET'){
//         res.send('GET request are disabled.')
//     }else{
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(500).send('The website are in maintanance. Try after sometime.')
// })


app.use(express.json())

app.use(userRoute)
app.use(taskRoute)




// Multer package
const multer = require('multer')
const upload = multer({
    // dest: 'images',
    limits: {
        fileSize: 10000000,
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

// sharp package
const sharp = require('sharp')
app.post('/alterImage', upload.single('upload'), async (req, res) => {
    // console.log('req')
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250 }).png().toBuffer()

    res.set('Content-Type', 'image/jpg')
    res.send(buffer)
}, (error, req, res, next) => {
    res.status(400).send();
})



// app.get('/users/:name', (req, res) => {
//     console.log(req.params)
//     User.find({ name: req.params.name }).then((user) => {
//         res.send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })




app.listen(port, () => {
    console.log('Server is up on port -', port)
})


// const hashed = async() =>{
//     const password = 'Hello@123'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('password', hashedPassword)
//     console.log(isMatch)
// }
// hashed()

// const jwt = require('jsonwebtoken')

// const auth = async() => {
//     // const token = jwt.sign({_id: 'abc123'}, 'thisisrandomstring')
//     const token = await jwt.sign({_id: 'abc123'}, 'thisisrandomstring', {expiresIn: '10 seconds'})
//     console.log(token)

//     const data = jwt.verify(token, 'thisisrandomstring')
//     console.log(data)
// }
// auth()