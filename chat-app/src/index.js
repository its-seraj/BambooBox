const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocation} = require('./utils/messages')

const app = express();
const server = http.createServer(app)
const io = socketio(server)



const port = process.env.PORT


let count = 1;
io.on('connection', (socket) => {
    // console.log('new websocket connection.')

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++;
    //     // socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })

    // send welcome message
    // socket.emit('message', 'Welcome to our website.')

    // socket.emit('recieve-message', 'Hello guyz')

    socket.on('send-message', (message, cb) => {
        const filter = new Filter()
        if(filter.isProfane(message)) return cb('Profinity not allowed.')

        io.emit('recieve-message', generateMessage(message))

        cb()
    })

    // send alert-message - new connection
    socket.broadcast.emit('new-user', `Someone joined our chat`)
    // send alert-message - disconnect
    socket.on('disconnect', () => {
        io.emit('disconnects', 'Someone left our chat')
    })


    // get and broadcast location
    socket.on('location-share', (message, cb) => {
        // console.log(message)
        socket.broadcast.emit('location', generateLocation(message))

        cb();
    })
    
})

app.use(express.static(process.env.STATIC_PATH))
server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})