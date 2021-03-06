//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const request = require("request");

const forecast = (lat, long, callback) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=f3adf435c38675873ca2a7ef6836f14c";
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Cannot connect to weather service", undefined);
        }else if (body.cod === '404') {
            callback(body.message, undefined);
        }else{
            callback(undefined, 
        {
            temperature: Math.floor(body.main.temp - 273),
            humidity: body.main.humidity,
            windspeed: body.wind.speed,
            sealevel: body.main.sea_level,
            pressure: body.main.pressure
        })
        }
        
    })
}

module.exports = forecast