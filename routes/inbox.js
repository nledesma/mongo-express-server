import { Router } from 'express'
import { authorize } from './auth/middleware'
import { createSuccessResponse, codes } from '../utils/response'
import { withError } from '../utils/errors'
import User from '../models/User'
const router = Router()

// Received emails
router.get('/received', authorize(), withError(async (req, res) => {
  const received = await User.findOne({ email: res.locals.email }, 'received')
  res.json(createSuccessResponse(codes.OK, {
    received: received.received
  }, 'received'))
}))

// Sent emails
router.get('/sent', authorize(), withError(async (req, res) => {
  const sent = await User.findOne({ email: res.locals.email }, 'sent')
  res.json(createSuccessResponse(codes.OK, {
    sent: sent.sent
  }, 'sent'))
}))

export default router
