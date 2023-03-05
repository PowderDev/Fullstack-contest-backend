import { Router } from 'express'
import RatingController from '../controllers/RatingController'
const router = Router()

router.post('/facility/:facilityId', RatingController.rateFacility)

export default router
