
const axios = require("axios");
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const Movies = require('../models/Movies.model');
require("dotenv").config();


const moviesController = (req, res)=>{
    let cityName = req.query.query;
   
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;
    axios.get(movieUrl).then(resData =>{
        const movieArray = resData.data.results.map(item=>{
        return new Movies (item);
        })
    res.json(movieArray);
    })
    .catch(error =>{
      res.send(`there is an error in getting the data => ${error}`);
    })
  }


  module.exports=moviesController;