
app.get('/movies', getMoviesHandler)
function  getMoviesHandler(req, res) {
  let userInput = req.query.query;
  let moviekey = process.env.MOVIE_API_KEY;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${moviekey}&query=${userInput}`;
  axios.get(url).then(result =>{
      const movieArray = result.data.results.map(item=>{
      return new Movie (item);
      })
  res.json(movieArray);
  })
  .catch(error =>{
    res.send(`there is an error in getting the data => ${error}`);
  })
}
class Movie {
  constructor(item) {
      this.title=item.title;
      this.overview=item.overview;
      this.averageVotes=item.vote_average;
      this.totalVotes=item.total_votes;
      this.imagel=`https://image.tmdb.org/t/p/original${item.poster_path}`;
      this.popularity=item.popularity;
      this.releasedOn=item.release_date;
  }
  }