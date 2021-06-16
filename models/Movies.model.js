class Movie {
  constructor(item) {
    this.title = item.title;
    this.overView = item.overview;
    this.vote_average = item.vote_average;
    this.total_votes = item.total_votes;

    this.popularity = item.popularity;
    this.release_date = item.release_date;
  }
}

module.exports=Movie