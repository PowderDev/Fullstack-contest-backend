import { NextFunction, Request, Response } from 'express'
import { redis } from '../redis'
import SportsFacilityService from '../services/SportsFacility.service'

class SportsFacilitiesController {
  async getFacilitiesPerYear(req: Request, res: Response, next: NextFunction) {
    try {
      const facilities = await SportsFacilityService.getBuiltFacilitiesPerYear()

      await redis.set(req.path, JSON.stringify(facilities))

      return res.json(facilities)
    } catch (err) {
      next(err)
    }
  }

  async getTopFederalSubjectsByFacilities(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const topFederalSubjects =
        await SportsFacilityService.getTopFederalSubjectsByFacilities()

      await redis.set(req.path, JSON.stringify(topFederalSubjects))

      return res.json(topFederalSubjects)
    } catch (err) {
      next(err)
    }
  }

  async getTopFederalSubjectsByBudget(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const topFederalSubjects =
        await SportsFacilityService.getTopFederalSubjectsByBudget()

      await redis.set(req.path, JSON.stringify(topFederalSubjects))

      return res.json(topFederalSubjects)
    } catch (err) {
      next(err)
    }
  }

  async getTopTypesByAmount(req: Request, res: Response, next: NextFunction) {
    try {
      const topTypes = await SportsFacilityService.getTopTypesByAmount()

      await redis.set(req.path, JSON.stringify(topTypes))

      return res.json(topTypes)
    } catch (err) {
      next(err)
    }
  }

  async getCoordsOfActiveFacilities(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const facilities =
        await SportsFacilityService.getCoordsOfActiveFacilities()

      // await redis.set(req.path, JSON.stringify(topTypes))

      return res.json(facilities)
    } catch (err) {
      next(err)
    }
  }

  async getFacilityDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      const facility = await SportsFacilityService.getFacilityDetails(
        Number(id),
      )

      await redis.set(req.path, JSON.stringify(facility))

      return res.json(facility)
    } catch (err) {
      next(err)
    }
  }
}

export default new SportsFacilitiesController()
