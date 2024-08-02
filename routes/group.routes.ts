import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createGroup } from '@/controllers/group.controllers'

router.post('/create-group', isAuthenticated, createGroup)

export default router