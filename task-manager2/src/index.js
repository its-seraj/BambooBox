const express = require('express')
require('./db/mongoose')
const userRoute = require('./routers/user')
const taskRoute = require('./routers/task')
const bcrypt = require('bcrypt')



const app = express()
const port = process.env.PORT || 3000


app.use(express.json())



app.use(userRoute)
app.use(taskRoute)





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


const hashed = async() =>{
    const password = 'Hello@123'
    const hashedPassword = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('password', hashedPassword)
    console.log(isMatch)
}
hashed()