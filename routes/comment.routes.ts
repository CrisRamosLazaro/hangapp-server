import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createComment } from '@/controllers/comment.controllers'

router.post('/create-comment', isAuthenticated, createComment)

export default router