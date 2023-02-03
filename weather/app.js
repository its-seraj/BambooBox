const req = require('request');

const url = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=20,30&units=f';

// const response = req.get(url)
// console.log(response);


req({
    url: url,
    json: true,
}, (error, response) => {
    if(error) console.log(error);

    const temp = response.body.current.temperature, feelTemp = response.body.current.feelslike, rain = response.body.current.precip * 100;
    console.log(response.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.');
    // console.log(response.body.current)
})
