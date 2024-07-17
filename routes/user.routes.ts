import express from "express"
const router = express.Router()
import { getAllUsers, getOneUser, editUser, deleteUser } from '../controllers/user.controllers'
import { isAuthenticated } from "../middlewares/verifyToken.middleware"

router.get('/getAllUsers', getAllUsers)

router.get('/:id', isAuthenticated, getOneUser)

router.put('/:id/edit', isAuthenticated, editUser)

router.delete('/:id/delete', isAuthenticated, deleteUser)

export default router