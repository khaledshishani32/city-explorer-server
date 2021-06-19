const express = require("express"); // require the express package
const app = express(); // initialize your express app instance

//const moviesData = require("./data/movies.json");

const weatherController= require('./controller/weather.controller');
const indexController = require('./controller/index.controller');
const moviesController=require('./controller/movies.controller');

const cors = require("cors");

const { response } = require("express");
app.use(cors()); 


const port = process.env.PORT;




app.get("/",indexController );


app.get("/weather", weatherController);


app.get('/movies',moviesController);









app.listen(port, () => {
  console.log(`server running in port: ${port}`);
});
