const request = require('request')
const https = require('https')
const geocode = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiMTIzNDUtdXNlciIsImEiOiJjbGtqNzlyeDUwM3F2M3FxZzdrMXB4aXViIn0.BUw6NuLpm_klYdY4rAM6bw`
  request({ url: geocodeURL, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to location servies', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location.Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
