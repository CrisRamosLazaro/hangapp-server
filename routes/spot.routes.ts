import express from 'express'
const router = express.Router()
import { getAllSpots, createSpot, getOneGooglePlace, getOneSpot, addSpotToUserFaves, removeSpotFromUserFaves, editSpot, deleteSpot } from '@/controllers/spot.controllers'
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"

router.get('/all-spots', isAuthenticated, getAllSpots)
router.post('/create-spot', isAuthenticated, createSpot)
router.get('/get-one-google-place/:place_id', isAuthenticated, getOneGooglePlace)
router.get('/:spot_id', isAuthenticated, getOneSpot)
router.put('/:spot_id/add-to-faves', isAuthenticated, addSpotToUserFaves)
router.put('/:spot_id/remove-from-faves', isAuthenticated, removeSpotFromUserFaves)
router.put('/:spot_id/edit', isAuthenticated, editSpot)
router.delete('/:spot_id/delete', isAuthenticated, deleteSpot)

export default router