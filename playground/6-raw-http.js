const http = require('http')

const url = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=20,-17'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = JSON.parse(chunk.toString())
    })

    response.on('end', () => {
        console.log(data.current)
    })
})

request.on('error', (error) => {
    console.log('An error ', error)
})

request.end();