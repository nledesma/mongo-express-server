import { hashSync, genSaltSync } from 'bcrypt-nodejs'
import mongoose from 'mongoose'
import User from '../models/User'
import mock from './MOCK_DATA.json'
require('dotenv').config('../.env')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const removeOldTest = async () => {
  await User.findOneAndRemove({ email: 'test@getsirena.com' })
}

const totalMocks = mock.length
const halfMocks = Math.floor(mock.length / 2)

removeOldTest()
let testUser = new User({
  email: 'test@getsirena.com',
  password: hashSync('test', genSaltSync(8), null),
  sent: mock.slice(0, halfMocks),
  received: mock.slice(halfMocks, totalMocks)
})
testUser.save(function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  } else {
    process.exit(0)
  }
})
