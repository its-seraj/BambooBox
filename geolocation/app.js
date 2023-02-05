const req = require('request');

const search = 'los angles';
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1';

req({
    url: url,
    json: true,
}, (error, response) => {
    if(error){
        console.log(error);
        return;
    }
    else if(response.body.features.length == 0){
        console.log('This address not exists.');
        return;
    }

    const latitude = response.body.features[0].geometry.coordinates[0], longitude = response.body.features[0].geometry.coordinates[1];
    console.log(`longitude = ${longitude}, latitude = ${latitude}`);
    // console.log(response.body.features[0].geometry.coordinates[0]);
    
    const weatherURL = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=' + longitude + ',' + latitude;
    req({
        url: weatherURL,
        json: true,
    }, (werror, wresponse) => {
        if(werror){
            console.log(werror);
            return;
        }
        else if(wresponse.body.error){
            console.log(wresponse.body.error.info);
            return;
        }
        // console.log(wresponse.body);
        const temp = wresponse.body.current.temperature, feelTemp = wresponse.body.current.feelslike, rain = wresponse.body.current.precip * 100;
        console.log(wresponse.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.');
    })
})