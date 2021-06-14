
const express = require('express') // require the express package
const app = express() // initialize your express app instance
 
const weatherData = require('./data/weather.json');

const cors = require('cors');

app.use(cors()) // after you initialize your express app instance

require('dotenv').config();
const port = process.env.PORT;

// a server endpoint 
app.get('/', // our endpoint name
 function (req , res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})


// a new endpoint 

app.get('/weather' , (req , res)=>{
  
    res.json(weatherData);
})

 
app.listen(port,()=>{
    console.log(`server running in port: ${port}`)
}) // kick start the express server to work