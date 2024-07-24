import express from 'express'
const router = express.Router()
import { getAllSpots, createSpot, getOneSpot, getSpotFullInfo } from '@/controllers/spot.controllers'
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"

router.get('/get-all-spots', isAuthenticated, getAllSpots)
router.post('/create-spot', isAuthenticated, createSpot)
router.get('/get-one-spot/:place_id', isAuthenticated, getOneSpot)
router.get('/:spot_id/get-full-info', isAuthenticated, getSpotFullInfo)

export default router