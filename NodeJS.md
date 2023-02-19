#### Initialized an node app

```
npm init -y
```

#### express

```
const express = require('express')

const app = express()
```

Route

```
app.get('/home', (req, res) => {
	res.send()
})
```

Start server

```
app.listen(8080, () => {
	// console.log(`Up on port ${port}`)
})

// OR

// for socket.io
const http = require('http')
const scoketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server)

io('connection', () => { ... })
server.listen(8080, () => {
	console.log(`up on port ${port}`)
})
```

Set Static dir

```
app.use(express.static('path'))
```

#### Config env-cmd

```
npm i env-cmd@8.0.2

```
