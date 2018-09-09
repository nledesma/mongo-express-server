import { Router } from 'express'
import { authorize } from './auth/middleware'
import { createSuccessResponse, codes } from '../utils/response'
import { withError } from '../utils/errors'
const router = Router()

// Listar todos los roles
router.get('/', authorize(), withError(async (req, res) => {
  res.json(createSuccessResponse(codes.OK, {
    email: res.locals.email
  }, 'email'))
}))

export default router
