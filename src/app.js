const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Hareesh',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Hareesh',
  })
})

app.get('/help', (req, res) => {
  if (req.query == '*') {
    return res.render('404', {
      title: '404 Page not found',
      name: 'Hareesh',
      errorMessage: 'Help article not found',
    })
  }
  res.render('help', {
    helpText: 'This is the help page.',
    title: 'Help',
    name: 'Hareesh',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error:
        'Search for the address where you want to know the weather of that place!',
    })
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        })
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({
          location,
          message: `${forecastData.weather}`,
          temperature: `Temperature is ${forecastData.temperature}`,
          feelslike: `It feels like ${forecastData.feelslike}`,
        })
      })
    }
  )
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page not found',
    name: 'Hareesh',
    errorMessage: 'Page not found',
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
