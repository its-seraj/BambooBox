const path = require('path')
const express = require('express')
const http = require('http');
const hbs = require('hbs')

const app = express();

/**
 * for hbs template
*/
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath)) // use to map static files path

app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Rehan',
    })
})

app.get('/help', (req, res) => {
    /**
     * HBS template
     */
    res.render('help', {
        title: 'Help',
        name: 'Raghav',
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
        })

        response.on('end', () => {
            /**
             * HBS template
             */
            res.render('weather', {
                title: 'Weather',
                name: 'Aman',
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


// 404 page
app.get('*', (req, res) => {
    res.render('404')
})

app.listen(8090, () => {
    console.log('server is up on port 8090.');
})

