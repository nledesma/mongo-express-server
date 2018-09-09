import mongoose from 'mongoose'
import { compareSync } from 'bcrypt-nodejs'
import jwt from 'jwt-simple'
import moment from 'moment'

let UserSchema = new mongoose.Schema({
  email: String,
  password: String
})

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return compareSync(password, this.password)
}

UserSchema.methods.generateToken = function () {
  let payload = {
    email: this.email,
    iat: moment().unix(),
    exp: moment().add(30, 'minutes').unix()
  }
  return jwt.encode(payload, process.env.TOKEN_SECRET)
}

var User = mongoose.model('User', UserSchema)
export default User
