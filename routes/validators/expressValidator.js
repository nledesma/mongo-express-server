
'use strict'
import { validationResult } from 'express-validator/check'
import { createResponse, codes } from '../../utils/response'

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
