import { ErrorRequestHandler } from 'express'
import ApiError from '../exceptions/ApiError'

const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  console.error(err)
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: 'err', errors: err.errors })
  }
  return res.status(500).json({ message: err.message })
}

export default errorHandler
