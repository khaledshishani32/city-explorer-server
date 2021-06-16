const express = require("express"); // require the express package
const app = express(); // initialize your express app instance

const moviesData = require("./data/movies.json");

const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
app.use(cors()); // after you initialize your express app instance


require("dotenv").config();
const port = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

// a server endpoint
app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World"); // our endpoint function response
  }
);

// a new endpoint

app.get("/weather", (req, res) => {
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
});


 
 

  app.get('/movies', (req,res)=>{
  let cityName = req.query.query;
  console.log(req.query);
  const movieUrl = `https:api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;
  
  try {
   axios.get(movieUrl).then(res=>{
     const resMovieData = res.data.results
     res.json(resMovieData)
   })

  } catch (error) {
    res.send("sorry");
  }
 })

// weather class to moduling data need
class Weather {
  constructor(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
  }
}

 //movies class to moduling  data need
 class Movies{
   constructor(movies){
     this.title = movies.title;
     this.overview= movies.overview;

   }
 }

app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
