import { Router } from 'express'
import authValidator from './validators/authValidator'
import { withError, expressValidatorMiddleware } from '../utils/errors'
import { createResponse, createSuccessResponse, codes } from '../utils/response'
import User from '../models/User'

const validator = authValidator()
const router = Router()

router.post('/', validator.authValidator, expressValidatorMiddleware, withError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email })
  if (!user || !user.validPassword(req.body.password)) {
    return res.status(codes.UNPROCESSABLE_ENTITY).json(
      createResponse(codes.UNPROCESSABLE_ENTITY, 'Nombre de usuario o password incorrecto', null)
    )
  } else {
    let token = user.generateToken()
    res.json(createSuccessResponse(res.statusCode, {
      token: token
    }, 'token'))
  }
}))

export default router
