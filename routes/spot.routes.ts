import express from 'express'
const router = express.Router()
import { getAllSpots, createSpot, getOneSpot } from '@/controllers/spot.controllers'
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"

router.get('/get-all-spots', isAuthenticated, getAllSpots)
router.post('/create-spot', isAuthenticated, createSpot)
router.get('/get-one-spot/:place_id', isAuthenticated, getOneSpot)

export default router