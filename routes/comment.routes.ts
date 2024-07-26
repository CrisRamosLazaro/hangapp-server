import express from 'express'
const router = express.Router()
import { isAuthenticated } from "@/middlewares/verifyToken.middleware"
import { createComment, getAllComments } from '@/controllers/comment.controllers'

router.post('/create-comment', isAuthenticated, createComment)
router.get('/:spot_id/comments', isAuthenticated, getAllComments)

export default router