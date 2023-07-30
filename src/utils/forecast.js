const request = require('request')
const https = require('https')
const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=61bbab69108306656aa238e23528993a&query=${lat},${long}`
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to network 😒', undefined)
    } else if (body.error) {
      callback('Unable to find location 😒', undefined)
    } else {
      callback(undefined, {
        weather: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      })
    }
  })
}

module.exports = forecast
