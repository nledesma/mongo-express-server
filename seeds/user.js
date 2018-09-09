import { hashSync, genSaltSync } from 'bcrypt-nodejs'
import mongoose from 'mongoose'
import User from '../models/User'
require('dotenv').config('../.env')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var small = new User({ email: 'test@getsirena.com', password: hashSync('test', genSaltSync(8), null) })
small.save(function (err) {
  if (err) return err
})
