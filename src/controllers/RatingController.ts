import { NextFunction, Request, Response } from 'express'
import ApiError from '../exceptions/ApiError'
import RatingService from '../services/Rating.service'

class RatingController {
  async rateFacility(req: Request, res: Response, next: NextFunction) {
    try {
      const { facilityId } = req.params
      const { rating } = req.body

      if (!rating) {
        throw ApiError.BadRequest('"rating" field was not provided')
      }

      await RatingService.rateFacility(rating, Number(facilityId))

      return res
    } catch (err) {
      next(err)
    }
  }
}

export default new RatingController()
