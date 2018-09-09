'use strict'
import { check } from 'express-validator/check'

const missingEmail = () => {
  return 'Missing username'
}

const invalidEmail = () => {
  return 'Invalid email'
}

const missingPassword = () => {
  return 'Missing password'
}

export default () => {
  return {
    missingEmail: missingEmail(),
    invalidEmail: invalidEmail(),
    missingPassword: missingPassword(),
    authValidator: [
      check('email')
        .exists()
        .withMessage(missingEmail())
        .isEmail()
        .withMessage(invalidEmail())
        .trim()
        .normalizeEmail(),
      check('password')
        .exists()
        .withMessage(missingPassword())
    ]
  }
}
