const path = require('path')
const express = require('express')
const http = require('http')

const app = express();


const public = path.join(__dirname, '../public')

// app.use(express.static(public));
// app.get('', (req, res) => {
//     res.send('This is Homepage.')
// })

/**
 * for hbs template
*/
app.set('view engine', 'hbs')
app.get('', (req, res) => {
    res.render('index')
})

app.get('/help', (req, res) => {
    // res.send('Help Page.')

    /**
     * HBS template
     */
    res.render('help', {
        page: 'This is the help page using HBS.',
        description: 'I am here to help. Pls ask if any doubt.'
    })
})

// weather & about page
app.get('/weather', (req, res) => {
    const url = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=20,30';
    let data = undefined;

    // call weather api using http request
    const request = http.request(url, (response) => {
        response.on('data', (chunk) => {
            data = JSON.parse(chunk.toString())
            // data = data.current
            // console.log(data.current)
        })

        response.on('end', () => {
            // data = data.current
            // console.log(data)
            // res.send(data)

            /**
             * HBS template
             */
            res.render('weather', {
                data: JSON.stringify(data),
            })
        })
    })
    request.on('error', (error) => {
        data = error
    })
    request.end();

})

app.get('/about', (req, res) => {
    res.send('<b>Welocme to about page.</b>')
})

app.listen(8080, () => {
    console.log('server is up on port 8080.');
})

