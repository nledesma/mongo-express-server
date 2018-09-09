'use strict'
import { validationResult } from 'express-validator/check'
import { createResponse, codes } from './response'

// Usada como wrapper para el manejo de errores basicos de un request
// asyncronico
export function withError (handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      console.log(e)
      res.statusCode = e.status
      res.json(createResponse(e.status, e, null))
    }
  }
}

/* Se debe utilizar como middleware en caso de que la ruta tenga validaciones con express-validator
*/
export function expressValidatorMiddleware (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(codes.UNPROCESSABLE_ENTITY)
      .json(createResponse(codes.UNPROCESSABLE_ENTITY, errors.mapped(), null))
  }
  next()
}

export const unauthorized = () => {
  let err = new Error('Unauthorized')
  err.status = 401
  return err
}

export const tokenExpired = () => {
  let err = new Error('Token expired')
  err.status = 401
  return err
}
