const axios = require("axios");
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movies = require("../models/Movies.model");
require("dotenv").config();
const Cache = require("../helper/cache");

const moviesController = (req, res) => {
  let cityName = req.query.query;

  if (
    cacheObj[requestKey] &&
    Date.now() - cacheObj[requestKey].timestamp < 86400000
  ) {
    res.json(cacheObj[requestKey].data);
  } else {
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;

    axios
      .get(movieUrl)
      .then((resData) => {
        const movieArray = resData.data.results.map((item) => {
          return new Movies(item);
        });

        cacheObj[requestKey].data = responseData;
        cacheObj[requestKey].timestamp = Date.now();

        res.json(movieArray);
      })
      .catch((error) => {
        res.send(error.message);
      });
  }
  
};

module.exports = moviesController;
