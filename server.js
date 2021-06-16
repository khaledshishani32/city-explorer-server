const express = require("express"); // require the express package
const app = express(); // initialize your express app instance

const moviesData = require("./data/movies.json");

const cors = require("cors");
const axios = require("axios");
const { response } = require("express");
app.use(cors()); 

require("dotenv").config();
const port = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


app.get(
  "/", 
  function (req, res) {
   
    res.send("Hello World"); 
  }
);


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


app.get('/movies', (req, res)=>{
    let cityName = req.query.query;
   
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;
    axios.get(movieUrl).then(resData =>{
        const movieArray = resData.data.results.map(item=>{
        return new Movie (item);
        })
    res.json(movieArray);
    })
    .catch(error =>{
      res.send(`there is an error in getting the data => ${error}`);
    })
  });

class Movie {
    constructor(item) {
        this.title=item.title;
        this.overView=item.overview;
        this.vote_average=item.vote_average;
        this.total_votes=item.total_votes;
        
        this.popularity=item.popularity;
        this.release_date=item.release_date;
    }
    }




// weather class to moduling data need
class Weather {
  constructor(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
  }
}



app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
