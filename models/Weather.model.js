// weather class to moduling data need
class Weather {
  constructor(obj) {
    this.description = obj.weather.description;
    this.date = obj.valid_date;
  }
}

module.exports =Weather;