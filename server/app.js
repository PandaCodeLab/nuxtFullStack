const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRouters = require('./routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const commentRoutes = require('./routes/comment.routes')

const keys = require('./keys')
const app = express()

mongoose
  .connect(keys.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected!'))
  .catch(e => console.error(e))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', authRouters)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

module.exports = app
