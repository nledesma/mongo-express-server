
import express from 'express'
import path from 'path'
import logger from 'morgan'
import mongoose from 'mongoose'
import inboxRouter from './routes/inbox'
import authRouter from './routes/auth'
import bodyParser from 'body-parser'
import { createResponse } from './utils/response'
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  next()
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/inbox', inboxRouter)
app.use('/auth', authRouter)

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {}
  // send an error message
  res
    .status(err.status || 500)
    .send(createResponse(err.status || 500, err.message, null))
})

export default app
