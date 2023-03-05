import { Router } from 'express'
import SportsFacilitiesController from '../controllers/SportsFacilities.controller'
const router = Router()

router.get(
  '/facilities-per-year',
  SportsFacilitiesController.getFacilitiesPerYear,
)
router.get(
  '/subjects-by-facilities',
  SportsFacilitiesController.getTopFederalSubjectsByFacilities,
)

router.get(
  '/subjects-by-budget',
  SportsFacilitiesController.getTopFederalSubjectsByBudget,
)

router.get('/top-types', SportsFacilitiesController.getTopTypesByAmount)

router.get('/coords', SportsFacilitiesController.getCoordsOfActiveFacilities)

router.get('/facility/:id', SportsFacilitiesController.getFacilityDetails)

export default router
