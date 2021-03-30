const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const authRouters = require('./routes/auth.routes')

const keys = require('./keys')
const app = express()

mongoose
  .connect(keys.MONGO_URI)
  .then(() => console.log('MongoDB Connected!'))
  .catch(e => console.error(e))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouters)

module.exports = app
