import express from "express"
const router = express.Router()
import { getAllUsers, getOneUser, editUser, deleteUser } from '@/controllers/user.controllers'
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"

router.get('/all-users', getAllUsers)

router.get('/:id', isAuthenticated, getOneUser)

router.put('/:id/edit', isAuthenticated, editUser)

router.delete('/:id/delete', isAuthenticated, deleteUser)

export default router