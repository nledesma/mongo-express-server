
import { decode } from 'jwt-simple'
import moment from 'moment'
import { unauthorized, tokenExpired } from '../../utils/errors'

const authorize = () => {
  return function (req, res, next) {
    if (!req.headers || !req.headers.authorization) { next(unauthorized()) }

    try {
      let payload = decode(req.headers.authorization, process.env.TOKEN_SECRET)
      if (payload.exp <= moment().unix()) {
        next(tokenExpired())
      }
      res.locals.email = payload.email
      next()
    } catch (e) {
      next(unauthorized())
    }
  }
}

export { authorize }
