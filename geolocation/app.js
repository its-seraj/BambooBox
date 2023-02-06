const req = require('request');
const chalk = require('chalk')

const search = 'los angles';
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1';

// req({
//     url: url,
//     json: true,
// }, (error, response) => {
//     if(error){
//         console.log(error);
//         return;
//     }
//     else if(response.body.features.length == 0){
//         console.log('This address not exists.');
//         return;
//     }

//     const latitude = response.body.features[0].geometry.coordinates[0], longitude = response.body.features[0].geometry.coordinates[1];
//     console.log(`longitude = ${longitude}, latitude = ${latitude}`);
//     // console.log(response.body.features[0].geometry.coordinates[0]);
    
//     const weatherURL = 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=' + longitude + ',' + latitude;
//     req({
//         url: weatherURL,
//         json: true,
//     }, (werror, wresponse) => {
//         if(werror){
//             console.log(werror);
//             return;
//         }
//         else if(wresponse.body.error){
//             console.log(wresponse.body.error.info);
//             return;
//         }
//         // console.log(wresponse.body);
//         const temp = wresponse.body.current.temperature, feelTemp = wresponse.body.current.feelslike, rain = wresponse.body.current.precip * 100;
//         console.log(wresponse.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.');
//     })
// })


const geocode = (address, callback) => {
    req({
        url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2VyYWoyNiIsImEiOiJjbGRvZGp3eWswOTBqM25xdmszZnlkeWZ6In0.-qlUmutN53yVZEJr1tuyfQ&limit=1',
        json: true,
    }, (error, response) => {
        if(error){
            console.log(error);
            return;
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Try another.', undefined, undefined)
        }else{
            const latitude = response.body.features[0].geometry.coordinates[1], longitude = response.body.features[0].geometry.coordinates[0], location = response.body.features[0].place_name;
            callback(undefined, {latitude: latitude, longitude: longitude, location: location});
        }
    })
}

const forecast = (lat, long, callback) => {
    req({
        url: 'http://api.weatherstack.com/current?access_key=7fef760a3082832acf24d3d4299d7033&query=' + lat + ',' + long,
        json: true,
    }, (error, response) => {
        if(error){
            callback(error, undefined);
        }else if(response.body.error){
            callback(response.body.error.info, undefined);
        }else{
            const temp = response.body.current.temperature, feelTemp = response.body.current.feelslike, rain = response.body.current.precip * 100;
            const output = response.body.current.weather_descriptions + '. It\'s currently ' + temp + ' degrees out. And there is ' + rain + '% chance to rain. And it feels like ' + feelTemp + ' degrees of temperature.';
            callback(undefined, output);
        }
    })
}


const weather = (city) => {
    geocode(city, (error, data) => {
        if(error) {
            console.log(error)
        }else{
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if(error) console.log(error);
                else{
                    console.log(chalk.inverse.green.bold(data.location));
                    console.log(chalk.inverse.bold(forecastData));
                }
            })
        }
    })
}

['Delhi', 'Mumbai', 'London', 'Morocco'].forEach((city) => {
    // console.log(city)
    weather(city);
})

if(process.argv[2]){
    weather(process.argv[2]);
}