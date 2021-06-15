
const express = require('express') // require the express package
const app = express() // initialize your express app instance
 
const weatherData = require('./data/weather.json');

const cors = require('cors');
const axios =require('axios');
const {response} =require('express')
app.use(cors()) // after you initialize your express app instance

require('dotenv').config();
const port = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

// a server endpoint 
app.get('/', // our endpoint name
 function (req , res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})


// a new endpoint 

app.get('/weather', (req, res) => {
    const lon = req.query.lon
    const lat = req.query.lat
    if (lon && lat) {
      const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
      axios.get(weatherBit).then(response => {
        const resData = response.data.data.map(obj => new Weather(obj));
        res.json(resData)
      }).catch(error => {
        res.send('an error in weatherbit api')
      })
      // res.json(resData);
    } else {
      res.send('please enter the lon and lat')
    }
  })
  class Weather {
    constructor(weatherData) {
      this.description = weatherData.weather.description;
      this.date = weatherData.valid_date;
    }
  }
  //app.listen(PORT) // kick start the express server to work

 
 app.listen(port,()=>{
     console.log(`server running in port: ${port}`)
 }) // kick start the express server to work