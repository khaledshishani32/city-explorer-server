const Weather =('./models/Weather.model');
const axios = require("axios");
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
require("dotenv").config();
const weatherController = (req, res) => {
  const lon = req.query.lon;
  const lat = req.query.lat;
  if (lon && lat) {
    const weatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    axios
      .get(weatherBit)
      .then((response) => {
        const resData = response.data.data.map((obj) => new Weather(obj));
        res.json(resData);
      })
      .catch((error) => {
        res.send("an error in weatherbit api");
      });
  } else {
    res.send("please enter the lon and lat");
  }
};


module.exports = weatherController;