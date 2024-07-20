import express from 'express'
const router = express.Router()
import { getAllSpots, createSpot } from '@/controllers/spot.controllers'
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"

router.get('/get-all-spots', getAllSpots)
router.post('/create-spot', isAuthenticated, createSpot)

export default router