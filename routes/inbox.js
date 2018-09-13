import { Router } from 'express'
import { authorize } from './auth/middleware'
import { createSuccessResponse, codes } from '../utils/response'
import { withError } from '../utils/errors'
import User from '../models/User'
const router = Router()

// Received emails
router.get('/received', authorize(), withError(async (req, res) => {
  let received
  if (req.query.search) {
    received = await User.aggregate().match({ email: res.locals.email })
      .unwind('received')
      .match({ 'received.message': { $regex: RegExp(req.query.search) } })
      .project({ received: 1 })
    received = received.map(elem => elem.received)
  } else {
    received = await User.findOne({ email: res.locals.email }, 'received')
    received = received.received
  }
  res.json(createSuccessResponse(codes.OK, {
    received: received
  }, 'received'))
}))

// Sent emails
router.get('/sent', authorize(), withError(async (req, res) => {
  let sent
  if (req.query.search) {
    sent = await User.aggregate().match({ email: res.locals.email })
      .unwind('sent')
      .match({ 'sent.message': { $regex: RegExp(req.query.search) } })
      .project({ sent: 1 })
    sent = sent.map(elem => elem.sent)
  } else {
    sent = await User.findOne({ email: res.locals.email }, 'sent')
    sent = sent.sent
  }
  res.json(createSuccessResponse(codes.OK, {
    sent: sent
  }, 'sent'))
}))

// Drafts
router.get('/drafts', authorize(), withError(async (req, res) => {
  let drafts
  if (req.query.search) {
    drafts = await User.aggregate().match({ email: res.locals.email })
      .unwind('drafts')
      .match({ 'drafts.message': { $regex: RegExp(req.query.search) } })
      .project({ drafts: 1 })
    drafts = drafts.map(elem => elem.drafts)
  } else {
    drafts = await User.findOne({ email: res.locals.email }, 'drafts')
    drafts = drafts.drafts
  }
  res.json(createSuccessResponse(codes.OK, {
    drafts: drafts
  }, 'drafts'))
}))

export default router
